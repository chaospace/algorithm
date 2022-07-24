/**

스도쿠는 18세기 스위스 수학자가 만든 '라틴 사각형'이랑 퍼즐에서 유래한 것으로 현재 많은 인기를 누리고 있다.
이 게임은 아래 그림과 같이 가로, 세로 각각 9개씩 총 81개의 작은 칸으로 이루어진 정사각형 판 위에서 이뤄지는데, 
게임 시작 전 일부 칸에는 1부터 9까지의 숫자 중 하나가 쓰여 있다.

나머지 빈 칸을 채우는 방식은 다음과 같다.

- 각각의 가로줄과 세로줄에는 1부터 9까지의 숫자가 한 번씩만 나타나야 한다.
- 굵은 선으로 구분되어 있는 3x3 정사각형 안에도 1부터 9까지의 숫자가 한 번씩만 나타나야 한다.

게임 시작 전 스도쿠 판에 쓰여 있는 숫자들의 정보가 주어질 때 모든 빈 칸이 채워진 최종 모습을 출력하는 프로그램을 작성하시오.

인풋
아홉 줄에 걸쳐 한 줄에 9개씩 게임 시작 전 스도쿠판 각 줄에 쓰여 있는 숫자가 한 칸씩 띄워서 차례로 주어진다.
스도쿠 판의 빈 칸의 경우에는 0이 주어진다. 스도쿠 판을 규칙대로 채울 수 없는 경우의 입력은 주어지지 않는다.

0 3 5 4 6 9 2 7 8
7 8 2 1 0 5 6 0 9
0 6 0 2 7 8 1 3 5
3 2 1 0 4 6 8 9 7
8 0 4 9 1 3 5 0 6
5 9 6 8 2 0 4 1 3
9 1 7 6 5 2 0 8 0
6 0 3 7 0 1 9 5 2
2 5 8 3 9 4 7 6 0


3 x 3 공간에 가능한 수의 목록을 추출
추출된 수를 기반으로 검증
 */

function solution(input) {
  const board = input
    .replaceAll(" ", "")
    .split("\n")
    .filter(v => v.length > 1)
    .map(o => o.split(""));

  const boardInfo = [];
  let targetInfo = [];
  for (let row = 0; row < board.length; row++) {
    const columns = board[row].length;
    for (let column = 0; column < columns; column++) {
      const rowGroup = Math.floor(row / 3);
      const colGroup = Math.floor(column / 3);
      const value = board[row][column];
      // 0값을 가진 목록 추출
      if (value == 0) {
        targetInfo.push({
          row,
          column,
          value,
          colGroup,
          rowGroup
        });
      }
      boardInfo.push({
        row,
        column,
        value,
        colGroup,
        rowGroup
      });
    }
  }
  const template = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  // 찾아야 할 수를 순회

  while (targetInfo.length) {
    for (let i = 0; i < targetInfo.length; i++) {
      const t = targetInfo[i];

      const rowArr = board[t.row];
      const columnArr = board.map((arr, _) => arr[t.column]);
      const rowIncorrectCount = rowArr.filter(v => v === t.value).length;
      const columnIncorrectCount = columnArr.filter(v => v === t.value).length;
      // 여기는 무조건 답이 나온다.
      if (rowIncorrectCount == 1) {
        // 가로
        t.value = template.find(v => rowArr.find(n => n === v) === undefined);
        board[t.row][t.column] = t.value;
      } else if (columnIncorrectCount == 1) {
        // 세로
        t.value = template.find(
          v => columnArr.find(n => n === v) === undefined
        );
        board[t.row][t.column] = t.value;
      } else {
        // 그룹 영역
        const groupArr = board.flatMap((arr, index) => {
          const start = t.rowGroup * 3;
          const end = start + 3;
          if (index >= start && index < end) {
            const s = t.colGroup * 3;
            return arr.slice(s, s + 3);
          }
          return [];
        });
        const groupIncorrectCount = groupArr.filter(v => v === "0").length;
        if (groupIncorrectCount === 1) {
          // 가로
          t.value = template.find(
            v => groupArr.find(n => n === v) === undefined
          );
          board[t.row][t.column] = t.value;
        }
      }
    }
    targetInfo = targetInfo.filter(v => v === "0");
  }

  return board.flatMap(v => v.join(","));
}

const start_input = `
0 3 5 4 6 9 2 7 8
7 8 2 1 0 5 6 0 9
0 6 0 2 7 8 1 3 5
3 2 1 0 4 6 8 9 7
8 0 4 9 1 3 5 0 6
5 9 6 8 2 0 4 1 3
9 1 7 6 5 2 0 8 0
6 0 3 7 0 1 9 5 2
2 5 8 3 9 4 7 6 0`;

const temp = `
'1,3,5,4,6,9,2,7,8',
'7,8,2,1,3,5,6,4,9',
'4,6,9,2,7,8,1,3,5',
'3,2,1,5,4,6,8,9,7',
'8,7,4,9,1,3,5,2,6',
'5,9,6,8,2,7,4,1,3',
'9,1,7,6,5,2,3,8,4',
'6,4,3,7,8,1,9,5,2',
'2,5,8,3,9,4,7,6,1'
`;

console.log(solution(start_input));
