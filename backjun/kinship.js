/**
 * 촌수 계산
 * 주어진 연결 리스트를 가지고 정해진 N, M의 촌수를 반환하기.
 */

function solution(vertex, list, target) {
  const [from, to] = target;
  const graph = Array.from({ length: vertex + 1 }, () => []);
  list.forEach(([start, end]) => {
    graph[start].push(end);
    graph[end].push(start);
  });
  const status = Array.from({ length: vertex + 1 }).fill(0);
  //정렬 오름차순
  graph.forEach((v) => v.sort((a, b) => a - b));
  //console.log("graph", graph);
  // dfs로 target까지 가는 거리 구성.
  const queue = [[from, 0, [from]]];
  status[from] = 1;
  while (queue.length) {
    const [v, count, history] = queue.shift();
    if (v === to) {
      console.log("count", history);
      queue.push(history);
      break;
    }
    for (let j = 0; j < graph[v].length; j++) {
      const node = graph[v][j];
      if (!status[node]) {
        status[node] = 1;
        queue.push([node, count + 1, [...history, node]]);
      }
    }
  }

  return queue.length ? queue[0].length - 1 : -1;
}

[
  {
    vertex: 9,
    list: [
      [1, 2],
      [1, 3],
      [2, 7],
      [2, 8],
      [2, 9],
      [4, 5],
      [4, 6],
    ],
    target: [7, 3],
  },
  {
    vertex: 9,
    list: [
      [1, 2],
      [1, 3],
      [2, 8],
      [2, 9],
      [4, 5],
      [4, 6],
    ],
    target: [8, 6],
  },
].forEach(({ vertex, list, target }) => {
  console.log(solution(vertex, list, target));
});
