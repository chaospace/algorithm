/**
 * 부분합
 * 10,000 이하의 자연수로 이루어진 길이 N짜리 수열이 주어질 때.
 * 이 수열에서 연속된 수들의 부분합 중에 그 합이 S이상 이 되는 것중 가장 짧은 것의 길이를 구하는 함수작성.
 * 수열은 소팅을 하지 않고 그대로 사용한다.
 */

//같은 위치에서 시작해 포인터 이동을 통한 처리 방식!
function solution(list, s) {
  let l = 0;
  let r = 0;
  let sum = 0;
  let distance = Number.MAX_SAFE_INTEGER;
  while (l <= list.length && r <= list.length) {
    if (sum < s) {
      sum += list[r++] || 0;
    } else if (sum >= s) {
      //s와 동일하면 종료하면 안됨? 부분합이라 가장 길이가 짧은 지는 보장할 수 없으니 모든 경우를 체크함.
      distance = Math.min(distance, r - l);

      sum -= list[l++] || 0;
    }
  }
  return { sum, distance };
}

[
  { list: [5, 1, 3, 5, 10, 7, 4, 9, 2, 8], s: 15 },
  { list: [1, 1, 1, 1, 1, 2], s: 10 },
].forEach(({ list, s }) => {
  console.log(solution(list, s));
});
