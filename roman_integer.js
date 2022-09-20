/**
 * 로마숫자를 integer로 변환하기
 *
 * input
 * III -> 3
 *
 * LVIII -> 58
 *
 * MCMXCIV -> 1994
 *
 * 제약
 * 1 <= s <= 15
 *
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

/**
 * integer->roman의 역 변환 처리
 * 숫자변환은 쉬운데 자리수를 결정하는 방법을 찾는게 관건
 *
 * input을 하나씩 제거하며 시작값이 I, X, C 일 경우 뒤에 문자를 체크 하자.
 * @param {*} input
 */
function solution(input) {
  console.log("input", input);
  let idx = 0;
  //const keys = Object.keys(romans);
  let answer = 0;
  while (idx < input.length) {
    let current = input[idx];
    const next = input[idx + 1];
    if (current === "I") {
      if (next === "V" || next === "X") {
        current += next;
        idx++;
      }
    } else if (current === "X") {
      if (next === "L" || next === "C") {
        current += next;
        idx++;
      }
    } else if (current === "C") {
      if (next === "D" || next === "M") {
        current += next;
        idx++;
      }
    }
    answer += romans[current];

    idx++;
  }
  console.log("convert", answer);
  return answer;
}

solution("III");
solution("LVIII");
solution("MCMXCIV");
