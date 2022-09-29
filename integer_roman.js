/**
인풋을 로마숫자로 변경하기

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

ex)
input -> 2
output -> II

input   -> 12
output  -> XII

input   -> 27
output  -> XX+V+II

일반적으로 로마자는 왼쪽->오른쪽으로 값을 키워 가지만 4는 반대로 구성
4 : VI -> 즉 5에서 1을 제거
9 : XI -> 10에서 1을 제거

역으로 구성되는 경우
4, 9   -> IV, IX,
40, 90 -> XL, XC,
400, 900 -> CD, CM


4와 9는 역으로 계산
나머지는 큰수에서 작은 수를 나열해 구성
 */
/**
 * input을 로마자로 변경하기
 * input을 나눌 수 있는 단위를 결정하고 이후 나머지를 찾으면 해결된다.
 * 주어진 표에서 가장 기본이 되는 단위는
 *    1,
 *    5,
 *   10,
 *   50,
 *  100,
 *  500,
 * 1000,
 *
 * 인풋범위는 1<=num<=3999
 */
const romans = {
  I: 1,
  IV: 4,
  V: 5,
  IX: 9,
  X: 10,
  XL: 40,
  L: 50,
  XC: 90,
  C: 100,
  CD: 400,
  D: 500,
  CM: 900,
  M: 1000
};

function valueDivide(value, division) {
  return value / division;
}

function solution(input) {
  // 제곱 수를 추출해 보자
  const values = Object.values(romans);
  const keys = Object.keys(romans);
  // 나누기를 해야 할 대상 추출
  let quotienties = values.filter(v => {
    return input / v >= 1;
  });

  let v = input;
  let answer = "";
  const arr = [];
  // 나눌 수가 없을 때까지 반복
  while (quotienties.length) {
    const base = quotienties[quotienties.length - 1];
    const quotionKey = keys[values.indexOf(base)];
    const remainder = v % base;
    // arr.push({
    //   key: quotionKey,
    //   value: base,
    //   quotient,
    //   remainder
    // });
    let quotient = Math.floor(v / base);
    while (quotient > 0) {
      answer += quotionKey;
      quotient--;
    }
    v = remainder;
    quotienties = quotienties.filter(t => remainder / t >= 1);
  }

  //   arr.map(info => {
  //     while (info.quotient > 0) {
  //       answer += info.key;
  //       info.quotient--;
  //     }
  //   });
  //console.log("arr", arr);
  console.log("input", input, "answer", answer);
  return answer;
}

console.log(solution(14));
console.log(solution(6));
console.log(solution(58));
console.log(solution(1994));
console.log(solution(3999));
