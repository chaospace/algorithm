/**
 * 행렬 곱셈을 반환하는 함수를 작성
 * @param {*} A
 * @param {*} B
 */

function solution(A, B) {
  // matrix-multitple
  function mutiple(row) {
    let arr = [];
    // 곱하는 배열의 열의 길이는 상관없음.
    for (let i = 0; i < B[0].length; i++) {
      let v = 0;
      for (let j = 0; j < row.length; j++) {
        // 곱하는 배열에 row길이는 인자 row의 길이와 동일.
        v += row[j] * B[j][i];
      }
      arr.push(v);
    }
    return arr;
  }

  const results = [];
  // row증가
  for (let i = 0; i < A.length; i++) {
    // row를 넘겨 B에 대한 연산은 끝낸 결과를 받는게 더 좋은거 아닌가?
    const row = A[i];
    results.push(mutiple(row));
  }
  console.log("results", results);
}

// solution(
//   [
//     [1, 4, 3],
//     [3, 2, 2]
//   ],
//   [
//     [3, 1],
//     [3, 2],
//     [1, 4]
//   ]
// );
/**
 * 1*3 + 4*3 + 3*3 = 3 + 12 + 9 = 24,
 * 1*3 + 4*3 + 3*3 = 3 + 12 + 9 = 24,
 *
 * 3*3 + 2*3 + 2*3 = 9 + 6 + 6 = 21,
 */
/**
 *
 * 1 * 3 + 4 * 3 = 3 + 12,
 * 1 * 3 + 4 * 4 = 3 + 12,
 *
 *
 */

// solution(
//   [
//     [2, 3, 2],
//     [4, 2, 4],
//     [3, 1, 4]
//   ],
//   [
//     [5, 4, 3],
//     [2, 4, 1],
//     [3, 1, 1]
//   ]
// );
//[([22, 22, 11], [36, 28, 18], [29, 20, 14])];
/**
 * 2*5+3*2+2*3=10+6+6=22,
 * 2*4+3*4+2*1=8+12+3=22,
 * 2*3+3*1+2*1=6+3+2 =11
 */

/**
 * 행렬 곱셈이 for of로 가능한가?
 * 가로 세로 길이가 동일하다면?
 * 정사각 행렬일 경우 별도 루프없이 계산가능?
 */
function soluionForof(A, B) {
  for (let i = 0; i < A.length; i++) {
    let v = 0;
    for (let j = 0; j < A[i].length; j++) {
      console.log("A[i][j]", A[i][j], "B[j][i]", B[j][i]);
      v += A[i][j] + B[i][j];
    }
    console.log("v", v);
  }
}

soluionForof(
  [
    [1, 2],
    [2, 1]
  ],
  [
    [3, 5],
    [4, 1]
  ]
);

//console.log("array", [...Array(10).keys()]);
