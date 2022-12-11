/**
N개의 문자로 구성된 문자열 S 는 다음 조건 중 하나라도 충족되면 적절하게 중첩된 것으로 간주됩니다 .

S는 비어 있습니다.
S는 " (U) " 또는 " [U] " 또는 " {U} " 형식을 갖습니다. 여기서 U는 적절하게 중첩된 문자열입니다.
S의 형식은 " VW "이며 여기서 V와 W는 적절하게 중첩된 문자열입니다.
예를 들어 문자열 " {[()()]} "는 적절하게 중첩되지만 " ([)()] "는 중첩되지 않습니다.

함수 작성:

N개의 문자로 구성된 문자열 S가 주어지면 S가 제대로 중첩되면 1을 반환하고 그렇지 않으면 0을 반환합니다.

예를 들어 S = " {[()()]} "가 주어지면 함수는 1을 반환하고
S = " ([)()] "가 주어지면 위에서 설명한 대로 함수는 0을 반환해야 합니다.

다음 가정에 대한 효율적인 알고리즘을 작성 하십시오.

N은 [ 0 .. 200,000 ] 범위 내의 정수 이고;
문자열 S는 " ( ", " { ", " [ ", " ] ", " },  ")" 문자로만 구성됩니다.
 */

function solution(S) {
  const openChars = ["(", "{", "["];
  const closeChars = {
    ")": "(",
    "]": "[",
    "}": "{"
  };
  const stack = [];
  for (let i = 0; i < S.length; i++) {
    const char = S[i];
    if (openChars.includes(char)) {
      stack.push(char);
    } else if (stack.length && closeChars[char] === stack[stack.length - 1]) {
      stack.pop();
    } else {
      // 닫기 문자가 쌍이 맞지 않게 나오면 루프 종료
      stack.push(char);
      break;
    }
  }
  return stack.length === 0;
}

solution("{[()()]}");
solution("([)()]");
