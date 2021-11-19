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