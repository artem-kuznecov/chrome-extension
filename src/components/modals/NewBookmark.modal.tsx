import styles from'./Modal.module.scss'

import { useState, useRef, ChangeEvent, FormEvent  } from 'react'

import { createChromeBookmark } from '@/api/chrome.api'
// import { convertBookmarks } from '@/api/processer.api'

import { useClickOutside } from '@/hooks/useClickOutside'
import { IBookmark } from '@/data/types'

const NewBookmark = (
  { isOpen, handleToggleModal, currentFolder }:
  {
    isOpen: boolean,
    handleToggleModal: any,
    currentFolder: IBookmark
  }
) => {
  const [formData, setFormdata] = useState({
    title: '',
    url: '',
    userdata: ''
  })
  const modalWrapper = useRef(null)
  useClickOutside(modalWrapper, handleToggleModal, isOpen)

  function createNewBookmark (e: FormEvent) {
    e.preventDefault()
    createChromeBookmark(formData, currentFolder.id || '0').then(async newBookmark => {
      localStorage.setItem('folderToMoveTo', newBookmark?.parentId as string)
      setFormdata({
        title: '',
        url: '',
        userdata: ''
      })
    })
  }

  function handleFormChange (e: ChangeEvent<HTMLInputElement>) {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form
      className={styles['new-bookmark']} data-open={isOpen} onSubmit={e => createNewBookmark(e)} ref={modalWrapper}
    >
      <div>
        <h1>Новая закладка</h1>
        <section>
          <label htmlFor="url">URL</label>
          <input id="url" name="url" value={formData.url} type="text" placeholder='http://example.com' onChange={e => handleFormChange(e)} />
        </section>
        <section>
          <label htmlFor="title">Название</label>
          <input id="name" name="title" value={formData.title} type="text" placeholder='Моя закладка' onChange={e => handleFormChange(e)} />
        </section>
        <section>
          <label htmlFor="userdata">Подпись закладки</label>
          <input id="userdata" name="userdata" value={formData.userdata} type="text" placeholder='@username' onChange={e => handleFormChange(e)} />
          <p data-hint>Оставьте пустым, чтобы создать закладку без подписи</p>
        </section>
      </div>
      <button type='submit'>Создать</button>
    </form>
  )
}

export { NewBookmark }