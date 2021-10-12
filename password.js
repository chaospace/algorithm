/**
 * 0~25만의 수 1개를 입력 받음.
 * 1. 입력값의 제곱근에 1000을 곱,
 * 2. 1의 결과에서 소수점을 버림
 * 3. 2의 결과에서 입력값을 제거
 * 4. 출력
 */

function password(num) {
  return parseInt(Math.sqrt(num) * 1000) - num;
}

console.log(password(125000));
console.log(password(250000));
console.log(password(100000));
console.log(password(2));
