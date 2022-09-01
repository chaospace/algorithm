/**
Given a string s, return the longest palindromic substring in s.
가장 긴 펠린드롬(앞뒤가 동일한) 문자열 찾기

Example 1:

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.


b <-> d
a <-> a


Example 2:

Input: s = "cbbd"
Output: "bb"

abacdfgdcaba
 */

function createMap(s) {
  const len = s.length;
  let left = 0;
  // map테이블 초기화
  let map = [];
  for (left = 0; left < len; left++) {
    map[left] = [];
  }

  return map;
}

/**
 * 무차별 대입을 통한 추출
 * 가능한 모든 경우의 수를
 * @param {*} s
 * @param {*} map
 * @returns
 */
function palindromProcess(s, map) {
  const start = performance.now();
  const len = s.length;
  let left = 0;
  let right = 0;
  let answer = "";

  // 모두 같은 문자라면 리턴!!
  if (s.split("").every(v => s[0] === v)) {
    return s;
  }
  for (left = 0; left < len; left++) {
    for (right = len; right > left; right--) {
      if (isPalindrome(s, left, right, map)) {
        const v = s.substring(left, right);
        if (v.length > answer.length) {
          answer = v;
        }
      }
    }
  }
  console.log("end-time", performance.now() - start);
  return answer;
}

/**
 * 순회처리를 어떻게 해야 모든 경우의 수를 놓치지 않고 처리할까?
 *  - 초기 생각
 *     - 왼쪽 오른쪽은 서로 이동하며 비교한다.
 *          - 서로 대칭이 아닐 경우는 찾을 수 없음.
 *     - 왼쪽에서 부터 오른족으로 중복문자가 존재하면 순차적으로 비교한다.
 *
 * 이 방식에 문제점
 *  - 모든 경우의 수를 체크하기 때문에 요청 문자열이 길어지면 소요시간이 길어짐..
 *
 * @param {*} s
 */
function solution(s) {
  return palindromProcess(s);
}

function isPalindrome(s, left, right) {
  // 우측값이 변경됨에 따라 순회하는 곳의 중심을 이동하며
  // 문자열 위치와 관계없는 펠린드롬을 추출
  const max = right - left;
  const center = Math.floor(max / 2);
  let isPalindrome = true;
  for (let i = 0; i < center; i++) {
    let l = left + i;
    let r = right - (1 + i);
    isPalindrome = s[l] === s[r];
    if (!isPalindrome) {
      break;
    }
  }
  return isPalindrome;
}

/**
 * 문자열에 존재하는 가장 긴 펠린드롬 찾기
 * 재귀적 방법을 통한 접근은 펠린드롬 구성을 위한 함수
 * 동적 프로그래밍을 통해 계산을 줄인다면 bottom-up방식으로 접근해야 됨.
 *
 * s[i ... n] 인 문자열이 존재한다고 가정.
 * 하나의 문자만 보면 이게 성립
 * s[i, n] 이 true 라면 s[i] 에서 s[n]까지는 펠린드롬 성립.
 *
 * 문자열이 긴 경우
 * s[i,n] = s[i+1, n-1] && s[i] === s[n]( 현재 인덱스와 이전 인덱스 문자열 모두 동일하면 펠린드롬 성립 )
 *
 */
function findPalindrom(s) {
  const len = s.length;
  const map = [];
  let left = 0;
  let right = 0;
  // 기본맵 구성
  for (left = 0; left < len; left++) {
    map[left] = [];
    for (right = 0; right < len; right++) {
      map[left][right] = "-"; // 기본값은 -
    }
  }

  let start = 0;
  let end = 0;
  // 우측에서 좌측으로 이동
  for (left = len - 1; left >= 0; left--) {
    // 시작지점에서 끝까지
    for (right = left; right < len; right++) {
      //두 글자 이하일 경우 직접비교를 통해 펠린드롬 여부 체크
      if (right - left < 3) {
        map[left][right] = s[left] === s[right];
      } else {
        // 해당 인덱스의 문자가 동일해도 이전 문자가 동일하지 않으면 펠린드롬이 성립하지 않음
        map[left][right] = s[left] === s[right] && map[left + 1][right - 1];
      }
      // //펠린드롬이 성립하고 이전 문자열보다 현재 문자열이 더 길다면 대체
      if (map[left][right] && end - start <= right - left) {
        start = left;
        end = right;
      }
    }
  }

  return s.substring(start, end + 1);
}

