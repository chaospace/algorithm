/**
 * 가장 긴 증가하는 부분 수열
 * 수열 A가 주어졌을 때, 가장 긴 증가하는 부분 수열을 구하는 프로그램을 작성하시오.
 * 예를 들어, 수열 A = {10, 20, 10, 30, 20, 50} 인 경우에 가장 긴 증가하는 부분 수열은 A = {10, 20, 30, 50} 이고, 길이는 4이다.
 * 이게 dp?
 */

function solution(list) {
  const dp = [];
  //stack처럼 접근 초기값을 넣고 이것을 기준으로 처리.
  dp[0] = list[0];
  // 길이 만큼 반복
  for (let i = 1; i < list.length; i++) {
    const hasElement = dp.includes(list[i]);
    while (dp.length && !hasElement && dp[dp.length - 1] > list[i]) {
      dp.pop();
    }
    if (hasElement) {
      continue;
    }
    dp.push(list[i]);
  }
  return dp;
}

//dp에 해당 인덱스 앞에 올 수 있는 수가 있으면 해당 인덱스를 저장.
function solutionDP(list) {
  const dp = Array.from(list).fill(0);
  for (let i = 0; i < list.length; i++) {
    const v = list[i];
    // 현재 값보다 작은 수가 이전에 몇 개 있었는지 카운트.
    let count = 0;
    for (let j = 0; j < i; j++) {
      if (list[j] < v) {
        count = Math.max(count, dp[j]);
      }
    }
    dp[i] = count + 1;
  }
  return dp;
}

// source에서 value 이상의 수가 처음으로 나오는 위치를 이진탐색으로 찾아간다.
const lowerBound = (source, value, start = 0, end = source.length) => {
  // 비교 배열이 비어 있으면 무조건 추가
  if (!source.length) return 0;

  // 시작값과 종료값이 동일하면 종료.
  if (end === start) {
    return start;
  }

  const mid = (start + end) >> 1;
  //mid값이 value 값과 같으면
  if (source[mid] < value) {
    return lowerBound(source, value, mid + 1, end);
  } else {
    return lowerBound(source, value, start, mid);
  }
};

function solutionDPAd(list) {
  const stack = [];
  const dp = Array.from(list).fill(0);
  //lower bound처리
  for (let i = 0; i < list.length; i++) {
    const current = lowerBound(stack, list[i]);
    dp[i] = current;
    stack[current] = list[i];
  }
  console.log("dp", dp);
  return stack;
}

//길이 만큼 반복시 속도 문제가 나오면
//dp에 저장된 값보다 큰 값을 찾아서 루프에 인덱스를 조절할 수 있다.

[
  [10, 20, 10, 30, 20, 50],
  [1, 5, 2, 1, 4, 3, 4, 5, 2, 1],
].forEach((list) => {
  console.log(solution(list));
  console.log(solutionDP(list));
  // console.log(solutionDPAd(list));
});

console.log(lowerBound([10, 101], 102));
