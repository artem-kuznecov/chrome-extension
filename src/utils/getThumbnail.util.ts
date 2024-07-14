import { knownDomains } from '../data/constants'

// * Выделение домена из URL
function cleanUpURL (url: string) {
  let cleanedUrl: string = url.includes('https')
    ? url.slice(8)
    : url.includes('http') ? url.slice(7) : ''
  cleanedUrl = cleanedUrl.includes('/') ? cleanedUrl.split('/')[0] : cleanedUrl
  return cleanedUrl
}

export function getThumbnail (url: string) {
  const thumbnails: string[] = knownDomains.filter(knownDomain =>
    cleanUpURL(url).toLowerCase().includes(knownDomain)
  )
  if (!thumbnails.length) return 'link'
  if (thumbnails.length === 0) return thumbnails[0]
  return thumbnails.sort(
    function (a, b) {
      return b.length - a.length
    }
  )[0]
}
