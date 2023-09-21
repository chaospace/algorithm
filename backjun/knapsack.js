/**
 * 냅섹
 * 세진이는 N개의 물건을 가지고 있고, 최대 C만큼의 무게를 넣을 수 있는 가방을 가지고 있다.
 * N개의 물건을 가방에 넣는 방법의 수를 구하는 프로그램을 작성.
 *
 * N<=30
 * C<=10^9
 *
 * 배낭에 물건을 조합할 수 있는 경우의 수 구하기.
 */

/**
 * 가지치기의 전개
 * 1 2 3 4
 *   1 2 3
 *     1 2
 *       1
 *
 * @param {*} source
 * @param {*} current
 * @param {*} start
 * @param {*} end
 */

function upperBound(source, key, start = 0, end = source.length) {
  if (start === end) {
    return start;
  }
  if (start < end) {
    const mid = (start + end) >> 1;
    if (source[mid] <= key) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }
  return upperBound(source, key, start, end);
}

/**
 * 가방에 물건을 넣는 경우의 수
 * - 아무것도 넣지 않는다
 * - 물건을 넣으며 배낭에 용량을 물건 무게를 제거한다.
 * - 물건을 넣고 무게가 남으면 다음 물건도 넣는다. <-
 * @param {*} elements
 * @param {*} limit
 * @returns
 */
function solution(elements, limit) {
  const mid = elements.length / 2;
  const a = elements.slice(0, mid);
  const b = elements.slice(mid);
  let a_sum = [];
  let b_sum = [];
  const loop = (list, l, w, store) => {
    if (l >= list.length) {
      store.push(w);
      return;
    }
    // 현재 물건만 가방에 넣는 경우.
    loop(list, l + 1, w, store);
    // 다음 물건을 가방에 같이 넣는 경우
    loop(list, l + 1, w + list[l], store);
  };

  //loop를 돌아야 모든 원소와 합을 구할 수 있음.
  //부분합은 시작 원소만 확인 가능.
  loop(a, 0, 0, a_sum);
  loop(b, 0, 0, b_sum);
  b_sum.sort((a, b) => a - b);
  let cnt = 0;
  for (let i = 0; i < a_sum.length; i++) {
    if (limit - a_sum[i] < 0) {
      continue;
    }
    //limit-a_sum[i]가 추가될 수 있는 인데스 좌측은 모두 limit-a_sum[i]보다 작은 값을 보증.
    const n = upperBound(b_sum, limit - a_sum[i]);
    cnt += n;
  }
  console.log(a_sum, b_sum);
  return cnt;
}

[
  // {
  //   elements: [1, 1],
  //   limit: 1,
  // },
  // {
  //   elements: [1, 1],
  //   limit: 2,
  // },
  // {
  //   elements: [2, 2],
  //   limit: 1,
  // },
  {
    elements: [1, 2, 1, 3],
    limit: 2,
  },
].forEach(({ elements, limit }) => {
  console.log(solution(elements, limit));
});
