/**
 * 숫자 A, B가 주어지면
 * A만큼 문자열 a, B는 문자열 b로 변환 후 반환
 * 단 연속3번을 반복할 수 없음
 *
 * ex)
 * A=5, B=3
 * output "aabaabab" "abaabaab" "aabaabba"
 *
 * A=3, B=3
 * output "ababab", "aabbab", "abaabb"
 */

/**
 * 모듈러 연산자를 통해 이중포문 돌리면 무조건 성공할 듯.
 * @param {*} A
 * @param {*} B
 */
function solution(A, B) {
  const aQuotient = Math.floor(A / 2);
  const aRest = A % 2;
  const bQuotient = Math.floor(B / 2);
  const bRest = B % 2;
  console.log("ainfo", aQuotient, aRest);
  console.log("binfo", bQuotient, bRest);
}

solution(5, 3);
