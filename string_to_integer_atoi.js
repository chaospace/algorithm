/**
 * 문자열을 32비트 정수로 변환(parseInt 구현해 보기)
 *
 * 함수 규칙
 * 1. 공백무시
 * 2. +- 기호를 인식해 반영
 * 3. 숫자가 아닌 문자를 만날 때까지 반영
 * 4. 문자열을 정수로 변환 ( "0032" => 32 )
 * 5. 31비트 정수 영역을 벗어나면 min, max로 보정
 *
 * 공백은 선행되는 공백만 인정됨.
 *
 */

function solution(s) {
  // 공백제거

  let count = 0;
  let sign = 1;
  const SPACE = " ";
  const MINUS = "-";
  const PLUSE = "+";
  const min = Math.pow(-2, 31);
  const max = Math.pow(2, 31) - 1;
  // 선행공백만큼 카운트 증가
  while (s[count] === SPACE) {
    count++;
  }

  // 부호 체크
  if (s[count] === MINUS || s[count] === PLUSE) {
    sign = s[count] === MINUS ? -1 : 1;
    count++;
  }

  const start = count;
  // 문자열에 숫자가 반복될 때 까지 반복
  while (true) {
    const char = s[count];
    if (isNaN(char) || char === SPACE) {
      break;
    }
    count++;
  }

  let output = s.substring(start, count);
  output *= sign;

  // 조정
  output = Math.min(max, Math.max(min, output));
  return isNaN(output) ? 0 : output;
}

/**
 * 정규식을 이용한 방법
 * parseInt 구현하기
 *
 * @param {*} s
 */
function solutionWithRegexpress(s) {
  const MIN_VALUE = Math.pow(-2, 31);
  const MAX_VALUE = Math.pow(2, 31) - 1;
  //선행공백제거 후 기호와 숫자 추출
  let output = s.trimLeft().match(/^[-\+]?\d+/);
  console.log(output);
  output = Math.max(MIN_VALUE, Math.min(output, MAX_VALUE));
  return output;
  //isNaN(output) ? 0 : output;
}

console.log(solution("   -42"));
// console.log(solution("4193"));
console.log(solution("4a193"));
console.log(solution("-04a193"));
console.log(solution("    -88827   5655  U"));
//console.log(solution("    -4 3"));
console.log(solution("+-12"));
console.log(solution("-1-"));
console.log(solution("123-"));

console.log(solutionWithRegexpress("1230-"));
console.log(solutionWithRegexpress("-1-230-"));
console.log(solutionWithRegexpress("    -88827   5655  U"));
