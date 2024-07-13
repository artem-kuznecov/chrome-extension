import styles from'./Bookmark.module.scss'

import { getThumbnail } from '../../utils/getThumbnail.util'

interface IBookmark {
  id: string
  title: string
  parent_id: string
  url?: string
  userdata?: string
  picture?: any
  children?: IBookmark[]
}

const LinkPlate = (bookmark: IBookmark) => {
  const thumbnail = getThumbnail(bookmark.url || '')

  let localhostPort = ''

  if (thumbnail === 'localhost') {
    const withPort = bookmark.url?.split(':')[2]
    if (withPort?.split('/')[0]) localhostPort = withPort?.split('/')[0]
  }

  return (
    <span className={bookmark.userdata ? styles['link-plate'] : styles['link-signed']}>
      <a href={bookmark.url}>
        <img src={`/thumbnails/${thumbnail}.svg`} alt={thumbnail} />
      </a>
      <p>{bookmark.userdata}</p>
      {thumbnail === 'localhost' && <p className={styles.port}>{localhostPort}</p>}
    </span>
  )
}

export default LinkPlate