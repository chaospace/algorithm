/**
 

N개의 정수로 구성된 비어 있지 않은 배열 A가 제공됩니다. 
0 ≤ P < Q < N인 한 쌍의 정수(P, Q) 를 배열 A의 슬라이스 라고 합니다.
(슬라이스는 적어도 두 개의 요소를 포함합니다). 
슬라이스(P, Q)의 평균 은 A[P] + A[P + 1] + ... + A[Q]를 슬라이스 길이로 나눈 값입니다.
정확히 말하면 평균은 (A[P] + A[P + 1] + ... + A[Q]) / (Q − P + 1)입니다.

예를 들어 배열 A는 다음과 같습니다.

    A[0] = 4
    A[1] = 2
    A[2] = 2
    A[3] = 5
    A[4] = 1
    A[5] = 5
    A[6] = 8
다음 예제 슬라이스를 포함합니다.

slice(1, 2) : (2 + 2) / 2 = 2
slice(3, 4) : (5 + 1) / 2 = 3
slice(1, 4) : (2 + 2 + 5 + 1) / 4 = 2.5

slice된 평균 값이 가장 slice의 시작 인덱스를 반환.
output : 1 




참고사항
- N은 범위 [ 2 .. 100,000 ] 내의 정수 이고;
- 배열 A의 각 요소는 [ −10,000 .. 10,000 ] 범위 내의 정수 입니다.

** 배열요소합에 평균이 가장 작을 수 있는 경우를 생각해 보자
  - 1 + 1 / 2 = 1;
  - 1 + 1 + 2 / 3 = 1.66666
** 결국 모든 값이 1이 아니라면 배열의 길이가 길어져도 합의 평균은 커지기만 할 뿐 작아질 수 없다.
** 모든 배열의 합을 구하는 것보다 길이를 2~3으로 제한해서 구하는 것이 퍼포먼스를 올리는 방법. 


배열이 커질경우 타임아웃 발생..

4, 2, 2, 5, 1, 5, 8
4, 6, 8, 13, 14, 19, 27
0, 2, 4, 9,  10, 15, 23
0, 0, 2, 7,  8,  13, 21
0, 0, 0, 5,  6,  11, 19
0, 0, 0, 0,  1,   6, 14
0, 0, 0, 0,  0,   5, 13
0, 0, 0, 0,  0,   0, 8


 */

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');
function solution(A) {
  // write your code in JavaScript (Node.js 14)
  const len = A.length;
  let average = Number.MAX_SAFE_INTEGER;
  let begin_index = Number.MAX_SAFE_INTEGER;
  const stack = [];
  const store = {};
  function backtracking(start, current, sum) {
    if (current - start > 1) {
      const avg = sum / (current - start);
      //store[current - start] = avg;
      if (average > avg) {
        average = avg;
        begin_index = start;
        stack.push({ average, begin_index });
      }
    }
    if (current - start >= len) {
      return;
    }
    return backtracking(start, current + 1, sum + A[current]);
  }
  for (let i = 0; i < len; i++) {
    backtracking(i, i + 1, A[i]);
  }
  console.log("stack", stack);
  return begin_index;
}
//solution([4, 2, 2, 5, 1, 5, 8]);

/**
  for문을 이용하는 방식이 복잡하지 않고 명확할 거 같아서 시도했지만 
  역시나 A가 길어지면 타임아웃 발생
 */
function solutionPrefixSum(A) {
  const len = A.length;
  let average = Number.MAX_SAFE_INTEGER;
  let begin_index = Number.MAX_SAFE_INTEGER;
  // 미리 계산을 한다면 어떻게 하는게 좋을까?!
  const sums = [];
  for (let i = 0; i < len - 1; i++) {
    sums.push([]);
  }
  for (let i = 0; i < len - 1; i++) {
    let perfix = A[i];
    for (let j = i + 1; j < len; j++) {
      const divisor = j - i + 1;
      perfix += A[j];
      const avg = perfix / divisor;
      if (average > avg) {
        average = avg;
        begin_index = i;
      }
    }
  }

  return begin_index;
}

//solutionPrefixSum([4, 2, 2, 5, 1, 5, 8]);
/**
4, 2, 2, 5, 1, 5, 8
4, 6, 8, 13, 14, 19, 27
0, 2, 4, 9,  10, 15, 23
0, 0, 2, 7, 8, 13, 21
0, 0, 0, 5, 6, 11, 19
0, 0, 0, 0, 1, 6,  14
0, 0, 0, 0, 0, 5,  13
 * @param {*} A 
 */
function solutionPrefixSum(A) {
  const len = A.length;
  // 초기 합을 구하기
  const prefixSum = [];
  let average = (A[0] + A[1]) / 2;
  let begin = 0;
  for (let i = 0; i < len - 1; i++) {
    let base = A[i];
    for (let j = i + 1; j < len; j++) {
      base += A[j];
      const div = j - i + 1;
      const avg = base / div;

      if (average > avg) {
        console.log(
          "current",
          average,
          "inout",
          avg,
          "start",
          i,
          "base",
          base,
          "div",
          div
        );
        average = avg;
        begin = i;
      }
    }
  }

  console.log("avg", average, "begin", begin);
  return begin;
}
//[4, 4, 2, 5, 1, 5, 8];
//[4, 8, 10, 15, 16, 21, 27]
const input = [4, 4, 2, 1, 1, 5, 1];
// const max = 10000;
// for (let i = 0; i < max; i++) {
//   input.push(max - i + 2);
// }

//solutionPrefixSum(input);
solutionPrefixSum([-3, -5, -8, -4, -10]);
solutionPrefixSum([4, 2, 2, 5, 1, 5, 8]);
//solution([-3, -5, -8, -4, -10]);
