import styles from './Shape.module.css'
import classNames from 'classnames'

export default function Shape() {
  const structure = [
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 1, 0, 0 ],
    [ 0, 1, 1, 1, 0 ],
    [ 0, 0, 1, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
  ]

  return (
    <div className={styles.shape}>
      {structure.map((line, i) => (
        <div key={i} className={styles.line}>
          {line.map((tile, i) => (
            <div key={i} className={classNames(styles.tile, tile && styles.active)} />
          ))}
        </div>
      ))}
    </div>
  )
}