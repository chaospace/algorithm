/**
 * 이항계수 구하기
 * 조합이랑 동일
 *
 * (a+b)^n = a^(n-r)*b^r
 *
 * 자연수 N과 K가 주어질 때 이항계수 구하기
 *
 * 1<=N<=10, 0<=k<=N
 * 조합의 수는 결국 파스칼 삼각형의 원리를 적용하면 배열을 통해 결과를 쉽게 알 수 있음.
 */

function solution(n, k) {
  const store = Array.from({ length: n + 1 }, () =>
    Array.from({ length: n + 1 }).fill(0)
  );

  //기본값 설정
  for (let i = 0; i <= n; i++) {
    store[i][0] = 1;
    store[i][i] = 1;
    store[i][1] = i;
  }

  //파스칼 삼각형을 이용한 조합 적용
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      store[i][j] = store[i - 1][j - 1] + store[i - 1][j];
    }
  }

  let fn = 1;
  for (let i = n; i > n - k; i--) {
    fn *= i;
  }

  let fk = 1;
  for (i = 1; i <= k; i++) {
    fk *= i;
  }

  return store[n][k];
}

[
  [5, 2],
  [10, 3],
].forEach(([n, k]) => {
  console.log(solution(n, k));
});
