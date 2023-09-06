/**
 * 그룹단어 찾기
 *
 * 그룹 단어란 단어에 존재하는 모든 문자에 대해서,
 * 각 문자가 연속해서 나타나는 경우만을 말한다.
 * 예를 들면, ccazzzzbb는 c, a, z, b가 모두 연속해서 나타나고, kin도 k, i, n이 연속해서 나타나기 때문에 그룹 단어이지만,
 * aabbbccb는 b가 떨어져서 나타나기 때문에 그룹 단어가 아니다.
 *
 * 단어 N개를 입력으로 받아 그룹 단어의 개수를 출력하는 프로그램을 작성하시오.
 */

//앞에서 나온 단어가 연속해서 나오지 않고 다시 나온 경우를 찾으면 됨.
function solution(words) {
  const answer = [];
  for (let i = 0; i < words.length; i++) {
    let stack = "";
    let isGroup = true;
    for (let j = 0; j < words[i].length; j++) {
      //첫 글자는 무조건 스택에 추가.
      if (stack.length === 0) {
        stack += words[i][j];
      } else if (words[i][j - 1] !== words[i][j]) {
        //이전 문자와 현재 문자가 다른 경우 stack을 체크
        if (!stack.includes(words[i][j])) {
          stack += words[i][j];
        } else {
          isGroup = false; //stack에 이미 추가된 문자가 나온 경우 예외처리
          break;
        }
      }
    }
    if (isGroup) {
      answer.push(words[i]);
    }
  }
  return answer;
}

// console.log(solution(["happy", "new", "year"]));
// console.log(solution(["aba", "abab", "abcabc", "a"]));
//console.log(solution(["ab", "aa", "aca", "ba", "bb"]));
// console.log(solution(["yzyzy", "azyzyza"]));
// console.log(
//   solution([
//     "aaa",
//     "aaazbz",
//     "babb",
//     "aazz",
//     "azbz",
//     "aabbaa",
//     "abacc",
//     "aba",
//     "zzaz",
//   ])
// );

/**
 * 배열에 원소의 카운트 처리.
 * @param {*} words
 */
function solutionBackTracking(words) {
  const backtracking = (word, index, stack) => {
    if (index >= word.length) {
      return Object.values(stack).every((v) => v === 1);
    }

    if (!stack[word[index]]) {
      //없는 문자는 추가
      stack[word[index]] = 1;
    } else if (word[index - 1] !== word[index]) {
      // 그렇지 않고 이전 문자와 다른 문자가 오면 이전 문자에 카운트를 증가.
      stack[word[index]] += 1;
      // 이후 문자는 체크가 필요없으니 index값을 마지막으로 이동
      index = word.length;
    }
    return backtracking(word, index + 1, stack);
  };

  //
  let answer = [];
  for (let i = 0; i < words.length; i++) {
    if (backtracking(words[i], 0, {})) {
      answer.push(words[i]);
    }
  }
  return answer;
}

console.log(solutionBackTracking(["happy", "new", "year"]));
console.log(solutionBackTracking(["aba", "abab", "abcabc", "a"]));
console.log(solutionBackTracking(["ab", "aa", "aca", "ba", "bb"]));
