/**
 * 타임머신
 *  - A : 시작도시, B: 도착도시, C : 이동 시간
 *  - C = 0 : 순간이동
 *  - C < 0 : 타임머신ㅇ로 시간을 되돌아가는 경우.
 * 경로가 존재하지 않으면 -1로 설정.
 *
 * 1번 도시에서 나머지 도시로 가는 가장 빠른 시간을 구하시오.
 *
 *
 * ballmanford 벨만포드 알고리즘.
 *
 */

const { convertLinkedList } = require("../libs/util");

const bfs = (graph, start, answer) => {
  const queue = [start];
  while (queue.length) {
    const [v, w] = queue.shift();
    //시간 변경
    if (answer[v] > w) {
      //이미 초기값을 설정 후 다시 온거면 비교처리
      if (answer[v] !== Infinity) {
        answer[v] = -1;
        break;
      }
      answer[v] = w;
    }
    for (let i = 0; i < graph[v].length; i++) {
      const [to, cost] = graph[v][i];
      queue.push([to, w + cost]);
    }
  }

  return answer;
};

function solution(edges, vertex) {
  //console.log("vertex", vertex, "edges", edges);
  const graph = convertLinkedList(edges, vertex);
  const answer = Array.from({ length: vertex + 1 }, () => Infinity);
  answer[1] = 0;
  // 순환그래프가 주어지고 -증가값이 존재하는 경우
  // 루프에 제한을 걸어서 그 만큼 반복할 때까지 결과값을 보고 판단해 반복을 중지 시킨다.

  //bfs(graph, [1, 0], answer);
  let check = false;
  //딱 한번만 돌아주면 bfs를 하지 않아도 동일한다.
  for (let i = 1; i <= vertex; i++) {
    for (let j = 1; j < graph.length; j++) {
      for (let k = 0; k < graph[j].length; k++) {
        const [v, cost] = graph[j][k];
        if (answer[j] !== Infinity && answer[v] > answer[j] + cost) {
          answer[v] = answer[j] + cost;
          // 마지막 순서에 값이 갱신된다면 순환이 존재한다는 증거.
          if (i === vertex) {
            console.log("i===vertex", i, v);
            check = true;
            break;
          }
        }
      }
    }
  }
  console.log("checked", check, answer);
  if (check) {
    return -1;
  }
  return answer.filter((_, i) => i > 1).map((v) => (v === Infinity ? -1 : v));
}

[
  {
    vertex: 3,
    edges: [
      [1, 2, 4],
      [1, 3, 3],
      [2, 3, -1],
      [3, 1, -2],
    ],
  },
  {
    vertex: 3,
    edges: [
      [1, 2, 4],
      [1, 3, 3],
      [2, 3, -4],
      [3, 1, -2],
    ],
  },
  {
    vertex: 3,
    edges: [
      [1, 2, 4],
      [1, 2, 3],
    ],
  },
].forEach(({ edges, vertex }) => {
  console.log(solution(edges, vertex));
});
