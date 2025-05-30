import { separator } from '@/data/constants'

export async function getChromeBookmarks () {
  try {
    const bookmarks = await chrome.bookmarks.getTree()
    return bookmarks
  } catch (error) {
    return []
  }
}

export async function createChromeBookmark (data: any, parentID: string) {
  try {
    const newBookmark = await chrome.bookmarks.create(
      {
        title: data.userdata ? data.title + separator + data.userdata : data.title,
        url: data.url ?? null,
        parentId: parentID
      }
    )
    return newBookmark
  } catch (error) {
    return undefined
  }
}