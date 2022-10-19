/**
 * 문자열 s와 문자 배열 words 주어진다.
 * words에 원소는 모두 길이가 같다.
 *
 * 문자열 s에서 word의 모든 원소를 이용한 조합이 포함한 시작인덱스를 찾아서 반환.
 * word의 조합 순서는 상관없음.

ex)
words = ["ab, "cd", "ef"]
words의 조합으로 나올 수 있는 문자열
["abcdef", "abefcd", "cdabef", "cdefab", "efabcd", "efcdab"]
  
Input: s = "barfoothefoobarman", words = ["foo","bar"]
Output: [0,9]

Input: s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
Output: []

Input: s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
Output: [6,9,12]

- 재귀를 통한 문자열 일치 인덱스 찾기와 비슷하게 해결가능 할듯.
 */

/*
words 원소 조합을 미리 구하지 않는다면 재귀 요청시마다 words의 concat으로 넘겨 매칭하는 문자를 제거하며 보는게 가장 좋음.
원소중 비슷한 문자열을 가진 문자로만 이루어 졌을 경우 판단하는 방법은?
요청문자열과 일치하는 모든 요소를 대상으로 판단하며 길이가 동일하게 완료되면 해당 문자를 제거한다.
*/

function matching(s, word, current, max) {
  const char = s[current];
  //console.log("matching", s, word, current);
  if (current > max) {
    return current - max;
  } else if (char === word[current]) {
    return matching(s, word, current + 1, max);
  }
  return -1;
}

function getConcatenationList(words) {
  const arr = [];
  const wordLen = words[0].length;
  const wordsLen = words.length;
  const concatWordLen = wordLen * wordsLen;

  function combination(word) {
    if (word.length === concatWordLen) {
      arr.push(word);
    } else {
      for (let i = 0; i < wordsLen; i++) {
        const appendWord = words[i];
        if (word.length) {
          word.indexOf(appendWord) === -1 && combination(word + appendWord);
        } else {
          combination(appendWord);
        }
      }
    }
  }

  combination("");

  return arr;
}

function getCandidateList(char, words) {
  return words.filter(s => s[0] === char);
}

function solution(s, words) {
  const wordLen = words[0].length;
  const substringLen = wordLen * words.length;
  const sLen = s.length;
  const concatenationList = getConcatenationList(words);
  const stack = [];
  if (sLen < substringLen) return null;
  for (let i = 0; i < sLen - substringLen; i += wordLen) {
    const candidateList = getCandidateList(s[i], concatenationList);
    const partialWord = s.substring(i, substringLen + i);

    while (candidateList.length) {
      const candidate = candidateList.shift();

      if (candidate === partialWord) {
        stack.push({ index: i, partialWord });
      }
    }
  }
  console.log("stack", stack);
}

solution("barfoothefoobarman", ["foo", "bar"]);
solution("wordgoodgoodgoodbestword", ["word", "good", "best", "word"]);
solution("barfoofoobarthefoobarman", ["bar", "foo", "the"]);

/*
  조합을 만드는 법은?
  배열에 원소 모든 조합 수 만들기
  찾은 대상을 prefix + list[1]
  3*2
  실제 원소대신 인덱스를 조합해서 길이를 맞추는 방식이면 어떻까?
  순서가 중요하지 않은 조합 만들기.
*/

// 3 * 2 * 1 의 조합을 만드는 재귀 함수 구성
// const store = [];
// function makeString(prefix, max = 3) {
//   if (prefix.length === 9) {
//     store.push(prefix);
//   } else {
//     for (let i = 0; i < max; i++) {
//       if (prefix.indexOf(arr[i]) === -1) {
//         makeString(prefix + arr[i]);
//       }
//     }
//   }
// }

// const arr = ["bar", "foo", "the"];
// makeString(arr[0]);
// makeString(arr[1]);
// makeString(arr[2]);
// console.log("stack", store);
// let list = [];
// for (let i = 0; i < store.length; i++) {
//   let a = store[i];
//   let w = "";
//   for (let j = 0; j < a.length; j++) {
//     w += arr[a[j]];
//   }
//   list.push(w);
// }
// console.log("word", list);
