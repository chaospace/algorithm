/**
 * 전기줄.
 * 두 전봇대 A와 B 사이에 하나 둘씩 전기줄을 추가하다 보니 전기줄이 서로 교차하는 경우가 발생.
 * 합선의 위험이 있어 이들 중 몇 개의 전기줄을 없애 교차하지 않도록 만들려고 한다.
 *
 * 전기줄의 개수와 전기줄들이 두 전봇대에 연결되는 위치의 번호가 주어질 때, 남아있는 모든 전기줄이 서로 교차하지
 * 않게 하기 위해 없애야 하는 전기줄의 최소 개수를 구하는 프로그램을 작성.
 */

const { lowerBound } = require("../libs/util");

//교차가 생기는 곳은 배열에 순서가 오름차순이 깨지는 곳에서 발생.
//즉 dp에 인덱스가 한 방향으로만 증가하면 교차가 없는 것.
function solution(list) {
  const diff = [];
  const dp = Array.from(list).fill(0);
  list
    .sort((a, b) => a[0] - b[0])
    .forEach(([_, to]) => {
      diff.push(to);
    });

  const stack = [];
  //   let max_index = 0;
  for (let i = 0; i < diff.length; i++) {
    const index = lowerBound(stack, diff[i]);
    stack[index] = diff[i];
    // max_index = Math.max(index, max_index);
    dp[i] = index;
  }

  //부분증가 수열이 시작하는 가장 마지막 인덱스에 위치가 제거해야 될 전기줄에 갯수.
  console.log(stack.length, diff.length);
  return diff.length - stack.length;
}

[
  [
    [1, 8],
    [3, 9],
    [2, 2],
    [4, 1],
    [6, 4],
    [10, 10],
    [9, 7],
    [7, 6],
  ],
].forEach((list) => {
  console.log(solution(list));
});
