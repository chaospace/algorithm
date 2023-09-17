/**
 * V개의 마을와 E개의 도로로 구성되어 있는 도시가 있다.
 * 도로는 마을과 마을 사이에 놓여 있으며, 일방 통행 도로이다.
 * 마을에는 편의상 1번부터 V번까지 번호가 매겨져 있다고 하자. 당신은 도로를 따라 운동을 하기 위한 경로를 찾으려고 한다.
 * 운동을 한 후에는 다시 시작점으로 돌아오는 것이 좋기 때문에, 우리는 사이클을 찾기를 원한다.
 * 단, 당신은 운동을 매우 귀찮아하므로, 사이클을 이루는 도로의 길이의 합이 최소가 되도록 찾으려고 한다.
 * 도로의 정보가 주어졌을 때, 도로의 길이의 합이 가장 작은 사이클을 찾는 프로그램을 작성하시오.
 * 두 마을을 왕복하는 경우도 사이클에 포함됨에 주의한다.
 *
 * output
 *  첫째 줄에 최소 사이클의 도로 길이의 합을 출력한다. 운동 경로를 찾는 것이 불가능한 경우에는 -1을 출력한다.
 *
 * 시작 포인트와 종료 포인트가 동일하고 거리가 가장 작은 값 찾기.
 *
 * 그래프 구성이 아래와 같을 경우
 * 1 2 1
 * 3 2 1
 * 1 3 5
 * 2 3 2
 *
 * [2,1],[3,5]
 * [3,2]
 * [2,1]
 *
 */

/**
 * 벨만포트 이것은 그래프에 각 노드에 도착하는 최소 비용을 알 수 있을 뿐.
 * 각 노드에 순환과 돌아오는데 걸리는 시간 정보는 알 수 없음.
 * 이를 알기 위해서는 dfs를 하지만 순환이 발생하면 종료해야 한다.
 *
 * @param {*} graph
 * @param {*} n
 * @returns
 */
const solveBallmanfort = (graph, n) => {
  const answer = Array.from({ length: n + 1 }).fill(Infinity);
  answer[1] = 0;
  for (let y = 1; y <= n; y++) {
    for (let x = 0; x < graph[y].length; x++) {
      const [v, w] = graph[y][x];
      if (answer[y] !== Infinity && answer[v] > answer[y] + w) {
        answer[v] = answer[y] + w;
      }
    }
  }
  return answer;
};

const { convertLinkedList } = require("../libs/util");

const dfs = (graph, start, n, history) => {
  const stack = [start];
  const visited = Array.from({ length: n + 1 }).fill(0);
  // console.log("visi", visited);
  while (stack.length) {
    const [node, w] = stack[stack.length - 1];
    let connected = false;
    if (!visited[node]) {
      visited[node] = 1;
      for (let i = 0; i < graph[node].length; i++) {
        const [next, cost] = graph[node][i];
        if (!visited[next]) {
          stack.push([next, w + cost]);
          connected = true;
          break;
        } else if (next === start[0] && stack.length > 1) {
          // console.log("순환추가", next, cost, "현재", w);
          stack.push([next, w + cost]);
          connected = true;
          break;
        }
      }
    } else if (node === start[0]) {
      //순환발생.
      console.log("종료!", stack, "start", start);
      return;
    }

    if (!connected) {
      stack.pop();
    }
  }
};

// 모든 구간에 dis처리를 할 때 어떻게 되는지 확인해 보기.
const dijkstra = (graph, answer, start) => {
  const queue = [start, 0];

  while (queue.length) {
    const [node, dis] = queue.shift();

    //기억된 값 보다 현재 값이 더 크면 스킵.
    if (answer[start][node] < dis) continue;

    for (let i = 0; i < graph[node].length; i++) {
      const [next, nDist] = graph[node][i];
      const nextDist = dis + nDist;
      if (answer[start][next] > nextDist) {
        answer[start][next] = nextDist;
        queue.push([next, nextDist]);
      }
    }
  }
  return answer;
};

const flyoid = (distance, vertex) => {
  for (let v = 1; v <= vertex; v++) {
    for (let y = 1; y <= vertex; y++) {
      for (let x = 1; x <= vertex; x++) {
        // ab vs ak + kb : 중간 노드 이동값과 비교해서 거리값 갱신.
        if (distance[y][x] > distance[y][v] + distance[v][x]) {
          distance[y][x] = distance[y][v] + distance[v][x];
        }
      }
    }
  }
  return distance;
};

function solution(n, edges) {
  const graph = convertLinkedList(edges, n);
  const answer = Array.from({ length: n + 1 }, () =>
    Array.from({ length: n + 1 }).fill(Infinity)
  );
  // dijkstra(graph, answer, 1);
  // dijkstra(graph, answer, 2);
  // dijkstra(graph, answer, 3);
  //초기 값 설정
  for (let y = 1; y < graph.length; y++) {
    for (let x = 0; x < graph[y].length; x++) {
      const [idx, w] = graph[y][x];
      answer[y][idx] = Math.min(answer[y][idx], w);
    }
  }

  flyoid(answer, n);

  let min = Infinity;
  for (let v = 1; v <= n; v++) {
    min = Math.min(min, answer[v][v]);
  }
  return min === Infinity ? -1 : min;
  // 벨만포트 이것은 그래프에 각 노드에 도착하는 최소 비용을 알 수 있을 뿐.
  // 각 노드에 순환과 돌아오는데 걸리는 시간 정보는 알 수 없음.
  // 이를 알기 위해서는 dfs를 하지만 순환이 발생하면 종료해야 한다.
  // return solveBallmanfort(graph, n);
  // dfs(graph, [1, 0], n, []);
  // dfs(graph, [2, 0], n, []);
  // dfs(graph, [3, 0], n, []);
}

[
  {
    n: 3,
    edges: [
      [1, 2, 1],
      [3, 2, 1],
      [1, 3, 5],
      [2, 3, 2],
    ],
  },
].forEach(({ n, edges }) => {
  console.log(solution(n, edges));
});
