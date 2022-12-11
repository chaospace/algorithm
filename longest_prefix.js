/**
 * input배열에 반복되는 prefix문자열 중 가장 긴 것을 반환
 *
 * inputs : ["flower", "flow", "flight"]
 * output : "fl"
 * includes는 순서의 일치여부는 판단하지 못함.
 * 앞을 통과 했다는 말은 모두 같은 문자열 구성이라는 조건이 성립
 *  - 조합을 이용하면 every보다 리소스를 적게 사용할 수 있음.
 */
function solution(inputs) {
  let idx = 0;
  let answer = "";
  const sample = inputs[0];
  let hasPrefix = sample.length > 0;
  let prefix = "";
  while (hasPrefix) {
    prefix += sample[idx];
    hasPrefix = inputs.every(str => str.substring(0, idx + 1) === prefix);
    console.log("hasPrefix", hasPrefix);
    if (!hasPrefix) {
      break;
    }
    answer = prefix;
    idx++;
  }

  return answer;
}

function solution2(inputs) {
  let idx = 0;
  let answer = "";
  let prefix = "";
  const sample = inputs[0];
  let hasPrefix = sample.length > 0;
  while (hasPrefix) {
    prefix += sample[idx];
    hasPrefix = inputs.every(str => {
      const s = answer + (str[idx] || "");
      return s === prefix;
    });
    if (hasPrefix) {
      answer = prefix;
      idx++;
    }
  }
  return answer;
}

/**
 * 분할정복을 이용한 비교 방법
 *
 * 초기 inputs에 반을 나눔
 * 왼쪽에 공통요소 추출
 * 우측에 공통요소 추출
 *
 * 좌측과 우측에 공통요소 추출
 * @param {*} inputs
 * @param {number} l start  index
 * @param {number} r   end    index
 */
function divideAndConquer(input, l, r) {
  // l과 r이 동일한 경우 배열에 해당 문자열 리턴
  if (l === r) {
    return input[l];
  } else {
    // l, r의 중간값을 찾아 분할 후 재귀호출 반복
    let mid = Math.floor((l + r) / 2);
    const left = divideAndConquer(input, l, mid);
    const right = divideAndConquer(input, mid + 1, r);
    const common = commonPrefix(left, right);
    return common;
  }
}

function commonPrefix(left, right) {
  let min = Math.min(left.length, right.length);
  for (let i = 0; i < min; i++) {
    if (left[i] != right[i]) {
      return left.substring(0, i);
    }
  }
  return left.substring(0, min);
}

/**
 * 이진트리를 이용한 방법
 * 공통문자는 항상 있다는 가정이 있음.
 */
function binarySearch(inputs) {
  // 요청 문자열이 없거나 길이가 0인 경우 빈문자열 반환
  if (inputs === null || inputs.length === 0) return "";

  // 가장 짧은 문자열 추출
  let minLen = Number.MAX_SAFE_INTEGER;
  inputs.map(str => {
    console.log("str", str, str.length);
    minLen = Math.min(str.length, minLen);
  });

  let low = 1;
  let high = minLen;
  // console.log("start-log", low, "start-high", minLen);
  // low가 minLen같을 때 까지 반복
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    // 공통문자열이 있으면 하위 인덱스를 증가
    if (isCommonPrefix(inputs, mid)) {
      low = mid + 1;
      // console.log("low", mid + 1);
    } else {
      // 없으면 뒤에서 제거
      high = mid - 1;
      // console.log("high", mid - 1);
    }
  }
  console.log("minLen", minLen, "low", low, "high", high);
  return inputs[0].substring(0, (low + high) / 2);
}

function isCommonPrefix(inputs, len) {
  const prefix = inputs[0].substring(0, len);
  for (let i = 0; i < inputs.length; i++) {
    const str = inputs[i];
    if (!str.startsWith(prefix)) {
      return false;
    }
  }
  return true;
}

//solution2(["a"]);
//solution2(["leet, le, leecode, lee"]);
//console.log(divideAndConquer(["leet", "l"], 0, 1));
// console.log("binarySearch", binarySearch(["flower", "flow", "flight"]));
console.log("binarySearch", binarySearch([""]));
// solution(["flower", "flow", "flight"]);
// solution(["air", "crow", "target"]);
// solution(["dog", "racecar", "car"]);

for (let i = 0; i < 12; i += 3) {
  console.log("i,", i);
}
