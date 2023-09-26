/**
 * 색종이 영역 구하기
 * 가로, 세로 100인 정사각형 도화지가 있다.
 * 가로, 세로 10인 검은색 색종이를 도화지에 평행하도록 여러장 붙인 후 검은 영역의 넓이를 구하는 함수 작성.
 *
 * 종이에 수  <= 100
 * 도화지 밖으로 나가는 경우는 없음.
 * w,h 10
 *
 * - 겹치는 영역을 제외한 실 영역을 구하는 문제.
 */

function solution(pos) {
  //x축을 기반으로 정렬하면 계산이 좀더 수월.
  pos.sort((a, b) => a[0] - b[0]);
  // 큰 그리드 배열을 만들고 1로 초기화 중복영역을 0으로 변환
  // 0을 합하면 영역 값이 나옴.
  //영역에서 최소값과 최대값을 찾는데 포인트!!
  const board = Array.from({ length: 100 }, () =>
    Array.from({ length: 100 }).fill(1)
  );
  let size = 0;
  pos.forEach(([x, y]) => {
    for (let col = y; col < y + 10; col++) {
      for (let row = x; row < x + 10; row++) {
        if (board[col][row] === 1) {
          board[col][row] = 0;
          size++;
        }
      }
    }
  });

  return size;
}

[
  [
    [3, 7], //x, y 좌측,하단의 좌표.
    [15, 7],
    [5, 2],
  ],
  [
    [5, 10],
    [15, 7],
    [5, 0],
  ],
  [
    [10, 10],
    [8, 8],
    [9, 5],
  ],
].forEach((pos) => {
  console.log(solution(pos));
});

//const a = Array.from({ length: 10 }, () => Array.from({ length: 10 }).fill(1));
