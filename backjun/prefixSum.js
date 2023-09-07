/**
 * 연속합.
 * n개의 정수로 이루어진 임의의 수열이 주어진다.
 * 우리는 이 중 연속된 몇 개의 수를 선택해서 구할 수 있는 합 중 가장 큰 합을 구하려고 한다.
 *
 * ex)
 * input: 10, -4, 3, 1, 5, 6, -35, 12, 21, -1
 * output:12+31 = 33
 *
 * 특정 구간에 합이 최대가 되는 곳을 구하면 된다.
 * 구간 합 처리 시 0보다 작은 값은 버리고 사용.
 * ex)
 *  값 : -4, 3, -6, 1
 *  합 : -4, 3, -3, 1
 *  -4 + 3 구간에서 0보다 작은 -4를 버리고 그냥 3을 최대값으로 사용.
 */
const sumBetterThan = (list) => {
  return list.reduce((c, v) => {
    if (c < c + v) {
      return c + v;
    }
    return c;
  }, 0);
};

//모든 구간 합에서 큰 값을 체크
function solution(list) {
  const max = list.length;
  const answer = [];
  let max_sum = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < max; i++) {
    let sum = [list[i]];
    max_sum = Math.max(max_sum, sum[sum.length - 1]);
    for (let j = i + 1; j < max; j++) {
      max_sum = Math.max(max_sum, sum[sum.length - 1] + list[j]);
      sum = [...sum, sum[sum.length - 1] + list[j]];
    }
    answer.push(sum);
  }
  return max_sum;
}

function solutionBruteForceAd(list) {
  const max = list.length;
  let best = Number.NEGATIVE_INFINITY;
  let sum = 0;
  for (let i = 0; i < max; i++) {
    sum = Math.max(sum, 0) + list[i];
    if (sum > best) {
      best = sum;
    }
  }
  return best;
}

function solutionWithPointer(list) {
  let l = 0;
  let sum = 0;
  let best = Number.NEGATIVE_INFINITY;
  while (l < list.length) {
    //sum = Math.max(sum, 0) + list[l];
    sum += list[l];
    if (sum < list[l]) sum = list[l];
    if (sum > best) {
      best = sum;
    }
    l++;
  }
  console.log("sum", sum, best);
  return best;
}

// 재귀를 통한 접근
function solutionBackTracking(list) {
  const backTracking = (sum, idx, max_value) => {
    //종료 조건
    if (idx >= list.length) {
      return max_value;
    }
    const next = Math.max(sum, 0) + list[idx];
    return backTracking(next, idx + 1, Math.max(next, max_value));
  };
  return backTracking(0, 0, Number.NEGATIVE_INFINITY);
}

// 구간합을 미리 구하고 거기서 가장 큰 값을 추출.
function solutionDP(list) {
  let best = Number.NEGATIVE_INFINITY;
  const pAnswer = [];
  // 전체의 부분합 구하기
  for (let i = 0; i < list.length; i++) {
    pAnswer[i] = Math.max(pAnswer[i - 1] || 0, 0) + list[i];
    best = Math.max(best, pAnswer[i]);
  }
  //전체 부분 합에서 원소값을 제거하며 원소별 부분합 추출
  return best;
}

/**
 *
 * 비고 -1, -2, -3, -4, -5
 * -1  -1, -3, -6,-10,-15
 * -2      -2, -5, -9,-14
 * -3          -3, -7,-12
 * -4              -4, -9
 * -5                  -5
 *
 */
[
  [10, -4, 3, 1, 5, 6, -35, 12, 21, -1],
  [2, 1, -4, 3, 4, -4, 6, 5, -5, 1],
  // [-1, -2, -3, -4, -5],
].forEach((list) => {
  // console.log(solution(list));
  // console.log(solutionBackTracking(list));
  // console.log(solutionBruteForceAd(list));
  // console.log(solutionDP(list));
  console.log(solutionWithPointer(list));
});
