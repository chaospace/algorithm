/**
 * Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
 * 주어진 n으로 조합할 수 있는 올바른 모든 괄호 만들어 리턴하기
 *
 * ()
 * 1
 *
 * (())
 * ()()
 * 2
 *
 * n 3
 * o "((()))","(()())","(())()","()(())","()()()"
 *
 *
 * 풀이 핵심
 * 숫자를 재귀를 통해 분해한 후 실제 괄호를 조합해 구할 수도 있겠지만
 * 조건에 해당하는 문자열의 길이가 모두 n*2라는 점에 주목하면
 * 재귀를 통해 쉽게 해결 가능한다.
 * 올바른 괄호( valid_parentheses )에 접근처럼 open, close 두 카운트가 모두 0이 될때까지 문자열을 조합.
 */
const OPEN_CHAR = "(";
const CLOSE_CHAR = ")";
const PARENTHESES = "()";

const store = new Map();
store.set(1, { "()": "()" });

function buildChar(n, sn = undefined) {
  let c = "";
  let i = 0;
  for (i = 0; i < n; i++) {
    c += OPEN_CHAR;
  }

  if (sn) {
    for (i = 0; i < sn; i++) {
      c += PARENTHESES;
    }
  }

  for (i = 0; i < n; i++) {
    c += CLOSE_CHAR;
  }
}

function appendStore(store, value) {
  if (!store[value]) {
    store[value] = value;
  }
}
const aa = [
  "((((()))))",
  "(((()())))",
  "(((())()))",
  "(((()))())",
  "(((())))()",
  "((()(())))",
  "((()()()))",
  "((()())())",
  "((()()))()",
  "((())(()))",
  "((())()())",
  "((())())()",
  "((()))(())",
  "((()))()()",
  "(()((())))",
  "(()(()()))",
  "(()(())())",
  "(()(()))()",
  "(()()(()))",
  "(()()()())",
  "(()()())()",
  "(()())(())",
  "(()())()()",
  "(())((()))",
  "(())(()())",
  "(())(())()",
  "(())()(())",
  "(())()()()",
  "()(((())))",
  "()((()()))",
  "()((())())",
  "()((()))()",
  "()(()(()))",
  "()(()()())",
  "()(()())()",
  "()(())(())",
  "()(())()()",
  "()()((()))",
  "()()(()())",
  "()()(())()",
  "()()()(())",
  "()()()()()"
];
console.log("aa-len", aa.length);
/**
 * @param {*} base
 * @param {*} n
 * @returns
 */
function foo(base, n) {
  let c = "";
  for (let i = 0; i < n; i++) {
    c += OPEN_CHAR;
  }
  c += base;
  for (let i = 0; i < n; i++) {
    c += CLOSE_CHAR;
  }
  console.log("c", c);
  return c;
}

/**
 * 숫자를 받아서 괄호 문자를 반환하는 법이 있을까?
 * bottom-up이 적용되면 결국 기억된 값만으로 덧셈이 이루어지게 된다.
 * @param {*} n
 * @param {*} sn
 *
 * ()() + ()
 * => (()()), ()()(), ((())), (())()
 */
function sum(n, sn) {
  let base = Object.values(store.get(n));
  let sub = Object.values(store.get(sn));
  let sumStore = store.get(n + sn) || {};
  base.forEach(char => {
    // 문자열을 직접구성
    if (sn == 1) {
      // 배열 문자열 조합.
      appendStore(sumStore, `${char}()`);
      appendStore(sumStore, `(${char})`);
      if (n + sn > 2) {
        appendStore(sumStore, `()${char}`);
      }
    } else {
      sub.forEach(subCar => {
        appendStore(sumStore, `${char + subCar}`);
        appendStore(sumStore, `${subCar + char}`);
      });
    }
  });

  store.set(n + sn, sumStore);
  //return Object.values(sumStore);
}

function getSubRoutine(n, sn) {
  const routine = [];
  while (n - sn >= 0) {
    routine.push(sn);
    n -= sn;
  }

  if (n % sn > 0) {
    routine.push(n % sn);
  }
  return routine;
}

function bottomup(on, n, sn, inputs) {
  if (on === n) {
    const arr = Object.values(store.get(on));
    //console.log("total", arr.length);
    return arr;
  }

  sum(n, sn);
  inputs.push([n, sn]);
  if (on - n > 1 && n > 1) {
    const subRoutine = getSubRoutine(on, n);
    let l = 0;
    let r = subRoutine.length - 1;
    while (l < r) {
      sum(subRoutine[l], subRoutine[l + 1]);
      l++;
    }
  }

  return bottomup(on, n + 1, sn, inputs);
}

