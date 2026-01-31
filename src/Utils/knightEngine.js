const KNIGHT_OFFSETS = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1],
];


export function isWithinBounds(row, col, boardSize) {
  return row >= 0 && row < boardSize && col >= 0 && col < boardSize;
}

export function getValidMoves(row, col, boardSize) {
  const moves = [];

  for (const [dr, dc] of KNIGHT_OFFSETS) {
    const nr = row + dr;
    const nc = col + dc;

    if (isWithinBounds(nr, nc, boardSize)) {
      moves.push({row: nr, col: nc});
    }
  }

  return moves;
}


export function findShortestPath(start, end, boardSize) {
  if (start.row === end.row && start.col === end.col) {
    return [start];
  }

  const visited = new Set();
  visited.add(`${start.row},${start.col}`);

  const queue = [[start]];

  while (queue.length > 0) {
    const path = queue.shift();
    const {row, col} = path[path.length - 1];

    for (const next of getValidMoves(row, col, boardSize)) {
      const key = `${next.row},${next.col}`;

      if (visited.has(key)) {
        continue;
      }

      visited.add(key);
      const newPath = [...path, next];

      if (next.row === end.row && next.col === end.col) {
        return newPath; 
      }

      queue.push(newPath);
    }
  }

  return null; 
}

export function buildBoardState(boardSize, knightPos, validMoves, path, target) {
  const moveSet = new Set(validMoves.map(m => `${m.row},${m.col}`));
  const pathSet = new Set((path || []).map(p => `${p.row},${p.col}`));

  const board = [];

  for (let r = 0; r < boardSize; r++) {
    const row = [];

    for (let c = 0; c < boardSize; c++) {
      const key = `${r},${c}`;
      let role = 'empty';

      if (r === knightPos.row && c === knightPos.col) {
        role = 'knight';
      } else if (target && r === target.row && c === target.col) {
        role = 'target';
      } else if (pathSet.has(key)) {
        role = 'path';
      } else if (moveSet.has(key)) {
        role = 'move';
      }

      row.push({row: r, col: c, role});
    }

    board.push(row);
  }

  return board;
}
