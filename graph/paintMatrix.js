/**
 * 주어진 위치를 기준으로
 * 매트릭스에 값을 반전시키며 이동하기
 *
 *
 * [1,1,1]
 * [1,1,0]
 * [1,0,1]
 */

function getReverseValue(current) {
  return current == 0 ? 1 : 0;
}

function isChangeAble(val, newVal) {
  return val !== newVal;
}

function reachAble(row, column, max = 3) {
  return row >= 0 && row < max && column >= 0 && column < max;
}

/*
function search(positions, current) {
  const [row, column] = current;
  const direction = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
  ];

  for (let i = 0; i < direction.length; i++) {
    const nRow = row + direction[i][0];
    const nColumn = column + direction[i][1];
    if (reachAble(nRow, nColumn)) {
      const nextValue = positions[nRow][nColumn];
      if (isChangeAble(positions[row][column], nextValue)) {
        positions[nRow][nColumn] = getReverseValue(nextValue);
        if (search(positions, [nRow, nColumn])) {
          return true;
        }
      }
    }
  }
  return false;
}

function solution(positions, start) {
  const [row, column] = start;
  const val = positions[row][column];
  //시작은 무조건 값을 반전시킴.
  positions[row][column] = getReverseValue(val);

  const r = search(positions, start);
  console.log("r", r, "positions", positions);
}

solution(
  [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1]
  ],
  [2, 2]
);
*/

/**
 * 너비 우선 탐색
 * 초기 값을 큐에 저장
 * 1.큐에 값을 추출해서 주변노드 변경 여부 판단.
 * 2. 변경 되면 변경된 노드 정보를 큐에 추가
 * 큐에 작업이 있을 때 까지 1~2반복.
 * @param {*} colors
 * @param {*} y
 * @param {*} x
 * @returns
 */
function bfs(colors, y, x) {
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1]
  ];
  let color = colors[y][x];
  console.log("color", color);
  let queue = [];
  colors[y][x] = Number(!color);
  // 시작값을 넣고
  queue.push([y, x]);
  let current;
  while (queue.length) {
    current = queue.shift();
    for (let [row, column] of directions) {
      [ny, nx] = [current[0] + row, current[1] + column];
      if (reachAble(ny, nx) && colors[ny][nx] === color) {
        colors[ny][nx] = Number(!color);
        queue.push([ny, nx]);
      }
    }
  }
  return colors;
}

console.log(
  bfs(
    [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1]
    ],
    1,
    1
  )
);
