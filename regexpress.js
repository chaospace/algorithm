/**
 * 정규식
 *
 * . 모든 문자와 매치
 * * 바로 앞에 문자가 0 혹은 계속 반복 가능
 *
 * ex)
 * input : aa
 * pattern : .*
 * => ok
 *
 * input : aa
 * pattern : .
 * => false
 *
 *
 * 패턴과 문자열은 길이가 다를 수 있다.
 * 패턴을 통해 문자열 제거를 통해 매치여부를 판단하는 방법
 * 패턴을 제거하며 문자열을 제거하면 후에 남아있는 문자열 가지고는 전체문자를
 * 커버한 것인지 체크하기 애매함.
 */

// function solution(s, p) {
//   const DOT = ".";
//   const WILD = "*";
//   let input = s;
//   let pattern = p.split("");
//   let prevChar = "";
//   const matchingChars = [];
//   // 정규식 길이만큼 루프
//   while (pattern.length) {
//     // 패턴 하나를 추출
//     const reg = pattern.shift();
//     // 문자열의 첫 글자 추출
//     const char = input[0];
//     if (char === reg || reg === DOT) {
//       // 한 글자 제거
//       input = input.substring(1);
//       prevChar = char;
//       matchingChars.push(char);
//     } else if (reg === WILD) {
//       while (input[0] === prevChar) {
//         input = input.substring(1);
//       }
//     } else {
//       break;
//     }
//   }
//   return matchingChars.every(c => input.indexOf(c) === -1);
// }

function matchPattern(s, p) {
  return s === p ? true : false;
}

/**
 패턴과 문자열의 길이가 다를 수 있다.
 필요없는 패턴은 제거해야 된다.
 가장 확실한 방법은 1 : 1 매칭을 해야 된다.

 * @param {*} s
 * @param {*} p
 * @returns
 */

const WILD = "*";
const DOT = ".";

function solution(s, p) {
  // 특수문자가 없이 두 문자열의 길이가 다르면 false
  if (!(p.includes(DOT) || p.includes(WILD)) && s.length !== p.length) {
    return false;
  }

  let output = "";
  let prevPattern = undefined;
  let input = s.split("");

  // while을 문자열이 없거나 pattern이 없을 때 까지 진행.
  //p[n] === s[0] ? p[n+1] === s[1];
  const pattern = p.split("");
  while (pattern.length) {
    const reg = pattern.shift();
    const char = input[0] || "";

    console.log("char", char, "reg", reg, prevPattern);
    // char 와 dot을 처리
    if (reg === char || reg === DOT) {
      prevPattern = reg;
      output += char;
      input.shift();
    } else if (reg === WILD && prevPattern !== undefined) {
      const prev =
        (prevPattern === DOT ? input[0] : output[output.length - 1]) || "";

      while (pattern[0] === prev) {
        pattern.shift();
      }
      // 남은 문자열이 현재 패턴과 동일하면 제거
      while (input[0] === prev) {
        input.shift();
        output += prev;
      }
      //}
    } else {
      console.log("reg", reg, output);
      if (reg === WILD || reg === DOT) {
        output = "";
      } else {
        output += reg;
      }
    }
  }

  // wild 문자열을 포함하고 length가 다를 경우 체크
  console.log("s", s, "output", output, "matching", s === output);

  return output === s;
}

// console.log(solution("aaaaa", "a*"));
// console.log(solution("aaaa", "aa*b"));
//console.log(solution("chaospaae", "chaos.a*."));
//console.log(solution("chaospaaeb", "chaos.a."));
//console.log(solution("ab", ".*"));
//console.log(solution("abcd", "d*"));
//console.log(solution("ab", "a*."));
//console.log(solution("aaa", "a*a")); // true
// 그냥 문자를 더한다.
//console.log(solution("aab", "c*a*b"));
// console.log(solution("aab", "b*a*b"));
//console.log(solution("aaa", "ab*ac*a"));

/**
input : "aaa"
pattern : "aaaa"
output : false;
 */

