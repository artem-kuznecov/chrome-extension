import type { IBookmark } from '../data/types'

function sortByType (data: IBookmark[], sortingParameter: string) {
  let sorted: IBookmark[] = []
  // * Сначала папки, затем закладки
  if (sortingParameter === 'folder') {
    sorted = data.sort(function (x, y) {
      return (x === y)? 0 : x.children? -1 : 1
    })
  }
  // * Сначала закладки, затем папки
  else if (sortingParameter === 'bookmark') {
    sorted = data.sort(function (x, y) {
      return (x === y)? 0 : x.children? 1 : -1
    })
  }
  return sorted
}

// * Преобразование закладок Chrome к кастомному типу
export async function convertBookmarks (
  bookmarksObject: chrome.bookmarks.BookmarkTreeNode
): Promise<IBookmark[]> {
  if (!bookmarksObject.children) return []
  return await Promise.all(bookmarksObject.children.map(
    async (child: chrome.bookmarks.BookmarkTreeNode): Promise<IBookmark>  => {
      if (!child.children) {
        const isTitled = child.title.includes('|')
        if (isTitled)
          return {
            id: child.id,
            title: child.title.split('|')[0].trim(),
            parent_id: child.parentId as string,
            url: child.url as string,
            userdata: child.title.split('|')[1].trim()
          }
        return {
          id: child.id,
          title: child.title,
          parent_id: child.parentId as string,
          url: child.url as string
        }
      }
      return {
        id: child.id,
        title: child.title,
        parent_id: child.parentId as string,
        children: sortByType(await convertBookmarks(child), 'folder')
      }
    }))
}