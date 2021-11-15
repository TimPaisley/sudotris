import Shape from '../Shape/Shape'
import styles from './Bucket.module.css'
import { Structure } from '../Shape/structures'

interface BucketProps {
  structures: Array<Structure>
}

export default function Bucket({ structures }: BucketProps) {
  return (
    <div className={styles.bucket}>
      {structures.map((structure, i) => (
        <Shape key={i} structure={structure} shapeId={i} />
      ))}
    </div>
  )
}