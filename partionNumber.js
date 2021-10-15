/**
 * 재귀 알고리즘 n/m 수분할
 * n을 m 이하의 자연수로만 나타내는 방법.
 *
 * ex )  4/1 수분할은 "1+1+1+1" 한 가지가 있고, 3/2 수분할은 "1+1+1", "2+1" 두 가지
 * (n < m 이면, n/m 수분할은 n/n 수분할과 같다.)
 * 조합은 같은 레벨 & 재귀를 타는 경우 이어붙임.
 *
 * 수분할 공식은
 *  성질1: p(n, 1) = 1, p(n, n ) = 1
 *  성질2: p(n, k) = p(n-k, 1) + p(n-k, 2) + p(n-k, 3) ... p(n-k, k)
 *  성질3: p(n, k) = p(n-1,k-1)+p(n-k, k)
 *  공식 : p(n, k) = p(n-k,1)+p(n-k,2) + .. + p(n-k, k);
 * 여기서 경우의 수를 탐색하며 내용을 보는 거는 실제로 만들어 봐야 한다.
 */

function partitonNumber(n, m) {
  if (n < m) {
    m = n;
  }

  if (n == 0) {
    return 1;
  }

  let count = 0;
  for (let i = 1; i <= m; i++) {
    count += partitonNumber(n - i, i);
  }

  return count;
}

console.log(partitonNumber(5, 5, 0));
