/**
 * 같은 숫자는 싫어
 * 배열 arr가 주어짐
 * 각 원소는 숫자 0~9까지로 이루어짐
 * 배열에서 연속으로 나타나는 숫자는 하나만 남기고 제거하려고 함.
 * 단 제거된 후 남은 수들을 반환할 때는 배열 arr의 원소들의 순서를 유지해야 한다.
 *
 * arr =[1,1,3,3,0,1,1] => [1,3,0,1]을 return
 * arr =[4,4,4,3,3] => [4,3]을 return
 *
 * 제한사항
 * - 배열 arr의 크기 : 1,000,000 이하의 자연수
 * - 배열 arr의 원소의 크기 : 0 < x <= 9
 */

function solution(arr) {
  let answer = [];
  let prev = -1;
  arr.forEach(v => {
    if (prev !== v) {
      answer.push(v);
      prev = v;
    }
  });
  return answer;
}

function solution2(arr) {
  return arr.filter((v, idx) => v !== arr[idx + 1]);
}
console.log(solution([1, 1, 3, 3, 0, 1]));
console.log(solution([4, 4, 4, 3, 3]));

console.log(solution2([1, 1, 3, 3, 0, 1]));
console.log(solution2([4, 4, 4, 3, 3]));
