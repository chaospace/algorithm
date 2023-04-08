/**
 * 가장적은 오차제곱의 합
 * 주어진 수열을 k개의 숫자로 변경할 때 원본 수와 비교해 오차 제곱의 합이 가장 적은 조합찾아서 반환
 * input
 * arr = 12345
 * k   = 2
 *
 * 2, 2, 3, 3, 3 = -1,0,0,1,2(오차) = 1+0+0+1+4(제곱) = 6(합)
 * 2, 2, 2, 4, 4 = -1, 0,1,0,1     = 1+0+1+0+1(제곱) = 3(합)
 * output
 * 3
 *
 */

/**
 * 양자화..
 * 원본과 가장 적은 차이를 가진 양자화는..
 *  - 중복되는 수를 먼저 체크하는게 좋을거 같음.
 *  - 다음으로 전체평균을 구해보는 것도.
 * 비슷한 그룹을 묶어보자
 * @param {*} n
 */

function getAvg(list, start) {
  console.log("list", list);
}

/**
 * k에 앞뒤로 1을 보간하며 제공되는 배열에서 가장 가까운 평균값 찾기를 k만큼 반복해야 됨.
 * @param {*} n
 * @param {*} k
 */
function solution(n, k) {
  const sorted = [...n].sort((a, b) => a - b);
  const groupSize = Math.round(sorted.length / k);

  for (let i = 0; i < Math.round(sorted.length / groupSize); i++) {
    let s = i * groupSize;
    const sub = sorted.slice(s, s + groupSize);
    console.log(
      "sub",
      sub,
      "avg",
      Math.floor(sub.reduce((c, v) => c + v, 0) / sub.length)
    );
  }
}

/**
 * arr에 구간합을 만들어서 리턴하는 함수
 * @param {*} arr
 */
function getPreSum(arr) {
  const sum = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    sum[i] = sum[i - 1] + arr[i];
  }
  return sum;
}

/**
 * 구간 제곱에 합을 반환
 * @param {*} source
 */
function getSqrtSum(source) {
  const pSqrt = [Math.pow(source[0], 2)];
  for (let i = 1; i < source.length; i++) {
    pSqrt[i] = pSqrt[i - 1] + Math.pow(source[i], 2);
  }
  return pSqrt;
}

/**
 * 미리계산된 합에서 start, end 구간에 합을 리턴
 * @param {*} pSum
 * @param {*} start
 * @param {*} end
 * @returns
 */
function getRangeSum(pSum, start, end) {
  return pSum[end] - (pSum[start - 1] || 0);
}

function getRangeAvg(pSum, start, end) {
  return getRangeSum(pSum, start, end) / (end - start + 1);
}

/**
 * 오차제곱을 리턴
 * @param {*} pSqrt
 * @param {*} pSum
 * @param {*} start
 * @param {*} end
 */
function getMinError(pSqrt, pSum, start, end) {
  const sum = getRangeSum(pSum, start, end);
  const range = end - start + 1;
  //구간 평균 구하기
  const m = Math.round(sum / range);
  //구간 합의 제곱
  const sqrtSum = getRangeSum(pSqrt, start, end);
  // 오차제곱의 합 = 시그마(i=start,to=end)( a(구간합) - m(구간평균) )^2 =  = a^2-2am+m^2
  const ret = sqrtSum - 2 * m * sum + Math.pow(m, 2) * range;
  return ret;
}

const arr = [897, 902, 890];
const pSum = getPreSum(arr);
const pSqrtSum = getSqrtSum(arr);
//console.log("pSum", pSum);
//console.log("pSqrt", pSqrtSum);
console.log("sqrt-avg", getRangeSum(pSqrtSum, 0, 2));
console.log("sqrt-avg", getRangeAvg(pSum, 0, 2));
console.log("0-2-variance", getMinError(pSqrtSum, pSum, 0, 2));
//console.log("3-5-variance", getQuantization(pSqrtSum, pSum, 3, 5));

// solution([1, 2, 3, 4, 5], 2);
// solution([3, 3, 3, 1, 2, 3, 2, 2, 2, 1], 3);
// solution([1, 744, 755, 4, 897, 902, 890, 6, 777], 3);
