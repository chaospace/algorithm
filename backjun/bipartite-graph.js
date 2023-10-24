/**
 * 이분 그래프
 * 각 집합에 속한 정점끼리는 서로 인접하지 않도록 분할할 수 있을 때, 그러한 그래프를 이분 그래프라 한다.
 * 구분하는 방법
 *  - dfs
 *  - bfs
 * 를 이용해 인접 노드에 컬러를 다르게 설정하며 끝까지 진행
 * 중간에 동일 컬러를 만나면 이분 그래프가 아님.
 *
 */

const { convertLinkedList } = require("../libs/util");

function solution(vertex, edge) {
  const colors = Array.from({ length: vertex + 1 }).fill(0);
  const graph = convertLinkedList(edge, vertex);
  //시작점 컬러 설정.
  const queue = [1];
  colors[queue[0]] = 1;

  let isBipartiteGraph = true;
  //큐가 있거나 이분 그래프일 경우 반복.
  while (queue.length && isBipartiteGraph) {
    const node = queue.shift();
    for (let i = 0; i < graph[node].length; i++) {
      const next = graph[node][i];
      //컬러 설정 전에는 현재노드와 다른 컬러 설정.
      if (colors[next] === 0) {
        queue.push(next);
        //현재 노드와 컬러를 반대로 설정.
        colors[next] = colors[node] * -1;
      } else if (colors[next] === colors[node]) {
        isBipartiteGraph = false;
        break;
      }
    }
  }

  return isBipartiteGraph;
}

const bfs = (node, color) => {
  colors[node] = color;

  for (let i = 0; i < graph[node].length; i++) {
    const next = graph[node][i];
    if (colors[next] === 0) {
      bfs(next, color * -1); //반전해서 탐색요청.
    } else if (colors[next] === color) {
      return false;
    }
  }
};

[
  {
    vertex: 3,
    edge: [
      [1, 3],
      [2, 3],
    ],
  },
  {
    vertex: 4,
    edge: [
      [1, 2], //빨
      [2, 3], //파
      [3, 4], //빨
      [4, 2], //빨==빨로 동일
    ],
  },
].forEach(({ vertex, edge }) => {
  console.log(solution(vertex, edge));
});
