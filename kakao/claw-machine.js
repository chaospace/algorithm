// 인형뽑기 문제
/**
 * 5x5이상 30x30이하 board에 각 인형정보가 주어짐
 * 인형을 구분하는 수는 1~100.
 * moves 크래인의 움직임 정보 배열
 * 움직인 이후 해당 column에 있는 인형은 바구니로 옮겨지며(stack에 추가)동일한 인형은 결과에서 사라진다( 애니팡 )
 *
 * 모든 움직임 후에 사라진 인형의 수를 반환하는 함수 작성.
 */

const start_board = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 3],
  [0, 2, 5, 0, 1],
  [4, 2, 4, 4, 2],
  [3, 5, 1, 3, 1],
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
  const basket = []; //바구니
  let count = 0;

  while (moves.length) {
    const column = moves.shift() - 1;
    let pickItem = -1;
    for (let y = 0; y < board.length; y++) {
      if (board[y][column] > 0) {
        pickItem = board[y][column]; //선택요소 기억
        board[y][column] = 0; //가져온 자리는 0으로 변경
        break;
      }
    }
    if (pickItem !== -1) {
      // 선택인형이 존재하면
      if (basket.length && basket[basket.length - 1] === pickItem) {
        //연속한 인형은 바구니에서 제거하며 카운트를 증가.
        if (basket[basket.length - 1] === pickItem) {
          basket.pop();
          count++;
        }
      } else {
        basket.push(pickItem);
      }
    }
  }

  return { count: count * 2, basket };
}

[
  {
    board: [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 3],
      [0, 2, 5, 0, 1],
      [4, 2, 4, 4, 2],
      [3, 5, 1, 3, 1],
    ],
    moves: [1, 5, 3, 5, 1, 2, 1, 4],
  },
].forEach(({ board, moves }) => {
  console.log("count", solution(board, moves));
});
