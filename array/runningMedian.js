/**
 * 한 수열에 중간값(median)은 이 수열을 정렬했을 때 가운데에 오는 값.
 * {3,1,5,4,2}을 정렬 시 가운데는 3.
 *  - 수열의 길이가 짝수일 경우 가운데 있는 두 값중 작은 값을 사용.
 *
 * 한 수열에 중간값은 수열에 새로운 값이 추가될 때마다 바뀔 수 있다.
 * 텅빈 수열에서 시작해 각 수가 추가될 때마다 중간 값을 계산하는 프로그램을 작성.
 *
 * ex)
 * 3, 1, 5, 4, 2 순서로 추가되는 순열의 중간값은
 * 3, 1, 3, 3, 3 순서로 변화.
 *
 * 입력이 큰 관계로 다음 공식대로 증가
 * A[0] = 1983
 * A[i] = (A[i-1] * a+b) % 20090711
 */

const Heap = require("../libs/Heap");
const RNG = require("../libs/RNG");
/**
 * a,b(0<=a<=10000)
 * @param {*} N : 수열의 길이
 * @param {*} a : 생성에 사용되는 정수 a
 * @param {*} b : 생성에 사용되는 정수 b
 */
function solution(N, a, b) {
  const arr = [1983];
  const R = 20090711;
  const heapMax = new Heap.MaxHeap();
  const heapMin = new Heap.MinHeap();

  let ret = 0;
  for (let i = 1; i <= N; i++) {
    arr[i] = (arr[i - 1] * a + b) % R;
  }

  for (let i = 0; i < N; i++) {
    const v = arr[i];
    // 현재 쌍이 같을 경우 최대힙을 먼저 채운다.
    if (heapMax.length === heapMin.length) {
      heapMax.push(v);
    } else {
      heapMin.push(v);
    }
    if (heapMin.length && heapMax.length && heapMax.top > heapMin.top) {
      let a = heapMax.pop();
      let b = heapMin.pop();

      heapMax.push(b);
      heapMin.push(a);
    }
    ret = (ret + heapMax.top) % R;
  }
  console.log("ret", ret);
}

//solution(10, 1, 0);
//solution(10, 1, 1);
//solution(10000, 1273, 4936);
