/**
 *
 * 올바른 괄호
 * 괄호가 올바르다는 것은 '('문자로 열렸다면 ')'로 닫혀야 한다는 뜻.
 *  - "()()" 또는 "(())()"는 올바른 괄호
 *  - ")()(" 또는  "(()("는 올바르지 않은 괄호
 *
 * '(' 또는 ')' 로만 이루어진 문자열 s가 주어졌을 때, 문자열 s가 올바른 괄호이면 true 아니면 false를 return
 *
 * 쌍을 이루는지를 판단하면 된다.
 * 쌍을 이루는지 판단하는 조건은 ?
 * 시작은 무조건 '(' 로 시작해야 된다.
 * 다른 기호를 접하게 되는 index만큼 문자열을 비교해 지워나가고 그 끝에 문자열에 길이가 0이 아니면 페어가 아니다?
 *
 */

function solution(s) {
  const max = s.length;
  let count = -1;
  const OPEN = "(";
  if (s[0] === OPEN) {
    count = 1;
    for (let i = 1; i < max; i++) {
      s[i] !== OPEN ? count-- : count++;
      if (count < 0) {
        break;
      }
    }
  }
  return count === 0;
}

/**
 * 시작 괄호를 기준으로 문자열 제거 루프를 돌아보자.
 * @param {} s
 */
function solution2(s) {
  const OPEN = "(";
  const CLOSE = ")";
  const stack = [];
  // 기본 문자열 유효성 체크
  for (let i = 0; i < s.length; i++) {
    const bracket = s[i];
    // 열린 괄호를 만나면 count를 중가
    if (bracket === OPEN) {
      stack.push(bracket);
      // 닫는 괄호는 열린 괄호가 없으면 안된다.
    } else if (bracket === CLOSE && stack.length > 0) {
      stack.pop();
    } else {
      stack.push(bracket);
      break;
    }
  }
  return stack.length === 0;
}

console.log(solution2("()()"));
console.log(solution2("(())()"));
console.log(solution2("((()"));
console.log(solution2(")()("));
console.log(solution2("(()("));
console.log(solution2("()(()"));
//console.log(solution2("((((((((((((()"));
console.log(solution2("(((())))(())"));
