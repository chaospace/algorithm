/**
 * 올바른 괄호
 * 문자열 s는 ()[]{}로 이루어져 있고 아래 조건에 부합하는 올바른 문자열을 찾아라
 *
 * - 열린 괄호는 반드시 같은 형식의 괄호로 닫혀야 함.
 * - 열린 괄호는 올바른 순서로 닫혀야 함.
 *
 * 문자열은 괄호로만 구성됨.
 * input ()
 * output true
 * input ()[]{}
 * output true
 * input (]
 * output false
 */

/**
 * 열고 닫고를 판단하는 기준은?
 * 쌍이 맞을 수도 있고
 * 중첩이 될 수도 있다.
 * pair를 결정하는 방법은...
 *
 * 시작은 무조건 open으로 해야 함.
 *  - 이 조건은 close를 만나기 전까지 반복
 *  - close를 만나면 open count만큼 close가 나와야 함.
 * (([]))
 * ()[(())]
 * @param {*} s
 */

const parenthesesMap = new Map();
parenthesesMap.set("(", ")");
parenthesesMap.set("{", "}");
parenthesesMap.set("[", "]");

function solution(s) {
  const len = s.length;
  let o = len % 2 == 0;
  if (!o) return o;
  let l = 0;
  let stack = [];
  while (l < len) {
    // 닫힘 문자를 만날 때까지 반복.
    const char = s[l];
    const closeChar = parenthesesMap.get(char);
    if (closeChar) {
      stack.push(closeChar);
    } else {
      if (stack.length > 0 && stack[stack.length - 1] === char) {
        stack.pop();
      } else {
        stack.push(char);
        break;
      }
    }
    l++;
  }
  o = stack.length === 0;
  console.log("o", o);
  console.log("stack", stack);
  return o;
}

/**
 * 문자열이 open-close쌍이 맞는지는 판단해 결과를 리턴.
 * @param {*} s
 * @param {*} start
 * @returns
 */
function pairChar(s, start, stack) {
  const len = s.length;
  if (start === len) {
    return stack;
  }
  const char = s[start];
  const closeChar = parenthesesMap.get(char);
  if (closeChar) {
    stack.push(closeChar);
  } else if (stack.length && stack[stack.length - 1] === char) {
    stack.pop();
  } else {
    stack.push(char);
    start = len - 1;
  }
  return pairChar(s, start + 1, stack);
}

function solutionRecursive(s) {
  const len = s.length;
  //let o = len % 2 == 0;
  if (len % 2 == 1) return false;
  return pairChar(s, 0, []).length === 0;
}

// solution("[(([]))](())");
// solution("{((}))");
// solution("(([]){})");

// console.log(solutionRecursive("()[][]"));
// console.log(solutionRecursive(")([]){})"));
console.log(solutionRecursive("((([]{}){}))"));

/**
 *
 */

// const ee = {
//   "[": "]",
//   "{": "}",
//   "(": ")"
// };

// const input = "[]";
// console.log(ee[input[0]]);
