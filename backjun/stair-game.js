/**
 * 뱀주사위 게임
 * 게임판 10*10
 * 사다리가 있는 칸은 지시한 값으로 이동 + (앞으로)
 * 뱀 정보 있는 칸은 지시한 값으로 이동 -  (뒤로)
 * 100번 칸에 도착하기 위해 주사위를 최소 몇 번 굴려야 하는지 출력한다.
 */

const dfs = (board, start) => {
  const queue = [[start, 0]];
  const dice = [6, 5, 4, 3, 2, 1];
  while (queue.length) {
    const [current, count] = queue.shift();
    if (current === 100) {
      return count;
    }
    for (let i = 0; i < dice.length; i++) {
      const nx = board[current + dice[i]];
      if (nx <= 100) {
        queue.push([nx, count + 1]);
      }
    }
  }
  return -1;
};

function solution(lucky, snake) {
  const board = Array.from({ length: 101 }, (_, k) => k);
  lucky.forEach(([from, to]) => {
    board[from] = to;
  });
  snake.forEach(([from, to]) => {
    board[from] = to;
  });
  return dfs(board, 1);
}

[
  {
    lucky: [
      [32, 62],
      [42, 68],
      [12, 98],
    ],
    snake: [
      [95, 13],
      [97, 25],
      [93, 37],
      [79, 27],
      [75, 19],
      [49, 47],
      [67, 17],
    ],
  },
  {
    lucky: [
      [8, 52],
      [6, 80],
      [26, 42],
      [2, 72],
    ],
    snake: [
      [51, 19],
      [39, 11],
      [37, 29],
      [81, 3],
      [59, 5],
      [79, 23],
      [53, 7],
      [43, 33],
      [77, 21],
    ],
  },
].forEach(({ lucky, snake }) => {
  console.log(solution(lucky, snake));
});
