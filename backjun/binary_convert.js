/**
 * 진법변환

B진법 수 N이 주어진다. 이 수를 10진법으로 바꿔 출력하는 프로그램을 작성하시오.
10진법을 넘어가는 진법은 숫자로 표시할 수 없는 자리가 있다. 이런 경우에는 다음과 같이 알파벳 대문자를 사용한다.
A: 10, B: 11, ..., F: 15, ..., Y: 34, Z: 35 

첫째 줄에 N과 B가 주어진다. (2 ≤ B ≤ 36)
B진법 수 N을 10진법으로 바꾸면, 항상 10억보다 작거나 같다.

ex) 
input : ZZZZZ 36 <- 36진법 ZZZZZ를 10진법으로 변환
output: 60466175


진수변환 방법. (2진수에 예)
n밑으로 사용하는 기수법

2진법 2를 밑으로 사용
0%2      =   0
1%2      =   1
2/2 == 1 => 10
2%2 == 0 
자리수마다 진법에 지수가 증가함.
0  <- 0*2^0 = 0
1  <- 1*2^0 = 1
01 <- 
10 <- 
 */
const parser = {};
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
for (let i = 0; i < CHARS.length; i++) {
  parser[CHARS[i]] = 10 + i;
}
function solution(value, unit) {
  let sum = 0;
  const max = value.length;
  for (let i = max - 1, j = 0; i >= 0, j < max; i--, j++) {
    const base = Math.pow(unit, j);
    const num = Number(parser[value[i]] || value[i]);
    if (num >= unit) {
      throw new RangeError(`${num}은 ${unit}진수 범위를 벗어난 값입니다.`);
    }
    sum += num * base;
  }
  return sum;
}

function solutionBackTracking(value, unit) {
  const backtracking = (current, multiplier, pos) => {
    //종료 조건
    if (pos < 0) {
      return current;
    }
    return backtracking(
      current +
        Number(parser[value[pos]] || value[pos]) * Math.pow(unit, multiplier),
      multiplier + 1,
      pos - 1
    );
  };

  return backtracking(0, 0, value.length - 1);
}

//console.log("v", parseInt("zzzzz", 35));
// console.log("v", solution("ZZZZZ", 35));
console.log("parseInt", parseInt("16", 7));
console.log("solution", solution("16", 7));
// console.log("solution", solution("ZZ", 34));
// console.log(parseInt("1000", 2));
// console.log(solutionBackTracking("1000", 2));
// console.log(Math.pow(2, 3), Math.pow(2, 0));
