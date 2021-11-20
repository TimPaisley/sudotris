import { getStructure, Structure } from "../Shape/shapes"

export interface BoardTile {
  coordinates: [number, number],
  highlight: boolean,
  active: boolean,
}

export function createNewBoard(width: number, height: number): Array<BoardTile> {
  let newBoard = [] as Array<BoardTile>

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      newBoard.push({
        coordinates: [x, y],
        highlight: false,
        active: false
      })
    }
  }

  return newBoard
}

export function highlightShape(board: Array<BoardTile>, shapeCoordinates: Array<[number, number]>): Array<BoardTile> {
  return board.map(tile => ({
    ...tile,
    highlight: includesCoords(shapeCoordinates, tile.coordinates)
  }))
}

export function placeShape(board: Array<BoardTile>, shapeCoordinates: Array<[number, number]>): Array<BoardTile> {
  return board.map(tile => ({
    ...tile,
    active: tile.active || includesCoords(shapeCoordinates, tile.coordinates)
  }))
}

export function shapeToTileCoordinates(board: Array<BoardTile>, center: [number, number], shapeType: string): Array<[number, number]> | null {
  const structure = getStructure(shapeType) as Structure
  const shapeCoordinates = structure.map(([x, y]) => [center[0] + x, center[1] + y]) as Array<[number, number]>

  for (let i = 0; i < shapeCoordinates.length; i++) {
    if (shapeCoordinates[i][0] >= 9
      || shapeCoordinates[i][1] >= 9
      || shapeCoordinates[i][0] < 0
      || shapeCoordinates[i][1] < 0
      || board[getIndexFromCoords(shapeCoordinates[i])].active
    ) {
      return null
    }
  }

  return shapeCoordinates
}

export function clearHighlights(board: Array<BoardTile>): Array<BoardTile> {
  return board.map(tile => ({
    ...tile,
    highlight: false
  }))
}

export function checkAndCompleteSets(board: Array<BoardTile>): [Array<BoardTile>, number] {
  let completedTiles = [] as Array<[number, number]>
  let score = 0

  // Check rows
  const completedRowTiles = completedRows(board)
  completedTiles = completedTiles.concat(completedRowTiles)
  score += completedRowTiles.length / 9
  
  // Check columns
  const completedColumnTiles = completedColumns(board)
  completedTiles = completedTiles.concat(completedColumnTiles)
  score += completedColumnTiles.length / 9
  
  // Check boxes
  const completedBoxTiles = completedBoxes(board)
  completedTiles = completedTiles.concat(completedBoxTiles)
  score += completedBoxTiles.length / 9

  const newBoard = board.map(tile => {
    if (includesCoords(completedTiles, tile.coordinates)) {
      return { ...tile, active: false }
    } else {
      return tile
    }
  })

  return [newBoard, score]
}

function completedRows(board: Array<BoardTile>): Array<[number, number]> {
  let completedTiles = [] as Array<[number, number]>

  for (let row = 0; row < 9; row++) {
    let complete = true

    for (let tile = 0; tile < 9; tile++) {
      const coord = getIndexFromCoords([tile, row])

      if (!board[coord].active) {
        complete = false
      }
    }

    if (complete) {
      for (let completedTile = 0; completedTile < 9; completedTile++) {
        completedTiles.push([completedTile, row])
      }
    }
  }

  return completedTiles
}

function completedColumns(board: Array<BoardTile>): Array<[number, number]> {
  let completedTiles = [] as Array<[number, number]>

  for (let col = 0; col < 9; col++) {
    let complete = true

    for (let tile = 0; tile < 9; tile++) {
      const coord = getIndexFromCoords([col, tile])

      if (!board[coord].active) {
        complete = false
      }
    }

    if (complete) {
      for (let completedTile = 0; completedTile < 9; completedTile++) {
        completedTiles.push([col, completedTile])
      }
    }
  }

  return completedTiles
}

function completedBoxes(board: Array<BoardTile>): Array<[number, number]> {
  let completedTiles = [] as Array<[number, number]>

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      const boxCoordinates = getBoxCoordinates([x * 3, y * 3])
      let complete = true

      for (let i = 0; i < boxCoordinates.length; i++) {
        if (!board[getIndexFromCoords(boxCoordinates[i])].active) {
          complete = false
        }
      }

      if (complete) {
        for (let j = 0; j < boxCoordinates.length; j++) {
          completedTiles.push(boxCoordinates[j])
        }
      }
    }
  }

  return completedTiles
}

function getBoxCoordinates(topLeftCoordinate: [number, number]): Array<[number, number]> {
  const coordinates = [] as Array<[number, number]>

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      coordinates.push([topLeftCoordinate[0] + x, topLeftCoordinate[1] + y])
    }
  }

  return coordinates
}

export function getCoordsFromIndex(index: number): [number, number] {
  return [index % 9, Math.floor(index / 9)]
}

export function getIndexFromCoords(coords: [number, number]): number {
  return coords[1] * 9 + coords[0]
}

function includesCoords(arr: Array<[number, number]>, coord: [number, number]) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === coord[0] && arr[i][1] === coord[1]) {
      return true
    }
  }

  return false
}