/**
 * 1번부터 N번까지 N명의 사람이 원을 이루면서 앉아있고, 양의 정수 K(≤ N)가 주어진다.
 * 순서대로 K번째 사람을 제거한다.
 * 남은 사람들로 이루어진 원을 따라 과정을 반복.
 * N명의 사람이 모두 제거될 때가지 계속된다.
 *
 * 7,3 -> 3, 6, 2, 7, 5, 1, 4
 *
 * N(7)까지의 배열에서 K(3)번째 원소를 제거 모든 원소가 없어질 때까지 반복.
 */

function solution(n, k) {
  const stack = [];
  const arr = Array.from({ length: n }, (_, i) => i + 1);
  let pivot = -1;
  let movePivot = pivot;
  while (arr.length) {
    //차이가 k가 나면
    if (movePivot - pivot === k) {
      movePivot %= arr.length;
      pivot = movePivot;
      stack.push(...arr.splice(pivot, 1));
      //제거된 원소에 인덱스 만큼 조절 전체 조절
      pivot = movePivot = pivot - 1;
    }

    movePivot++;
  }
  return stack;
}

[[7, 3]].forEach(([n, k]) => {
  console.log(solution(n, k));
});
