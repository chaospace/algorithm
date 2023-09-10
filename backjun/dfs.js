/**
 * 깊이우선탐색 기본.
 *
 *  dfs(V, E, R) {  # V : 정점 집합, E : 간선 집합, R : 시작 정점
        visited[R] <- YES;  # 시작 정점 R을 방문 했다고 표시한다.
        for each x ∈ E(R)  # E(R) : 정점 R의 인접 정점 집합.(정점 번호를 오름차순으로 방문한다)
            if (visited[x] = NO) then dfs(V, E, x);
    }

    간선목록 edges
    시작점  N
 */

const dfs = (r, graph, visited, history) => {
  if (!visited[r]) {
    visited[r] = true;
    history.push(r);
    for (let i = 0; i < graph[r].length; i++) {
      let n = graph[r][i];
      if (!visited[n]) {
        dfs(n, graph, visited, history);
      }
    }
  }
};

/**
 * S에서 시작해서 간선에 이동 순서를 출력하는 함수.
 * 인접 정점은 오름차순으로 방문한다.
 * @param {*} V :정점 수
 * @param {*} E :간선 수
 * @param {*} S :시작 점.
 */
function solution(V, E, S) {
  const visited = Array.from({ length: V }).fill(false);
  const answer = [];
  const graph = Array.from({ length: V }, () => []);

  //무방향(양방향) 그래프 구성
  //start, end는 서로 연결 있어야 됨.
  E.forEach(([start, end]) => {
    graph[start].push(end);
    graph[end].push(start);
  });
  //오름차순 정렬
  graph.forEach((d) => d.sort());
  let queue = [];
  queue.push(S);
  while (queue.length) {
    let v = queue.pop();
    if (!visited[v]) {
      visited[v] = true;
      answer.push(v);
      //주변노드를 모두 큐에 넣고 순회하는 방식 bfs
      for (let i = 0; i < graph[v].length; i++) {
        if (!visited[graph[v][i]]) {
          queue.push(graph[v][i]);
          break;
        }
      }
    }
  }
  //   dfs(S, graph, visited, answer);
  return answer;
}

function solutionDesc(V, E, R) {
  const visited = Array.from({ length: V }).fill(false);
  const answer = [];
  const graph = Array.from({ length: V }, () => []);

  //무방향(양방향) 그래프 구성
  //start, end는 서로 연결 있어야 됨.
  E.forEach(([start, end]) => {
    graph[start].push(end);
    graph[end].push(start);
  });
  //오름차순 정렬
  graph.forEach((d) => d.sort((a, b) => b - a));

  dfs(R, graph, visited, answer);

  return answer;
}

[
  {
    vertex: 5,
    edges: [
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 4],
      [3, 4],
    ],
    start: 1,
  },
  {
    vertex: 6,
    edges: [
      [5, 4],
      [5, 2],
      [1, 2],
      [3, 4],
      [3, 1],
    ],
    start: 3,
  },
].forEach(({ vertex, edges, start }) => {
  console.log(solution(vertex, edges, start));
  // console.log(solutionDesc(vertex, edges, start));
});
