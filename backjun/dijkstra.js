/**
 * 최단경로 찾기
 * 정점과 간선 시작점(0)이 주어지면
 * 각 정점별 도착까지의 가중치를 출력하는 함수 만들기
 * 도착할 수 없을 경우 INF리턴
 */

const { convertLinkedList } = require("../libs/util");

function bfs(edges, start, answer) {
  const queue = [start];
  while (queue.length) {
    const [from, w] = queue.shift();
    if (answer[from] > w) {
      answer[from] = w;
    }
    for (let i = 0; i < edges[from].length; i++) {
      const [to, cost] = edges[from][i];
      queue.push([to, w + cost]);
    }
  }

  return Infinity;
}

function solution(vertex, edges, start) {
  const graph = convertLinkedList(edges, vertex);
  const answer = [];
  // for을 돌며 개별 값을 구할 수도 있겠지만 bfs를 통해 끝까지 진행하면
  for (let i = 0; i <= vertex; i++) {
    answer.push(Number.POSITIVE_INFINITY);
  }
  // answer[0]=0;
  bfs(graph, [start, 0], answer);

  return answer;
}

[
  {
    vertex: 5,
    start: 1,
    edges: [
      [5, 1, 1],
      [1, 2, 2],
      [1, 3, 3],
      [2, 3, 4],
      [2, 4, 5],
      [3, 4, 6],
    ],
  },
].forEach(({ vertex, edges, start }) => {
  console.log(solution(vertex, edges, start));
});