function findPalindromExtra(s) {
  const len = s.length;
  const map = [];
  let left = 0;
  let right = 0;
  // 기본맵 구성
  for (left = 0; left < len; left++) {
    map[left] = [];
    for (right = 0; right < len; right++) {
      map[left][right] = "-"; // 기본값은 -
    }
  }

  let start = 0;
  let end = 0;
  /**
   * 인덱스 구성을 좌우로 줄이는 방식으로는 map을 효율적으로 사용하기 힘듬
   * 좌->우, 우<-좌 둘중 하나를 선택할 필요가 있음.
   *
   */
  // 우측에서 좌측으로 이동
  for (right = 0; right < len; right++) {
    // 시작지점에서 끝까지
    for (left = right; left >= 0; left--) {
      //두 글자 이하일 경우 직접비교를 통해 펠린드롬 여부 체크
      if (right - left < 3) {
        map[left][right] = s[left] === s[right];
      } else {
        // 해당 인덱스의 문자가 동일해도 이전 문자가 동일하지 않으면 펠린드롬이 성립하지 않음
        // 이전 문자의 조건은 history처럼 항상 이전문자의 동일성이 중요
        map[left][right] = s[left] === s[right] && map[left + 1][right - 1];
      }
      // //펠린드롬이 성립하고 이전 문자열보다 현재 문자열이 더 길다면 대체
      if (map[left][right] && end - start <= right - left) {
        start = left;
        end = right;
      }
    }
  }

  return s.substring(start, end + 1);
}

function getTime(fun, ...rest) {
  const start = performance.now();
  console.log("begin", fun.name);
  const res = fun.apply(null, rest);
  console.log("compleate-tiem", performance.now() - start);
  return res;
}

// console.log(
//   getTime(
//     solution,
//     "uwqrvqslistiezghcxaocjbhtktayupazvowjrgexqobeymperyxtfkchujjkeefmdngfabycqzlslocjqipkszmihaarekosdkwvsirzxpauzqgnftcuflzyqwftwdeizwjhloqwkhevfovqwyvwcrosexhflkcudycvuelvvqlbzxoajisqgwgzhioomucfmkmyaqufqggimzpvggdohgxheielsqucemxrkmmagozxhvxlwvtbbcegkvvdrgkqszgajebbobxnossfrafglxvryhvyfcibfkgpbsorqprfujfgbmbctsenvbzcvypcjubsnjrjvyznbswqawodghmigdwgijfytxbgpxreyevuprpztmjejkaqyhppchuuytkdsteroptkouuvmkvejfunmawyuezxvxlrjulzdikvhgxajohpzrshrnngesarimyopgqydcmsaciegqlpqnclpwcjqmhtmtwwtbkmtnntdllqbyyhfxsjyhugnjbebtxeljytoxvqvrxygmtogndrhlcmbmgiueliyfkkcuypvvzkomjrfhuhhnfbxeuvssvvllgukdolffukzwqaimxkngnjnmsbvwkajyxqntsqjkjqvwxnlxwjfiaofejtjcveqstqhdzgqistxwsgrovvwgorjaoosremqbzllgbgrwtqdggxnyvkivlcvnv"
//   )
// );

/**
 * 
[
    a      b      a     b
a [ true, false, true, false ],
b [    -, true, false, true ],
a [    -,    -,  true, false ],
b [    -,    -,     -, true ]
]
 */

