/// <reference types="vite-plugin-svgr/client" />

import styles from'./Bookmark.module.scss'

import { useRef, useState } from 'react'
import { getThumbnail } from '@/utils/getThumbnail.util'
import { useClickOutside } from '@/hooks/useClickOutside'

import type { IBookmark } from '@/data/types'

import Dots from '@/theme/icons/dots.svg?react'

const LinkPlate = (
  { bookmark, activeDropdownElement, toggleContextMenu }:
  { bookmark: IBookmark, activeDropdownElement: string, toggleContextMenu: any }
) => {

  const [currentPlateHovered, setCurrentPlateHovered] = useState<string>('')

  const linkedPlateWrapper = useRef(null)
  useClickOutside(linkedPlateWrapper, toggleContextMenu, true)

  const thumbnail = getThumbnail(bookmark.url || '')
  let localhostPort = ''
  if (thumbnail === 'localhost') {
    const withPort = bookmark.url?.split(':')[2]
    if (withPort?.split('/')[0]) localhostPort = withPort?.split('/')[0]
  }

  return (
    <>
      <span
        className={bookmark.userdata ? styles['link-plate'] : styles['link-signed']}
        data-hoverable={activeDropdownElement !== bookmark.id}
        onMouseEnter={() => setCurrentPlateHovered(bookmark.id)}
        onMouseLeave={() => setCurrentPlateHovered('')}
      >
        <div ref={linkedPlateWrapper} data-context-menu-open={activeDropdownElement === bookmark.id}>
          <p>пункт меню 1</p>
          <p>пункт меню 2</p>
          <p>пункт меню 3</p>
        </div>
        <a href={bookmark.url}>
          <img src={`/thumbnails/${thumbnail}.svg`} alt={thumbnail} />
          <Dots
            data-visible={currentPlateHovered === bookmark.id || activeDropdownElement === bookmark.id}
            data-id={bookmark.id}
            data-type='more-options'
            onClick={(e)=> toggleContextMenu(e)}
          />
        </a>
        <p>{bookmark.userdata}</p>
        {thumbnail === 'localhost' && <p className={styles.port}>{localhostPort}</p>}
      </span>
    </>
  )
}

export { LinkPlate }