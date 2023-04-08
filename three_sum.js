/**
 * 주어진 숫자 배열을 3개 씩 조합해 합이 0인 배열 반환
 * 단 반환된 배열은 중복되면 안됨.
 *
 * input    : [-1, 0, 1, 2, -1, 4];
 * output   : [[-1, -1, 2], [-1, 0, 1]]
 *
 * input    : [0, 0, 0]
 * output   : [[0, 0, 0]]
 *
 * input    : [0, 1, 1]
 * output   : []
 * 조합에서 0이 되는 배열이 없음
 *
 * 제약
 *  3 <= input.length <= 3000
 */

/**
 * 접근방법
 *  - 무차별 대입
 *      - 배열을 순회하며 해당 인덱스를 기준으로 조건을 반복하는 배열을 구성
 *      - 찾아낸 배열에서 인덱스 순서가 동일한 중복배열 제거
 *      - 가장 쉽고 확실하지만 input이 길어질 경우 속도 문제가 있겠지..
 *      - 무차별 대입을 위한 사전작업
 *          - 대상 배열에서 유니크한 숫자를 추출
 *          - 유니크 배열을 시작값으로 해서 조합을 추출.
 *
 *  - 재귀를 통해 조합할 수 있을까?
 *      - 인풋에서 시작값을 제거, 나머지를 조합을 위해 추출.
 *         - -1, 0, 1
 *         - 2, -1, 4
 *         -
 *      - 시작 인덱스와 요청 인덱스에 diff가
 *
 *  합이 0이 되는 값을 찾는 것으로 모든 조합을 체크할 필요는 없음.
 *  가장 효율적인 방식을 찾아라..
 *
 * @param {*} input
 * @returns
 */
function developLoop(input) {
  const map = new Map();
  const len = input.length;
  let o = [];
  // 조합을 수월하게 하기 위한 sort
  input = input.sort((a, b) => a - b);
  // 반복되는 처리를 재귀를 통해 접근 할 수 있을까?
  for (let i = 0; i < len - 2; i++) {
    const a = input[i];
    for (let j = i + 1; j < len - 1; j++) {
      const b = input[j];
      for (let m = j + 1; m < len; m++) {
        const c = input[m];
        // 애매한 숫자 조합을 방지하기 위해 각 값 사이에 구분자를 추가
        const str = [a, b, c].join(",");
        if (!map.get(str)) {
          map.set(str, true);
          const sum = a + b + c;
          if (sum === 0) {
            o.push([a, b, c]);
          }
        }
      }
    }
  }
  return o;
}

function solution(input) {
  const store = new Map();
  input = input.sort((a, b) => a - b);
  const len = input.length;

  for (let i = 0; i < len - 2; i++) {
    const a = input[i];
    let middle = i + 1;
    let end = len - 1;

    if (a > 0) continue;
    if (i > 0 && a === input[i - 1]) continue;

    while (middle < end) {
      const b = input[middle];
      const c = input[end];
      const sum = a + b + c;
      if (sum === 0) {
        store.set(a + "," + b + "," + c, [a, b, c]);
        while (input[middle] === input[middle + 1]) middle++;
        while (input[end] === input[end - 1]) end--;
        middle++;
        end--;
      } else if (sum > 0) {
        end--;
      } else {
        middle++;
      }
    }
  }
  console.log(store);
}
// function solution(input) {
//   const store = new Map();
//   input = input.sort((a, b) => a - b);
//   const len = input.length;
//   // 키를 미리 저장
//   for (let i = 0; i < input.length; i++) {
//     store.set(input[i] * -1, i);
//   }

//   for (let i = 1; i < len; i++) {
//     const key = input[i - 1] + input[i];
//     if (store.get(key)) {
//       const a = store.get(key);
//       const b = i - 1;
//       const c = i;
//       if (a != b && a != c) {
//         console.log("sum :: ", input[a], input[b], input[c]);
//       }
//     }
//   }
// }
// solution([-1, 0, 1, 0]);
solution([-1, 0, 1, 2, -1, -4]);
solution([-2, 0, 1, 1, 2]);
solution([
  34, 55, 79, 28, 46, 33, 2, 48, 31, -3, 84, 71, 52, -3, 93, 15, 21, -43, 57,
  -6, 86, 56, 94, 74, 83, -14, 28, -66, 46, -49, 62, -11, 43, 65, 77, 12, 47,
  61, 26, 1, 13, 29, 55, -82, 76, 26, 15, -29, 36, -29, 10, -70, 69, 17, 49
]);
// developLoop([-1, 0, 1, 0]);
// console.log(
//   "out",
//   developLoop([
//     34, 55, 79, 28, 46, 33, 2, 48, 31, -3, 84, 71, 52, -3, 93, 15, 21, -43, 57,
//     -6, 86, 56, 94, 74, 83, -14, 28, -66, 46, -49, 62, -11, 43, 65, 77, 12, 47,
//     61, 26, 1, 13, 29, 55, -82, 76, 26, 15, -29, 36, -29, 10, -70, 69, 17, 49
//   ])
// );

