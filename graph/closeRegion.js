/**
 * 닫힌 영역 계산.
 *
 * W,B 로 이루어진 2D 배열에서 영역과 닫지 않고 B로 둘러 싸인 W를 B로 변경하기
 *
 * ex
 *
 * [B, B, B, B] -> [B, B, B, B]
 * [W, B, W, B] -> [W, B, B, B]
 * [B, W, W, B] -> [B, B, B, B]
 * [B, B, B, B] -> [B, B, B, B]
 *
 *
 */

function bfs(board, visited, curent) {
  const max = board.length;
  const [beginRow, beginColumn] = curent;
  let directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ];
  const value = board[beginRow][beginColumn];
  visited[beginRow][beginColumn] = true;
  let queue = [];
  queue.push([beginRow, beginColumn]);
  while (queue.length) {
    let [row, column] = queue.shift();
    for (const dir of directions) {
      const nextRow = row + dir[0];
      const nextColumn = column + dir[1];
      //console.log(nextRow, nextColumn, visited);
      // 위치가 유효하고, 값은 W, 방문한적이 없을 경우 다음 노드 체크
      if (
        nextColumn >= 0 &&
        nextColumn < max &&
        nextRow >= 0 &&
        nextRow < max &&
        board[nextRow][nextColumn] === value &&
        !visited[nextRow][nextColumn]
      ) {
        visited[nextRow][nextColumn] = true;
        queue.push(board, visited, [nextRow, nextColumn]);
      }
    }
  }

  return board;
}

/**
 * 주어진 배열을 순회하며 W값을 만남.
 * 이 값을 시작으로 주변 노드 탐색( 너비 우선으로 해도 될듯 )
 * 탐색 시작부터 마지막까지 이동경로 저장.
 * 저장된 위치에 값을 반전시킴.
 *
 * 외곽영역을 먼저 검색하며 W가 있는지 체크
 * 없다면 모든 W를 반전시켜도 무방.
 * @param {*} board
 */
function solution(board) {
  const max = board[0].length;

  /**
   * B로 둘러싸인 W만 변경되야 하니
   * 조건 체크를 위한 visited배열을 초기화
   */
  const visited = [];
  for (let row = 0; row < max; row++) {
    visited.push(new Array(max).fill(false, 0, max));
  }
  /**
   * 먼저 외곽에 있는 W를 먼저 방문하며 처리
   * W가 이어져 있을 경우 외곽 체크를 먼저하지 않으면
   * visited값이 변경된 상태라 영역 추출이 정확하지 않을 수 있음.
   */
  for (let row = 0; row < max; row++) {
    if (board[row][0] === "W" && !visited[row][0]) {
      bfs(board, visited, [row, 0]);
    }
    if (board[row][max - 1] === "W" && !visited[row][max - 1]) {
      bfs(board, visited, [row, max - 1]);
    }
  }
  for (let column = 0; column < max; column++) {
    if (board[0][column] === "W" && !visited[0][column]) {
      bfs(board, visited, [0, column]);
    }
    if (board[max - 1][column] === "W" && !visited[max - 1][column]) {
      bfs(board, visited, [max - 1, column]);
    }
  }

  // 나머지 부분을 확인하며 B로 전환.
  for (let row = 0; row < max; row++) {
    for (let column = 0; column < max; column++) {
      if (board[row][column] === "W" && !visited[row][column]) {
        visited[row][column] = true;
        board[row][column] = "B";
      }
    }
  }

  console.log("visited", visited);
  console.log("board", board);
  //외곽을 돌며 W값을 체크
}

solution([
  ["B", "W", "W", "W", "B"],
  ["B", "W", "B", "W", "B"],
  ["W", "B", "W", "B", "B"],
  ["B", "W", "W", "B", "W"],
  ["W", "B", "B", "B", "W"]
]);

// function isFeasible(board, visited, neighbor) {
//   let x = neighbor[0],
//     y = neighbor[1];
//   return (
//     x >= 0 &&
//     x < board.length &&
//     y >= 0 &&
//     y < board[x].length &&
//     board[x][y] == "W"
//   );
// }

// function markBoundaryRegion(i, j, board, visited) {
//   let directions = [
//     [0, 1],
//     [1, 0],
//     [0, -1],
//     [-1, 0]
//   ];
//   const queue = [];
//   queue.push([i, j]);
//   visited[i][j] = true;
//   let current, neighbor;
//   while (queue.length) {
//     current = queue.shift();
//     for (const dir of directions) {
//       neighbor = [i + dir[0], j + dir[1]];
//       if (isFeasible(board, visited, neighbor)) {
//         visited[neighbor[0]][neighbor[1]] = true;
//         queue.push(neighbor);
//       }
//     }
//   }
// }

// function solutionA(board) {
//   if (!board.length) {
//     return;
//   }
//   const numRows = board.length;
//   const numCols = board[0].length;
//   let visited = [];
//   for (let i = 0; i < numRows; i++) {
//     visited.push(new Array(numCols).fill(false, 0, numCols));
//   }
//   for (let i = 0; i < numRows; i++) {
//     if (board[i][0] === "W" && !visited[i][0]) {
//       markBoundaryRegion(i, 0, board, visited);
//     }

//     if (board[i][numCols - 1] === "W" && !visited[i][numCols - 1]) {
//       markBoundaryRegion(i, numCols - 1, board, visited);
//     }
//   }
//   for (let i = 0; i < numCols; i++) {
//     if (board[0][i] === "W" && !visited[0][i]) {
//       markBoundaryRegion(0, i, board, visited);
//     }

//     if (board[numRows - 1][i] === "W" && !visited[numRows - 1][i]) {
//       markBoundaryRegion(numRows - 1, i, board, visited);
//     }
//   }

//   for (let i = 1; i < numRows; i++) {
//     for (let j = 1; j < numCols; j++) {
//       if (board[i][j] == "W" && !visited[i][j]) {
//         board[i][j] = "B";
//       }
//     }
//   }
//   return board;
// }

// console.log(
//   solutionA([
//     ["B", "B", "B", "B"],
//     ["W", "B", "W", "B"],
//     ["B", "W", "W", "B"],
//     ["B", "B", "B", "B"]
//   ])
// );
