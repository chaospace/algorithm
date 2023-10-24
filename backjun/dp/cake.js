/**
 * 케익배달
 * N명의 고객에게 케익을 배달하는데 주문이 들어온 순서대로 배달하기를 원하며
 * 고객이 케익을 받을 수 있을 만큼 충분히 가까이까지 배달한다.
 *
 * 반드시 고객들에게 순서대로 배달을 하며 순서에 어긋난 사람에게 배달을 할 수 있는 위치에 있더라도
 * 케익을 주지 않고 순서대로 배달을 한다.
 * 고객의 위치는 중복이 될 수도 있다.
 *
 * N명의 고객의 위치는 순서대로 100,000×100,000 격자의 정수 좌표로 주어지고
 * 처음 출발하게 되는 보나뻬띠의 위치도 정수 좌표로 주어진다.
 * 선아는 격자 위에서 상하좌우로만 움직이며 고객에게 케익을 전달하기 위해서는
 * 그 고객의 위치까지 가거나 고객의 상하좌우 인접 격자점에 가야 한다.
 * 이때 선아가 최단거리를 이동하여 입력된 순서대로 배달을 끝낼 수 있는 거리를 계산하는 프로그램을 작성하시오.
 *
 * 고객위치까지 가거나 상하좌우 인접 격자까지가면 도착.
 *
 * 입력 (1 ≤ N, X, Y ≤ 100,000)
 * 첫째 줄에 N이 주어지고 둘째 줄에는 선아가 일하는 레스토랑의 위치가,
 * 셋째 줄부터는 N명의 위치가 X와 Y로 주어진다.
 * 두 좌표 사이에는 공백이 하나 이상 있다.
 *
 * 출력
 * 첫째 줄에 최단 거리를 출력한다.
 */

function solution({ start, order }) {
  //배달은 반드시 순서대로 하므로 소팅은 필요없다.
  //상우좌하를 비교할 수 밖에없음.
  const tracking = (current, index, move) => {
    if (index < order.length) {
      const [sx, sy] = current;

      const [x, y] = order[index];

      let x1 = x;
      let y1 = y;
      if (x >= sx) {
        x1 -= 1;
      } else {
        x1 += 1;
      }

      if (y >= sy) {
        y1 -= 1;
      } else {
        y1 += 1;
      }
      let dx = Math.abs(x1 - sx);
      let dy = Math.abs(y - sy);

      let dx2 = Math.abs(x - sx);
      let dy2 = Math.abs(y1 - sy);

      return (
        move +
        Math.min(
          tracking([x1, y], index + 1, dx + dy),
          tracking([x, y1], index + 1, dx2 + dy2)
        )
      );
    }

    return move;
  };

  const answer = tracking(start, 0, 0);
  return { answer };
}

function solutionDP({ start, order }) {
  const dp = Array.from({ length: order.length + 1 }, () =>
    Array.from({ length: 5 }, () => Number.MAX_SAFE_INTEGER)
  );
  const dir = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
    [0, 0],
  ];
  for (let j = 0; j < dir.length; j++) {
    dp[0][j] = 0;
  }
  // dp[0][4] = 0;
  const queue = [[...start, 0, 1]];

  while (queue.length) {
    const [cx, cy, move, index] = queue.shift();
    if (index <= order.length) {
      const nIndex = index - 1;
      const [x, y] = order[nIndex];
      for (let j = 0; j < dir.length; j++) {
        let nx = x + dir[j][0];
        let ny = y + dir[j][1];
        const next = Math.abs(nx - cx) + Math.abs(ny - cy) + move; //dp[nIndex][j];
        if (dp[index][j] > next) {
          dp[index][j] = next;
          queue.push([nx, ny, next, index + 1]);
        }
      }
    }
  }

  return {
    order,
    dp,
  };
}

[
  {
    start: [2, 2],
    order: [
      [3, 6],
      [6, 7],
      [7, 3],
    ],
    o: 11,
  },
  {
    start: [50, 50],
    order: [
      [10, 10],
      [60, 60],
      [10, 60],
      [60, 10],
      [50, 40],
    ],
    o: 361,
  },
  {
    start: [3, 2],
    order: [
      [4, 4],
      [5, 2],
      [4, 3],
      [4, 4],
    ],
    o: 4,
  },
].forEach((info) => {
  // console.log(solution(info));
  console.log(solutionDP(info));
});
//이동거리가 가장 짧은 것을 찾아야 한다.
//[3,2] -> [4,2] -> [4,3](4,4배달) -> [4, 2](5,2, 4,3배달) -> [4,3](4,4 배달) 종료
