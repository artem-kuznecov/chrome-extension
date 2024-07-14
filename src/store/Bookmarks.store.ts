import { makeAutoObservable } from 'mobx'
import type { IBookmark } from '../data/types'

const dummy: IBookmark = {
  id: '',
  parent_id: '',
  title: '',
  children: [],
  picture: '',
  url: '',
  userdata: ''
}

class BookmarksStore {
  allFolders: IBookmark[] = []
  currentFolder: IBookmark = dummy
  previousFolder: IBookmark = dummy
  trigger: boolean = false

  constructor () {
    makeAutoObservable(this)
  }

  setAllFolders = (folders: IBookmark[] | undefined): void => {
    if (!folders) return
    this.allFolders = folders
  }

  setCurrentFolder = (folder: IBookmark | undefined): void => {
    if (!folder) return
    this.currentFolder = folder
  }

  setPreviousFolder = (folder: IBookmark): void => {
    this.previousFolder = folder
  }

  toggleTrigger = (): void => {
    this.trigger = !this.trigger
  }
}

const bookmarksStore = new BookmarksStore()

export { bookmarksStore }