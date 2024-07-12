import styles from'./Grid.module.scss'

const GridContainer = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className={styles['grid-container']}>
      {children}
    </div>
  )
}

export { GridContainer }