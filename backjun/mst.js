/**
 * MST
 * minimum spanning tree
 * 최소 비용 신장 트리
 *  - 간선의 가중치의 합이 최소여야 한다.
 *  - n개의 정점을 가지는 그래프에 대해 반드시 (n-1)개의 간선만을 사용해야 한다.
 *  - 사이클이 포함되어서는 안된다.
 *
 * 신장트리
 *
 * n개의 정점으로 이루어진 그래프에서 (n-1)개의 간선으로 이루어진 그래프로 최소 연결 부분 그래프이다.
 * 최소연결 = 간선의 수가 가장 적다.
 * n개의 정점을 가지는 그래프의 최소 간선의 수는 (n-1)개이고, (n-1)개의 간선으로 연결되어 있으면 필연적으로
 * 트리 형태가 되고 이것이 바로 spanning tree가 된다.
 *
 *
 */

const find = (arr, x) => {
  if (arr[x] === x) {
    return x;
  }
  return find(arr, arr[x]);
};
/**
 * [1, 2, 3]
 * [1, 2, 1]
 *
 * find([1, 2, 1], 3)
 */

const merge = (arr, parent, child) => {
  let pId = find(arr, parent);
  let cId = find(arr, child);
  if (pId === cId) return;
  //그룹에 오름차순이 필요하다면 이곳에서 비교를 통해 부모가 될 값을 정할 수 있다.
  arr[cId] = pId;
};

const isUnion = (arr, parent, child) => {
  let pId = find(arr, parent);
  let cId = find(arr, child);
  if (pId === cId) return true;
  return false;
};

function solution(vertex, edge) {
  const orders = Array.from({ length: vertex + 1 }, (_, k) => k);
  const mst = [];
  edge.forEach((pos) => {
    const [from, to, cost] = pos;
    if (!isUnion(orders, to, from)) {
      merge(orders, to, from);
      mst.push([from, to, cost]);
    }
  });
  console.log(orders);
  return mst;
}

//최소신장 트리
//비용순으로 간선을 정렬하고 간선 이동 마다 union을 통해 사이클 여부를 판단해 진행한다.
[
  {
    vertex: 7,
    edge: [
      [1, 6, 10],
      [3, 4, 12],
      [2, 7, 15],
      [2, 3, 16],
      [4, 7, 18],
      [4, 5, 22],
      [5, 7, 25],
      [5, 6, 27],
    ],
  },
].forEach(({ vertex, edge }) => {
  console.log(solution(vertex, edge));
});
