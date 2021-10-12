/**
 * 높이만 다른 스틱이 왼쪽에서 오른쪽으로 놓을 경우
 * 우측에서 보이는 스틱의 갯수 찾기
 * 요점
 *  - 배열의 역행에서 시작값보다 큰 수가 몇개 있나 찾기와 동일..
 */

function solution(input) {
  let min = -1;
  let results = [];
  input.reverse().forEach(v => {
    if (min < v) {
      min = v;
      results.push(v);
    }
  });
  return { results, count: results.length };
}

console.log(solution([6, 6, 9, 7, 6, 4, 6]));
console.log(solution([5, 5, 4, 3, 2, 1]));
