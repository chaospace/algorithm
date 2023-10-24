/**
 * N*N 게임판에 수가 적혀있다.
 * 게임에 목표는 가장 왼쪽 위에서 오른쪽 아래로 규칙에 맞게 점프로 이동하는 것이다.
 *
 * 칸에 수는 점프 거리를 의미하며 반드시 우측, 하단으로만 이동해야 한다.
 * 0은 진행을 막는 종착점, 항상 칸에 수만큼 반드시 이동해야 한다.
 *
 * 골에 도착하는 경로의 수를 구하는 함수 작성.
 */

function solution(board) {
  //bfs를 이용하면 될듯하다.
  const queue = [[0, 0]];
  const limit = board.length;
  let count = 0;
  while (queue.length) {
    const [x, y] = queue.shift();
    const next = board[y][x];
    if (next === 0) {
      count++;
    } else {
      const nx = x + next;
      const ny = y + next;
      if (nx < limit) {
        queue.push([nx, y]);
      }
      if (ny < limit) {
        queue.push([x, y + next]);
      }
    }
  }
  return count;
}

[
  [
    [2, 3, 3, 1],
    [1, 2, 1, 3],
    [1, 2, 3, 1],
    [3, 1, 1, 0],
  ],
].forEach((board) => {
  console.log(solution(board));
});
