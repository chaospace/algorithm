/**
 * Longest valid parentheses
 * 주어진 문자열 s에서 올바른 괄호로 이루어진 서브문자열을 리턴
 * 문자열 s는 (, ) 로만 구성됨.
 * 
Input: s = "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()".

Input: s = ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()".

Input: s = ""
Output: 0
 */

/*
  open, close를 만족하는게 아닌. 올바른 괄호만 체크해야 함
  substring을 체크하는 것이라 올바르게 끝난 괄호가 연속될 경우 인덱스를 더해야 함.  
*/
function solution(s) {
  const len = s.length;
  let start = s.indexOf("(");
  let opens = [];
  let valid = [];
  for (let i = start; i < len; i++) {
    if (s[i] === "(") {
      opens.push(i);
    } else {
      if (opens && opens[opens.length - 1] < i) {
        const openIdx = opens.pop();

        valid.push(openIdx, i);
      }
    }
  }

  valid.sort((a, b) => a - b);
  // 연속된 증가를 보여주면 substring으로 판단. 앞뒤로 값 차이가 1인 것만 필터.
  const d = valid.filter((_, idx) => {
    const a = valid[idx] - valid[idx - 1];
    const b = valid[idx + 1] - valid[idx];
    return a == 1 || b == 1;
  });

  // 정렬 후 간격이 1 이상 벌어지는 값이 존재할때 가지 루프를 돌며 체크 후 가장 큰 수를 반환한다.
  let gapIndex = d.findIndex((_, idx) => (d[idx + 1] || d[idx]) - d[idx] > 1);
  let count = gapIndex > -1 ? gapIndex + 1 : d.length;

  while (gapIndex > -1) {
    d.splice(0, gapIndex + 1);
    gapIndex = d.findIndex((_, idx) => (d[idx + 1] || d[idx]) - d[idx] > 1);
    count = Math.max(count, gapIndex > -1 ? gapIndex + 1 : d.length);
  }
  console.log("count", count);
}

// solution("(()");
// solution("(()()(");
// solution(")()()((()");
// solution("()(()");
// solution("()(()))");
// solution("()))()(()))");
// solution("()(())");
// solution("()((()))");
// solution("()((()))))))((())())((((((()");

function solutionLoop(s) {
  const len = s.length;
  const start = s.indexOf("(");

  const stack = [];
  const valid = [];

  for (let i = start; i < len; i++) {
    if (s[i] === "(") {
      stack.push(i);
    } else if (stack.length && stack[stack.length - 1] < i) {
      let before = stack.pop();
      valid.push(before, i);
    }
  }
  valid.sort((a, b) => a - b);

  let l = 0;
  let count = 0;
  for (let i = 1; i < valid.length; i++) {
    if (valid[i] - valid[i - 1] > 1) {
      count = Math.max(count, i - l);
      l = i;
    }
  }
  count = Math.max(count, valid.length - l);
  console.log("count", count);
}

//solutionLoop("()(())");
// solutionLoop("())()())()");
// solutionLoop("())()()(((()))())");

/*
DP를 이용한 방법
*/

function solutionDP(s) {
  if (s.length === 0) return 0;
  let stack = [-1];
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length === 0) {
        stack.push(i);
        console.log("stack", stack);
      } else {
        console.log("max", max, "i", i, "stack", stack);
        max = Math.max(max, i - stack[stack.length - 1]);
      }
    }
  }
  console.log("max", max);
}

solutionDP("()(())");
solutionDP(")(())");

function solutionHashSet(s) {
  let track = { 0: -1 };
  let max = 0;
  let level = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      level++;
      track[level] = i;
    } else {
      level--;
      if (level == 0) {
        level = 0;
        track = { 0: i };
      } else {
        if (level in track) {
          max = Math.max(max, i - track[level]);
        }
      }
    }
  }
  return max;
}
