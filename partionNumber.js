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
function partitonNumber(n, m, depth, arr = []) {
  // 이게 곧 0 처리
  if (n < m) {
    m = n;
  }
  let count = 0;
  if (n == 0) {
    console.log("arr", arr);
    return 1;
  }
  for (let i = 1; i <= m; i++) {
    arr[depth] = i; // 뎁스에 해당하는 값을 배열에 기억
    // 재귀 발생 시 마다 뎁스값을 증가시켜 전달
    count += partitonNumber(n - i, i, depth + 1, arr);
    // 해당 뎁스 완료 후 값을 0으로 초기화
    // 고정 값 이후는 모두 1로 초기화(이게 없을 경우)
    arr[depth] = 0;
  }
  return count;
}
console.log(partitonNumber(5, 5, 0));
