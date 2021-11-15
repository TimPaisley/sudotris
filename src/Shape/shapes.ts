export type Structure = Array<[number, number]>

const structures: {[key: string]: Structure} = {
  i: [ [0, -2], [0, -1], [0, 1] ] as Structure,
  o: [ [1, 0], [0, 1], [1, 1] ] as Structure,
  t: [ [-1, 0], [0, 1], [1, 0] ] as Structure,
  s: [ [-1, 1], [0, 1], [1, 0] ] as Structure,
  z: [ [-1, 0], [0, 1], [1, 1] ] as Structure,
  j: [ [0, -1], [0, 1], [-1, 1] ] as Structure,
  l: [ [0, -1], [0, 1], [1, 1] ] as Structure,
}

export function getRandomShapeTypes(n: number): Array<string> {
  let keys = Object.keys(structures)
  shuffle(keys)

  return keys.splice(0, n)
}

export function getStructure(key: string) {
  return structures[key]
}

function shuffle(a: Array<any>) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}