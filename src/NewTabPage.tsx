import { useState } from 'react'

import { BookmarksGrid } from './components/bookmarks-grid'
import NewBookmark from './components/modals/NewBookmark.modal'

function TabPage () {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  function toggleModal () {
    setModalOpen(prev => !prev)
  }

  return (
    <>
      <div className='veil' data-open={modalOpen}></div>
      <NewBookmark isOpen={modalOpen} handleToggleModal={toggleModal} />
      <BookmarksGrid handleToggleModal={toggleModal} />
    </>
  )
}

export default TabPage
