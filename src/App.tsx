import './App.css';
import Board from './Board/Board';
import Bucket from './Bucket/Bucket';
import Header from './Header/Header';
import { closestCenter, DndContext, DragEndEvent, DragOverEvent } from '@dnd-kit/core'
import { useState } from 'react';
import { getRandomShapeTypes } from './Shape/shapes';
import { BoardTile, createNewBoard, highlightShape, getCoordsFromIndex, clearHighlights, shapeToTileCoordinates, placeShape } from './Board/utils'

function App() {
  const [bucketShapes, setBucketShapes] = useState(getRandomShapeTypes(3))
  const [board, setBoard] = useState<Array<BoardTile>>(createNewBoard(9, 9))

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
        const clearBoard = clearHighlights(board)
        const newBoard = placeShape(clearBoard, shapeCoordinates)

        setBoard(newBoard)
      }
    }
  }

  return (
    <div className="App">
      <DndContext collisionDetection={closestCenter} onDragOver={onDragOver} onDragEnd={onDragEnd}>
        <Header />
        <Board board={board} />
        <Bucket shapeTypes={bucketShapes} />
      </DndContext>
    </div>
  );
}

export default App;
