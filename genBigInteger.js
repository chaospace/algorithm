// 큰 수 만들기
/**
 * 어떤 숫자에서 k개의 수를 제거했을 때 얻을 수 있는 가장 큰 숫자 구하기.
 * 숫자는 왼쪽에서 오른쪽으로만 조합.
 *  number	    k	return
 *  1924	      2	94
 *  1231234	    3	3234
 *  4177252841	4	775841
 * 
 *  1231
 *  1232
제한사항
- number는 2자리 이상, 1,000,000자리 이하인 숫자입니다.
- k는 1 이상 number의 자릿수 미만인 자연수입니다.
 * ex)
 *  1924에서 두 개를 제거하면 [19, 12, 14, 92, 94, 24];
 *  가장 큰수는 94
 *
 *  1231234에서 세 개를 제거하면 나올 수 있는 수의 경우의 수
 * 
 * 1924 경우의 수를 조합하려면 
 *  - 최초 1을 추출
 *  - k 번재 까지 이어서 수를 추출
 * 
 * 추출할게 아니라 조합해 관리해야 한다.
 *  shift를 이용해 조합할 경우 조합에 자리수가 길어지면 빠지는 경우 발생 
 *  가장 확실한 방법은 시작 인덱스를 늘려가고 하위 루프에서 이를 조합하는 것.
 *  
 * 조합 방법 정리
 *  - 기준값에서 차례대로 조합
 *  - 기분값 제거 후 차례대로 조합
 */
//const str = "1924";
// console.log(solution("1924", 2));
//console.log(solution("1231234", 3));
//console.log(solution("4177252841", 4));

function getCombination(pick, numbers, k) {
  const arr = [];
  const fixedIndex = pick + 1;
  const prefix = numbers.substring(pick, fixedIndex);
  const rest = numbers.substring(fixedIndex);
  const max = numbers.length;
  const kk = rest.length >= k ? k : 0;

  let appendIndex = 1;
  while (appendIndex < kk) {
    for (let i = fixedIndex; i < max; i++) {
      const end = i + k - appendIndex;
      const append = numbers.substring(i, end);
      if ((prefix + append).length == k) {
        arr.push(prefix + append);
      }
    }
    appendIndex++;
  }
  return arr;
}

// 조합 방법 개선
// function solution(numbers, k) {
//   let answer = -1;
//   const arr = [];
//   // 만들어지는 자릿수
//   const preciseLimit = numbers.length - k;
//   const max = numbers.length;
//   let precise = 2;
//   while (precise < 3) {
//     const fixedPrecise = precise + 1;
//     let appendPrecise = 1;
//     const prefix = numbers.substring(fixedPrecise - 1, fixedPrecise);
//     const rest = numbers.substring(fixedPrecise);
//     const kk = rest.length >= preciseLimit ? preciseLimit : 0;
//     while (appendPrecise < kk) {
//       for (let i = fixedPrecise; i < max; i++) {
//         const end = i + preciseLimit - appendPrecise;
//         const value = prefix + numbers.substring(i, end);
//         if (value.length === preciseLimit) {
//           answer = Math.max(value * 1, answer);
//           arr.push(value);
//         }
//       }
//       appendPrecise++;
//     }
//     precise++;
//   }
//   return arr;
// }

function combine(number, k, fixed) {
  const picking = number.substring(0, fixed);
  if (picking.length >= k) return picking;
  const space = k - picking.length;
  const max = number.length;
  for (let i = picking.length; i < max; i++) {
    const end = i + space;
    console.log("picking", picking, "start", i, "end", end, "diff", end - i);
    const p = number.substring(i, end);
    const value = picking + p;
    console.log("value", value, "p", p);
  }

  //return number.substring(start, k);
}

/**
 * 타깃으로 주어진 number를 k로 조합할 경우 나올 수 있는 경우의 수를 반환
 * @param {*} number
 * @param {*} k
 
function solution(number, k) {
  const max = number.length;
  const precise = max - k;
  const maxEdge = max - precise;
  const quotient = Math.floor(max / precise);
  let higher = -1;
  const arr = [];
  for (let i = 0; i < quotient; i++) {
    const index = i * precise;
    const value = number.substring(index, index + precise);
    higher = value.split("").reduce((c, v) => {
      return Math.max(parseInt(c), parseInt(v));
    }, higher);
  }
  const higherIndex = number.indexOf(higher);
  //가장 높을 수로 이루어진 문자열 추출
  const candidate = number.substring(higherIndex, maxEdge);
  const start = higherIndex + candidate.length;
  for (let j = 0; j < maxEdge; j++) {
    const begin = start + j;
    const end = begin + precise - candidate.length;
    const append = number.substring(begin, end);
    const value = candidate + append;
    if (value.length === precise) {
      arr.push(value);
      higher = Math.max(parseInt(value), higher);
    }
  }
  return higher;
}
*/

/**
 * 조건에 해당하는 자리 수를 만족할 때 까지 가장 큰 수를 찾아서 조합한다.
 * @param {} number
 * @param {*} k
 * @returns
 */
function solution(number, k) {
  const answer = [];
  const precise = number.length - k;
  for (let i = 0; i < number.length; i++) {
    const value = number.charAt(i);
    while (k && answer[answer.length - 1] < value) {
      answer.pop();
      k--;
    }

    answer.push(value);
    if (k === 0) {
      answer.push(number.substring(i + 1));
      break;
    }
  }
  return answer.join("");
}

console.log(solution("1924", 2));
console.log(solution("1231234", 3));
console.log(solution("4177252841", 4));
