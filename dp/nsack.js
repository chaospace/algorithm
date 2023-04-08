/**
 * 배낭채우기
 * 주어진 정보를 이용해 배낭에 가장 많이 담을 수 있는 무게를 찾아서 들어있는 물건 목록을 반환
 *
 * input
 * weight = [2, 3, 4, 5] // 물건 무게
 * values = [3, 4, 5, 6] // 물건 가치
 * limit  = 5            // 배낭무게 제한
 */

/**
 * 무게당 가치를 어떻게 비교할까?
 *
 * 배낭무게  1, 2, 3, 4, 5, 6, 7
 * 0       0             13,
 * 1                8,
 * 2
 * 3
 *
 * @param {*} weights
 * @param {*} values
 * @param {*} limit
 */
function solution(weights, values, limit) {
  //console.log(w_sum, v_sum);
  const max = weights.length;
  //물건 및 배낭에 대한 가치 참조 객체
  const valueTable = [];
  for (let i = 0; i <= max; i++) {
    valueTable.push(Array(limit + 1).fill(0));
  }
  // 배낭에 담을 수 있는 무게별 최대 값을 계산.
  for (let i = 1; i <= max; i++) {
    let w = weights[i - 1];
    let v = values[i - 1];
    for (let j = 1; j <= limit; j++) {
      // 물건 무게가 배낭현재 무게보다 클 경우 이전 값 사용.
      if (j < w) {
        valueTable[i][j] = valueTable[i - 1][j];
      } else {
        // 배낭 무게를 초과하지 않는다면 이전값과 추가한 무게중 큰 값을 사용
        valueTable[i][j] = Math.max(
          valueTable[i - 1][j],
          valueTable[i - 1][j - w] + v
        );
      }
    }
  }
  console.log("store", valueTable, valueTable[max][limit]);
}

/**
 * 백트래킹 접근?
 *  - limit값과 인덱스 정보를 넘기며 limit값이 0이 될때 까지 재귀를 타는 건가?
 * @param {*} weights
 * @param {*} values
 * @param {*} limit
 */
function solutionBacktracking(weights, values, limit) {
  const max = weights.length;
  let max_v = 0;
  function backtracking(n, index, value) {
    // 용량 초가만 아니면 모든 경우를 체크하기 위해 다음으로 넘김.
    if (n < 0) return;
    // 무게가 꽉 차거나 범위를 벗어나면 최대값 체크.
    if (n === 0 || index > max) {
      max_v = Math.max(max_v, value);
      console.log("values", max_v, value);
      return;
    }
    const w = weights[index];
    const v = values[index];
    // 담을 수 있는 무게라면 추가
    if (n - w >= 0) {
      value += v;
      n -= w;
    }
    backtracking(n, index + 1, value);
  }

  for (let i = 0; i < weights.length; i++) {
    backtracking(limit, i, 0);
  }
}

//solution([6, 4, 3, 5], [13, 8, 6, 12], 7);
//solution([6, 4, 3, 5], [13, 8, 6, 20], 7);
//solutionBacktracking([6, 4, 3, 5], [13, 8, 6, 12], 7);
solutionBacktracking([6, 1, 1, 5], [13, 8, 6, 20], 7);
