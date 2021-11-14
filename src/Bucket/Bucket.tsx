import Shape from '../Shape/Shape'
import styles from './Bucket.module.css'

export default function Bucket() {
  return (
    <div className={styles.bucket}>
      <Shape />
      <Shape />
      <Shape />
    </div>
  )
}