/**
    x       a      a      b      c      a      x      a      b      a      x      a      a      x
x [true,  false, false, false, false, false, false, false, false, false, false, false, false, false],
a ['-',   true,  true,  false, false, false, false, false, false, false, false, false, false, false],
a ['-',   '-',   true,  false, false, false, false, false, false, false, false, false, false, false],
b ['-',   '-',   '-',   true,  false, false, false, false, false, false, false, false, false, false],
c ['-',   '-',   '-',   '-',   true,  false, false, false, false, false, false, false, false, false],
a ['-',   '-',   '-',   '-',   '-',   true,  false, true,  false, false, false,  true, false, false],
x ['-',   '-',   '-',   '-',   '-',   '-',    true, false, false, false,  true, false, false, false],
a ['-',   '-',   '-',   '-',   '-',   '-',    '-',   true, false,  true, false, false, false, false],
b ['-',   '-',   '-',   '-',   '-',   '-',    '-',   '-',   true, false, false, false, false, false],
a ['-',   '-',   '-',   '-',   '-',   '-',    '-',   '-',    '-',  true, false,  true, false, false],
x ['-',   '-',   '-',   '-',   '-',   '-',    '-',   '-',    '-',  '-',   true, false, false, true ],
a ['-',   '-',   '-',   '-',   '-',   '-',    '-',   '-',    '-',  '-',    '-',  true,  true, false],
a ['-',   '-',   '-',   '-',   '-',   '-',    '-',   '-',    '-',  '-',    '-',   '-',  true, false],
x ['-',   '-',   '-',   '-',   '-',   '-',    '-',   '-',    '-',  '-',    '-',   '-',   '-',  true]


 */
//console.log(getTime(findPalindrom, "abab"));
const long =
  "uwqrvqslistiezghcxaocjbhtktayupazvowjrgexqobeymperyxtfkchujjkeefmdngfabycqzlslocjqipkszmihaarekosdkwvsirzxpauzqgnftcuflzyqwftwdeizwjhloqwkhevfovqwyvwcrosexhflkcudycvuelvvqlbzxoajisqgwgzhioomucfmkmyaqufqggimzpvggdohgxheielsqucemxrkmmagozxhvxlwvtbbcegkvvdrgkqszgajebbobxnossfrafglxvryhvyfcibfkgpbsorqprfujfgbmbctsenvbzcvypcjubsnjrjvyznbswqawodghmigdwgijfytxbgpxreyevuprpztmjejkaqyhppchuuytkdsteroptkouuvmkvejfunmawyuezxvxlrjulzdikvhgxajohpzrshrnngesarimyopgqydcmsaciegqlpqnclpwcjqmhtmtwwtbkmtnntdllqbyyhfxsjyhugnjbebtxeljytoxvqvrxygmtogndrhlcmbmgiueliyfkkcuypvvzkomjrfhuhhnfbxeuvssvvllgukdolffukzwqaimxkngnjnmsbvwkajyxqntsqjkjqvwxnlxwjfiaofejtjcveqstqhdzgqistxwsgrovvwgorjaoosremqbzllgbgrwtqdggxnyvkivlcvnv";
const short = "aabbcc";
//console.log(findPalindrom(long));

// console.log(solution("ccccccccccc"));
// console.log(solution("babab"));
// console.log(solution("abb"));
// console.log(solution("aab"));
//console.log(solution("baa"));
//console.log(solution("xabax"));
//console.log(solution("xaaxabaxaax"));
//console.log(solution("xaabcaxabaxaax"));
//console.log(solution("abccccbbcccc"));
//console.log(solution("abccccbbcccc"));

function findPalindromCenterAround(s) {
  let len = s.length;
  if (s == null || len < 1) return "";
  let start = 0;
  let end = 0;
  for (let i = 0; i < len; i++) {
    let c1 = expandAroundCenter(s, i, i);
    let c2 = expandAroundCenter(s, i, i + 1);
    let c = Math.max(c1, c2);
    if (c > end - start) {
      // c의 length에 값 보정처리(c%2)
      start = i - Math.floor((c - 1) / 2);

      end = i + Math.floor(c / 2);
    }
  }
  return s.substring(start, end + 1);
}

/**
 * 주어진 문자열 s를 기준으로 펠린드롬 여부를 체크 하면 센터index를 반환
 * left :시작
 * right: 끝
 */
function expandAroundCenter(s, left, right) {
  let L = left;
  let R = right;
  let len = s.length;
  // console.log("req================\n");
  // console.log("l", left, "r", right, "s[l]", s[L], "s[r]", s[R]);
  // 문자열이 동일하지 않을 때 까지 인덱스를 밖으로 늘리며 체크
  while (L >= 0 && R < len && s[L] === s[R]) {
    L--;
    R++;
  }
  // console.log("l", L, "r", R, "sum", R - L - 1);
  // console.log("res================\n");
  // 증감연산자로 늘어난 1을 보정 후 리턴
  return R - L - 1;
}

console.log(getTime(findPalindromExtra, long));

console.log(getTime(findPalindromCenterAround, long));
