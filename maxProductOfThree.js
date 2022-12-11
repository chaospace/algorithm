/**
N개의 정수로 구성된 비어 있지 않은 배열 A가 제공됩니다.
삼중항(P, Q, R)의 곱은 A[P] * A[Q] * A[R](0 ≤ P < Q < R < N)과 같습니다.

예를 들어 배열 A는 다음과 같습니다.

  A[0] = -3
  A[1] = 1
  A[2] = 2
  A[3] = -2
  A[4] = 5
  A[5] = 6
다음 예제 삼중항을 포함합니다.

(0, 1, 2)  = −3 * 1 * 2 = −6
(1, 2, 4)  =  1 * 2 * 5 = 10
(2, 4, 5)  = 2 * 5 * 6 = 60

output = 60;
당신의 목표는 삼중 항의 최대 곱을 찾는 것입니다.

N은 범위 [ 3 .. 100,000 ] 내의 정수 이고;
배열 A의 각 요소는 [ −1,000 .. 1,000 ] 범위 내의 정수 입니다.
 */

function solution(A) {
  const len = A.length;
  A.sort((a, b) => a - b);
  return Math.max(
    A[0] * A[1] * A[len - 1],
    A[len - 1] * A[len - 2] * A[len - 3]
  );
}
console.log(solution([-3, 1, 2, -2, 2, 5, 1, 6]));
console.log(solution([10, 10, 10]));
console.log(solution([4, 5, 0, 1]));
