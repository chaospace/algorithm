/**
 * 배열에 slice의 합이 최대인 구간 찾기?
 *
 * slice의 합을 구하는 방법은 어려가지가 있지만
 * 가장 단순하게 하려면 O(n)의 시간을 위한 방법은 Math.max를 이용해
 * 이저 값과의 합과 0을 비교해 큰 수를 리턴하고( 결국 이 값은 sum을 수행하고 이는 max_sum+A[i]과 같음. )
 * 현재 최대값과 신규 최대값을 비교해 큰 수를 항상 기억함.
 */

function solutionN2(A) {
  let answer = 0;
  const len = A.length;
  for (let i = 0; i < len; i++) {
    let sum = A[i];
    for (let j = i + 1; j < len; j++) {
      sum += A[j];
      answer = Math.max(answer, sum);
    }
  }
  console.log("answer", answer);
}

function solutionON(A) {
  const len = A.length;
  let max_ending = (max_slice = 0);
  for (let i = 0; i < len; i++) {
    //console.log("max_ending", max_ending, "compare", max_ending + A[i]);
    max_ending = Math.max(0, max_ending + A[i]);
    max_slice = Math.max(max_slice, max_ending);
  }

  console.log("max_slice", max_slice);
}

solutionN2([5, -7, 3, 5, -2, 4, -1]);
solutionON([5, -7, 3, 5, -2, 4, -1]);
