import styles from './Board.module.css'
import classNames from 'classnames'
import { useDroppable } from '@dnd-kit/core'
import { BoardTile } from './utils'

interface BoardProps {
  board: Array<BoardTile>
}

export default function Board({ board }: BoardProps) {
  return (
    <div className={styles.board}>
      {board.map((tile, i) => <Square key={i} squareId={i} highlighted={tile.highlight} active={tile.active} />)}
      <div className={styles.boardDividerH} />
      <div className={styles.boardDividerV} />
    </div>
  )
}

interface SquareProps {
  squareId: number,
  highlighted: boolean,
  active: boolean
}

function Square({ squareId, highlighted, active }: SquareProps) {
  const { setNodeRef } = useDroppable({ id: squareId.toString() })

  return (
    <div ref={setNodeRef} className={classNames(styles.square, highlighted && styles.highlight, active && styles.active)} data-square={squareId} />
  )
}