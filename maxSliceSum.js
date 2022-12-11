/**
 
N개의 정수로 구성된 비어 있지 않은 배열 A가 제공됩니다.
0 ≤ P ≤ Q < N인 한 쌍의 정수(P, Q) 를 배열 A의 슬라이스 라고 합니다.
슬라이스(P, Q)의 합 은 A[P] + A[P +1] + ... + A[Q].

함수 작성:

N개의 정수로 구성된 배열 A가 주어지면 A 슬라이스의 최대 합을 반환합니다.

예를 들어 다음과 같은 배열 A가 있다고 가정합니다.

A[0] = 3 A[1] = 2 A[2] = -6
A[3] = 4 A[4] = 0
함수는 다음과 같은 이유로 5를 반환해야 합니다.

(3, 4)는 합이 4인 A의 슬라이스입니다.
(2, 2)는 합이 −6인 A의 슬라이스입니다.
(0, 1)은 합이 5인 A의 슬라이스이고,
A의 다른 슬라이스는 합이 (0, 1)보다 크지 않습니다.
다음 가정에 대한 효율적인 알고리즘을 작성 하십시오.

N은 범위 [ 1 .. 1,000,000 ] 내의 정수 이고;
배열 A의 각 요소는 [ -1,000,000 .. 1,000,000 ] 범위 내의 정수입니다 .
결과는 [−2,147,483,648..2,147,483,647] 범위 내의 정수입니다.

 */

/**
 * slice의 조건이 현재값과 sum을 비교해서 그중 큰거를 선택해서 진행
 * @param {*} A
 * @returns
 */
function solution(A) {
  const MIN_VALUE = -2147483648;
  const MAX_VALUE = 2147483647;
  let max_value = 0;
  let max_slice = MIN_VALUE;

  for (let i = 0; i < A.length; i++) {
    max_value = Math.max(A[i], max_value + A[i]);
    max_slice = Math.max(max_slice, max_value);
  }
  if (max_slice < MIN_VALUE) {
    max_slice = MIN_VALUE;
  } else if (max_slice > MAX_VALUE) {
    max_slice = MAX_VALUE;
  }
  console.log("max_slice", max_slice);
  return max_slice;
}

solution([3, 2, -6, 4, 0]);
solution([-2, 1]);
solution([-2, -1]);
solution([-2, 11, 10]);
