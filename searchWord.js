/**
 * 반복되는지 않고 가장 긴 문자찾기
 *
 * abcadbca
 * aab
 * ""
 * " "
 *
 * 중복을 찾는 방법
 *  문자열을 순회하며 맵에 해당 단어를 기억한다.
 *
 *  단어가 추출되면 해당 단어에 중복되는 단어가 있는지 검사한다.
 *
 */

/**
 * @param {string} s
 * @return {number}
   반복없이 가장 긴 문자열 찾기
 */
var lengthOfLongestSubstring = function (s) {
  const words = {};
  let word = "";
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (words[char] !== undefined) {
      const before = words[char]; //
      const diff = i - before;
      let v = s.substring(before, i);
      // 중복이 안되면 문자열 끝까지
      if (v.lastIndexOf(char) == 0) {
        v = s.substring(i);
      }
      if (v.length >= word.length) {
        word = v;
      }
      words[char] = i;
    } else {
      words[char] = i;
    }
  }

  if (word === "") {
    word = s;
  }
  return word.length;
};

/**
 *  sliding window 방식
 *  문자열을 직접 탐색하지 않고
 *  동시에 진행시키면서 중복이 발견되면 0으로 돌려서 count를 초기화
 *  정직한 이중배열보다 새련됨.
 */
function solution2(s) {
  let left = 0;
  let right = 0;
  let answer = 0;
  const words = {};
  while (right < s.length) {
    const char = s[right];
    if (words[char] === undefined) {
      words[char] = 0;
    }
    words[char]++;
    /**
     * 텍스트 중복이 발생할 경우
     * left를 통해 중복 문자를 제거한다.
     */
    while (words[char] > 1) {
      let l = s[left];
      words[l]--;
      left++;
    }
    answer = Math.max(answer, right - left + 1);

    right++;
  }
  return answer;
}

/**
 * 이전 위치를 맵에 기억하고 있다가
 * 중복된 글자를 만나면 인덱스 위치를 해당 위치로 조정
 */
function solution3(s) {
  const len = s.length;
  let res = 0;
  const map = {};
  let j = 0;
  for (let i = 0; i < len; i++) {
    const char = s[i];
    // 중복 글자를 만나면 커서를 앞으로 당김.
    if (map[char] !== undefined) {
      j = Math.max(map[char], j);
    }
    // 커서 위치는 이전 값과 비교해서 큰 값으로 교체
    res = Math.max(res, i - j + 1);
    map[char] = i + 1;
  }
  console.log(res);
}

//console.log(solution2("abb"));
//console.log(solution3("abb"));
console.log(solution3("pwwkew"));
//console.log(solution3(""));

//console.log(lengthOfLongestSubstring("aab"));
