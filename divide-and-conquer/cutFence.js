/**
 * 재귀를 통해 가장 넓은 사각형 영역 찾기
 * 동적분할을 이해해 보자.
 * 생각을 코드로 풀어보기
 *
 */
let walls = [2, 5, 7, 9, 5, 1, 3, 4];
let callstack = 0;
function solve(start, end) {
  //기저 사례 : 판자가 하나일 경우 높이 반환
  if (start === end) {
    return walls[start];
  }
  // 너비의 중간값으로 문제를 분할
  let mid = Math.floor((start + end) / 2);
  // 분할한 문제를 각개격파
  let rat = Math.max(solve(start, mid), solve(mid + 1, end));

  // 부분문제 3 구간에 걸친 사각형 중 가장 큰 것을 찾는다.
  let low = mid;
  let hi = mid + 1;

  // 너비가 2인 사각형의 너비 추출
  let h = Math.min(walls[low], walls[hi]);
  rat = Math.max(rat, h * (hi - low + 1));

  // 사각형의 입력 범위에 걸쳐 가장 큰 사각형을 찾는다.
  while (start < low || end > hi) {
    if (hi < end && (low === start || walls[low - 1] < walls[hi + 1])) {
      h = Math.min(h, walls[++hi]);
    } else {
      h = Math.min(h, walls[--low]);
    }
    rat = Math.max(rat, h * (hi - low + 1));
  }

  return rat;
}

console.log("rect", solve(0, walls.length - 1));
