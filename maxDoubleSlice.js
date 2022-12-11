/**
 N개의 정수로 구성된 비어 있지 않은 배열 A가 제공됩니다.

0 ≤ X < Y < Z < N인 삼중선(X, Y, Z)을 이중 슬라이스 라고 합니다 .

이중 슬라이스(X, Y, Z) 의 합은 
A[X + 1] + A[X + 2] + ... + A[Y − 1] + A[Y + 1] + A[ Y + 2] + ... + A[Z - 1].

예를 들어 배열 A는 다음과 같습니다.
    A[0] = 3
    A[1] = 2
    A[2] = 6
    A[3] = -1
    A[4] = 4 
    A[5] = 5
    A[6] = -1
    A[7] = 2
다음 예제 이중 슬라이스를 포함합니다.

(0, 3, 6), 합계는 2 + 6 + 4 + 5 = 17,
(0, 3, 7), 합계는 2 + 6 + 4 + 5 − 1 = 16,
(1, 4, 7), 합계는 6 - 1 + 5 - 1     = 9
(3, 4, 5), 합계는 0입니다.
목표는 더블 슬라이스의 최대 합을 찾는 것입니다.




0<=X<Y<Z<N (중요)
X는 X+1부터 시작 
Y는 자신을 제외한 Y-1, Y+1, Y+2, ...
Z는 Z-1만 처리
A[X+1],A[X+2] + .... + A[Y-1] + A[Y+1] + .... + A[Z-1];
 */

/**
 * 이증 슬라이 조건은 ?
 * X<Y<Z<N : 요거를 만족하는 배열의 인덱스를 구성하려면..
 * 별도로 X, Z를 컨트롤하기 보다 Y값을 유동적으로 이동하는게 좋아 보임.
 * @param {*} A
 *
 * two pointer?
 * 서로 다른 loop로 돌린다...
 *
 * x[0] => x+1
 * y[x+2]=> y-1, y+1
 */

function solution(A) {
  const len = A.length; //마지막은 접근이 안되니 -1
  if (len <= 3) return 0; // 인덱스가 연속될 경우 합은 0

  const leftSum = new Array(len).fill(0);
  for (let i = 1; i < len; i++) {
    leftSum[i] = Math.max(0, leftSum[i - 1] + A[i]);
  }
  const rightSum = new Array(len).fill(0);
  for (let i = len - 2; i > 0; i--) {
    rightSum[i] = Math.max(0, rightSum[i + 1] + A[i]);
  }
  // console.log("leftSum", leftSum, "right", rightSum);
  let answer = 0;
  for (let i = 1; i < len - 1; i++) {
    let left = 0;
    for (let j = 1; j < i; j++) {
      left = leftSum[j];
    }

    let right = 0;
    for (let z = len - 2; z > i; z--) {
      right = rightSum[z];
    }

    answer = Math.max(answer, left + right);
  }
  console.log(answer);
  return answer;
}

solution([3, 2, 6, -1, 4, 5, -1, 2]);
solution([3, 2, 6]);
solution([-2, 3, 2, 6, -10, 2, 4, 30, 10]);
// solution([-2, -5, -2, -6, -10]);
solution([-2, -5, 2, -3]);
// solution([6, 1, 5, 6, 4, 2, 9, 4]);
solution([5, 17, 0, 3]);

function solutionPrefixSum(A) {
  const len = A.length;
  const leftSum = new Array(len).fill(0);
  const rightSum = new Array(len).fill(0);

  for (let i = 1; i < len; i++) {
    leftSum[i] = Math.max(leftSum[i - 1] + A[i], 0);
  }

  for (let i = len - 2; i > 0; i--) {
    rightSum[i] = Math.max(rightSum[i + 1] + A[i], 0);
  }
  console.log("left", leftSum);
  console.log("right", rightSum);
  let answer = 0;
  for (let i = 1; i < len - 1; i++) {
    answer = Math.max(answer, leftSum[i - 1] + rightSum[i + 1]);
  }
  console.log("prfisum-answer", answer);
  return answer;
}

// solutionPrefixSum([3, 2, 6, -1, 4, 5, -1, 2]);
// solutionPrefixSum([-2, 3, 2, 6, -10, 2, 4, 30, 10]);
// solutionPrefixSum([-2, -5, 2, -3]);
