/**
 * 문자열과 점수
 *
 * 알파벳 소문자로 구성된 길이 1 이상의 두 문자열 X, Y가 있다.
 * 이 문자열들의 임의의 위치에 공백을 삽입하여 두 문자열의 길이를 같게 만든 다음,
 * 앞에서부터 한 글자씩 살펴보면서, 같은 위치에 있는 두 문자 X[i], Y[i]에 대해서 다음과 같이 점수를 계산한다.
 *
 * 두 문자가 같은 경우에는 A(> 0)점을 받게 된다.
 * 단, 두 문자가 모두 공백인 경우는 허용되지 않는다.
 * 두 문자 중 적어도 하나가 공백인 경우에는 B(< 0)점을 받게 된다.
 * 두 문자가 모두 공백이 아니고 서로 다른 경우에는 C(< 0)점을 받게 된다.
 *
 * 예를 들어 A = 10, B = -1, C = -5인 경우, 다음과 같은 경우들을 살펴보자
 *
 * ex)
 *  a bc
 *   d c
 *
 * a공백=B, 공백d=B, b공백=B, cc=A
 *  -1       -1      -1    10 = 총점 7
 * 이 경우 앞에서부터 점수를 계산하면 각각 -1, -1, -1, 10점이 되고 따라서 총점은 7점이 된다.
 *
 *
 * 두 문자열이 주어졌을 때, 공백을 적절히 추가했을 때 얻을 수 있는 최대 총점을 구하는 프로그램을 작성하시오.
 *
 *
 * 입력
 * 첫째 줄에 세 정수 A, B, C (0 < A ≤ 10,000, -10,000 ≤ B, C < 0) 가 주어진다.
 * 그리고 둘째 줄에 X가, 셋째 줄에 Y가 주어진다.
 * 각 문자열의 길이는 3,000자를 넘지 않으며 빈 문자열은 입력으로 주어지지 않는다
 *
 * 출력
 * 최대총점을 출력
 *
 * 10 -1 -5
 * abc
 * dc
 */
const getScore = (a, b, score) => {
  if (a === "-" && b === "-") return NaN;
  if (a === b) {
    return score[0];
  } else if (a === "-" || b === "-") {
    return score[1];
  } else {
    return score[2];
  }
};

/**
 * 비교를 고민하지 말고
 * 길이를 비교해 공백 추가 위치를 변경하며
 * 값을 계산한다.
 * 공백공백은 만들면 안된다.
 * 최고 점수를 만드는 경우를 고려해 보자.
 *
 * A는 최대한 만든다(서로 같은 글자)
 * 다른 문자는 공백과 같이 구성한다(B)
 * C는 최대한 피한다(서로 다른 글자),
 *
 *
 * 최대 3000자..음
 * @param {*} param0
 * @returns
 */
function solution({ score, string }) {
  let [a, b] = string;
  //짧은 문자열에서 긴 문자열을 순회하며 찾는다.?
  const dp = Array.from({ length: b.length }, () =>
    Array.from({ length: a.length }).fill(Number.MIN_SAFE_INTEGER)
  );
  const alen = a.length;
  const blen = b.length;
  const A = score[0];
  const B = score[1];
  const C = score[2];
  const tracking = (aIndex, bIndex) => {
    //범위를 벗어나면 0을 반환해 계산에 영향을 미치지 못하게 처리
    if (aIndex >= alen || bIndex >= blen) {
      return 0;
    }
    let ret = dp[bIndex][aIndex];
    if (ret > Number.MIN_SAFE_INTEGER) {
      return ret;
    }
    // 공백 진행을 먼저 처리
    ret =
      Math.max(tracking(aIndex + 1, bIndex), tracking(aIndex, bIndex + 1)) + B;
    //문자가 매칭되는 경우
    ret = Math.max(
      ret,
      tracking(aIndex + 1, bIndex + 1) + (a[aIndex] === b[bIndex] ? A : C)
    );

    //dp에 기억
    dp[bIndex][aIndex] = ret;
    return dp[bIndex][aIndex];
  };

  let aa = tracking(0, 0);

  return { score, dp, aa };
}

/**
 *  abc
 * dxxx
 * cxx0
 */

[
  {
    score: [10, -1, -5],
    string: ["abc", "dc"],
  },
].forEach((info) => {
  console.log(solution(info));
});
