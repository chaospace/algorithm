/**
 * 매일 측정한 온도가 정수의 수열로 주어졌을 때, 연속적인 며칠 동안의 온도의 합이 가장 큰 값을 계산
 *
 * 아래와 같이 10일 간의 온도가 주어졌을 때
 * 3 -2 -4 -9 0 3 7 13 8 -3
 * 모든 연속적인 이틀간의 온도의 합중 가장 큰 값은?
 * 21
 *
 * 5일 간의 합에서 가장 큰 값은 ?
 * 31
 *
 */

function solution(temps, k) {
  //구간 합 구하기
  const store = [];
  //전체 합을 먼저 구한다.
  temps.forEach((v) => {
    if (store.length) {
      store.push(store[store.length - 1] + v);
    } else {
      store.push(v);
    }
  });

  //k 구간에 합 보기
  const ksum = [];
  for (let i = k; i <= store.length; i++) {
    const l = i - 1;
    const r = l - k;
    ksum.push(store[l] - (store[r] || 0));
  }
  //console.log("ori", temps);
  return ksum.sort((a, b) => b - a)[0]; //가장 큰 수 반환;
}

[
  {
    temps: [3, -2, -4, -9, 0, 3, 7, 13, 8, -3],
    k: 2,
  },
  {
    temps: [3, -2, -4, -9, 0, 3, 7, 13, 8, -3],
    k: 5,
  },
].forEach(({ temps, k }) => {
  console.log(solution(temps, k));
});
