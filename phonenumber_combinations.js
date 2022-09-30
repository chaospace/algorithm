/**
 * 2-9까지의 인풋이 주어지면 가능한 모든 문자 조합을 리턴. 순서는 상관없음
 *
 * 전화번호 넘버와 같은 맵핑 1은 어느것에도 맵핑되지 않음.
 *
 * 1,       2,      3
 * x        abc     def
 * 4,       5,      6
 * ghi      jkl     mno
 * 7,       8,      9
 * pqrs     tuv     wxyz
 * *,       0,      #
 * +                ^
 */

/**
 * 숫자 만큼 루핑을 돌며 조합을 해야 된다.
 * 효과적인 조합은 어떻게 할까?
 * 7과 9는 4자리.
 * 맵을 이용하면 대상 문자열 추출은 쉽게 됨.
 * 재귀를 이용할 수 있는데 이전처럼 maximum call stack이 신경쓰임.
 * @param {*} digits
 */
function solution(digits) {
  const map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz"
  };
  const len = digits.length;
  // 숫자가 빈 문자열이면 빈배열 리턴
  if (len === 0) return [];
  let source = [];
  for (let i = 0; i < len; i++) {
    source = combination(source, map[digits[i]]);
  }
  return source;
}

function combination(a, b) {
  const aLen = a.length;
  if (aLen) {
    const arr = [];
    for (let i = 0; i < a.length; i++) {
      const strA = a[i];
      for (let j = 0; j < b.length; j++) {
        const strB = b[j];
        arr.push(strA + strB);
      }
    }
    return arr;
  }
  return b.split("");
}

console.log("s", solution("27"));
