/**
 * 색종이 만들기(2630번)
   여러 사이즈의 정사각형으로 이뤄진 * n*n사이즈 종이가 주어져 있고,
   각 정사각형은 흰색, 파랑색으로 채워저 있다.
   전체 종이를 n*n( n=2^k, 1<=k<=7 )이고 자르는 규칙은 아래와 같다.
    - 크기가 똑같은 네 개의 n/2*n/2색종이로 나눈다.
    - 나누어진 종이가 같은 색이 아니면 동일한 규칙으로 다시 나눈다.
    - 모두 같은 색이면 해당 종이는 중단, 나머지는 크기가 1이 될때 까지 반복. 
 */

const { getStartTime } = require("../libs/util");

const isValid = (arr) => {
  let isSame = true;
  loop: for (let i = 0; i < arr.length; i++) {
    for (let m = 1; m < arr[i].length; m++) {
      if (arr[i][m] !== arr[i][m - 1]) {
        isSame = false;
        break loop;
      }
    }
  }
  return isSame;
};

const cloneFromTo = (source, x1, y1, x2, y2) => {
  const arr = [];
  for (let y = y1; y < y2; y++) {
    const sub = [];
    arr.push(sub);
    for (let x = x1; x < x2; x++) {
      sub.push(source[y][x]);
    }
  }
  return arr;
};

//stack을 이용한 해법.
function solution(board) {
  //기본맵 구성
  board = board.map((s) => s.split(" "));

  const bfs = (source) => {
    const complete = [0, 0];
    const stack = [[source, source.length]];

    while (stack.length) {
      const [arr, n] = stack.shift();
      //종료조건
      if (n <= 1) {
        return;
      }
      const dir = [
        [0, 0, n / 2, n / 2], //좌상
        [n / 2, 0, n, n / 2], //우상
        [0, n / 2, n / 2, n], //좌하
        [n / 2, n / 2, n, n], //우하
      ];

      for (let i = 0; i < dir.length; i++) {
        let content = cloneFromTo(
          arr,
          dir[i][0],
          dir[i][1],
          dir[i][2],
          dir[i][3]
        );

        if (isValid(content)) {
          complete[Number(content[0][0])]++;
        } else {
          stack.push([content, n >> 1]);
        }
      }
    }
    return complete;
  };

  return bfs(board);
}

/**
 * 주어진 종이 정보에 값(0,1)의 통일여부를 체크해 해당 종이의 색을 결정.
 * 동일하지 않다면 4분할하여 재귀를 통해 반복.(크기가 1일 때까지)
 *
 * map정보가 주어질 때 이를 분할하는 좋은 방법을 고민해보자.
 * 문자열이 주어질 경우
 */

const divideConquer = (x, y, n, board, counter) => {
  //종료조건
  if (n <= 1) return counter;
  let blueCount = 0;
  for (let row = y; row < y + n; row++) {
    for (let col = x; col < x + n; col++) {
      if (board[row][col] === "1") {
        blueCount += 1;
      }
    }
  }
  // console.log("blueCount", blueCount, n * n);
  //전체 영역이 동일한 값인지 체크
  const isBlue = blueCount === n * n;
  const isWhite = blueCount === 0;
  if (isBlue) {
    counter[1] += 1;
  } else if (isWhite) {
    counter[0] += 1;
  }
  if (!isBlue && !isWhite) {
    const mid = n >> 1;
    //paper 분할처리
    counter = divideConquer(x, y, mid, board, counter);
    counter = divideConquer(x + mid, y, mid, board, counter);
    counter = divideConquer(x, y + mid, mid, board, counter);
    counter = divideConquer(x + mid, y + mid, mid, board, counter);
  }
  return counter;
};

//분할정복을 이용한 해법.
function solutionB(board) {
  const paper = board.map((b) => b.split(" "));
  const n = paper.length;
  return divideConquer(0, 0, n, paper, [0, 0]);
}

[
  [
    "1 1 0 0 0 0 1 1",
    "1 1 0 0 0 0 1 1",
    "0 0 0 0 1 1 0 0",
    "0 0 0 0 1 1 0 0",
    "1 0 0 0 1 1 1 1",
    "0 1 0 0 1 1 1 1",
    "0 0 1 1 1 1 1 1",
    "0 0 1 1 1 1 1 1",
  ],
  [
    "1 1 1 1 1 1 1 1",
    "1 1 1 1 1 1 1 1",
    "1 1 1 1 1 1 1 1",
    "1 1 1 1 1 1 1 1",
    "1 1 1 1 1 1 1 1",
    "1 1 1 1 1 1 1 1",
    "1 1 1 1 1 1 1 1",
    "1 1 1 1 1 1 1 1",
  ],
].forEach((board) => {
  let start = getStartTime();
  console.log("r", solution(board));
  console.log("end-time", getStartTime() - start);
  start = getStartTime();
  console.log("div-", solutionB(board));
  console.log("b-end-time", getStartTime() - start);
});
