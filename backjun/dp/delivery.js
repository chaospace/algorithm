/**
 * 김치배달
 * 각각의 도시들과 김치 공장은 1차원 직선상의 점에 위치해 있다.
 * 공장에서 N(1 ≤ N ≤ 1,000)포기의 김치를 들고 시작.
 * 1차원 직선을 따라 왼쪽이나 오른쪽으로 움직인다.
 * 1초에 한 칸씩 이동.
 * 도시에 도착했을 때 김치는 0의 시간에 배달되는 것으로 생각.
 * 즉 도시에 도착하기만 하면 배달이 완료되는 것으로 생각.
 * 또한 김치를 배달하는 순서는 상관이 없다.
 * 각각의 김치는 모두 t = 0 의 시각에 공장에서 출발된다.
 * 각각의 김치는 1초에 1만큼씩 쉬게 되는데,
 * 김치가 쉬게 될 경우 소비자가 불만을 토로할 수 있다.
 * 따라서 월드 식품에서는 각 도시에 김치가 도착했을 때의 김치의 쉰 정도의 합을 최소로 하려 한다.
 *
 * 도시의 위치 및 김치 공장의 위치(x좌표)가 주어졌을 때,
 * 모든 도시에 김치를 배달할 때 김치의 쉰 정도의 합의 최솟값을 구하는 함수 작성.
 *
 * 입력
 * 두 정수 N, L이 주어진다.
 * L은 김치 공장의 x좌표이다.
 * 다음 N개의 줄에는 김치를 배달할 도시의 x좌표가 주어진다.
 * 모든 좌표는 1이상 1,000,000이하의 정수.
 *
 * 쉰 정도를 구하는 방식
 *  - 이동거리 * 남은 배달지
 *
 * ex)
 * 공장위치 10
 * 배달지  1, 9, 11, 19
 * -배달을 현재 위치에서 가까운 곳부터 처리하는게 모든 김치의 쉰 정도를 가장 낮게 할 수 있다.
 * 좌로 1이동 후 9 제거( 쉰정도는 1*4 = 4 )
 * 우로 2이동 후 11제거( 쉰정도는 2*3 = 6 )
 * 우로 8이동 후 19제거( 쉰정도는 8*2 = 16)
 * 좌로 18이동 후 1제거( 쉰정도는 18*1= 18)
 * 총 16+4 = 20 + 24= 44
 * 또는 누적합 = 1 3 11 29=44
 *
 * 누적 이동거리가 가장 짧은 루트를 찾아야 한다.
 * 좌우 이동이 모두 똑같은 포인트가 있다면 그건 문제가 된다.
 * 문제에서는 좌, 우로 생각한다면 좌로 가서 가까운 거리와 우로 가서 가까운 거리를 가져오면 된다.
 *
 * 우로 1이동 후 11제거( 1 )
 * 좌로 2이동 후 9제거 ( 3 )
 * 좌로 8이동 후 1제거 ( 11 )
 * 우로 18이동 후 19제거 ( 29 )
 *
 * */

function solution({ L, N }) {
  const max = N.length;

  const tracking = (history, current) => {
    if (history.length > max) {
      return history;
    }
    history.push(current);
    let distance = Number.MAX_SAFE_INTEGER;
    let position = -1;
    for (let i = 0; i < max; i++) {
      const n = N[i];
      if (history.indexOf(n) < 0) {
        const d = Math.abs(current - n);
        if (distance > d) {
          distance = d;
          position = n;
        }
      }
    }
    return tracking(history, position);
  };

  const answer = tracking([], L);

  return { L, N, answer };
}

const upperBound = (arr, value, start = 0, end = arr.length) => {
  if (start === end) {
    return start;
  }
  let mid = (start + end) >> 1;
  if (arr[mid] < value) {
    start = mid + 1;
  } else {
    end = mid;
  }
  return upperBound(arr, value, start, end);
};

const getNearDistance = (source, current) => {
  const distance = [];
  for (let i = 0; i < source.length; i++) {
    const position = source[i];
    distance[i] = Math.abs(position - current);
  }
  return distance;
};

/**
 * dfs처럼 그냥 초기 진입점을 찾은 후
 * 그 곳을 시작으로 가까운 거리 순으로 이동처리..
 * @param {*} param0
 * @returns
 */
function solutionB({ L, N }) {
  const queue = [[L, Number.MAX_SAFE_INTEGER]];
  const answer = [];
  while (queue.length || N.length) {
    const [current, distance] = queue.shift();
    let next = [current, distance];
    for (let i = 0; i < N.length; i++) {
      const d = Math.abs(N[i] - current);
      if (next[1] >= d) {
        next[1] = d;
        next[0] = N[i];
      }
    }
    //시작값과 다르면 queue에 추가처리
    if (next[0] !== current) {
      N.splice(N.indexOf(next[0]), 1);
      answer.push((answer[answer.length - 1] || 0) + next[1]);
      queue.push([next[0], Number.MAX_SAFE_INTEGER]);
    }
  }

  return { answer, sum: answer.reduce((c, v) => c + v, 0) };
}

function solutionC({ L, N }) {
  const max = N.length;
  const tracking = (current, move, visited, history) => {
    if (history.length >= max) {
      history.push(move);
      console.log(
        "sum",
        history.reduce((c, v) => c + v, 0),
        history
      );
    }
    for (let i = 0; i < max; i++) {
      if ((visited & (1 << i)) === 0) {
        tracking(N[i], move + Math.abs(current - N[i]), visited | (1 << i), [
          ...history,
          move,
        ]);
      }
    }
  };

  const dp = Array.from({ length: 1 << max }).fill(Number.MAX_SAFE_INTEGER);

  const trackingBinary = (current, move, visited) => {
    let v = dp[visited];
    if (v < Number.MAX_SAFE_INTEGER) {
      return v;
    }

    if (visited === (1 << max) - 1) {
      return move;
    }

    for (let i = 0; i < max; i++) {
      //방문하지 않은 인덱스면 방문
      if ((visited & (1 << i)) === 0) {
        //누적합 처리
        v = Math.min(
          v,
          move +
            trackingBinary(
              N[i],
              move + Math.abs(current - N[i]),
              visited | (1 << i)
            )
        );
      }
    }
    dp[visited] = v;
    return v;
  };

  let a = trackingBinary(L, 0, 0);
  return { N, L, a, dp };
}

/**
 * 좌측 5이동 (20 제거) 5
 * 우측 10이동(30제거) 15
 * 우측  5이동(35제거) 20
 * 좌측 34이동(1제거)  54
 * 총 = 20+20+54=94
 */

[
  {
    L: 10,
    N: [1, 9, 11, 19],
    o: 44,
  },
  {
    L: 15,
    N: [1, 20, 30, 35],
    o: 94,
  },
].forEach((info) => {
  //   console.log(solution(info));
  // console.log(solutionB(info));
  console.log(solutionC(info));
});

let v = 0;
console.log(v | (1 << 1));
console.log(v | (1 << 2));
console.log(v | (1 << 3));
console.log(v | (1 << 4));
console.log(v | (1 << 5).toString(2));
