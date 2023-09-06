/**
 * 주어진 타일은 2개로
 * 00, 1
 *
 * N = 1 인 경우는 1만 가능.
 * N = 2 인 경우는 00, 11 만 가능.
 *
 * N = 3 인 경우는 001, 100, 111
 *
 * N = 4 인 경우는 0011, 1100, 1001, 0000, 1111,
 *
 * N = 5 인 경우
 *  1을 5장 : 11111
 *  1을 3장 : 11100, 00111, 10011, 11001,
 *  1을 1장.: 10000, 00001, 00100
 *  5/2 = 몫2 나머지:1
 *
 *
 * N = 6
 * 00 * 3
 * 00 * 2
 * 00 * 1
 * 00 * 0
 * N이 주어졌을 때 만들 수 있는 모든 가짓 수 구하기.
 *
 */

/**
 * 재귀를 통해 조합은 가능하지만 리턴을 통해 결과를 받으려면 어떤 접근이 좋을까?
 * @param {*} n
 */
function backTrackingSolution(n) {
  const results = [];
  const backtracking = (target, history) => {
    if (target <= 0) {
      if (!results.includes(history)) {
        results.push(history);
      }
      return;
    }

    if (target >= 2) {
      backtracking(target - 2, history + "00");
    }
    if (target >= 1) {
      backtracking(target - 1, history + "1");
    }
  };

  backtracking(n, "");
  return results;
}

console.log(backTrackingSolution(5));
