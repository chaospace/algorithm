/**
 * 펜린드롬 분할
 *
 * ABACABA를 펠린드롬으로 분할하면
 * {A, B, A, C, A, B, A}, {A, BACAB, A}, {ABA, C, ABA}, {ABACABA} 등이 있다.
 * 분할의 개수의 최솟값을 출력하는 프로그램을 작성.
 *
 * -> 즉 주어진 문자열을 펜린드롬으로 나눌 때, 가장 분할을 적은 값을 구하는 문제..
 *    예제 문자열인 ABACABA의 경우는 전체가 펠린드롬이 가능하니 분할없이 1로 가능.
 *
 * ABCD
 *  - 연속된 문자는 펠린드롬을 만들 수 없으니 개별문자인 4로 해야 펠린드롬이 가능..
 *
 * 문자열 길이에 해당하는 이중배열 n*n에 각 문자에 펠린드롬 여부를 체크
 * 단일 문자는 펠린드롬이 기본성립.
 * 이어진 문자는 앞뒤를 비교해 판단가능.
 * 3글자 이상은 서로 떨어진 문자가 같은지 비교하고 직전 이중배열에 펠린드롬 성립여부를 비교해 판단가능.
 * (양끝 문자가 같아도 직전문자에 펠린드롬이 아니라면 무효)
 *
 */

function solution(info) {
  const n = info.length;
  const dp = Array.from({ length: n }, () => Array.from({ length: n }).fill(0));
  //한자리일 경우 펠린드롬 처리
  for (let i = 0; i < n; i++) {
    dp[i][i] = 1;
  }
  //앞뒤가 같을 경우 펜린드롬 처리
  for (let i = 1; i < n; i++) {
    if (info[i] === info[i - 1]) {
      dp[i - 1][i] = 1;
    }
  }

  //3자리 이상의 경우 문자열 사이에 펠린드롬 문자가 있으면 유효처리.
  //ACA의 경우 A[]A는 같고 이전문자 []의 펠린드롬여부를 판단한다.
  for (let i = 2; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      if (info[j] === info[i + j] && dp[j + 1][j + i - 1]) {
        dp[j][j + i] = 1;
      }
    }
  }

  //count
  const count = [];
  for (let i = 0; i < n; i++) {
    //해당 인덱스에 최소값은 맥스로 설정
    count[i] = Number.MAX_SAFE_INTEGER;
    for (let j = 0; j <= i; j++) {
      if (dp[j][i]) {
        //펜린드롬이 발생한 인덱스에 경우 값을 최소값으로 유지.
        //최대값은 문자열 len와 동일해서 의미없음.
        count[i] = Math.min(count[i], (count[j - 1] || 0) + 1);
      }
    }
  }

  for (let y = 0; y < dp.length; y++) {
    for (let x = 0; x < dp[y].length; x++) {
      if (dp[y][x] && Math.abs(x - y) > 1) {
        console.log(info.slice(y, x + 1));
      }
    }
  }
  //   return { dp, count };
}
//"ABACABA"
["ABACABA", "AAAAA", "EAE"].forEach((info) => console.log(solution(info)));
