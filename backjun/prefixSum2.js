/**
 * 타일형태의 구간합 구하기
 * N×N개의 수가 N×N 크기의 표에 채워져 있다. (x1, y1)부터 (x2, y2)까지 합을 구하는 프로그램을 작성
 *
 * ex)
 * 1	2	3	4
 * 2	3	4	5
 * 3	4	5	6
 * 4	5	6	7
 * 여기서 (2, 2)부터 (3, 4)까지 합을 구하면 3+4+5+4+5+6 = 27이고, (4, 4)부터 (4, 4)까지 합을 구하면 7이다.
 */

/**
 *
 * @param {*} grid N*N 이중 배열
 * @param {*} pos  grid에서 찾아야 할 구간 정보를 가진 이중 배열 [x1, y1, x2, y2] 순서로 구성됨.
 */
function solution(grid, pos) {
  const answer = [];
  for (let i = 0; i < pos.length; i++) {
    //pos에 좌표가 1부터 사용해서 -1을 해줘야 함.
    const [x1, y1, x2, y2] = pos[i];
    let sum = 0;
    for (let y = y1 - 1; y < y2; y++) {
      for (let x = x1 - 1; x < x2; x++) {
        sum += grid[y][x];
      }
    }
    answer.push(sum);
  }
  return answer;
}

function solutionDP(grid, pos) {
  const dp = Array.from({ length: grid.length + 1 }, (_) =>
    Array.from({ length: grid.length + 1 }).fill(0)
  );

  for (let y = 1; y < dp.length; y++) {
    for (let x = 1; x < dp[y].length; x++) {
      //직전 행과 렬에 구간합을 더하고 중복되는 이전행렬값을 제거해줌.
      dp[y][x] =
        dp[y - 1][x] + dp[y][x - 1] + grid[y - 1][x - 1] - dp[y - 1][x - 1];
    }
  }
  pos.forEach(([x1, y1, x2, y2]) => {
    //순수 구간 합 구하기
    //구간합 계산에 더해줌 값을 역으로 제거해 준다.
    const d = dp[y2][x2];
    //찾는 구간의 행과 열의값은 반영되면 안되니 x1-1, y1-1을 빼주고, 중복으로 제거된 직전행렬은 값은 다시 추가해줌.
    const m = dp[y2][x1 - 1];
    const n = dp[y1 - 1][x2];
    const p = dp[y1 - 1][x1 - 1];
    console.log(d - (m + n) + p);
  });
  return dp;
}
[
  {
    grid: [
      [1, 2, 3, 4],
      [2, 3, 4, 5],
      [3, 4, 5, 6],
      [4, 5, 6, 7],
    ],
    pos: [
      [2, 2, 3, 4],
      [3, 4, 3, 4],
      [1, 1, 4, 4],
    ],
  },
  {
    grid: [
      [1, 2],
      [3, 4],
    ],
    pos: [
      [1, 1, 1, 1],
      [1, 2, 1, 2],
      [2, 1, 2, 1],
      [2, 2, 2, 2],
    ],
  },
].forEach(({ grid, pos }) => {
  console.log(solution(grid, pos));
  console.log(solutionDP(grid, pos));
});

//그리드에 구간합
//1, 3
//4, 7+4-1

const wonArrayPrefixSum = (arr) => {
  const sum = [0];
  arr.forEach((v, i) => {
    sum[i + 1] = sum[i] + v;
  });
  return sum;
};

const getPrefixSum = (sum, from, to) => {
  return sum[to] - sum[from - 1];
};

const tileArrayPrefixSum = (arr) => {
  const dp = Array.from({ length: arr.length + 1 }, () =>
    Array.from({ length: arr.length + 1 }).fill(0)
  );
  for (let y = 1; y < dp.length; y++) {
    for (let x = 1; x < dp.length; x++) {
      dp[y][x] =
        dp[y - 1][x] + dp[y][x - 1] + arr[y - 1][x - 1] - dp[y - 1][x - 1];
    }
  }
  return dp;
};

const getTileArrayPrefixSum = (array, x1, y1, x2, y2) => {
  return (
    array[y2][x2] -
    (array[y2][x1 - 1] + array[y1 - 1][x2]) +
    array[y1 - 1][x1 - 1]
  );
};

// console.log("1-3", getPrefixSum(wonArrayPrefixSum([1, 2, 3, 4, 5]), 2, 3));

const tileArr = tileArrayPrefixSum([
  [1, 2],
  [3, 4],
]);
console.log(getTileArrayPrefixSum(tileArr, 2, 1, 2, 2));
