/**
 * 계단수 구하기
 * 정의 :  인접한 모든 수에 차이가 1인 수.
 *
 * 예   : 45656는 5자리의 계단 수
 *
 *
 * N이 주어질 때, 길이가 N인 계단 수가 총 몇 개 있는지 구해보자.
 * 0으로 시작하는 수는 계단수가 아니다.
 */

/**
 * n = 1 일 경우
 * 0, 1, 2, 3, 4, 5, 6, 7, 8, 9  한 자리는 0을 제외한 모두가 계단수라 가정.
 * n = 2 일 경우
 * 작아지는 경우, 10, 21, 32, 43, 54, 65, 76, 87, 98 : 9개
 * 커지는 경우 ,  12, 23, 34, 45, 56, 67, 78, 89 : 7개
 *
 * 초기 1자리는 0을 제외한 9개가 존재하며
 * 자리 수가 커질 수록 끝자리 1~8 앞뒤로 2개
 *  0   => 0
 *  1   => 10, 12,
 *  2   => 21, 23,
 *  3   => 32, 34,
 *  4   => 43, 45,
 *  5   => 54, 56,
 *  6   => 65, 67,
 *  7   => 76, 78,
 *  8   => 87, 89,
 *  9   => 98
 *
 *
 * n = 3
 *
 * 0 : 101, 121
 * 1 : 210, 212, 232,
 * 2 : 121, 321, 123, 323
 * 3 : 234, 454
 * @param {*} n
 */
function solution(n) {
  const cols = 10;
  const store = Array.from({ length: n + 1 }, () =>
    Array.from({ length: cols }).fill(0)
  );

  for (let i = 1; i < cols; i++) {
    store[1][i] = 1;
  }

  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < cols; j++) {
      if (j === 0) {
        store[i][j] = store[i - 1][j + 1];
      } else if (j === 9) {
        store[i][j] = store[i - 1][j - 1];
      } else {
        store[i][j] = store[i - 1][j - 1] + store[i - 1][j + 1];
      }
    }
  }
  return store[n].reduce((c, v) => c + v, 0) % 1000000000;
}

/**
 * 등차수열의 일반항
 * a(n) = 3+2(n-1)
 * n:1  = 3+2*0 = 3;
 * n:2  = 3+2*1 = 5;
 * n:3  = 3+2*2 = 7;
 * 실제 조합을 만드는 함수를 만든다면 어떻게 될까.
 * 5+x*9=59
 * 9x=9
 * @param {} n
 */
function solutionHistory(n) {
  const cols = 10;
  const store = [];
  //10
  const begin = Math.pow(cols, n - 1);
  const end = Math.pow(cols, n);
  // console.log("n", n, begin, end, "store", store);
  //1씩 차이나는 자리 수  만들기
  for (let i = begin; i < end; i++) {
    if (n <= 1) {
      store.push(i);
    } else {
      let strNum = i.toString();
      let isStair = true;
      // console.log("strNum", strNum);
      for (let j = 0; j < strNum.length && isStair; j++) {
        if (j === 0) {
          isStair = Math.abs(strNum[j] - strNum[j + 1]) === 1;
        } else if (j === strNum.length - 1) {
          isStair = Math.abs(strNum[j] - strNum[j - 1]) === 1;
        } else {
          isStair =
            Math.abs(strNum[j] - strNum[j - 1]) === 1 &&
            Math.abs(strNum[j] - strNum[j + 1]) === 1;
        }
      }
      if (isStair) {
        store.push(i);
      }
    }
  }
  return store.length;
}

[1, 2, 3].forEach((n) => {
  console.log(`n: ${n}`, solution(n));
  console.log("len: ", solutionHistory(n));
});
