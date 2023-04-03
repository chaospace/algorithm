/**
 * 구간트리를 이용한 구간 정보 처리
 *
 * 구간트리 원리
 * 배열에 특정 구간에 합을 미리 계산해 기억해두고 재사용.
 */

function RMQ(source) {
  const range = [];
  const limit = source.length - 1;
  // 구간별 최소값 저장
  const memoizeRange = (start, end, index) => {
    if (start === end) {
      return (range[index] = source[start]);
    }
    const mid = Math.floor((start + end) / 2);
    const l = memoizeRange(start, mid, index * 2);
    const r = memoizeRange(mid + 1, end, index * 2 + 1);
    return (range[index] = Math.min(l, r));
  };

  memoizeRange(0, limit, 1);

  /**
   * @param {*} start    :찾고자 하는 구간 정보 시작 인덱스
   * @param {*} end      :찾고자 하는 구간 정보 끝  인덱스
   * @param {*} node     : 노드 정보( index )
   * @param {*} leftNode : node 좌측 인덱스 구간정보
   * @param {*} rightNode: node 우측 인덱스 구간정보
   * @returns
   */
  const _query = (start, end, node, leftNode, rightNode) => {
    // 구간이 겹치지 않는 경우 큰 값 리턴
    if (start > rightNode || end < leftNode) {
      return Number.MAX_VALUE;
    }
    // 노드영역이 찾는 구간에 포함되는 경우
    if (start <= leftNode && rightNode <= end) {
      return range[node];
    }

    const mid = Math.floor((leftNode + rightNode) / 2);

    return Math.min(
      _query(start, end, node * 2, leftNode, mid),
      _query(start, end, node * 2 + 1, mid + 1, rightNode)
    );
  };

  const _update = (index, newValue, node, leftNode, rightNode) => {
    // 업데이트 구간이 해당 노드와 상관이 없으면 이전값 리턴
    if (index < leftNode || rightNode < index) {
      return range[node];
    }
    // 트리의 리프까지 내려온 경우
    if (leftNode === rightNode) return (range[node] = newValue);
    const mid = Math.floor((leftNode + rightNode) / 2);
    return (range[node] = Math.min(
      _update(index, newValue, node * 2, leftNode, mid),
      _update(index, newValue, node * 2 + 1, mid + 1, rightNode)
    ));
  };

  return {
    range,
    update(index, newValue) {
      return _update(index, newValue, 1, 0, limit);
    },
    query(start, end) {
      return _query(start, end, 1, 0, limit);
    }
  };
}
const rmq = new RMQ([1, 2, 1, 2, 3, 1, 2, 3, 4]);
console.log(rmq.range, rmq.query(7, 8));
