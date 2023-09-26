/**
 * 동물원에 사자를 우리에 넣을 수 있는 경우의 수를 반환
 *
 * 조건:
 *  - 우리는 2*n 사이즈로 구성.
 *  - 사자는 우리에 가로, 세로로 붙어 있을 수 없다.
 *
 * 반환
 *  - 배치 수를 9901로 나눈 나머지를 반환.
 *  dir =[
 *  [1, 1],
 *  [-1, -1]
 * ]
 *
 * 우리 사이즈 0
 * 00                <- 1가지
 * 우리 사이즈 1*2
 * 01, 10, 00(빈 경우) <- 3가지
 *
 *
 * 우리 사이즈 2*2      총 7가지
 *
 * 0마리 배치        <- 1가지
 * 00
 * 00
 * 1마리 배치
 * 01  10  00  00  <- 4가지
 * 00, 00, 10, 01
 *
 * 2마리 배치         <- 2가지
 * 10  01
 * 01, 10
 *
 */

const moduler = 9901;
function solution(size) {
  const dp = Array.from({ length: Math.max(2, size + 1) }, () => 0);
  dp[0] = 1;
  dp[1] = 2 + dp[0];
  for (let i = 2; i <= size; i++) {
    dp[i] = dp[i - 1] * 2 + dp[i - 2];
  }
  return dp[size] % moduler;
}

function solutionBottomUp(size) {
  const dp = Array.from({ length: Math.max(2, size + 1) }, () =>
    Array.from({ length: 3 }).fill(0)
  );
  //둘다 없는 상태
  dp[1][0] = 1;
  //왼쪽에 있는 상태
  dp[1][1] = 1;
  //오른쪽에 있는 상태
  dp[1][2] = 1;
  for (let i = 2; i <= size; i++) {
    dp[i][0] = (dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2]) % moduler;
    dp[i][1] = (dp[i - 1][0] + dp[i - 1][2]) % moduler;
    dp[i][2] = (dp[i - 1][0] + dp[i - 1][1]) % moduler;
  }
  return dp;
}

[1, 2, 3, 4].forEach((n) => {
  console.log(solution(n));
  console.log(solutionBottomUp(n));
});
