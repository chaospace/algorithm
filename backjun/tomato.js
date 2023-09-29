/**
 * 토마토
 *
 * N*M 사이즈의 토마토 농장에 익은 토마토와 안 익은 토마토가 같이 있다.
 * 익은 토마토는 하루가 지나면 상하좌우에 있는 토마토에 영향을 주어 익은 토마토로 만든다.
 * 대각선은 영향이 없다.
 * 정수 1은 익은 토마토,
 *     0은 익지 않은 토마토,
 *    -1은 토마토가 들어있지 않은 칸
 *
 * input
 * 토마토 상자크기를 나타내는 M(가로),N(세로)이 주어지면 토마토가 하나 이상 있는 정보만 주어진다.
 */

const bfs = (pos, field, complete) => {
  const queue = [];
  pos.forEach((v) => {
    queue.push([...v, 0]);
  });
  const dir = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];
  const cols = field.length;
  const rows = field[0].length;
  const visited = Array.from({ length: cols }, () =>
    Array.from({ length: rows }, () => 0)
  );
  let ripeCount = 0;
  // let day = 0;
  while (queue.length) {
    const [x, y, day] = queue.shift();
    if (!visited[y][x]) {
      visited[y][x] = 1;
      field[y][x] = 1;

      if (field.flatMap((v) => v).filter((o) => o === 1).length === complete) {
        console.log("complete--", day);
        return day;
      }
    }
    for (let k = 0; k < dir.length; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];
      if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && !visited[ny][nx]) {
        if (field[ny][nx] === 0) {
          queue.push([nx, ny, day + 1]);
        } else if (field[ny][nx] === 1) {
          queue.push([nx, ny, day]);
        }
      }
    }
  }
  /*
  while (queue.length) {
    const [x, y, day] = queue.shift();
    if (!visited[y][x]) {
      visited[y][x] = 1;
      field[y][x] = 1;

      if (field.flatMap((v) => v).filter((o) => o === 1).length === complete) {
        console.log("complete--", day);
        break;
      }
    }
    for (let i = 0; i < dir.length; i++) {
      const nx = x + dir[i][0];
      const ny = y + dir[i][1];
      if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && !visited[ny][nx]) {
        if (field[ny][nx] === 0) {
          queue.push([nx, ny, day + 1]);
        } else if (field[ny][nx] === 1) {
          queue.push([nx, ny, day]);
        }
      }
    }
  }
  */
  console.log("완료!!-", -1, visited);
  return -1;
};

function solution(field) {
  const cols = field.length;
  const rows = field[0].length;
  //모든 영역이 1로 변경되는게 목적.
  //시작지점은 1인 곳을 찾아야 한다.
  const positions = [];
  const total = cols * rows;

  let empty = 0;

  //시작위치 정보 수집..
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      const v = field[y][x];
      if (v === 1) {
        positions.push([x, y]);
      } else if (v === -1) {
        empty += 1;
      }
    }
  }
  //진입점이 여러 곳일 경우 stack혹은 queue를 이용해서는 최소값을 찾을 수 없다.
  //큐에 시작점을 여러개 넣고 순차적으로 진행시킨다. visited를 통해 중복을 제거하면 결국 두 점은 한곳에서 만나게 됨.
  bfs(positions, field, total - empty);
}

[
  [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1],
  ],
  [
    [0, -1, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1],
  ],
  [
    [1, -1, 0, 0, 0, 0],
    [0, -1, 0, 0, 0, 0],
    [0, 0, 0, 0, -1, 0],
    [0, 0, 0, 0, -1, 1],
  ],
  [
    [-1, 1, 0, 0, 0],
    [0, -1, -1, -1, 0],
    [0, -1, -1, -1, 0],
    [0, -1, -1, -1, 0],
    [0, 0, 0, 0, 0],
  ],
].forEach((field) => {
  console.log(solution(field));
});
