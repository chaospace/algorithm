/**
 * LCS(Longest Common Subsequence, 최장 공통 부분 수열)문제는 두 수열이 주어졌을 때,
 * 모두의 부분 수열이 되는 수열 중 가장 긴 것을 찾는 문제이다.
 *
 * ex)
 * input:  ACAYKP CAPCAK
 * output: ACAK
 * 최대 : 1000글자
 * 응답 : 0.1 초
 *
 * 재귀를 이용한 방식으로 접근
 *  - (재귀 종료 조건) x === 0 || y === 0 (우에서 좌로 검색) 좌에서 우로 검색 x>=a.length || y>=b.length
 *  - a[x] === b[y] (인덱스에 문자열이 같은 경우) 해당 문자열을 추가 후 리턴
 *  - 그렇지 않은 경우 Math.max(a[x-1] b[y].length, a[x] b[y-1].length) <- 좌우에 문자를 서로 지워가면 결과값 중 큰 것을 채택하며 재귀를 이어감.
 */

//찾아야 하는 공통 문자가 순차적으로 나오지 않으면 찾을 수 없음.
function solution(list) {
  let [a, b] = list;
  let answer = "";
  //l을 기준으로 r을 움직인다.
  let l = 0;
  let r = 0;

  while (l < a.length) {
    if (a[l] === b[r]) {
      answer += a[l];
      l++;
    }
    //비교 문자열에 인덱스를 먼저 처리
    if (r + 1 < b.length) {
      r++;
    } else {
      l++;
    }
  }
  return answer;
}

function solutionBackTracking(list) {
  let [a, b] = list;

  const tracking = (str, l, r) => {
    if (l === 0 || r === 0) {
      return str;
    } else if (a[l - 1] === b[r - 1]) {
      return tracking(a[l - 1] + str, l - 1, r - 1);
    } else {
      const resultL = tracking(str, l - 1, r);
      const resultR = tracking(str, l, r - 1);
      return resultL.length > resultR.length ? resultL : resultR;
    }
  };

  const c = tracking("", a.length, b.length);
  return { c, len: c.length };
}

function solutionTrackingFront(list) {
  let [a, b] = list;
  const tracking = (str, l, r) => {
    if (l >= a.length || r >= b.length) {
      return str;
    } else if (a[l] === b[r]) {
      return tracking(str + a[l], l + 1, r + 1);
    } else {
      const lr = tracking(str, l + 1, r);
      const rr = tracking(str, l, r + 1);
      return lr.length > rr.length ? lr : rr;
    }
  };
  const c = tracking("", 0, 0);
  return c;
}

[
  ["ACAYKP", "CAPCAK"],
  ["AGGTABC", "GXTXAYB"],
].forEach((list) => {
  console.log(solution(list));
  console.log(solutionBackTracking(list));
  console.log(solutionTrackingFront(list));
});
