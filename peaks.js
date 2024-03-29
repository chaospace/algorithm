/**
 
N개의 정수로 구성된 비어 있지 않은 배열 A가 제공됩니다.
피크는 이웃보다 큰 배열 요소입니다. 
보다 정확하게는 0 < P < N − 1, A[P − 1] < A[P] 및 A[P] > A[P + 1]인 인덱스 P입니다.

예를 들어, 다음 배열 A:
    A[0] = 1 
    A[1] = 2 
    A[2] = 3 
    A[3] = 4 
    A[4] = 3 
    A[5] = 4 
    A[6] = 1 
    A[7] = 2 
    A[ 8] = 3 
    A[9] = 4 
    A[10] = 6 
    A[11] = 2
정확히 3개의 피크(3, 5, 10)가 있습니다.

이 배열을 같은 수의 요소를 포함하는 블록으로 나누고 싶습니다. 보다 정확하게는 다음 블록을 생성하는 숫자 K를 선택하려고 합니다.

A[0], A[1], ..., A[K - 1],
A[K], A[K + 1], ..., A[2K - 1],
...
A[N - K], A[N - K + 1], ..., A[N - 1].
또한 모든 블록에는 적어도 하나의 피크가 포함되어야 합니다.
블록의 극단 요소(예: A[K − 1] 또는 A[K])도 피크가 될 수 있지만 두 이웃(인접한 블록의 하나 포함)이 모두 있는 경우에만 가능합니다.

목표는 배열 A를 나눌 수 있는 최대 블록 수를 찾는 것입니다.

어레이 A는 다음과 같이 블록으로 나눌 수 있습니다.

한 블록(1, 2, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2). 이 블록에는 세 개의 피크가 있습니다.
두 블록 (1, 2, 3, 4, 3, 4) 및 (1, 2, 3, 4, 6, 2). 모든 블록에는 피크가 있습니다.
세 블록 (1, 2, 3, 4), (3, 4, 1, 2), (3, 4, 6, 2). 모든 블록에는 피크가 있습니다. 
특히 첫 번째 블록(1, 2, 3, 4)은 A[3]에서 피크를 가집니다. 왜냐하면 인접한 블록 A[2] < A[3] > A[4]이기 때문입니다.

그러나 배열 A는 (1, 2, 3), (4, 3, 4), (1, 2, 3) 및 (4, 6, 2)의 네 블록으로 나눌 수 없습니다. 
(1,2,3) 블록에 피크가 없습니다. 
특히(4, 3, 4)블록에는 A[3] 및 A[5]의 두 피크가 포함되어 있습니다.

배열 A를 분할할 수 있는 최대 블록 수는 3개입니다.

함수 작성:

N개의 정수로 구성된 비어 있지 않은 배열 A가 주어지면 A를 나눌 수 있는 최대 블록 수를 반환합니다.
A를 몇 개의 블록으로 나눌 수 없는 경우 함수는 0을 반환해야 합니다.

예를 들면 다음과 같습니다.
    A[0] = 1 
    A[1] = 2 
    A[2] = 3 
    A[3] = 4 
    A[4] = 3 
    A[5] = 4 
    A[6] = 1 
    A[7] = 2 
    A[ 8] = 3 
    A[9] = 4 
    A[10] = 6 
    A[11] = 2
함수는 위에서 설명한 대로 3을 반환해야 합니다.

다음 가정에 대한 효율적인 알고리즘을 작성 하십시오.

N은 범위 [ 1 .. 100,000 ] 내의 정수 이고;
배열 A의 각 요소는 [ 0 .. 1,000,000,000 ] 범위 내의 정수 입니다
*/

function divisor(n) {
  let i = 2;
  const divisors = [];
  while (i * i < n) {
    if (n % i === 0) {
      divisors.push(i);
      divisors.push(n / i);
    }
    i++;
  }
  if (i * i === n) {
    divisors.push(i);
  }
  divisors.sort((a, b) => a - b);
  return divisors;
}

/**
 * peak를 찾고
 * k개의 원소로 묶어 배열을 분할 하고 싶다.
 * 단 분할 된 배열은 peak를 하나 이상 포함해야 한다.
 * 조건을 만족하며 분할 할 수 있는 최대 블록의 수를 반환.
 * @param {*} A
 */
function solution(A) {
  const len = A.length;
  const peaks = [];
  A.forEach((ele, idx) => {
    if (idx > 0 && idx < len) {
      if (ele > Math.max(A[idx - 1], A[idx + 1])) {
        peaks.push(idx);
      }
    }
  });

  let end = peaks.length;
  if (end <= 1) {
    return end;
  }

  let maxGroup = 1;
  // 그룹은 peak 수보다 클 수 없고 2보다 크다
  for (let i = end; i >= 2; i--) {
    // 나누어 떨어지는 경우만 체크 시작
    if (len % i === 0) {
      let idx = 0;
      const divisor = len / i;
      for (let j = 0; j < end; j++) {
        const s = divisor * idx;
        const e = divisor * (idx + 1);
        if (s <= peaks[j] && e > peaks[j]) {
          idx += 1;
        }
      }
      if (idx === i) {
        maxGroup = idx;
        break;
      }
    }
  }

  return maxGroup;
}
/**
     A[0] = 1 
    A[1] = 2 
    A[2] = 3 
    A[3] = 4 
    A[4] = 3 
    A[5] = 4 
    A[6] = 1 
    A[7] = 2 
    A[ 8] = 3 
    A[9] = 4 
    A[10] = 6 
    A[11] = 2 
 */
console.log("12%3", 12 % 3);
console.log("max", solution([1, 2, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2]));
// console.log("max", solution([1, 2, 3, 3, 3, 4, 1, 2, 3, 4, 6, 2]));
// console.log("max", solution([10, 1, 1, 1, 10, 1]));
// console.log("max", solution([0, 1000, 0, 0]));
// console.log("max", solution([0, 1000, 0, 0, 4000]));
// console.log("max", solution([0, 1000, 0, 0, 4000, 0]));
