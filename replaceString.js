//숫자 문자열과 영단어
/**
 * 숫자의 일부 자릿수를 영단어로 바꾸는 예시
 * 1478 => "one4seveneight"
 * 234567 => "23four5six7"
 * 10203 => "1zerotwozero3"
 * 숫자문자열을 모두 숫자로 변경 후 반환
 *
 * 제한사항
 * 1<=s<=50
 * s가 '0' 또는 'zero'로 시작하는 경우는 없음
 * return 값은 0<o<2,000,000,000
 */

const map = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine"
};

const start_input = [
  "one4seveneight",
  "23four5six7",
  "2three45sixseven",
  "123",
  "threethree31"
];

function solution(input) {
  let answer = [];
  while (input.length) {
    let o = input.pop();
    for (const [key, value] of Object.entries(map)) {
      o = o.replace(new RegExp(value, "g"), key);
    }
    answer.push(o);
  }
  return answer;
}
console.log(solution(start_input));