/**
 * top-down을 구성할 긴 쉽지만 sum에서 복잡해짐.
 *
 * bottom-up 방식이 예외없이 단순하게 구성해 나갈 수 있을 거 같음.
 * 3, 1
 * 2,1
 * 1,1
 */
function solution(n) {
  return bottomup(n, 1, 1, []);
  //console.log("arr", checkPartial(n, n, []));
  // const o = combinations(checkPartial(n - 1, []), 1);
  // return o;
}

// console.log("6-o", solution(6).length);
// console.log("o", solution(4));
// console.log("store", store);
/**
 => 

4:

    '()()()()': '()()()()',
    '()()(())': '()()(())',
    '(())()()': '(())()()',
    '(())(())': '(())(())',
    '(()()())': '(()()())',
    '(()())()': '(()())()',
    '((()()))': '((()()))',
    '()(()())': '()(()())',
    '((())())': '((())())',
    '()(())()': '()(())()',
    '((()))()': '((()))()',
    '(((())))': '(((())))',
    '()((()))': '()((()))',
    '(()(()))': '(()(()))'

5:
    '()()()()()': '()()()()()',
    '()()()(())': '()()()(())',
    '(())()()()': '(())()()()',
    '(()())()()': '(()())()()',
    '()()(()())': '()()(()())',
    '(()())(())': '(()())(())',
    '(())(()())': '(())(()())',
    '()()(())()': '()()(())()',
    '(())()(())': '(())()(())',
    '(())(())()': '(())(())()',
    '((()))()()': '((()))()()',
    '()()((()))': '()()((()))',
    '((()))(())': '((()))(())',
    '(())((()))': '(())((()))',
    '()(())()()': '()(())()()',
    '()(())(())': '()(())(())',
    '(()()()())': '(()()()())',
    '(()()(()))': '(()()(()))',
    '((())()())': '((())()())',
    '((())(()))': '((())(()))',
    '(()()())()': '(()()())()',
    '((()()()))': '((()()()))',
    '()(()()())': '()(()()())',
    '((()())())': '((()())())',
    '()(()())()': '()(()())()',
    '((()()))()': '((()()))()',
    '(((()())))': '(((()())))',
    '()((()()))': '()((()()))',
    '(()(()()))': '(()(()()))',
    '((())())()': '((())())()',
    '(((())()))': '(((())()))',
    '()((())())': '()((())())',
    '(()(())())': '(()(())())',
    '(((()))())': '(((()))())',
    '()((()))()': '()((()))()',
    '(((())))()': '(((())))()',
    '((((()))))': '((((()))))',
    '()(((())))': '()(((())))',
    '(()((())))': '(()((())))',
    '(()(()))()': '(()(()))()',
    '((()(())))': '((()(())))',
    '()(()(()))': '()(()(()))'
 */

function backtracking(n) {
  const res = [];
  const go = (l, r, s) => {
    if (s.length === 2 * n) {
      res.push(s);
      return;
    }

    if (l < n) go(l + 1, r, s + "(");
    if (r < l) go(l, r + 1, s + ")");
  };

  go(0, 0, "");
  return res;
}

function genLoop(n) {
  const gen = (canOpen, currentString, canClose) => {
    if (canOpen === 0 && canClose === 0) {
      return [currentString];
    }
    let all = [];
    if (canOpen > 0) {
      all = [...all, ...gen(canOpen - 1, currentString + "(", canClose + 1)];
    }
    if (canClose > 0) {
      all = [...all, ...gen(canOpen, currentString + ")", canClose - 1)];
    }
    return all;
  };
  return gen(n, "", 0);
}

//console.log("genLoop", genLoop(6).length);

function closureNumberSolution(n) {
  const loop = (open, close, s) => {
    let all = [];
    if (open === 0 && close === 0) {
      return [s];
    }
    if (open > 0) {
      all = [...all, ...loop(open - 1, close, s + "(")];
    }
    if (open < close) {
      all = [...all, ...loop(open, close - 1, s + ")")];
    }

    return all;
  };
  return loop(n, n, "");
}

console.log("genLoop", closureNumberSolution(4));
