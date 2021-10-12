/**
 * 숫자 정렬
 * 자연수 리스트( 홀수와 짝수의 개수가 같음) - 예외처리 필요( 수가 같지 않을 수 있다는멘트?)
 * 순소는 홀-짝-홀-짝.. 홀수는 오름차순 정렬, 짝수는 내림차순 정렬
 * input - 413265
 * output- 163452
 * 접근방식
 *  - 배열에서 홀짝을 분리
 *  - 분리된 배열을 각자 소팅
 *  - 이름 다시 조합.
 */
const sortNumeric = (a, b) => (a > b ? 1 : a < b ? -1 : 0);
const arr = [4, 1, 3, 2, 6, 5];
const even = arr
  .filter(v => v % 2 == 0)
  .sort(sortNumeric)
  .reverse();
const odd = arr.filter(v => v % 2 == 1).sort(sortNumeric);
const r = [];
if (even.length == odd.length) {
  while (odd.length) {
    r.push(odd.shift());
    r.push(even.shift());
  }
} else {
  console.log("짝이 맞지 않습니다.");
}
console.log(r);
