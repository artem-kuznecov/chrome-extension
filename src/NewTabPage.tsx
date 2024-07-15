/// <reference types="vite-plugin-svgr/client" />

import { BookmarksGrid } from './components/bookmarks-grid'

import Cog from '@/theme/icons/cog.svg?react'

const TabPage = () => {
  return (
    <>
      <Cog className='settings-icon' />
      <BookmarksGrid />
    </>
  )
}

export default TabPage
