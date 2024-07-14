import styles from'./Modal.module.scss'

import { ChangeEvent, FormEvent, useState, useRef } from 'react'
import { createChromeBookmark } from '../../api/chrome.api'

import { useClickOutside } from '../../hooks/useClickOutside'

const NewBookmark = ({ isOpen, handleToggleModal }: { isOpen: boolean, handleToggleModal: any }) => {

  const modalWrapper = useRef(null)
  useClickOutside(modalWrapper, handleToggleModal, isOpen)

  function createNewBookmark (e: FormEvent) {
    e.preventDefault()
    createChromeBookmark(formData, localStorage.getItem('currentFolder') || '0').then(newOne => {
      console.log({ newOne })
    })
    handleToggleModal()
  }

  const [formData, setFormdata] = useState({
    title: '',
    url: '',
    userdata: ''
  })

  function handleFormChange (e: ChangeEvent<HTMLInputElement>) {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form className={styles['new-bookmark']} data-open={isOpen} onSubmit={e => createNewBookmark(e)} ref={modalWrapper}>
      <div>
        <h1>Новая закладка</h1>
        <section>
          <label htmlFor="url">URL</label>
          <input id="url" name="url" type="text" placeholder='http://example.com' onChange={e => handleFormChange(e)} />
        </section>
        <section>
          <label htmlFor="url">Название</label>
          <input id="name" name="name" type="text" placeholder='Моя закладка' onChange={e => handleFormChange(e)} />
        </section>
        <section>
          <label htmlFor="userdata">Подпись закладки</label>
          <input id="userdata" name="userdata" type="text" placeholder='@username' onChange={e => handleFormChange(e)} />
          <p data-hint>Оставьте пустым, чтобы создать закладку без подписи</p>
        </section>
      </div>
      <button type='submit'>Создать</button>
    </form>
  )
}

export default NewBookmark