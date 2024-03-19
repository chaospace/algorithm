/**
 * 주어진 수열과 구간정보가 주어질 때
 * 해당 구간의 펠린드롬 여부를 판단해 0, 1을 리턴하는 함수 작성.
 *
 * ex)
 *  1, 2, 1, 3, 1, 2, 1
 *  1, 3 = 1 (펠린드롬)
 *  2, 5 = 0 (아님)
 *  3, 3 = 1 (펠린드롬)
 *  5, 7 = 1 (펠린드롬)
 */

function solution(list, pos) {
  const answer = [];
  while (pos.length) {
    //해당 좌표를 이용해 직접비교처리
    const [begin, end] = pos.shift();
    let isOk = true;
    let s = begin - 1;
    let e = end - 1;
    while (s <= e) {
      if (list[s] === list[e]) {
        s++;
        e--;
      } else {
        isOk = false;
        break;
      }
    }
    answer.push(isOk);
  }
  return answer;
}

function solutionDP(list, pos) {
  const dp = Array.from(list, () => Array.from(list).fill(0));
  const n = list.length;
  //단일 체크
  for (let i = 0; i < n; i++) {
    dp[i][i] = 1;
  }
  //이웃한 숫자 체크
  for (let i = 1; i < n; i++) {
    if (list[i] === list[i - 1]) {
      dp[i - 1][i] = 1;
    }
  }

  //떨어진 문자 체크
  for (let i = 2; i < n; i++) {
    //시작, 종료 인덱스에 문자가 같고 직전문자가 펠린드롬이었다면 펜드르롬 적용.
    for (let j = 0; j <= n - i; j++) {
      if (list[j] === list[j + i] && dp[j + 1][j + i - 1]) {
        dp[j][j + i] = 1;
      }
    }
  }
  const answer = [];
  while (pos.length) {
    const [begin, end] = pos.shift();
    answer.push(dp[begin - 1][end - 1]);
  }
  return answer;
}

[
  {
    list: [1, 2, 1, 3, 1, 2, 1],
    pos: [
      [1, 3],
      [2, 5],
      [3, 3],
      [3, 5],
      [5, 7],
    ],
  },
].forEach(({ list, pos }) => {
  //   console.log(solution(list, pos));
  console.log(solutionDP(list, pos));
});
