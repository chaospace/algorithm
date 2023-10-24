/**
 * 선물교환
 * 참가자 끼리 선물을 교환하려한다.
 * 참가자의 수가 주어지면 서로 선물을 교환하는 경우의 수를 구하는 함수 작성
 * - 교환 후 자기 자신의 선물을 받을 경우는 없다.
 * - 항상 다른 다른이의 선물을 받음.
 *
 * 참가자 1명일 경우 0
 * 참가자 2명일 경우 1(서로 교환)
 * 참가자 3명일 경우 2( 1 <-> 2 이 서로 교환하고, 3번은 1, 혹은 2와 교환 )
 * 참가자 4명일 경우 ?
 *  - 참가자 3명이 교환 후 남은 한 명이 세중 하나와 교환
 *      - 3( 4 <-> 1, 2, 3 ) * 2( 참가자 3명의 교환방법 2가지 ) = 6
 *  - 참가자 3명중 2명이 교환 후 한 명은 자신의 선물을 가지고 있는 경우
 *      - 3( 본인 선물을 가진 사람 1, 2, 3중 하나) * 1(교환 할 수 있는 사람 4번 하나) = 3
 *  총 = 9 가지
 */

function solution(N) {
  const dp = Array.from({ length: N + 1 }).fill(0);
  dp[2] = 1;
  // dp[3] = 2;
  for (let i = 3; i <= N; i++) {
    dp[i] = (i - 1) * (dp[i - 2] + dp[i - 1]);
  }
  return dp;
}

[4, 5].forEach((info) => {
  console.log(solution(info));
});