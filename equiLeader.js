/**

동등리더 찾기

리더란?
배열 A의 length/2 보다 자주 사용되는 수

ex) 
A = [4, 3, 4, 4, 4, 2]
leader = 4

동등리더란 ?
배열의 slice 0, 1, .... S 와 나머지 S+1, ... N-1 에서
동일한 리더를 가진 배열이 되는 경우

ex) 
A = [4, 3, 4, 4, 4, 2]

0 => (4), (3, 4, 4, 4, 2)
2 => (4, 3, 4), (4, 4, 2)

목표는 동등리더가 이루어지는 count를 반환


N is an integer within the range [1..100,000];
each element of array A is an integer within the range [−1,000,000,000..1,000,000,000].
*/

/**
 * leader의 인덱스를 추출하고
 * 해당 인덱스값이 len/2를 이룰 수 있는 구성으로 slice를 할 수 있는 값이
 * 몇 개나 되는지 반환하면 됨.
 * @param {*} A
 */

function isLeader(count, len) {
  return count > len / 2;
}

function solution(A) {
  const len = A.length;
  let value;
  let valueCount = 0;
  for (let i = 0; i < len; i++) {
    if (valueCount === 0) {
      valueCount = 1;
      value = A[i];
    } else {
      if (A[i] === value) {
        valueCount++;
      } else {
        valueCount--;
      }
    }
  }

  // 조건을 만족하지 못하면 중단
  let candidateCount = 0;
  let candidate = -1;
  if (valueCount > 0) {
    candidate = value;
    for (let i = 0; i < len; i++) {
      if (A[i] === candidate) {
        candidateCount++;
      }
    }
  }

  let count = 0;
  if (candidateCount > len / 2) {
    let equiLeaderCount = 0;
    for (let i = 0; i < len; i++) {
      if (A[i] === candidate) {
        equiLeaderCount++;
      }
      if (
        equiLeaderCount > (i + 1) / 2 &&
        candidateCount - equiLeaderCount > (len - 1 - i) / 2
      ) {
        count++;
      }
    }
  }

  // slice를 통한 equiLeader처리

  return count;
}

// console.log(solution([0]));
// console.log(solution([0, 0]));
// console.log(solution([4, 3, 4, 4, 4, 2]));
//console.log(solution([4, 4, 2, 5, 3, 4, 4, 4]));
//console.log(solution([4, 1, 9, 4, 3, 4, 4, 4]));
// console.log(solution([1, 1, 1, 1, 1, 1, 4, 4, 1, 4, 2]));

function solutionWithMap(A) {
  // write your code in JavaScript (Node.js 14)
  const len = A.length;
  const candidates = {};
  // undefined로 할 경우 배열구성을 [0, 0] 으로 할 경우 에러 발생.
  let candidate = undefined;
  const leaderThreshold = len / 2;
  for (let i = 0; i < len; i++) {
    const key = A[i];
    if (!candidates[key]) candidates[key] = [];
    candidates[key].push(key);
    if (candidates[key].length > leaderThreshold) {
      candidate = key;
    }
  }
  console.log("candidate", candidate, "candidates", candidates);
  const candidateCount = candidate ? candidates[candidate].length : 0;
  let count = 0;
  if (candidateCount > leaderThreshold) {
    let equiLeaderCount = 0;
    for (let i = 0; i < len; i++) {
      if (A[i] === candidate) {
        equiLeaderCount++;
      }
      if (
        equiLeaderCount > (i + 1) / 2 &&
        candidateCount - equiLeaderCount > (len - 1 - i) / 2
      ) {
        count++;
      }
    }
  }

  return count;
}

console.log(solutionWithMap([1, 2]));

function solutionReFactoring(A) {
  // you can write to stdout for debugging purposes, e.g.
  // console.log('this is a debug message');

  // write your code in JavaScript (Node.js 14)
  const len = A.length;
  const candidates = {};
  const leaderLen = len / 2;
  let candidate = Number.MAX_SAFE_INTEGER;
  let candidateCount = -1;
  for (let i = 0; i < len; i++) {
    const key = A[i];
    if (!candidates[key]) candidates[key] = [];
    candidates[key].push(i);
    if (candidates[key].length > leaderLen) {
      candidate = key;
      candidateCount = candidates[key].length;
    }
  }

  let count = 0;

  if (candidateCount) {
    let equiLeaderCount = 0;
    for (let i = 0; i < len; i++) {
      if (A[i] === candidate) {
        equiLeaderCount++;
      }
      if (
        equiLeaderCount > (i + 1) / 2 &&
        candidateCount - equiLeaderCount > (len - i - 1) / 2
      ) {
        count++;
      }
    }
  }

  return count;
}
