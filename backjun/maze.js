/**
 * 미로 길찾기
 *
 * 미로에서 1은 이동할 수 있는 칸, 0은 이동할 수 없는 칸.
 * (1, 1)에서 출발해 (N,M)의 위치로 이동할 때 지나야 하는 최소 칸 수 찾기
 */

function solution(maze, goal) {
  const [rows, cols] = goal;
  //미로 길찾기는 bfs 너비우선 탐색.
  //최소 값을 찾는게 핵심.
  const dir = [
    [1, 0], //우
    [0, -1], //하
    [0, 1], //상
    [-1, 0], //좌
  ];
  const map = [];
  const visited = Array.from({ length: rows * cols }, (_) => {
    return 0;
  });
  for (let y = 0; y < rows; y++) {
    map[y] = [];
    for (let x = 0; x < cols; x++) {
      map[y][x] = maze[y * cols + x];
    }
  }

  let results = [];
  const search = (posX, posY, endX, endY, visited, history) => {
    if (visited[posY * cols + posX] === 0) {
      visited[posY * cols + posX] = 1;
      history.push(`${posX}_${posY}`);
      if (posX === endX && posY === endY) {
        step = Math.min(history.length, step);
        results.push([...history]);
        return;
      }
      for (let d = 0; d < dir.length; d++) {
        const [dx, dy] = dir[d];
        let px = posX + dx;
        let py = posY + dy;
        if (
          px >= 0 &&
          py >= 0 &&
          px < cols &&
          py < rows &&
          map[py][px] === 1 &&
          visited[py * cols + px] === 0
        ) {
          search(px, py, endX, endY, [...visited], [...history]);
        }
      }
    }
    //리턴 나아갈 수 없음.
    return Number.MAX_SAFE_INTEGER;
  };

  //시작은 1,1
  //최단거리를 구분하려면 비교를 할 수 있어야 한다.
  let step = Number.MAX_SAFE_INTEGER;
  search(0, 0, cols - 1, rows - 1, visited, []);
  return step;
}

const convertArrayToGrid = (arr, rows, cols) => {
  const map = [];
  for (let y = 0; y < rows; y++) {
    map[y] = [];
    for (let x = 0; x < cols; x++) {
      map[y][x] = arr[y * cols + x];
    }
  }
  return map;
};

function solutionBFS(maze, size) {
  const [rows, cols] = size;
  const map = convertArrayToGrid(maze, rows, cols);
  const queue = [[0, 0, 1]];
  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  while (queue.length) {
    //작업을 앞에서 부터 가져와 사용
    const [x, y, count] = queue.shift(); //
    //위치가 같다면 종료 추가된 작업 순서대로 가져오므로 만나는 종료 조건은 항상 가장 빠른 경우가 된다.
    if (x === cols - 1 && rows - 1 === y) {
      return count;
    }
    for (let i = 0; i < dir.length; i++) {
      const nx = x + dir[i][0];
      const ny = y + dir[i][1];
      //범위가 유효하고 maze가 1이라면
      //큐에 작업추가
      if (nx >= 0 && ny >= 0 && nx < cols && ny < rows && map[ny][nx]) {
        map[ny][nx] = 0;
        queue.push([nx, ny, count + 1]);
      }
    }
  }
  console.log("count");
  return Number.MAX_SAFE_INTEGER;
}

[
  // {
  //   maze: [
  //     1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1,
  //   ],
  //   goal: [4, 6],
  // },
  {
    maze: [
      1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    ],
    goal: [4, 6],
  },
].forEach(({ maze, goal }) => {
  // console.log(solution(maze, goal));
  console.log(solutionBFS(maze, goal));
});

let rootArr = [
  [1, 2, 3],
  [4, 5, 6],
];

function foo(arr) {
  arr[0][1] = 10;
  //
  console.log("arr", arr);
}
