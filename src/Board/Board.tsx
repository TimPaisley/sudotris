import styles from './Board.module.css'
import classNames from 'classnames'

export default function Board() {
  const squares = Array.from(Array(81).keys())

  return (
    <div className={styles.board}>
      {squares.map(square => (
        <div key={square} className={classNames(styles.square)} data-square={square} />
      ))}
    </div>
  )
}