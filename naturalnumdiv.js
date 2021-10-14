/**
 * 재귀 알고리즘 n/m 수분할
 * n을 m 이하의 자연수로만 나타내는 방법.
 *
 * ex )  4/1 수분할은 "1+1+1+1" 한 가지가 있고, 3/2 수분할은 "1+1+1", "2+1" 두 가지
 * (n < m 이면, n/m 수분할은 n/n 수분할과 같다.)
 *
 */

function partitonNumber(n, m, depth = 0) {
  let msg = ">".padStart(depth, "*");
  console.log("뎁스", msg, "n", n, "m", m);
  if (n < m) {
    m = n;
  }
  ++depth;
  if (n == 0) {
    return 1;
  }
  let count = 0;
  for (let i = 1; i <= m; i++) {
    let mm = partitonNumber(n - i, i, depth);
    count += mm;
  }
  return count;
}

console.log(partitonNumber(8, 3));
