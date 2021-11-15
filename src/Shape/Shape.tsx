import styles from './Shape.module.css'
import classNames from 'classnames'
import { Structure } from './structures'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

interface ShapeProps {
  shapeId: number,
  structure: Structure
}

export default function Shape(props: ShapeProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: props.shapeId.toString() })

  const style = {
    transform: CSS.Translate.toString(transform)
  }

  return (
    <div style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <div className={styles.shape}>
        {props.structure.map((line, i) => (
          <div key={i} className={styles.line}>
            {line.map((tile, i) => (
              <div key={i} className={classNames(styles.tile, tile && styles.active)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}