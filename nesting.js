/**

N개의 문자로 구성된 문자열 S는 다음과 같은 경우 적절하게 중첩되었다고 합니다.

S는 비어 있습니다.
S는 " (U) " 형식을 가지며 여기서 U는 적절하게 중첩된 문자열입니다.
S의 형식은 " VW "이며 여기서 V와 W는 적절하게 중첩된 문자열입니다.
예를 들어 문자열 " (()(())()) "은 제대로 중첩되지만 문자열 " ()) "은 중첩되지 않습니다.

함수 작성:

기능 솔루션(S);

N개의 문자로 구성된 문자열 S가 주어지면 문자열 S가 제대로 중첩되면 1을 반환하고 그렇지 않으면 0을 반환합니다.

예를 들어 S = " (()(())()) "가 주어지면 함수는 1을 반환해야 하고 S = " ()) "가 
주어지면 위에서 설명한 대로 함수는 0을 반환해야 합니다.

다음 가정에 대한 효율적인 알고리즘을 작성 하십시오.

N은 범위 [ 0 .. 1,000,000 ] 내의 정수 이고;
문자열 S는 문자 " ( " 및/또는 " ) "로만 구성됩니다.
*/

/**
 * 올바른 중첩 여부 판단.
 * @param {} S
 */
function solution(S) {
  const stack = [];
  let l = 0;
  const len = S.length;
  while (l < len) {
    const char = S[l];
    if (char === "(") {
      stack.push(char);
    } else if (stack.length && stack[stack.length - 1] !== char) {
      stack.pop();
    } else {
      stack.push(char);
      break;
    }
    l++;
  }

  return stack.length === 0 ? 1 : 0;
}

solution("(()(())())");
solution("(()(())()))");
solution("((())()()()())");
solution("((()))()()()())");