function solution2(s, p) {
  const patterns = p.split("");
  const input = s.split("");
  let sIndex = 0;
  let pIndex = 0;
  let output = "";
  while (pIndex < patterns.length && sIndex < s.length) {
    const reg = patterns[pIndex];
    const char = input[sIndex];

    if (char === reg || reg === DOT) {
      sIndex++;
      pIndex++;
      output += char;
    } else if (reg === WILD && pIndex > 0) {
      // wild표시는 현재 해당이 없으면 넘기고 해당하면 표시만 해두고 뒤에 판단하는게 맞는건지.. 아리까리.
      const prev = patterns[pIndex - 1] === DOT ? char : patterns[pIndex - 1];
      console.log(
        "current",
        char,
        "pattern-char",
        prev,
        "reg",
        reg,
        "prev-pattern",
        patterns[pIndex - 1]
      );
      pIndex++; // 매칭이 되든 안되든 패턴은 지나감.
      // 다음 패턴도 지금과 동일하면 while을 통해 같은 문자  모두 대체
      //const nextSamePattern = patterns[pIndex] === prev;

      while (patterns[pIndex] === prev) {
        pIndex++;
      }
      if (input[sIndex] === prev) {
        sIndex++;
        output += `${prev}`;
      }
    } else {
      pIndex++;
    }
  }
  console.log("out", output, pIndex, sIndex);
  return s.length === sIndex && p.length === pIndex;
}

function matchingChar() {}

/**
 * 재귀를 통해 이동하자.
 * @param {*} s
 * @param {*} p
 */
function matchingByInput(s, p) {
  const patterns = p.split("");
  const input = s.split("");
  const pLen = patterns.length;
  const sLen = input.length;
  const lastChar = input[sLen - 1];
  const lastReg = patterns[pLen - 1];

  let regIndex = 0;
  let charIndex = 0;
  let output = "";
  // 마지막 패턴과 일치할 때 까지 반복
  while (charIndex < sLen && regIndex < pLen) {
    let char = input[charIndex];
    let reg = patterns[regIndex];
    if (patterns[regIndex + 1] === WILD) {
      reg += WILD;
      regIndex += 1;
    }

    if (char === reg) {
      charIndex += 1;
      output += char;
    } else if (reg.includes(WILD)) {
      // wild에 시작문자가 일칳는 경우 문자열 이동
      if (reg[0] === char || reg[0] === DOT) {
        charIndex += 1;
        output += char;
      }
      char = input[charIndex];
      const c = reg[0] === DOT ? char : reg[0];

      // 패턴과 일치하는 경우
      if (char === c) {
        output += `${WILD}`;
        //charIndex += 1; // 문자 인덱스 증가
        const pRest = pLen - regIndex;
        const sRest = sLen - charIndex;
        // 문자열이 패턴보다 길면
        // 반복을 통해 동일문자 제거
        console.log("char", char, "c", c, pRest, sRest);
        if (sRest > pRest) {
          // wild 문자 제거
          output = output.substring(0, output.length - 1);
          while (input[charIndex] === c && s.length - charIndex >= pRest) {
            charIndex += 1;
            output += c;
          }
        } else if (sRest === pRest) {
          output = output.substring(0, output.length - 1);
          output += c;
        } else {
          console.log("패턴이 더 길때", c, reg, output);
        }
      }
    } else {
      output += reg;
    }
    regIndex += 1;
  }

  /**
   * *를 앞에 문자열로 기본변경 후 비교
   */
  console.log("output", output, "s", s);
  if (output.includes(WILD)) {
    if (sLen < output.length) {
      output = output.replaceAll(WILD, "");
    } else if (sLen === output.length) {
      return true;
    }
  }

  // wild표시 replace처리
  return output.includes(s);
}

function matchingChar(s, p, sIndex, pIndex) {
  const sLen = s.length;
  const pLen = p.length;
}

