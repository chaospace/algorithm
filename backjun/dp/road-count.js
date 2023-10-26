/**
 * 도로의 개수
 * 세준이가 살고 있는 도시는 신기하게 생겼다.
 * 이 도시는 격자형태로 생겼고, 직사각형이다.
 * 도시의 가로 크기는 N이고, 세로 크기는 M이다. 또, 세준이의 집은 (0, 0)에 있고, 세준이의 학교는 (N, M)에 있다.
 *
 * 세준이는 항상 최단거리로만 가기 때문에, 항상 도로를 정확하게 N + M개 거친다.
 * (0, 0)에서 (N, M)까지 가는 서로 다른 경로의 경우의 수를 구하는 함수를 작성.
 *
 * 입력
 * 첫째 줄에 도로의 가로 크기 N과 세로 크기 M이 주어진다.
 * N과 M은 100보다 작거나 같은 자연수이고,
 *
 * 둘째 줄에는 공사중인 도로의 개수 K가 주어진다.
 * K는 0보다 크거나 같고, 50보다 작거나 같은 자연수이다.
 *
 * 셋째 줄부터 K개 줄에는 공사중인 도로의 정보가 a b c d와 같이 주어진다.
 * a와 c는 0보다 크거나 같고, N보다 작거나 같은 자연수이고,
 * b와 d는 0보다 크거나 같고, M보다 작거나 같은 자연수이다.
 * 그리고, (a, b)와 (c, d)의 거리는 항상 1이다
 *
 * 출력
 * 첫째 줄에 (0, 0)에서 (N, M)까지 가는 경우의 수를 출력한다.
 * 이 값은 0보다 크거나 같고, 2^63-1보다 작거나 같은 자연수이다.
 */

const BigNumber = require("bignumber.js");

function solution({ N, M, K }) {
  const dp = Array.from({ length: M + 1 }, () =>
    Array.from({ length: N + 1 }).fill(Number.MAX_SAFE_INTEGER)
  );

  //시작값은 0을 설정
  dp[0][0] = 1;

  for (let i = 0; i < K.length; i++) {
    let [x1, y1, x2, y2] = K[i];
    let temp;
    if (x1 > x2) {
      temp = x2;
      x2 = x1;
      x1 = temp;
    } else if (y1 > y2) {
      temp = y2;
      y2 = y1;
      y1 = temp;
    }
    if (x1 === 0 && y1 === 0) {
      dp[y2][x2] = 0;
    } else {
      dp[y1][x1] = 0;
    }
  }

  for (let i = 1; i <= N; i++) {
    if (dp[0][i] !== 0) {
      dp[0][i] = dp[0][i - 1] === 0 ? dp[0][i - 1] : 1;
    }
  }
  for (let i = 1; i <= M; i++) {
    if (dp[i][0] !== 0) {
      dp[i][0] = dp[i - 1][0] === 0 ? dp[i - 1][0] : 1;
    }
  }

  for (let y = 1; y <= M; y++) {
    for (let x = 1; x <= N; x++) {
      let repaireTop = false;
      let repaireRight = false;
      K.forEach(([x1, y1, x2, y2]) => {
        if (
          x1 !== x2 &&
          (x1 === x - 1 || x2 === x - 1) &&
          (y === y1 || y === y2)
        ) {
          repaireRight = true;
        } else if (
          y1 !== y2 &&
          (y - 1 === y1 || y2 === y - 1) &&
          (x === x1 || x === x2)
        ) {
          repaireTop = true;
        }
      });
      // 시작일 경우는 값을 채운다.
      if (!repaireRight && !repaireTop) {
        dp[y][x] = dp[y - 1][x] + dp[y][x - 1];
      } else if (repaireRight) {
        dp[y][x] = dp[y - 1][x];
      } else if (repaireTop) {
        dp[y][x] = dp[y][x - 1];
      }
    }
  }

  return { dp, answer: Math.min(dp[M][N], Math.pow(2, 63) - 1) };
}

function solutionB({ N, M, K }) {
  const dp = Array.from({ length: M + 1 }, () =>
    Array.from({ length: N + 1 }).fill(0)
  );
  //포인트만 찍어 놓으면 가로,세로를 구분할 수  없다.
  const h_repaire_point = JSON.parse(JSON.stringify(dp));
  const v_repaire_point = JSON.parse(JSON.stringify(dp));

  K.forEach(([x1, y1, x2, y2]) => {
    // x좌표가 동일하면 세로 도로를 수리중
    if (x1 === x2) {
      v_repaire_point[y1][x1] = 1;
      v_repaire_point[y2][x1] = 1;
    } else if (y1 === y2) {
      h_repaire_point[y1][x1] = 1;
      h_repaire_point[y1][x2] = 1;
    }
  });

  for (let i = 1; i <= M; i++) {
    if (v_repaire_point[i][0] === 1) break;
    dp[i][0] = 1;
  }
  for (let i = 1; i <= N; i++) {
    if (h_repaire_point[0][i] === 1) break;
    dp[0][i] = 1;
  }

  for (let y = 1; y <= M; y++) {
    for (let x = 1; x <= N; x++) {
      const base =
        h_repaire_point[y - 1][x - 1] ||
        v_repaire_point[y - 1][x - 1] ||
        v_repaire_point[y][x] ||
        h_repaire_point[y][x];
      const repaireTop =
        base && (h_repaire_point[y - 1][x] || v_repaire_point[y - 1][x]);

      const repaireRight =
        base && (v_repaire_point[y][x - 1] || h_repaire_point[y][x - 1]);

      if (!repaireRight && !repaireTop) {
        dp[y][x] = dp[y][x - 1] + dp[y - 1][x];
      } else if (repaireRight && !repaireTop) {
        dp[y][x] = dp[y - 1][x];
      } else if (repaireTop && !repaireRight) {
        dp[y][x] = dp[y][x - 1];
      }
    }
  }

  return { answer: dp[M][N] };
}

[
  {
    N: 6,
    M: 6,
    K: [
      [0, 0, 0, 1],
      [6, 6, 5, 6],
    ],
    o: 252,
  },
  {
    N: 6,
    M: 6,
    K: [],
    o: 2,
  },
  {
    N: 2,
    M: 2,
    K: [
      [0, 0, 1, 0],
      [1, 2, 2, 2],
      [1, 1, 2, 1],
    ],
    o: 0,
  },
  // {
  //   N: 35,
  //   M: 31,
  //   K: [],
  //   o: 6406484391866534976,
  // },
].forEach((info) => {
  // console.log(solution(info));
  console.log(solutionB(info));
});
// 값이 커지면 js숫자 버그인지 정확한 값이 안나옴.
// BigInt사용 시 조금 더 정확해짐.
