/// <reference types="vite-plugin-svgr/client" />

import { useState } from 'react'

import { BookmarksGrid } from './components/bookmarks-grid'
import { NewBookmark } from './components/modals/NewBookmark.modal'

import Cog from '@/theme/icons/cog.svg?react'

function TabPage () {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  function toggleModal () {
    setModalOpen(prev => !prev)
  }

  return (
    <>
      <div className='veil' data-open={modalOpen}></div>
      <Cog className='settings-icon' />
      <NewBookmark isOpen={modalOpen} handleToggleModal={toggleModal} />
      <BookmarksGrid handleToggleModal={toggleModal} />
    </>
  )
}

export default TabPage
