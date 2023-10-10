/**
 * 세탁소
 *
 * 거스름돈의 액수가 주어지면 리암이 줘야할
 * 쿼터(Quarter, $0.25)의 개수,
 * 다임(Dime, $0.10)의 개수,
 * 니켈(Nickel, $0.05)의 개수,
 * 페니(Penny, $0.01)의 개수를 구하는 프로그램을 작성하시오.
 *
 * 거스름돈은 항상 $5.00 이하이고,
 * 손님이 받는 동전의 개수를 최소로 하려고 한다.
 *
 * 예를 들어, $1.24를 거슬러 주어야 한다면,
 * 손님은 4쿼터, 2다임, 0니켈, 4페니를 받게 된다.
 *
 * 거스름돈을 나타내는 C를 정수로 받으면 거스름돈으로 사용되는 코인의 갯수를 공백으로 구분해 리턴.
 * 1<=c<=500
 */

const getArrayElementCount = (arr) => {
  return arr.reduce((store, v) => {
    if (!store[v]) {
      store[v] = 1;
    } else {
      store[v] += 1;
    }
    return store;
  }, {});
};

const COINS = [25, 10, 5, 1];

function solutionLoop(c) {
  let idx = 0;
  let t = c;
  let answer = [];
  while (t > 0) {
    const coin = COINS[idx];
    if (t >= coin) {
      t -= coin;
      answer.push(coin);
    } else if (idx < COINS.length) {
      idx = idx + 1;
    }
  }

  return getArrayElementCount(answer);
}

function solution(c) {
  const answer = {};
  for (let i = 0, t = c; i < COINS.length && t >= 0; i++) {
    const v = COINS[i];
    const d = Math.floor(t / v);
    if (d) {
      t -= d * v;
    }
    //answer.push(d);
    answer[v] = d;
  }
  return answer;
}

[124, 25, 194].forEach((v) => {
  console.log("req", v);
  //   console.log(solutionLoop(v));
  console.log(solution(v));
});
