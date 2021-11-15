import './App.css';
import Board from './Board/Board';
import Bucket from './Bucket/Bucket';
import Header from './Header/Header';
import { closestCenter, DndContext, DragEndEvent, DragOverEvent } from '@dnd-kit/core'
import { useState } from 'react';
import { getRandomShapeTypes } from './Shape/shapes';

function App() {
  const [bucketShapes, setBucketShapes] = useState(getRandomShapeTypes(3))
  const [highlightedSquare, setHighlightedSquare] = useState<number | null>(null)

  const onDragOver = (event: DragOverEvent) => {
    setHighlightedSquare(parseInt(event.over?.id || '') || null)
    // console.log('onDragOver', event)
  }

  const onDragEnd = (event: DragEndEvent) => {
    setHighlightedSquare(null)
    // console.log('onDragEnd', event)
  }

  return (
    <div className="App">
      <DndContext collisionDetection={closestCenter} onDragOver={onDragOver} onDragEnd={onDragEnd}>
        <Header />
        <Board highlightedSquare={highlightedSquare} />
        <Bucket shapeTypes={bucketShapes} />
      </DndContext>
    </div>
  );
}

export default App;
