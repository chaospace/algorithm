/**
 * 문자열 s가 주어졌을 때, S의 서로 다른 부분 문자열의 개수를 구하는 프로그램 작성.
 *
 * 부분 문자열
 *  - s에서 연속된 일부분을 말하며, 길이가 1보다 크거나 같아야 한다.
 *
 * ex)
 * input : ababc
 * output : a, b, a, b, c, ab, ba, bc, aba, bab, abc, abab, babc, ababc
 */

function solutionBackTracking(s) {
  const backtracking = (current, idx, max, result) => {
    if (idx >= max) {
      return [...result, current];
    }

    return backtracking(current + s[idx + 1], idx + 1, max, [
      ...result,
      current,
    ]);
  };

  const backTrackingAd = (current, idx, max, result) => {
    if (idx >= max) {
      return [...result, current];
    }

    let sub = backTrackingAd(s[idx + 1], idx + 1, max, []);
    return backTrackingAd(current + s[idx + 1], idx + 1, max, [
      current,
      ...result,
      ...sub,
    ]);
  };

  return new Set(backTrackingAd(s[0], 0, s.length - 1, []));
  //   let answer = [];
  //   for (let i = 0; i < s.length; i++) {
  //     answer = [...answer, ...backtracking(s[i], i, s.length - 1, [])];
  //   }
  //   return new Set(answer);
}

function solution(s) {
  const max = s.length;
  const answer = [];
  for (let i = 0; i < max; i++) {
    for (let j = i + 1; j <= max; j++) {
      answer.push(s.substring(i, j));
    }
  }

  return new Set(answer);
}

["ababc"].forEach((s) => {
  console.log(solutionBackTracking(s));
  //   console.log(solution(s));
});
