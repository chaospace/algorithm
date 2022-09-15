function lcs(x, y, m, n) {
  // 마지막일 경우
  if (m === 0 || n === 0) {
    return 0;
    // 마지막 문자가 같을 경우
  } else if (x[m - 1] === y[n - 1]) {
    return 1 + lcs(x, y, m - 1, n - 1);
  } else {
    // 문자열의 길이가 다른것을 고려해 문자열 마다 조건을 다르게 해서 호출
    return Math.max(lcs(x, y, m, n - 1), lcs(x, y, m - 1, n));
  }
}

const a = "AGGTAB";
const b = "GXTXAYB";
console.log(lcs(a, b, a.length, b.length));
/**
 * 동적 계획법을 이용해 해당 인덱스 정보를 map에 기억함.
 * 배열을 순회하며 값을 가져오기 때문에 이전 값을 맵에 기억해두면
 * 다음 차례에 기억된 정보를 토대로 해당 인덱스 정보를 구성할 수 있음.
 * @param {*} x
 * @param {*} y
 * @returns
 */
function lcsWithMap(x, y) {
  const m = x.length;
  const n = y.length;

  const map = [];
  for (let i = 0; i <= m; i++) {
    map[i] = [];
  }
  // 배열에 첫 값은 0으로 채우기 때문에 j<= 으로 루핑
  for (let j = 0; j <= n; j++) {
    for (i = 0; i <= m; i++) {
      if (i == 0 || j == 0) {
        map[i][j] = 0;
      } else if (x[i - 1] === y[j - 1]) {
        map[i][j] = map[i - 1][j - 1] + 1;
      } else {
        map[i][j] = Math.max(map[i - 1][j], map[i][j - 1]);
      }
    }
  }
  console.log(map);
  console.log("mn", m, n);
  return map[m][n];
}

console.log(lcsWithMap(a, b, a.length, b.length));
