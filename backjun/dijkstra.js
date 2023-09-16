/**
 * 최단경로 찾기
 * 정점과 간선 시작점(0)이 주어지면
 * 각 정점별 도착까지의 가중치를 출력하는 함수 만들기
 * 도착할 수 없을 경우 INF리턴
 *
 * 다익스트라
 * queue는 주어진 노드를 순서대로 기억
 * history는 빈 배열로 queue에서 거리가 짧은 순으로 추출해 방문을 완료한 노드를 추가
 * queue에서 가져온 노드에 주변 노드를 방문하며 거리 값을 갱신처리
 *
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

const dijkstra = (graph, vertex) => {
  //다익스트라
  const answer = [];
  for (let i = 0; i < vertex; i++) {
    answer.push({
      node: i + 1,
      distance: Infinity,
      visited: false,
    });
  }
  answer[0].distance = 0;
  const history = [];
  const getShortDistanceNode = () => {
    let select = null;
    answer.forEach((info) => {
      if (!info.visited) {
        if (select && info.distance < select.distance) {
          select = info;
        } else if (select === null) {
          select = info;
        }
      }
    });
    return answer.indexOf(select);
  };

  for (let i = 0; i < answer.length; i++) {
    const idx = getShortDistanceNode();
    if (!answer[idx].visited) {
      answer[idx].visited = true;
      const { node, distance } = answer[idx];
      for (let j = 0; j < graph[node].length; j++) {
        const [v, w] = graph[node][j];
        if (answer[v - 1].distance > distance + w) {
          answer[v - 1].distance = distance + w;
        }
      }
      history.push(answer[idx]);
    }
  }

  return history;
};

const bfsType = (graph, vertex, start) => {
  const answer = Array.from({ length: vertex + 1 }).fill(Infinity);
  answer[start] = 0;
  bfs(graph, [start, 0], answer);
  return answer;
};

// 다익스트라 수도 코드
function solution(vertex, edges, start) {
  const graph = convertLinkedList(edges, vertex);

  // return bfsType(graph, vertex, start);
  return dijkstra(graph, vertex);
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