/**
 * 문자열 s와 패턴 p의 매칭 여부를 반환하는 함수
 * 부분 일치가 아니라 전체 일치가 되야 한다.
 * 패턴은 문자열보다 길 수 있다.
 *
 * . 은 어떤 문자든 하나 대체가능
 * * 은 없거나 이전 문자 반복대체 가능
 *
 * .* 은 어떤 문자든 대체가능(하나) 반복도 가능
 *
 * *에 앞에는 유효한 값이 항상 존재한다는 전제가 있음.
 * *패턴 경우의 수
 *
 * 패턴이 일치해도 공백처리를 통해 무시해야 되는 경우
 *  input   : bbba
 *  pattern : .*a*a
 *
 * *패턴 방안
 * 다음 문자열에 대한 고려가 되야한다.
 * 재귀가 타고 들어가는 경우 발생..
 * 
 * 매칭 문자는 하나가 남고 패턴에 여분이 있다면 마지막까지 마지막 인덱스와 비교해야 된다.
 * @param {*} s
 * @param {*} p
 
function matcingRegWithRecursive(s, p) {
  const pattern = p.split("");
  const input = s.split("");
  const sLen = s.length;
  const pLen = p.length;

  let pIndex = 0;
  let sIndex = 0;
  let output = "";
  while (pIndex < pLen) {
    let reg = pattern[pIndex];
    let char = input[sIndex];
    //다음 패턴이 WILD면 현재패턴에 추가
    if (pattern[pIndex + 1] === WILD) {
      reg += WILD;
      pIndex++;
    }
    // 문자가 일치 혹은 .표현식과 함께 wild표현식이 있는 경우
    if (reg.includes(WILD)) {
      // 이전 문자가 . 일경우는 현재 문자를 대체 : 아닐경우는 이전패턴사용
      if (char === reg[0] || reg[0] === DOT) {
        char = reg[0] === DOT ? char : reg[0];
        sIndex++;
        output += char;

        // .*일 경우는 한글자 더 체크
        if (reg[0] === DOT) {
          char = input[sIndex];
          output += char;
          sIndex++;
        }
        const pDiff = pLen - pIndex;

        while (input[sIndex] === char && sLen - sIndex >= pDiff) {
          sIndex++;
          output += char;
        }
      }
    } else if (char === reg || reg === DOT) {
      // 문자열 일치 할 경우
      sIndex++;
      output += char;
    } else {
      output += reg;
    }

    // 패턴이동
    pIndex++;
  }
  console.log("output", output, "input", s, "pattern", p);
}
*/

function solutionMatcing(s, p) {
  const pLen = p.length;
  const sLen = s.length;

  const isEmptyInput = sLen === 0;
  //패턴이 없는데 문자열도 없으면 true
  if (pLen === 0) {
    return isEmptyInput;
  }
  const reg = p[0];
  const char = s[0];
  const firstMatching = !isEmptyInput && (char === reg || reg === DOT);
  console.log("first", firstMatching, "input", s, "patter", p);
  // 패턴길이가 2보다 길고 wild를 포함하면
  if (pLen >= 2 && p[1] === WILD) {
    // 현재 와일드 패턴 제거 후 매칭확인 반복 혹은 매칭한 첫글자 제거 후 반복
    return (
      solutionMatcing(s, p.substring(2)) ||
      (firstMatching && solutionMatcing(s.substring(1), p))
    );
  } else {
    return firstMatching && solutionMatcing(s.substring(1), p.substring(1));
  }
}

// console.log(matchingByInput("aaaa", "aa"));
// console.log(matcingRegWithRecursive("aaa", "ab*a*c*a"));
// console.log(matcingRegWithRecursive("aab", "c*a*b"));
// console.log(matcingRegWithRecursive("aaa", "a*a"));
// console.log(matcingRegWithRecursive("aaa", "ab*ab"));
//console.log(matcingRegWithRecursive("ab", ".*"));
//console.log(matcingRegWithRecursive("abbbb", ".*"));
//console.log(matcingRegWithRecursive("ab", "a*"));

//console.log(solutionMatcing("bbbba", ".*a*a"));
console.log(solutionMatcing("aab", "c*a*b"));
console.log(solutionMatcing("aaaaa", "aa"));
//
// console.log(matcingRegWithRecursive("aaaaaa", "a*a"));
// console.log(solution2("ab", "a*."));
// console.log(solution2("aaaa", "aa"));
// console.log(solution2("aaaa", "a*"));
// console.log(solution2("aab", "c*a*b"));
// console.log(solution2("aaa", ".*b"));
