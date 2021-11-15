import styles from './Board.module.css'
import classNames from 'classnames'
import { useDroppable } from '@dnd-kit/core'

interface BoardProps {
  highlightedSquare: number | null
}

export default function Board({ highlightedSquare }: BoardProps) {
  const squares = Array.from(Array(81).keys())

  return (
    <div className={styles.board}>
      {squares.map(i => <Square key={i} squareId={i} highlighted={highlightedSquare === i} />)}
    </div>
  )
}

interface SquareProps {
  squareId: number,
  highlighted: boolean
}

function Square({ squareId, highlighted }: SquareProps) {
  const { setNodeRef } = useDroppable({ id: squareId.toString() })

  return (
    <div ref={setNodeRef} className={classNames(styles.square, highlighted && styles.highlight)} data-square={squareId} />
  )
}