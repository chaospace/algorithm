/**
 * 32비트 정수 x를 반전해서 리턴
 * 반전한 값이 32비트 정수 범위를 넘어가면 0을 리턴
 *
 * input 123 => 321
 *
 * input -123 => -321
 *
 * input 120 => 21
 *
 */

const max = Math.pow(2, 31) - 1;
const min = (max + 1) * -1;
console.log(max, "min", min);
function solution(x) {
  const modifier = x < 0 ? -1 : 1;
  let rx = Math.abs(x).toString().split("").reverse().join("");
  rx *= modifier;

  if (rx > max || rx < min) {
    rx = 0;
  }

  return rx;
}

console.log(solution(120));
