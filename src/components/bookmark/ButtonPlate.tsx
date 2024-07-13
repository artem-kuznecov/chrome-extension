/// <reference types="vite-plugin-svgr/client" />

import styles from'./Bookmark.module.scss'

import FolderMinus from '../../theme/icons/folder-minus.svg?react'
import ArrowLeft from '../../theme/icons/arrow-left.svg?react'

const ButtonPlate = ({ text, clickHandler, iconType }: { text?: string, clickHandler: any, iconType: string }) => {
  return (
    <span className={styles['button-plate']} onClick={clickHandler}>
      {iconType === 'folder' && <FolderMinus />}
      {iconType === 'arrow' && <ArrowLeft />}
      <p>{text}</p>
    </span>
  )
}

export default ButtonPlate