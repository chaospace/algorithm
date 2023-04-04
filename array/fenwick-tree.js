/**
 * 펜윅트리
 * 구간트리에 개선형
 * 구간트리가 중복된 합을 모두 기억한다면 fenwicktree는 불필요한 합을 기억하는 짝수 인덱스에 트리는 제거된 트리형태.
 * 구간에 합을 효율적으로 관리한다.
 *
 * 펜윅트리의 인덱스 관리
 * 현재인덱스에 최하위 비트를 제어하며 인덱스를 이동하며 비트연산자를 이용한다.
 * 3 = 11(2)
 * 5 = 101(2)
 * 6 = 110(2)
 * 8 = 1000(2)
 * 인덱스 정보를 2진수로 표현시 최하위 비트를 가져오는 법
 * index & -index;
 * ex)
 * index = 110
 * ~index= 001
 * -index= ~index+1 = 001+1 = 010
 *
 * index & -index = 110 & 010 = 010
 *
 *
 * fenwick-tree에서 구간의 합.
 * left~right ( 0 ~ 10 ) 구간
 * [0-right](전체)
 * [left-right](구간합) = (0 ~ right) - (0 ~ left - 1)
 */

//let index = 0;
/**
 * arr  : 1, 2, 3, 4, 5, 6
 *
 *        21
 *        10
 * tree : 3           11
 *        1     3     5     0
 */
let data = [3, 5, 2, 4, 0, 8, 1, 5, 3, 4, 1, 0, 6, 7, 7];
let limit = data.length;
let tree = Array(limit + 1).fill(0);
const add = (index, value) => {
  //구간합 미리 계산
  while (index < tree.length) {
    tree[index] += value;
    index += index & -index;
    //console.log("index", index);
  }
};
/**
 * 초기화 시
 * 배열의 시작부터 끝까지 구간합을 구해놓는다.
 *
 */
for (let i = 0; i < limit; i++) {
  add(i + 1, data[i]);
}

//console.log("tree", tree);

const sum = index => {
  let ret = 0;
  while (index) {
    ret += tree[index];
    index -= index & -index;
  }
  return ret;
};

/**
 * 구간합 구하기
 * fentwick-tree에 구간합은
 * 각 구간에 합을 더해서 추출
 * end - (start-1)
 * @param {*} start
 * @param {*} end
 * @returns
 */
const rangeQuery = (start, end) => {
  const b = sum(end);
  const a = sum(start - 1);
  console.log("end", b, "start", a);
  return b - a;
};

/**
 * 구간 업데이트
 * fentwick-tree에 구간업데이트 처리
 * 구간별 add를 처리해서 진행
 * start부터 이후 모든 값을 더한다.
 * 더한 값에서 end이후는 더한 값을 저거해 준다.
 * add(start, newValue)
 * add(end+1, -newValue)
 * @param {*} start
 * @param {*} end
 * @returns
 */
const rangeUpdate = (start, end, newValue) => {};

//console.log("sum", sum(limit - 1));
//console.log("sum", sum(limit));
//add(3, 2);
//console.log("tree", tree);
//console.log("range-sum", rangeQuery(5, 8));
const FenwickTree = require("../libs/FenwickTree");
const info = [5, 1, 4, 3, 2];
const myTree = new FenwickTree(info.length);
let ret = 0;
for (let i = 0; i < info.length; i++) {
  ret += myTree.sum(info.length) - myTree.sum(info[i]);
  myTree.add(info[i], 1);
}
//console.log("ret", ret);
function divideAndMerge(arr, left, right) {
  // 머지 할 것이 없으면 리턴
  if (left === right) return 0;
  let mid = Math.floor((left + right) / 2);
  let ret =
    divideAndMerge(arr, left, mid) + divideAndMerge(arr, mid + 1, right);
  let temp = [];
  let leftIndex = left,
    tempIndex = 0,
    rightIndex = mid + 1;
  // 좌우로 나눈 구간을 temp로 정렬하며 머지
  // leftIndex, rightIndex모두 제한에 이를 때 까지 반복.
  while (leftIndex <= mid || rightIndex <= right) {
    // 좌측이 아직 마지막이 아니고 우측이 크거나 우측이 끝에 도달햇을 경우
    if (
      leftIndex <= mid &&
      (rightIndex > right || arr[leftIndex] <= arr[rightIndex])
    ) {
      //우측값이 크니까 현재 좌측을 템프에 넣고 스킾..

      temp[tempIndex++] = arr[leftIndex++];
    } else {
      // 좌측값이 우측보다 큰 경우 이동 값을 증가시킴.
      ret += mid - leftIndex + 1;
      temp[tempIndex++] = arr[rightIndex++];
    }
  }
  //temp에 정렬된 값을 원본에 반영
  for (let i = 0; i < temp.length; i++) {
    arr[left + i] = temp[i];
  }
  return ret;
}
//5, 1, 4, 3, 2
console.log("ret", divideAndMerge(info, 0, info.length - 1));
