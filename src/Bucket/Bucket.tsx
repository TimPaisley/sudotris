import Shape from '../Shape/Shape'
import styles from './Bucket.module.css'
import { getStructure } from '../Shape/shapes'

interface BucketProps {
  shapeTypes: Array<string>
}

export default function Bucket({ shapeTypes }: BucketProps) {
  return (
    <div className={styles.bucket}>
      {shapeTypes.map(getStructure).map((structure, i) => (
        <Shape key={i} structure={structure} shapeId={shapeTypes[i]} />
      ))}
    </div>
  )
}