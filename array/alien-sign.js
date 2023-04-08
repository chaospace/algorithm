/**
 * 외계인 신호 배열
 *
 * 두 수 K, C를 받아 정해진 규칙대로 증가하는 수를 C개 만들고 이 수 중 K에 대한 부분수열이 발생하는 경우의 수 반환
 *
 * 수 생성 규칙
 * A[0] = 1983
 * A[i] = A[i-1] * ( 214013 + 2531011) % 2^32
 * ex)
 *
 */

function solution(K, C) {
  const arr = [1983];
  const modulo = Math.pow(2, 32);
  const a = (426918790 * 214013 + 2531011) % modulo;

  for (let i = 1; i < C; i++) {
    arr[i] = (arr[i - 1] * 214013 + 2531011) % modulo;
  }

  for (let i = 0; i < C; i++) {
    arr[i] = (arr[i] % 10000) + 1;
  }
  console.log("arr", arr);
  let count = 0;
  for (let i = 0; i < C; i++) {
    let sum = 0;
    for (let j = i; j < C; j++) {
      sum += arr[j];
      if (sum === K) {
        count++;
      }
      if (sum >= K) {
        break;
      }
    }
  }
  console.log("count", count);
}

solution(8791, 20);
//solution(5265, 5000);
