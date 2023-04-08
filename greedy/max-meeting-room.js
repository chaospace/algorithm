/**
 * 회의실 배정문제
 * 
 * 주어진 회의 시간 정보를 통해 
 * 가장 많은 회의를 진행 할 수 있는 시간정보를 반환.
 * 1 4
3 5
0 6
5 7
3 8
5 9
6 10
8 11
8 12
2 13
12 14
*/

/**
 * 회의 시간정보를 담고 있는 이중배열
 * 배열의 [0]은 시작시간
 * 배열의 [1]은 종료시간
 * @param {*} times
 */
function solution(times) {
  //끝나는 시간순으로 배열 정렬
  times.sort((a, b) => a[1] - b[1]);
  let endTime = 0;
  let count = 0;
  const stack = [];
  for (let i = 0; i < times.length; i++) {
    const a = times[i]; // 비교를 위한 회의시간 참조.
    if (endTime <= a[0]) {
      endTime = a[1];
      stack.push(a);
      count++;
    }
  }
  console.log("a", endTime, stack, "len", stack.length);
}

solution([
  [1, 4],
  [3, 5],
  [0, 6],
  [5, 7],
  [3, 8],
  [5, 9],
  [6, 10],
  [8, 11],
  [8, 12],
  [2, 13],
  [12, 14]
]);