// console.log("out", developLoop([0, 0, 0, 0]));
// console.log("out", developLoop([-1, 0, 1, 0]));
// console.log("out", developLoop([-1, 0, 1, 2, -1, -4]));
/**
 * [[-4,0,4],[-4,1,3],[-3,-1,4],[-3,0,3],[-3,1,2],[-2,-1,3],[-2,0,2],[-1,-1,2],[-1,0,1]]
 */
//console.log("out", developLoop([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4]));

// console.log(
//   "solution",
//   developLoop([
//     34, 55, 79, 28, 46, 33, 2, 48, 31, -3, 84, 71, 52, -3, 93, 15, 21, -43, 57,
//     -6, 86, 56, 94, 74, 83, -14, 28, -66, 46, -49, 62, -11, 43, 65, 77, 12, 47,
//     61, 26, 1, 13, 29, 55, -82, 76, 26, 15, -29, 36, -29, 10, -70, 69, 17, 49
//   ])
// );
/**
 [
  [-15,1,14],
  [-15,2,13],
  [-15,3,12],
  [-15,4,11],
  [-15,5,10],
  [-15,6,9],
  [-15,7,8],
  [-14,0,14],
  [-14,1,13],
  [-14,2,12],
  [-14,3,11],
  [-14,4,10],
  [-14,5,9],
  [-14,6,8],
  [-14,7,7],
  [-13,-1,14],
  [-13,0,13],
  [-13,1,12],
  [-13,2,11],
  [-13,3,10],
  [-13,4,9],
  [-13,5,8],
  [-13,6,7],
  [-12,-2,14],
  [-12,-1,13],
  [-12,0,12],[-12,1,11],[-12,2,10],[-12,3,9],[-12,4,8],
  [-12,5,7],
  [-11,-3,14],[-11,-2,13],[-11,-1,12],[-11,0,11],[-11,1,10],
  [-11,2,9],[-11,3,8],[-11,4,7],[-11,5,6],
  [-10,-4,14],[-10,-3,13],[-10,-2,12],[-10,-1,11],[-10,0,10],
  [-10,1,9],[-10,2,8],[-10,3,7],[-10,4,6],[-10,5,5],
  [-9,-5,14],[-9,-4,13],[-9,-3,12],[-9,-2,11],[-9,-1,10],[-9,0,9],[-9,1,8],[-9,2,7],
  [-9,3,6],[-9,4,5],
  [-8,-6,14],[-8,-5,13],[-8,-4,12],[-8,-3,11],
  [-8,-2,10],[-8,-1,9],[-8,0,8],[-8,1,7],
  [-8,2,6],[-8,3,5],[-8,4,4],[-7,-7,14],
  [-7,-6,13],[-7,-5,12],[-7,-4,11],[-7,-3,10],
  [-7,-2,9],[-7,-1,8],[-7,0,7],[-7,1,6],
  [-7,2,5],[-7,3,4],[-6,-6,12],[-6,-5,11],
  [-6,-4,10],[-6,-3,9],[-6,-2,8],[-6,-1,7],
  [-6,0,6],[-6,1,5],[-6,2,4],[-6,3,3],
  [-5,-5,10],[-5,-4,9],[-5,-3,8],
  [-5,-2,7],[-5,-1,6],[-5,0,5],[-5,1,4],
  [-5,2,3],[-4,-4,8],[-4,-3,7],
  [-4,-2,6],[-4,-1,5],[-4,0,4],[-4,1,3],
  [-4,2,2],[-3,-3,6],[-3,-2,5],[-3,-1,4],
  [-3,0,3],[-3,1,2],[-2,-2,4],[-2,-1,3],
  [-2,0,2],[-2,1,1],[-1,-1,2],[-1,0,1]]

  118
 */
developLoop([
  -13, 5, 13, 12, -2, -11, -1, 12, -3, 0, -3, -7, -7, -5, -3, -15, -2, 14, 14,
  13, 6, -11, -11, 5, -15, -14, 5, -5, -2, 0, 3, -8, -10, -7, 11, -5, -10, -5,
  -7, -6, 2, 5, 3, 2, 7, 7, 3, -10, -2, 2, -12, -11, -1, 14, 10, -9, -15, -8,
  -7, -9, 7, 3, -2, 5, 11, -13, -15, 8, -3, -7, -12, 7, 5, -2, -6, -3, -10, 4,
  2, -5, 14, -3, -1, -10, -3, -14, -4, -3, -7, -4, 3, 8, 14, 9, -2, 10, 11, -10,
  -4, -15, -9, -1, -1, 3, 4, 1, 8, 1
]);

/**
 * 34, 55, 79,
 * 28, 46, 33,
 * 2,  48, 31,
 *
 *
 * 재귀를 돌게 아니라 그룹을 지은 값에서 서로 조합을 해서 할 수 있을거 같음.
 *
 */

// console.log(
//   a.filter(child => {
//     const r = v.every(element => child.indexOf(element) > -1);
//     console.log("r", r);
//     return !r && child;
//   })
// );
