/**
 * 네트웍크에 연결되어 있는 컴퓨터 정보가 주어질 때
 * 1번 컴퓨터를 통해 전파되는 바이러스에 걸리는 컴퓨터의 수를 반환.
 */

const convertGraph = (list, k) => {
  const graph = Array.from({ length: k + 1 }, () => []);
  //   console.log("graph", graph);
  list.forEach(([start, end]) => {
    graph[start].push(end);
    //graph[end].push(start);
  });
  //   graph.every((v) => v.sort());
  return graph;
};

function solution(network, k) {
  //console.log("net", network);
  const graph = convertGraph(network, k);
  const status = Array.from({ length: k + 1 }).fill(0);
  const queue = [1];

  while (queue.length) {
    const v = queue.shift();
    if (!status[v]) {
      status[v] = 1;
      for (let j = 0; j < graph[v].length; j++) {
        queue.push(graph[v][j]);
      }
    }
  }
  return status.filter((v, i) => i > 1 && v === 1).length;
}

function solutionDFS(network, k) {
  const graph = convertGraph(network, k);
  const status = Array.from({ length: k + 1 }).fill(0);
  const stack = [1];
  while (stack.length) {
    const v = stack[stack.length - 1];
    let stackCount = stack.length;
    if (!status[v]) {
      status[v] = 1;
      for (let node of graph[v]) {
        if (!status[node]) {
          stack.push(node);
        }
      }
    }
    if (stackCount === stack.length) {
      //스택 추가내용이 없으면 스택제거
      stack.pop();
    }
  }
  console.log("stack", status);
  return status.filter((v, i) => i > 1 && v === 1).length;
}

[
  {
    k: 7,
    network: [
      [1, 2],
      [2, 3],
      [1, 5],
      [5, 2],
      [5, 6],
      [4, 7],
    ],
  },
  {
    k: 7,
    network: [
      [2, 6],
      [2, 4],
      [1, 7],
      [1, 3],
      [1, 5],
      [4, 5],
      [6, 5],
    ],
  },
].forEach(({ network, k }) => {
  //   console.log(solution(network, k));
  console.log(solutionDFS(network, k));
});
