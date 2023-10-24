/**
 * 유니온 파인드
 *  - 그래프 알고리즘에서 두  노드가 같은 프래프에 속하는지 판별.
 *  - 서로소 집합, 상호 베타적 집합으로 불린다.
 *  - 노드를 합치는 union 연산과 찾는 find로 이루어 짐.
 *  - 트리 구조로 이루어진 자료구조 중 하나.
 */

/**
 * 배열의 특정 인덱스끼리 연결해 하나의 그룹으로 만들어 줌.
 * @param {*} arr
 * @param {*} x
 * @param {*} y
 * @returns
 */
const merge = (arr, parent, child) => {
  let parentIndex = find(arr, parent);
  let childIndex = find(arr, child);
  if (parentIndex === childIndex) return;
  arr[childIndex] = parentIndex;
};

/**
 * 배열에 인덱스와 값이 같은 요소를 찾아서 반환
 * @param {*} arr
 * @param {*} x
 * @returns
 */
const find = (arr, x) => {
  if (arr[x] === x) {
    return x;
  }
  return find(arr, arr[x]);
};

/**
 * 배열에 유니온 여부 판단 함수
 * @param {*} arr
 * @param {*} x
 * @param {*} y
 * @returns
 */
const isUnion = (arr, x, y) => {
  let parentIndex = find(arr, x);
  let childIndex = find(arr, y);
  if (parentIndex === childIndex) return true;
  return false;
};

//배열인덱스와 값이 동일하면 편리하지만
//실제 그런 경우는 없음.
//데이터 배열과 유니온 배열을 만들어서 그룹 로직만 관리하고 실데이터는 분리애야 되는 방식인가?
function solution(n) {
  let arr = Array.from({ length: n + 1 }, (_, k) => k);
  merge(arr, 1, 2);
  merge(arr, 4, 5);
  merge(arr, 5, 6);
  console.log("2,4는 같은 집합인가?", isUnion(arr, 2, 4));
  merge(arr, 1, 5);
  console.log("2,4는 같은 집합인가?", isUnion(arr, 2, 4));
  return arr;
}

[7].forEach((n) => console.log(solution(n)));
