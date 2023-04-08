/**
 * 부분 문자열 검색
 * 인풋 H에서 N 을 찾고 시작 인덱스를 반환
 *
 * ex)
 * H : avadakedavra
 * N : aked
 */

function solution(H, N) {
  const search_len = N.length;
  console.log("search_len", search_len);
  for (let i = 0; i < H.length; i++) {
    //console.log("t", H.substring(i, i + search_len));
    if (H.substring(i, i + search_len) === N) {
      console.log("ok", i);
    }
  }
}

//solution("avadakedavra", "aked");

/**
 * 부분일치 정보를 구하는 함수
 * 주어진 문자열 str의 인덱스 1부터 차례대로 비교길이를 늘려가며 일치하는 문자열의 개수를 체크 후 반환
 * @param {*} str
 */
function getPartial(str) {
  let max = str.length;
  const pi = Array(max).fill(0);
  for (let begin = 1; begin < max; begin++) {
    for (let j = 0; j + begin < max; j++) {
      if (str[begin + j] != str[j]) {
        break;
      }
      pi[begin + j] = Math.max(pi[begin + j], j + 1);
    }
  }
  console.log("pi", pi);
}

//getPartial("aabaabac");

/**
 * @param {*} str
 */

function getPartialKMP(str) {
  const max = str.length;
  const pi = Array(max).fill(0);
  let begin = 1;
  let matched = 0;
  while (begin + matched < max) {
    // 매칭되면 매칭인덱스 정보를 기억
    if (str[begin + matched] == str[matched]) {
      matched += 1;
      pi[begin + matched - 1] = matched;
    } else {
      // 매칭정보가 없으면 다음 이동
      if (matched == 0) {
        begin += 1;
      } else {
        // 시작 위치를 직전 매칭위치로 이동
        begin += matched - pi[matched - 1];
        // 매칭 정보를 이전값으로 설정
        matched = pi[matched - 1];
      }
    }
  }
  return pi;
}

console.log("kmp", getPartialKMP("aabaabac"));

/**
 * kmp알고리즘 원리
 * 모든 문자열을 비교하며 찾을게 아니라
 * 일치하는 부분 문자열을 만날 경우 해당 부분문자에서 매칭할 수 있는 부분만 대상으로 검색을 진행하는게 더 효율이 좋다.
 *
 */
// function solutionKMP(str, word) {}

// solutionKMP("aabaabaabaabaabacchjsflajsfaabaabaceiekaalflasdflajadkadsf", "aabaabac");
