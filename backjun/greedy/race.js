/**
 * 레이스
 * 세준이는 세준항공으로 돈을 무지막지하게 번 뒤, 레이스 대회를 개최했다.
 * 레이스 트랙은 길이가 N인 직선이다.
 * 세준이는 심판 M명을 적절한 곳에 배치시키려고 한다.
 * 심판은 아무 곳에나 배치시킬 수 있지 않다.
 * 심판은 미리 정해진 K개의 곳에만 위치할 수 있다.
 * 세준이는 심판을 배치할 때, 가장 가까운 두 심판의 거리를 최대로 하려고 한다.
 * 심판을 어디에 배치시켜야 할지 구하는 프로그램을 작성하시오.
 * 가장 가까운 심판이 최대로 할 때..
 *
 * 입력
 * 첫째 줄에 N(레이스 트랙길이), M(심판수), K(심판이 있을 수 있는 위치)가 주어진다.
 * N은 1,000,000보다 작거나 같은 자연수이고, M은 K보다 작거나 같은 자연수이다.
 * 또, K는 2보다 크거나 같고, 50보다 작거나 같다.
 * 둘째 줄에 심판이 있을 수 있는 K개의 위치가 주어진다.
 * K개의 위치는 N보다 작거나 같은 자연수 또는 0이며, 오름차순으로 주어진다.
 *
 *
 * N:11 M:3 K:4
 * K의 위치 : 0 5 10 11
 *
 * output:
 * 1110
 *
 * input:
 * 11 2 4
 * 0 5 10 11
 * 1001
 *
 * input
 * 11 4 4
 * 0 5 10 11
 * 1 1 1 1
 *
 * input
 * 1000 5 10
 * 6 9 33 59 100 341 431 444 565 857
 * 1 0 0  0  0    1   0   1   1   1
 */

/**
 * 거리가 주어지고        :n
 * 놓아야 할 심판 수      :m
 * 심판이 있을 수 있는 자리 :pos
 * @param {*} param0
 * @returns
 */

function solution({ n, m, pos }) {
  //

  let s = 0;
  let e = n;
  let history = [];
  let answer = [];
  let prev = 0;
  let store = [];
  let gap = 0;
  while (s <= e) {
    answer = [pos[0]];
    prev = 0;

    const mid = (s + e) >> 1;
    history.push([mid, 0]);
    for (let i = 1; i < pos.length && answer.length <= m; i++) {
      const distance = pos[i] - pos[prev];
      // mid 이상일 경우 answer에 추가하고 이전 위치 기억.
      if (distance >= mid) {
        answer.push(pos[i]);
        prev = i;
      }
    }
    // 조건에 해당하는 위치를 기억.
    history[history.length - 1][1] = answer.length;
    //조건을 달성 했으면 더 넓은 범위의 배치 가능성을 검토..
    if (answer.length >= m) {
      s = mid + 1;
      gap = Math.max(gap, mid);
      store.push([...answer]);
    } else {
      // 못 찾은 경우 범위를 줄여서 검토..
      e = mid - 1;
    }
  }
  return { store, gap, history };
}

[
  {
    n: 11,
    m: 3,
    pos: [0, 5, 10, 11],
  },
  {
    n: 11,
    m: 2,
    pos: [0, 5, 10, 11],
  },
  {
    n: 1000,
    m: 5,
    pos: [6, 9, 33, 59, 100, 341, 431, 444, 565, 857],
  },
].forEach((info) => console.log(solution(info)));

/**
 * 최소값이 가장 큰 시작점을 찾는게 중요.
 * 한 점을 찾으면 그 다음은 시작보다 크거나 같은 거리를 찾아가며 추가하면 된다.
 */
