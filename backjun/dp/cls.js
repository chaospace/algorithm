/**
 * 공통 부분 문자열
 * 어떤 문자열 s의 부분 문자열 t란, s에 t가 연속으로 나타나는 것을 말한다.
 * 예를 들어, 문자열 ABRACADABRA의 부분 문자열은 ABRA, RAC, D, ACADABRA, ABRACADABRA, 빈 문자열 등이다.
 * 하지만, ABRC, RAA, BA, K는 부분 문자열이 아니다.
 * 두 문자열 ABRACADABRA와 ECADADABRBCRDARA의 공통 부분 문자열은
 * CA, CADA, ADABR, 빈 문자열 등이 있다.
 * 이 중에서 가장 긴 공통 부분 문자열은 ADABR이며, 길이는 5이다.
 *
 * 또, 두 문자열이 UPWJCIRUCAXIIRGL와 SBQNYBSBZDFNEV인 경우에는 가장 긴 공통 부분 문자열은 빈 문자열이다.
 *
 * 입력
 * 첫째 줄과 둘째 줄에 문자열이 주어진다. 문자열은 대문자로 구성되어 있으며, 길이는 1 이상 4000 이하이다.
 *
 * 출력
 * 첫째 줄에 두 문자열에 모두 포함 된 부분 문자열 중 가장 긴 것의 길이를 출력한다.
 */

function solution({ a, b }) {
  const answer = [];
  const aLen = a.length;
  const bLen = b.length;
  /*
  for (let i = 0; i < aLen; i++) {
    let idx = i + 1;
    while (b.includes(a.substring(i, idx)) && idx <= aLen) {
      idx++;
    }
    if (idx !== i + 1) {
      answer.push(a.substring(i, idx - 1));
    }
  }
  */

  const dp = Array.from({ length: aLen + 1 }, () =>
    Array.from({ length: bLen + 1 }).fill(0)
  );
  let max_len = 0;
  for (let i = 0; i <= aLen; i++) {
    for (let j = 0; j <= bLen; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 0;
      } else if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        max_len = Math.max(max_len, dp[i][j]);
      }
    }
  }

  return { max_len, answer, dp: JSON.stringify(dp) };
}

[
  {
    a: "ABRACADABRA",
    b: "ECADADABRBCRDARA",
    o: 5,
  },
  {
    a: "UPWJCIRUCAXIIRGL",
    b: "SBQNYBSBZDFNEV",
    o: 0,
  },
].forEach((info) => {
  console.log(solution(info));
});
