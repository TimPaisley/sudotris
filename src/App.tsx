import './App.css';
import Board from './Board/Board';
import Bucket from './Bucket/Bucket';
import Header from './Header/Header';
import { closestCenter, DndContext, DragEndEvent, DragOverEvent } from '@dnd-kit/core'
import { useState } from 'react';
import { getRandomShapeTypes } from './Shape/shapes';
import { BoardTile, createNewBoard, highlightShape, getCoordsFromIndex, clearHighlights, shapeToTileCoordinates, placeShape, checkAndCompleteSets } from './Board/utils'

function App() {
  const [bucketShapes, setBucketShapes] = useState(getRandomShapeTypes(3))
  const [board, setBoard] = useState<Array<BoardTile>>(createNewBoard(9, 9))
  const [score, setScore] = useState<number>(0)

  const onDragOver = (event: DragOverEvent) => {
    // console.log('onDragOver', event)
    const overId = event.over?.id

    if (overId) {
      const coords = getCoordsFromIndex(parseInt(overId))
      const shapeCoordinates = shapeToTileCoordinates(board, coords, event.active.id)

      let newBoard
      if (shapeCoordinates) {
        newBoard = highlightShape(board, shapeCoordinates)
      } else {
        newBoard = clearHighlights(board)
      }
      
      setBoard(newBoard)
    }

  }

  const onDragEnd = (event: DragEndEvent) => {
    // console.log('onDragEnd', event)
    const overId = event.over?.id
    
    if (overId) {
      const coords = getCoordsFromIndex(parseInt(overId))
      const shapeCoordinates = shapeToTileCoordinates(board, coords, event.active.id)
      
      if (shapeCoordinates) {
        const clearedHighlights = clearHighlights(board)
        const placedShape = placeShape(clearedHighlights, shapeCoordinates)
        const [newBoard, addScore] = checkAndCompleteSets(placedShape)

        setBoard(newBoard)
        setScore(score + addScore)
        removeShape(event.active.id)
      }
    }
  }

  const removeShape = (id: string) => {
    const newShapes = bucketShapes.filter(s => s !== id)

    if (newShapes.length > 0) {
      setBucketShapes(newShapes)
    } else {
      setBucketShapes(getRandomShapeTypes(3))
    }
  }

  return (
    <div className="App">
      <DndContext collisionDetection={closestCenter} onDragOver={onDragOver} onDragEnd={onDragEnd}>
        <Header score={score} />
        <Board board={board} />
        <Bucket shapeTypes={bucketShapes} />
      </DndContext>
    </div>
  );
}

export default App;
