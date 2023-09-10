/**
 * 안전영역
 * 어떤 지역의 높이 정보가 주어졌을 때,
 * 장마철에 물에 잠기지 않는 안전한 영역의
 * 최대 개수를 계산하는 프로그램을 작성하시오.
 *
 * 영역은 상하좌우로 연결된 곳을 체크하고
 * 대각선은 각기 다른 지역으로 체크.
 */

const { convertStroingToGrid } = require("../libs/util");

/**
 * graph에서 key 보다 작은 값은 0, 큰 값은 1로 변경해 반환.
 * @param {*} graph
 * @param {*} key
 */
const composeMap = (graph, key) => {
  const answer = [];
  for (let y = 0; y < graph.length; y++) {
    answer[y] = [];
    for (let x = 0; x < graph[y].length; x++) {
      if (graph[y][x] <= key) {
        answer[y][x] = 0;
      } else {
        answer[y][x] = 1;
      }
    }
  }

  return answer;
};

function bfs(map, pos) {
  const queue = [pos];
  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (queue.length) {
    const [x, y, group] = queue.shift();
    if (map[y][x] === 1) {
      map[y][x] = group * -1;
      for (let i = 0; i < dir.length; i++) {
        const nx = x + dir[i][0];
        const ny = y + dir[i][1];
        if (
          nx >= 0 &&
          nx < map.length &&
          ny >= 0 &&
          ny < map.length &&
          map[ny][nx] === 1
        ) {
          // map[ny][nx] = group * -1;
          queue.push([nx, ny, group]);
        }
      }
    }
  }
}

function searchMap(map, h) {
  //const visited = map.map((v) => Array.from(v).fill(0));
  let groupCount = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map.length; x++) {
      if (map[y][x] === 1) {
        bfs(map, [x, y, (groupCount += 1)]);
      }
    }
  }
  console.log("groupCount", groupCount, "h", h, "map", map);
}

function solution(maze, n) {
  const graph = convertStroingToGrid(maze, n);
  const hmap = [];
  for (let i = 0; i < maze.length; i++) {
    if (!hmap.includes(Number(maze[i]))) {
      hmap.push(Number(maze[i]));
    }
  }
  //높이값 순으로 정렬
  hmap.sort();
  //높이값에 해당하는 맵 구성
  for (let i = 0; i < hmap.length; i++) {
    searchMap(composeMap(graph, hmap[i]), hmap[i]);
  }

  return graph;
}

[
  // {
  //   n: 5,
  //   maze: "6826232346673327253689527",
  // },
  {
    n: 7,
    maze: "9999999921212991878199279729918781992121299999999",
  },
].forEach(({ n, maze }) => {
  console.log(solution(maze, n));
});
