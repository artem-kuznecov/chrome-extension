import styles from'./Grid.module.scss'
import LinkPlate from '../bookmark/LinkPlate'

const GridTemplate = () => {
  return (
    <div className={styles['grid-template']}>
      <p style={{ border: '1px solid black' }}>1</p>
      <p style={{ border: '1px solid black' }}>2</p>
      <p style={{ border: '1px solid black' }}>3</p>
      <p style={{ border: '1px solid black' }}>4</p>
      <p style={{ border: '1px solid black' }}>5</p>
      <p style={{ border: '1px solid black' }}>6</p>
      <p style={{ border: '1px solid black' }}>7</p>
      <p style={{ border: '1px solid black' }}>8</p>
      <p style={{ border: '1px solid black' }}>9</p>
      <LinkPlate />
    </div>
  )
}

export { GridTemplate }