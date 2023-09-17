/**
 * 플로이드
 *
 * n개의 도시와 m개의 버스.
 * 모든 도시의 쌍(A,B)에 대해서 도시 A, B로 가는데 필요한 최소비용 구하기
 * 갈 수 없는 경우 0출력.
 *
 * 플로이드 와샬 알고리즘.
 * 버스노선( 순환이 발생 )
 * 각 노드에서 출발해 다른 모든 도시(노드)에 도착하는 최소 가중치 합 찾기.
 * 순환노드가 없다면 다익스트라도 가능.
 * 순환노드가 있다면 DP를 이용해 각 노드별 가중치를 모두 구한 후 조합해서 찾는다.
 */
const { convertLinkedList } = require("../libs/util");

/**
 * 중복을 체크하는 코드가 존재하지 않아
 * quene에 visible을 체크하지 않을 경우 순환 그래프 시 무한루프에 빠짐.
 */
const bfs = (graph, start, answer) => {
  const queue = [start];
  while (queue.length) {
    const [v, w] = queue.shift();
    if (answer[v] > w) {
      answer[v] = w;
    }
    for (let i = 0; i < graph[v].length; i++) {
      const [next, cost] = graph[v][i];
      queue.push([next, cost + w]);
    }
  }
  return answer;
};

/**
 * 초기 설정한 비용값을 베이스로
 * 전체 노드를 체크하며 현재 노드값과 중간노드 값의 비용을 비교하며 최적화를 진행한다.
 * @param {*} answer
 * @param {*} m
 */
function flyoid(answer, m) {
  //3중 포문 중간-시작-종료 노드
  for (let k = 1; k <= m; k++) {
    //그래프 간선 루프
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= m; j++) {
        //k값을 이용해 중간 노드에 시간 값과 중선 순위를 비교.
        if (answer[i][j] > answer[i][k] + answer[k][j]) {
          answer[i][j] = answer[i][k] + answer[k][j];
        }
      }
    }
  }
}

function solution(routes, m) {
  //
  const answer = Array.from({ length: m + 1 }, () =>
    Array.from({ length: m + 1 }).fill(Infinity)
  );

  const graph = convertLinkedList(routes, m);

  //초기 구간별 비용 최소값 설정하기
  for (let i = 1; i <= m; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      const [next, cost] = graph[i][j];
      answer[i][next] = Math.min(answer[i][next], cost);
    }
  }
  // console.log("answer", answer);
  flyoid(answer, m);
  return answer;
  //   return bfs(graph, [1, 0], answer);
}

[
  {
    m: 5,
    routes: [
      [1, 2, 2],
      [1, 3, 3],
      [1, 4, 1],
      [1, 5, 10],
      [2, 4, 2],
      [3, 4, 1],
      [3, 5, 1],
      [4, 5, 3],
      [3, 5, 10],
      [3, 1, 8],
      [1, 4, 2],
      [5, 1, 7],
      [3, 4, 2],
      [5, 2, 4],
    ],
  },
].forEach(({ routes, m }) => {
  console.log(solution(routes, m));
});
