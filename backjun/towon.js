/**
 * 1로 만들기
 *
 * 정수 x에 사용할 수 있는 연산을 사용해 1로 만드는 최소 연산의 횟수를 출력
 * 사용가능 연산
 *  - x를 3로 나누어 떨어지면 3로 나눔.
 *  - x를 2로 나누어 떨어지면 2로 나눔.
 *  - 1을 뺀다.
 * 최소 연산을 찾는 방법으로 bfs를 이용하면 될듯.
 */

// queue를 이용한 방식은 큰 수가 올때 시간이 오래 걸림.
function solution(n) {
  const queue = [[n, []]];
  while (queue.length) {
    const [value, history] = queue.shift();
    if (value === 0) {
      return { len: history.length - 1, elements: history };
    } else {
      const threeDiv = value % 3;
      threeDiv === 0 && queue.push([value / 3, [...history, value]]);

      const twoDiv = value % 2;
      twoDiv === 0 && queue.push([value / 2, [...history, value]]);

      (threeDiv === 1 || twoDiv === 1) &&
        queue.push([value - 1, [...history, value]]);
    }
  }
  return -1;
}

function solutionDP(n) {
  const dp = [];
  const history = [];
  //초기값
  dp[1] = 0;
  history[1] = 0;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + 1;
    history[i] = i - 1;
    if (i % 2 === 0) {
      if (dp[i] > dp[i / 2] + 1) {
        history[i] = i / 2;
      }
      dp[i] = Math.min(dp[i], dp[i / 2] + 1);
    }
    if (i % 3 === 0) {
      if (dp[i] > dp[i / 3] + 1) {
        history[i] = i / 3;
      }
      dp[i] = Math.min(dp[i], dp[i / 3] + 1);
    }
  }

  //히스토리 추적..
  let a = n;
  let path = "";
  while (a > 0) {
    path += a + " ";
    a = history[a];
  }
  return { n: dp[n], history };
}

[2, 10].forEach((n) => {
  // console.log(solution(n));
  console.log(solutionDP(n));
});
