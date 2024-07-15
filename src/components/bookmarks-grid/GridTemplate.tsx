import styles from'./Grid.module.scss'

import { useEffect, useState } from 'react'

import { LinkPlate } from '@/components/bookmark/LinkPlate'
import { ButtonPlate } from '@/components/bookmark/ButtonPlate'

import { getChromeBookmarks } from '@/api/chrome.api'
import { convertBookmarks } from '@/api/processer.api'

import type { IBookmark } from '@/data/types'

import { NewBookmark } from '@/components/modals/NewBookmark.modal'

const GridTemplate = () => {
  function handler () {
    console.log('bookmark.onCreated')
    setCurrentFolderLocal(() => undefined)
  }
  chrome.bookmarks.onCreated.addListener(handler)

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [allFoldersLocal, setAllFoldersLocal] = useState<IBookmark[]>([])
  const [currentFolderLocal, setCurrentFolderLocal] = useState<IBookmark>()
  const [previousFolderLocal, setPreviousFolderLocal] = useState<IBookmark>()

  function toggleModal () {
    setModalOpen(prev => !prev)
  }

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
    console.log('TEST:', localStorage.getItem('folderToMoveTo'))

    console.log('useEffect in GridTemplate')
    getChromeBookmarks()
      .then(async chromeBookmarks => {
        const processed = await convertBookmarks(chromeBookmarks[0])
        console.log({ processed })
        setAllFoldersLocal(processed)
        console.log({ currentFolderLocal })
        if (localStorage.getItem('folderToMoveTo')) {
          // * Если это начальная папка
          if (localStorage.getItem('folderToMoveTo') === '1') setCurrentFolderLocal(processed[0])
          else setCurrentFolderLocal(processed[0].children?.find(child => child.id === localStorage.getItem('folderToMoveTo')))
          localStorage.removeItem('folderToMoveTo')
        }
        else setCurrentFolderLocal(currentFolderLocal || processed[0])
      })
      .catch((error) => {
        console.log(error)
      })
  }, [currentFolderLocal]
  )

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
        <ButtonPlate clickHandler={toggleModal} iconType='plus' />
      </div>
      <NewBookmark
        isOpen={modalOpen}
        handleToggleModal={toggleModal}
        currentFolder={currentFolderLocal as IBookmark}
      />
    </>
  )
}

export { GridTemplate }