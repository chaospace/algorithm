// 인형뽑기 문제
/**
 * 5x5이상 30x30이하 board에 각 인형정보가 주어짐
 * 인형을 구분하는 수는 1~100.
 * moves 크래인이 움직임 정보 배열
 * 동일한 인형은 결과에서 사라짐( 애니팡 )
 *
 */

const start_board = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 3],
  [0, 2, 5, 0, 1],
  [4, 2, 4, 4, 2],
  [3, 5, 1, 3, 1]
];

const start_moves = [1, 5, 3, 5, 1, 2, 1, 4];

/**
 * 이동 할 때마다 index처리를 위해 -1을 해줘야 함.
 * 해당 index에 인형이 존재하면 이를 제거하고 board정보를 갱신
 * 옮겨진 인형정보를 기억되야 하며 동일한 인형(숫자)이면 제거처리
 * moves배열이 없을 때 까지 반복
 * 최종은 중복으로 사라진인형의 count값 리턴
 * @param {*} board
 * @param {*} moves
 */
function solution(board, moves) {
  const basket = [];
  let count = 0;
  while (moves.length) {
    // 인덱스 일치를 위해 기본값에서 -1을 해줌
    // 조건 moves는 항상 1보다 크다.
    const pickIndex = moves.shift() - 1;
    // 해당 인덱스에 값중 0이 아닌 index정보 추출
    const pickedIndex = board.findIndex(element => element[pickIndex] > 0);
    if (pickedIndex > -1) {
      const value = board[pickedIndex][pickIndex];
      board[pickedIndex][pickIndex] = 0;
      if (basket[basket.length - 1] === value) {
        basket.pop();
        count++;
      } else {
        basket.push(value);
      }
    }
  }
  return count * 2;
}

console.log("count", solution(start_board, start_moves));
