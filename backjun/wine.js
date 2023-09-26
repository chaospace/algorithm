/**
 * 포도주 시식회
 * 1. 포도주 잔을 선택하면 그 잔에 들어있는 포도주는 모두 마신 후 원 위치에 놓아야 한다.
 * 2. 연속으로 놓여 있는 3잔을 모두 마실 수는 없다. // 연속 세 잔은 안된다.
 *
 * 될 수 있는 대로 많은 양의 포도주를 맛보기 위해서 어떤 포도주 잔을 선택해야 할지 고민.
 * n개의 포도주 잔이 순서대로 테이블에 놓여 있고, 각 포도주 잔에 들어있는 포도주의 양이 주어졌을 때,
 * 가장 많은 양의 포도주를 마실 수 있도록 하는 프로그램을 작성.
 *
 * dp 문제는 기준을 항상 현재로 가정하고 점화식을 찾는게 포인트!
 */

/**
 *
 * @param {*} list
 * @returns
 */
//스킵을 현재 기준이 아니라 지문대로만 했음..
function solution(list) {
  dp = Array.from({ length: list.length }, () => Array.from(list).fill(0));
  for (let i = 0; i < dp.length; i++) {
    for (let j = i; j < list.length; j++) {
      //2가 되면 귾어서 처리해야 된다.
      if (j - i === 0) {
        //초기값이 0이면 일단 적용.
        dp[i][j] = list[j];
        //3의 배수면 스킵
      } else if ((j - i + 1) % 3 === 0) {
        dp[i][j] = dp[i][j - 1];
      } else {
        //이전 값에 연속해서 더함.
        dp[i][j] = dp[i][j - 1] + list[j];
      }
    }
  }
  return dp;
}

/**
 * dp에 이전에 마신 와인에 양을 더 한 값을 기억해둔다.
 * 연속 3잔을 마실 수 없다는 것은
 * 현재 잔을 기준으로
 *  1. 이전 잔을 마실 경우 n-1을 체크 dp[n-3] + array[n-1]+array[n];
 *  2. 이전 잔을 안 마실 경우 n-1을 무시 dp[n-2] + array[n];
 * @param {*} list
 * @returns
 */
function solutionAd(list) {
  const dp = Array.from(list, () => 0);
  dp[0] = list[0];
  dp[1] = dp[0] + list[1];

  for (let j = 2; j < list.length; j++) {
    // 이전 잔을 마신것과 아닌 것중 더 큰 값을 취함.
    dp[j] = Math.max(
      (dp[j - 3] || 0) + list[j - 1] + list[j],
      dp[j - 2] + list[j]
    );
    //이전 보다 작은 값이 오는 것을 방지.
    dp[j] = Math.max(dp[j], dp[j - 1]);
  }
  return dp;
}

//스킵은 연속해서 3잔 이상 가능?
[
  [6, 10, 13, 9, 8, 1],
  // [1, 10, 100, 9, 8, 3, 20, 10],
  // [100, 400, 2, 1, 2, 4, 200],
].forEach((list) => {
  // console.log(solution(list));
  console.log(solutionAd(list));
});
//6, 16, 23,28,
//6, 10, 13, 9, 8, 1
