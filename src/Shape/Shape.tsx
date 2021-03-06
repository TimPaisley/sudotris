import styles from './Shape.module.css'
import { Structure } from './shapes'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

interface ShapeProps {
  shapeId: string,
  structure: Structure
}

export default function Shape(props: ShapeProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: props.shapeId })

  const style = {
    transform: CSS.Translate.toString(transform)
  }

  return (
    <div className={styles.wrapper} style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <div className={styles.shape}>
        {props.structure.map((coordinates, i) => <ShapePart key={i} coordinates={coordinates} />)}
      </div>
    </div>
  )
}

interface ShapePartProps {
  coordinates: [number, number]
}

function ShapePart({ coordinates }: ShapePartProps) {
  return (
    <div className={styles.part} style={{ left: coordinates[0] * 20 - 10, top: coordinates[1] * 20 - 10 }} />
  )
}