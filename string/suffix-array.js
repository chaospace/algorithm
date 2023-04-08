const store = {};
// 공통 접두사 최대길이 구하기
function commonPrefix(str, a, b) {
  let k = 0;
  const max = str.length;
  // indexof로 구하기는 문제가 있음.
  let i = str.indexOf(a);
  let j = str.indexOf(b);
  console.log("i", i, "j", j, "a", a, "b", b);
  while (i < max && j < max && str[i] === str[j]) {
    i++;
    j++;
    k++;
  }
  const word = a.substring(i - k, i);
  if (!store[word] && word.length >= 1) {
    store[word] = 0;
  }
  store[word] += 1;
  console.log("k-i", a.substring(i - k, i), "b", b.substring(j - k, j), "a", a);
  return k;
}

/**
 * 접미사 배열
 * 문자열 s의 모든 접미사를 사전순으로 정렬해 놓은 배열.
 *
 * ex)
 * baekjoon의 접미사는
 * baekjoon, aekjoon, ekjoon, kjoon, joon, oon, on, n 총 8가지
 * 사전순 정렬은?
 * aekjoon, baekjoon, ekjoon, joon, kjoon, n, on, oon
 */

function solution(str, minLen = 1) {
  let max = str.length;
  const arr = [];
  for (let i = 0; i < max; i++) {
    const s = str.substring(i);

    arr.push(s);
  }
  // 첫 글자를 기준으로 알파벳순으로 정렬
  arr.sort((a, b) => a[0].localeCompare(b[0]));
  //arr.sort();
  console.log("arr", arr);
}

//solution("baekjoon");
//let a = "aavadakedavr";
//solution(a + a, a.length);

/**
 * 주어진 문자열에서 k번 반복되는 부분 문자열의 길이 반환
 * @param {*} str
 * @param {*} k
 */
function solutionSpeechHabit(str, k) {
  let max = str.length;
  const arr = [];
  for (let i = 0; i < max; i++) {
    const s = str.substring(i);
    arr.push(s);
  }
  // 첫 글자를 기준으로 알파벳순으로 정렬
  //arr.sort((a, b) => a[0].localeCompare(b[0]));
  arr.sort();
  console.log("arr", arr);
  // let ret = 0;
  // // 횟수를 체크
  // for (let i = 1; i < max; i++) {
  //   ret = Math.max(ret, commonPrefix(str, arr[i - 1], arr[i]));
  // }
  // console.log("ret", store);
}

// solutionSpeechHabit("uhmhellouhmmynameislibe", 2);
// solutionSpeechHabit("banana", 3);

function createSuffixArray(str) {
  const max = str.length;
  const suffix_str = [];
  const suffix_index = [];
  for (let i = 0; i < max; i++) {
    const s = str.substring(i);
    suffix_str.push(s);
    suffix_index.push(i);
  }
  //console.log("suffix", suffix_str, "index", suffix_index);
  suffix_str.sort();
  suffix_index.sort((a, b) => str.substring(a).localeCompare(str.substring(b)));
  console.log("sorted-suffix", suffix_str, "sorted-index", suffix_index);

  const rank = [];
  for (let i = 0; i < max; i++) {
    rank[suffix_index[i]] = i;
  }
  console.log("rank", rank);
  let matched = 0;
  const lcp = Array(max).fill(0);
  for (let i = 0; i < max; i++) {
    let k = rank[i];
    if (k) {
      for (
        let j = suffix_index[k - 1];
        str[i + matched] == str[j + matched];
        matched++
      )
        lcp[k] = matched;
      if (matched) {
        --matched;
      }
    }
  }
  console.log("lcp", lcp);
  return lcp;
}

createSuffixArray("banana");
