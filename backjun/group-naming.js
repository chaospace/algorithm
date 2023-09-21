/**
 * 그룹네이밍
 * 아파트 단지 그룹이름 나누기
 *
 * 상하좌우로 연결된 아파트에 단지 이름설정하기.
 * 대각선은 안됨.
 *
 * 0110100
 * 0110101
 * 1110101
 * 0000111
 * 0100000
 * 0111110
 * 0111000
 */

function bfs(graph, n, groupName, answer) {
  const queue = [n];
  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  while (queue.length) {
    const [x, y] = queue.shift();
    for (let i = 0; i < dir.length; i++) {
      const nx = x + dir[i][0];
      const ny = y + dir[i][1];
      if (
        nx >= 0 &&
        nx < graph.length &&
        ny >= 0 &&
        ny < graph.length &&
        graph[ny][nx] === 1
      ) {
        answer[ny][nx] = groupName;
        graph[ny][nx] = 0;
        queue.push([nx, ny]);
      }
    }
  }
}

function solution(map, n) {
  const graph = [];
  for (let i = 0; i < map.length / n; i++) {
    const str = map.substring(n * i, n * i + n);
    graph.push(str.split("").map((v) => Number(v)));
  }

  const answer = graph.map((v) => Array.from(v).fill(0));
  //   console.log("ans", answer);

  //포문을 돌며 1을 만나는 순간 길찾기를 시작하면 될까?
  // x, y값을 증가시키면 이동하다 1을 만나는 순간 bfs
  let groupName = 0;

  for (let y = 0; y < graph.length; y++) {
    for (let x = 0; x < graph.length; x++) {
      if (graph[y][x] === 1) {
        groupName += 1;
        answer[y][x] = groupName;
        graph[y][x] = 0;
        bfs(graph, [x, y], groupName, answer);
      }
    }
  }
  //   console.log("answer", answer);
  //   answer.map(v => v.join(''));
  return answer.map((v) => v.join(""));
}

[{ map: "0110100011010111101010000111010000001111100111000", n: 7 }].forEach(
  ({ map, n }) => {
    console.log(solution(map, n));
  }
);
