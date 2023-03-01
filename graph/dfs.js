/**
 * 깊이 우선 탐색
 *
 * 주어진 맵 정보를 바탕으로 탈출구 찾기
 * 움직일 수 있는 공간은 0
 * 닫힌 공간은 1 로 표현됨.
 *
 * feasible : 실현가능한
 *
 * 5*5 미로
 *
 * 00100
 * 00000
 * 00010
 * 11011
 * 00000
 */

/**
 * end점에 도착할 때 까지 반복.
 *  - 현재 위치 상태 변경(초기는 start)
 *  - 상,우,좌,하 이동 가능 여부를 판단
 *  - 이동 가능 한 곳으로 이동 후 1번 반복.
 * @param {*} maze
 * @param {*} start
 * @param {*} end
 */

function search(maze, current, end) {
  // 현재 위치에서 이동 가능한 곳이 있는지 체크
  // 체크 순서는 상 우 하 좌( 상단부터 시계방향 );
  if (current[0] === end[0] && current[1] === end[1]) {
    console.log("목표위치 도착");
    return true;
  }
  const dir = [
    [0, 1], // right
    [1, 0], // top
    [0, -1], // left
    [-1, 0] // bottom
  ];

  let len = maze.length;
  for (let i = 0; i < dir.length; i++) {
    let direction = dir[i];
    let row = current[0] + direction[0];
    let column = current[1] + direction[1];
    // 해당 위치가 유효하고 벽이 아닌지 체크
    if (
      column >= 0 &&
      column < len &&
      row >= 0 &&
      row < len &&
      maze[row][column] !== 1
    ) {
      maze[row][column] = 1; // 상태를 1로 변경
      // 이동 중 길이 막혀 롤백 상황이 발생해도
      // 뎁스 우선탐색이라 상태를 롤백할 필요가 없음
      // 실패 시 최초 뎁스에서 다른 곳을 따고 이동하기 때문에 상위뎁스에 상태는 변경 전값을 기억하고 있음.
      if (search(maze, [row, column], end)) {
        return true;
      }
    }
  }
  return false;
}

function solution(maze, start, end) {
  // 시작 위치 상태를 1로 변경;
  console.log("origin", maze);
  maze[start[0]][start[1]] = 1;
  const r = search(maze, start, end);
  console.log("r", start, maze);
}
//[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]
solution(
  [
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0],
    [1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0]
  ],
  [0, 4],
  [3, 2]
);

/*
var hasPath = function (maze, start, destination) {
  maze[start[0]][start[1]] = 1;
  console.log("maze", maze);
  //return searchMazeHelper(maze, start, destination);
};
function searchMazeHelper(maze, current, end) {
  // dfs
  if (current[0] == end[0] && current[1] == end[1]) {
    return true;
  }
  let neighborIndices, neighbor;
  // Indices: 0->top,1->right, 2->bottom, 3->left
  let directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ];
  for (const direction of directions) {
    neighborIndices = [current[0] + direction[0], current[1] + direction[1]];
    if (isFeasible(maze, neighborIndices)) {
      maze[neighborIndices[0]][neighborIndices[1]] = 1;
      if (searchMazeHelper(maze, neighborIndices, end)) {
        return true;
      }
    }
  }
  return false;
}
function isFeasible(maze, indices) {
  let x = indices[0],
    y = indices[1];
  return (
    x >= 0 &&
    x < maze.length &&
    y >= 0 &&
    y < maze[x].length &&
    maze[x][y] === 0
  );
}
var maze = [
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0]
];
hasPath(maze, [0, 4], [3, 2]);
console.log("maze", maze);
*/
