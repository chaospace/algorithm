/**
 * 행렬 곱셈을 반환하는 함수를 작성
 * @param {*} A
 * @param {*} B
 */

function solution(A, B) {
  // matrix-multitple
  function mutiple(row) {
    let arr = [];
    // 행렬은 가로,세로가 동일하다는 가정으로 진행
    for (let i = 0; i < B.length; i++) {
      let v = 0;
      for (let j = 0; j < B[i].length; j++) {
        // row는 가로, 곱하는 배열은 세로진행
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

solution(
  [
    [1, 4, 3],
    [3, 2, 2],
    [4, 1, 5],
    [4, 1, 5]
  ],
  [
    [3, 3, 1],
    [3, 3, 2],
    [3, 3, 2]
  ]
);

/**
 *
 * 1 * 3 + 4 * 3 = 3 + 12,
 * 1 * 3 + 4 * 4 = 3 + 12,
 *
 *
 */

solution(
  [
    [2, 3, 2],
    [4, 2, 4],
    [3, 1, 4]
  ],
  [
    [5, 4, 3],
    [2, 4, 1],
    [3, 1, 1]
  ]
);
//[([22, 22, 11], [36, 28, 18], [29, 20, 14])];
/**
 * 2*5+3*2+2*3=10+6+6=22,
 * 2*4+3*4+2*1=8+12+3=22,
 * 2*3+3*1+2*1=6+3+2 =11
 */
