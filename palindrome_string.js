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
 */

/**
 * 앞뒤가 동일한 문자열을 찾는 방법?
 * 반복을 통해 모든 가능성을 체크하기
 */

function isPalindrome(s, left, right) {
  const end = right - left;
  for (let i = 0; i < end / 2; i++) {
    if (s[i + left] !== s[end - 1 + i]) {
      return false;
    }
  }
  return true;
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
  const len = s.length;
  let left = 0;
  let right = 0;
  let answer = "";
  let map = {};
  // 모두 같은 문자라면 리턴!!
  if (s.split("").every(v => s[0] === v)) {
    return s;
  }

  for (left = 0; left < len; left++) {
    // 뒤에서 부터 left까지 순회
    for (right = len; right > left; right--) {
      // 우측값이 변경됨에 따라 순회하는 곳의 중심을 이동하며
      // 문자열 위치와 관계없는 펠린드롬을 추출
      const max = right - left;
      const center = Math.floor(max / 2);
      let isPalindrome = true;
      for (let i = 0; i < center; i++) {
        if (s[left + i] !== s[right - (1 + i)]) {
          isPalindrome = false;
          break;
        }
      }
      if (isPalindrome) {
        const v = s.substring(left, right);
        if (v.length > answer.length) {
          answer = v;
        }
      }
    }
  }

  return answer;
}

/**
 * 문자열 순회 정보를 map에 기억해 두고 재활용을 해보자.
 *
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

console.log(
  solution(
    "uwqrvqslistiezghcxaocjbhtktayupazvowjrgexqobeymperyxtfkchujjkeefmdngfabycqzlslocjqipkszmihaarekosdkwvsirzxpauzqgnftcuflzyqwftwdeizwjhloqwkhevfovqwyvwcrosexhflkcudycvuelvvqlbzxoajisqgwgzhioomucfmkmyaqufqggimzpvggdohgxheielsqucemxrkmmagozxhvxlwvtbbcegkvvdrgkqszgajebbobxnossfrafglxvryhvyfcibfkgpbsorqprfujfgbmbctsenvbzcvypcjubsnjrjvyznbswqawodghmigdwgijfytxbgpxreyevuprpztmjejkaqyhppchuuytkdsteroptkouuvmkvejfunmawyuezxvxlrjulzdikvhgxajohpzrshrnngesarimyopgqydcmsaciegqlpqnclpwcjqmhtmtwwtbkmtnntdllqbyyhfxsjyhugnjbebtxeljytoxvqvrxygmtogndrhlcmbmgiueliyfkkcuypvvzkomjrfhuhhnfbxeuvssvvllgukdolffukzwqaimxkngnjnmsbvwkajyxqntsqjkjqvwxnlxwjfiaofejtjcveqstqhdzgqistxwsgrovvwgorjaoosremqbzllgbgrwtqdggxnyvkivlcvnv"
  )
);
//console.log(solution("babad"));
//console.log(solution("ccccccccccc"));
// console.log(solution("babab"));
// console.log(solution("abb"));
// console.log(solution("aab"));
//console.log(solution("baa"));
//console.log(solution("xabax"));
//console.log(solution("xaaxabaxaax"));
//console.log(solution("xaabcaxabaxaax"));
//console.log(solution("abccccbbcccc"));
//console.log(solution("abccccbbcccc"));
