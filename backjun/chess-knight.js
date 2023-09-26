/**
 * 체스 나이트 이동
 * 체스판에서 나이트가 원하는 위치로 이동하기 위해 필요한 횟수
 */

function solution(boardSize, start, target) {
  const board = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }).fill(0)
  );
  // 퀸에 이동영역
  const dir = [
    [-2, -1],
    [-2, 1],
    [2, 1],
    [2, -1],
    [1, 2],
    [-1, 2],
    [1, -2],
    [-1, -2],
  ];

  const queue = [[...start, 0]];

  while (queue.length) {
    const [cx, cy, count] = queue.shift();

    if (!board[cy][cx]) {
      board[cy][cx] = 1;
      if (cx === target[0] && cy === target[1]) {
        return count;
      }

      for (let i = 0; i < dir.length; i++) {
        const nx = cx + dir[i][0];
        const ny = cy + dir[i][1];
        if (
          nx >= 0 &&
          nx < boardSize &&
          ny >= 0 &&
          ny < boardSize &&
          !board[ny][nx]
        ) {
          queue.push([nx, ny, count + 1]);
        }
      }
    }
  }

  return -1;
}

[
  //   {
  //     boardSize: 8,
  //     start: [0, 0],
  //     target: [7, 0],
  //   },
  //   {
  //     boardSize: 10,
  //     start: [1, 1],
  //     target: [1, 1],
  //   },
  {
    boardSize: 100,
    start: [0, 0],
    target: [30, 50],
  },
].forEach(({ boardSize, start, target }) => {
  console.log(solution(boardSize, start, target));
});
