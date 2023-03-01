/**
 세 개의 정수 A, B 및 K가 주어지면 범위 [A..B]에서 K로 나눌 수 있는 정수의 수를 반환합니다. 즉:

{ i : A ≤ i ≤ B, i  mod  K = 0 }

예를 들어, A = 6, B = 11 및 K = 2인 경우 함수는 3을 반환해야 합니다.
범위 [6..11] 내에서 2로 나눌 수 있는 세 개의 숫자, 즉 6, 8 및 10이 있기 때문입니다.

다음 가정에 대한 효율적인 알고리즘을 작성 하십시오.

A와 B는 [ 0 .. 2,000,000,000 ] 범위 내의 정수입니다 .
K는 범위 [ 1 .. 2,000,000,000 ] 내의 정수 이고;
A ≤ B.
 */
function solution(A, B, K) {
  const b_quotient = Math.floor(B / K);
  const a_quotient = Math.floor(A / K);
  const a_rest = A % K;
  let count = b_quotient - a_quotient;
  if (a_rest === 0) {
    count += 1;
  }

  return count;
}

solution(3, 10, 2);
solution(4, 20, 5);
solution(4, 30, 1);
