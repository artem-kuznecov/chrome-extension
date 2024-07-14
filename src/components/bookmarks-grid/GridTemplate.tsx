import styles from'./Grid.module.scss'

import { useEffect } from 'react'

import LinkPlate from '../bookmark/LinkPlate'
import ButtonPlate from '../bookmark/ButtonPlate'
import { getChromeBookmarks } from '../../api/chrome.api'
import { convertBookmarks } from '../../api/processer.api'
import type { IBookmark } from '../../data/types'

import { bookmarksStore } from '../../store/Bookmarks.store'
import { observer } from 'mobx-react-lite'

const GridTemplate = observer(({ handleToggleModal }: { handleToggleModal: any }) => {
  const {
    allFolders,
    currentFolder,
    previousFolder,
    setAllFolders,
    setCurrentFolder,
    setPreviousFolder,
    trigger
  } = bookmarksStore

  function changeCurrentFolder (id: string | undefined) {
    if (!id) return
    if (Number(id) < Number(currentFolder?.id as string)) {
      // * Переход в начальную папку
      if (id === '1') {
        setCurrentFolder(allFolders.find(folder => folder.id === id))
      }
      else {
        if (!previousFolder?.children) return
        setCurrentFolder(previousFolder)
        setPreviousFolder(allFolders[0]) // TODO сделать массив прошлых папок
      }
      return
    }
    // * Переход в следующую папку
    if (currentFolder?.children) {
      setPreviousFolder(currentFolder)
      setCurrentFolder(currentFolder?.children.find(folder => folder.id === id))
    }
  }

  useEffect(() => {
    getChromeBookmarks()
      .then(async chromeBookmarks => {
        const processed = await convertBookmarks(chromeBookmarks[0])
        setAllFolders(processed)
        const currFold = processed[0]
        setCurrentFolder(currFold as IBookmark)
        localStorage.setItem('currentFolder', currFold.id)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [
    setAllFolders,
    setCurrentFolder,
    trigger
  ])
  return (
    <div className={styles['grid-template']}>
      {
        currentFolder?.id !== '1' &&
        <ButtonPlate clickHandler={() => changeCurrentFolder(previousFolder?.id)} iconType='arrow' />
      }
      {
        currentFolder?.children && currentFolder?.children.map((bookmark: IBookmark) => {
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
      <ButtonPlate clickHandler={handleToggleModal} iconType='plus' />
    </div>
  )
})

export { GridTemplate }