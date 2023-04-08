/**
 * n가지 종류의 동전이 있다.
 * 이 동전을 적당히 사용해서, 그 가치의 합이 k원이 되도록 하고 싶다.
 * 그러면서 동전의 개수가 최소가 되도록 하려고 한다.
 * 각각의 동전은 몇 개라도 사용할 수 있다.
 * https://www.acmicpc.net/problem/2294
 */

/**
 * sum을 0으로 만드는 최소값 찾기
 * 한 가지만 사용하는 법은 재귀를 통해 쉽게 가능하지만
 * 모든 동전을 사용하는 법은...
 * 시작 동전은 큰 값으로 시작하고 나머지가 현재 값보다 커지면 다음 동전을 메인으로 선택..
 * 나누기 방식으로 접근한다..
 * @param {*} coins
 * @param {*} sum
 */
function solution(coins, sum) {
  const loop = (i, rest) => {
    if (i >= coins.length) {
      // 나머지가 0일 경우만 유효.
      if (rest === 0) {
        return 0;
      }
      return Number.MAX_SAFE_INTEGER;
    }

    let ret = Number.MAX_SAFE_INTEGER;
    if (rest >= coins[i]) {
      ret = Math.min(ret, loop(i, rest - coins[i]) + 1);
    }
    ret = Math.min(ret, loop(i + 1, rest));
    return ret;
  };

  console.log("anser", loop(0, sum));
}

solution([1, 5, 12], 15);
