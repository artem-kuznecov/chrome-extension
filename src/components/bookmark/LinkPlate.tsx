import styles from'./Bookmark.module.scss'

const LinkPlate = () => {
  return (
    <span className={styles['link-plate']}>
      <a href='#'>
        <img src="/Notion.svg" alt="notion" />
      </a>
      <p>name surname</p>
    </span>
  )
}

export default LinkPlate