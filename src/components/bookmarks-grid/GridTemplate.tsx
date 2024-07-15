import styles from'./Grid.module.scss'

import { useEffect, useState } from 'react'

import { LinkPlate } from '@/components/bookmark/LinkPlate'
import { ButtonPlate } from '@/components/bookmark/ButtonPlate'
import { NewBookmark } from '@/components/modals/NewBookmark.modal'

import { getChromeBookmarks } from '@/api/chrome.api'
import { convertBookmarks } from '@/api/processer.api'

import type { IBookmark } from '@/data/types'

const LOCALSTORAGE_FOLDER_SAVER_NAME = 'currentFolderSetter'

const GridTemplate = () => {
  chrome.bookmarks.onCreated.addListener(() => {
    setCurrentFolderLocal(() => undefined)
    setModalOpen(false)
  })

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [allFoldersLocal, setAllFoldersLocal] = useState<IBookmark[]>([])
  const [currentFolderLocal, setCurrentFolderLocal] = useState<IBookmark>()
  const [previousFolderLocal, setPreviousFolderLocal] = useState<IBookmark>()

  function changeCurrentFolder (id: string | undefined) {
    if (!id) return
    if (Number(id) < Number(currentFolderLocal?.id as string)) {
      // * Переход в начальную папку
      if (id === '1') {
        setCurrentFolderLocal(allFoldersLocal.find((folder: IBookmark) => folder.id === id) || allFoldersLocal[0])
      }
      else {
        if (!previousFolderLocal?.children) return
        setCurrentFolderLocal(previousFolderLocal)
        setPreviousFolderLocal(allFoldersLocal[0]) // TODO сделать массив прошлых папок
      }
      return
    }
    // * Переход в следующую папку
    if (currentFolderLocal?.children) {
      setPreviousFolderLocal(currentFolderLocal)
      setCurrentFolderLocal(currentFolderLocal?.children.find((folder: IBookmark) => folder.id === id))
    }
  }

  useEffect(() => {
    getChromeBookmarks()
      .then(async chromeBookmarks => {
        const processed = await convertBookmarks(chromeBookmarks[0])
        setAllFoldersLocal(processed)
        if (localStorage.getItem(LOCALSTORAGE_FOLDER_SAVER_NAME)) {
          // * Если это начальная папка
          if (localStorage.getItem(LOCALSTORAGE_FOLDER_SAVER_NAME) === '1') setCurrentFolderLocal(processed[0])
          else setCurrentFolderLocal(processed[0].children?.find(child =>
            child.id === localStorage.getItem(LOCALSTORAGE_FOLDER_SAVER_NAME
            )))
          localStorage.removeItem(LOCALSTORAGE_FOLDER_SAVER_NAME)
        }
        else setCurrentFolderLocal(currentFolderLocal || processed[0])
      })
      .catch((error) => {
        console.log(error)
      })
  }, [currentFolderLocal])

  return (
    <>
      <div className='veil' data-open={modalOpen}></div>
      <div className={styles['grid-template']}>
        {
          currentFolderLocal?.id !== '1' &&
          <ButtonPlate clickHandler={() => changeCurrentFolder(previousFolderLocal?.id)} iconType='arrow' />
        }
        {
          currentFolderLocal?.children && currentFolderLocal.children.map((bookmark: IBookmark) => {
            return (
              <>
                {
                  !bookmark.children ?
                    <LinkPlate {...bookmark}/>
                    :
                    <ButtonPlate
                      text={bookmark.title}
                      clickHandler={() => changeCurrentFolder(bookmark.id)}
                      iconType='folder'
                    />
                }
              </>
            )
          })
        }
        <ButtonPlate clickHandler={() => setModalOpen(prev => !prev)} iconType='plus' />
      </div>
      <NewBookmark
        isOpen={modalOpen}
        handleToggleModal={() => setModalOpen(prev => !prev)}
        currentFolder={currentFolderLocal as IBookmark}
        localStorageItemName={LOCALSTORAGE_FOLDER_SAVER_NAME}
      />
    </>
  )
}

export { GridTemplate }