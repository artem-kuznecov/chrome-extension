/// <reference types="vite-plugin-svgr/client" />

import styles from'./Bookmark.module.scss'

import FolderMinus from '@/theme/icons/folder-minus.svg?react'
import ArrowLeft from '@/theme/icons/arrow-left.svg?react'
import Plus from '@/theme/icons/plus.svg?react'

// const ButtonPlate = ({ text, clickHandler, iconType }: { text?: string, clickHandler: any, iconType: string }) => {
const ButtonPlate = ({ text, iconType, clickHandler }: { text?: string, iconType: string, clickHandler?: any }) => {
  return (
    // <span className={styles['button-plate']} onClick={clickHandler} data-type={iconType}>
    <span className={styles['button-plate']} data-type={iconType} onClick={clickHandler}>
      {iconType === 'folder' && <FolderMinus />}
      {iconType === 'arrow' && <ArrowLeft />}
      {iconType === 'plus' && <Plus />}
      <p>{text}</p>
    </span>
  )
}

export { ButtonPlate }