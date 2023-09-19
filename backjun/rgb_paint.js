/**
 * rgb 컬러 중 각기 다른 색으로 주어진 집을 칠하는 최소 비용 구하기
 *
 * input:
 * r:[26, 40, 83]
 * g:[49, 60, 57]
 * b:[13, 89, 99]
 * 각 색으로 칠하는 비용이 주어질 경우
 * 서로 다른 색으로 칠하기 위한 최소 비용 구하기
 *
 * 조합 중 최소합을 찾으면 되는 문제. 이게 dp?
 */

//기준보다 작은 값을 찾아야 한다.
const getMinValueIndex = (source) => {
  let m = Number.MAX_SAFE_INTEGER;
  source.forEach((v) => {
    if (v < m) {
      m = v;
    }
  });
  return source.indexOf(m);
};

const provider = [0, 1, 2];
const compose = (current, end, limit, store) => {
  if (end === 0) {
    store.push(current);
    return;
  }

  for (let i = 0; i < provider.length; i++) {
    if (current.length && current[current.length - 1] === i) {
      continue;
    }
    current.push(i);
    compose([...current], end - 1, limit, store);
    current.pop();
  }
};

/**
 * 제약 : 이웃한 집은 서로 컬러가 달라야 한다. 즉 퐁당퐁당으로 컬러 구성은 가능하지만 동일한 컬러는 안됨.
 * 대상이 되는 값은 rgb로 최대 012 셋 중에하나 즉 n의 자릿수로 구성할 수 있는 012조합을 구한 후
 * 그 중에서 가질 수 있는 최소값을 찾으면 된다.
 * 조합에 조건에는 이웃한 수는 서로 같을 수 없다.
 * @param {*} list 각 집을 색별로 칠하는 비용 [r, g, b] 이 집에 수  많큼 전달 (이중 배열)
 */
function solution(list) {
  const combination = [];
  const n = list.length;
  //조합을 하지만 이웃한 수가 서로 같으면 제외시킨다.
  compose([], n, n, combination);
  let min_value = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < combination.length; i++) {
    b = combination[i];
    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += list[i][b[i]];
    }
    min_value = Math.min(min_value, sum);
  }

  return min_value;
}

/**
 * 단순합 값을 찾을 경우
 * 서로 다른 색을 칠해야 하므로
 * r은 이전 g,b의 합에서 작은 것과 현재 r을 더하기
 * g는 이전 r, b 의 합에서 작은 것과 현재 g를 더하기
 * b는 이전 r, g의 합에서 작은 것과 현재 b를 더하기
 *
 * 마지막 dp에서 가장 작은 값을 가져오기.
 * @param {*} list
 * @returns
 */
function solutionDP(list) {
  const n = list.length;
  const dp = Array.from({ length: n + 1 }, () =>
    Array.from({ length: 3 }).fill(0)
  );

  //dp를 통해 주변 값과 더한 값을 구하기.
  for (let i = 1; i < dp.length; i++) {
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + list[i - 1][0];
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + list[i - 1][1];
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + list[i - 1][2];
  }

  return Math.min(dp[n][2], Math.min(dp[n][0], dp[n][1]));
}

/**
N번 집의 색은 N-1번 집의 색과 같지 않아야 한다.

1 100 100
100 1 100
100 100 1

1 100 100
100 100 100
1 100 100

//탐욕법식 접근인데 현재 베스트가 미래에도 베스트라는 가정.
30 19 5    : 5
64 77 64   : 64   69
15 19 97   : 19   88
4 71 57    : 4    92
90 86 84   : 84   176
93 32 91   : 32   208

20, 40, 21
2, 100, 20,
19, 30, 20
//다 조합하는데 조건에 부합하면 그냥 갱신하는게 좋을 듯.
 */
[
  [
    [26, 40, 83],
    [49, 60, 57],
    [13, 89, 99],
  ],
  [
    [1, 100, 100],
    [100, 100, 100],
    [1, 100, 100],
  ],
  [
    [1, 100, 100],
    [100, 1, 100],
    [100, 100, 1],
  ],
  [
    [30, 19, 5],
    [64, 77, 64],
    [15, 19, 97],
    [4, 71, 57],
    [90, 86, 84],
    [93, 32, 91],
  ],
].forEach((cost, i) => {
  // console.log(solution(cost));
  console.log(solutionDP(cost));
});
