import './App.css';
import Board from './Board/Board';
import Bucket from './Bucket/Bucket';
import Header from './Header/Header';
import { closestCenter, DndContext, DragEndEvent, DragOverEvent } from '@dnd-kit/core'
import { useState } from 'react';
import structures from './Shape/structures';

function App() {
  const initialShapes = [
    structures[Math.floor(structures.length * Math.random())],
    structures[Math.floor(structures.length * Math.random())],
    structures[Math.floor(structures.length * Math.random())],
  ]

  const [bucketShapes, setBucketShapes] = useState(initialShapes)
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
        <Bucket structures={bucketShapes} />
      </DndContext>
    </div>
  );
}

export default App;
