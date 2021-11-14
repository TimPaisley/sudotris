import styles from './Shape.module.css'
import classNames from 'classnames'
import shapes from './shapes'

export default function Shape() {
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)]

  return (
    <div className={styles.shape}>
      {randomShape.map((line, i) => (
        <div key={i} className={styles.line}>
          {line.map((tile, i) => (
            <div key={i} className={classNames(styles.tile, tile && styles.active)} />
          ))}
        </div>
      ))}
    </div>
  )
}