/**
 * 문자열 haystack, needle이 주어지면 
 * haystack에 매칭하는 needle의 처음 인덱스를 반환 
 * 매칭하지 않으면 -1반환
 * 
Input: haystack = "sadbutsad", needle = "sad"
Output: 0

Input: haystack = "leetcode", needle = "leeto"
Output: -1

 */

/**
 * js의 경우 includes 혹은 indexOf를 쓰면 금방 알수 있는데 음...
 * 사라진 문자랑 비교해서 안맞을 수 있으니 기본이랑 비교를 해야 한다.
 *
 * 재귀의 조건?
 *
 * @param {*} haystack
 * @param {*} needle
 */
function solution(haystack, needle) {
  let len = needle.length;
  let haystackLen = haystack.length;
  /**
   * 인덱스에 해당하는 문자의 일치여부를 판단해 리턴
   */
  function matching(hIndex, nIndex) {
    if (nIndex === len) {
      return hIndex - nIndex;
    } else if (haystack[hIndex] === needle[nIndex]) {
      return matching(hIndex + 1, nIndex + 1);
    } else {
      return -1;
    }
  }

  let matchingIndex = -1;
  for (let i = 0; i <= haystackLen - len; i++) {
    if (haystack[i] === needle[0]) {
      const r = matching(i, 0);
      if (r > -1) {
        matchingIndex = r;
        break;
      }
    }
  }
  console.log("stack", matchingIndex);
}

// solution("saedbutssead", "sad");
// solution("saedbutssad", "sad");
// solution("hello", "ll");
// solution("mississippi", "issip");

// for문을 안쓰고 재귀만을 이용한 해법을 구해보자.
// 재귀에서 포문을 대신하는 방법은 무엇이 있을까..
function solutionAdvance(haystack, needle) {
  const stackLen = haystack.length;
  const needleLen = needle.length;

  function recursive(hIndex, nIndex) {
    if (nIndex === needleLen) {
      return hIndex - needleLen;
    } else if (haystack[hIndex] === needle[nIndex]) {
      return recursive(hIndex + 1, nIndex + 1);
    }
    return -1;
  }

  function matchingResult(start) {
    const matchingIndex = recursive(start, 0);
    if (matchingIndex > -1) {
      return matchingIndex;
    } else if (stackLen - needleLen > start) {
      return matchingResult(start + 1);
    }
    return -1;
  }

  return matchingResult(0);
}
// console.log("solutionAdvance", solutionAdvance("mississippi", "issip"));
// console.log("solutionAdvance", solutionAdvance("hello", "ll"));
// console.log("solutionAdvance", solutionAdvance("saedbutssead", "sad"));

function solutionReference(haystack, needle) {
  let matchingCount = 0;
  const needleLen = needle.length;
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle[matchingCount]) {
      if (matchingCount === needleLen - 1) {
        return i - matchingCount;
      }
      matchingCount++;
    } else {
      // 일치하지 않는 경우 참조 와 인덱스를 매칭카운트 만큼 뒤로 보냄
      i -= matchingCount;
      matchingCount = 0;
    }
  }
  return -1;
}
console.log("solutionReference", solutionReference("hello", "ll"));
console.log("solutionReference", solutionReference("mississippi", "issip"));
console.log("solutionReference", solutionReference("testmessagiees", "age"));
