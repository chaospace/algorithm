/**
평면에 N 개의 디스크를 그립니다.
디스크는 0에서 N-1까지 번호가 매겨집니다.
디스크의 반지름을 지정하는 음이 아닌 정수 N개의 배열 A가 제공됩니다.
J번째 디스크는 중심이 (J, 0)이고 반지름이 A[J]인 상태로 그려집니다.

J ≠ K와 J번째 디스크와 K번째 디스크에 적어도 하나의 공통점이 있으면
J번째 디스크와 K번째 디스크가 교차한다고 합니다
(디스크에 테두리가 있다고 가정).

아래 그림은 다음과 같이 N = 6 및 A에 대해 그려진 디스크를 보여줍니다.

  A[0] = 1
  A[1] = 5
  A[2] = 2
  A[3] = 1
  A[4] = 4
  A[5] = 0


교차하는 11개의(정렬되지 않은) 디스크 쌍이 있습니다.

디스크 1과 4는 교차하고 둘 다 다른 모든 디스크와 교차합니다.
디스크 2는 디스크 0 및 3과도 교차합니다.

위에서 설명한 대로 N개의 디스크를 설명하는 배열 A가 주어지면 교차하는 
디스크의 (순서가 지정되지 않은) 쌍의 수를 반환합니다. 
교차하는 쌍의 수가 10000000을 초과하면 함수는 -1을 반환해야 합니다.

N은 [ 0 .. 100,000 ] 범위 내의 정수 이고;
배열 A의 각 요소는 [ 0 .. 2,147,483,647 ] 범위 내의 정수 입니다.

 */

function solution(A) {
  const left = [];
  const right = [];
  for (let i = 0; i < A.length; i++) {
    left.push(i - A[i]);
    right.push(i + A[i]);
  }

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  let count = 0;
  let j = 0;
  const len = A.length;
  // right를 기준으로 count
  for (let i = 0; i < len; i++) {
    while (j < len && right[i] >= left[j]) {
      count += j - i;
      j++;
    }
  }
  return count;
}

//solution([1, 5, 2, 1, 4, 0]);

/**
 * point 를 구성한 방법
 * 코드만 보면 이게 더 이해가 쉬움.
 * @param {*} A
 */
function solutionBruteForce(A) {
  const len = A.length;
  const pointers = A.map((radius, center) => {
    return [center - radius, center + radius];
  });
  pointers.sort((a, b) => a[0] - b[0]);
  console.log(pointers);
  let count = 0;
  for (let i = 0; i < len; i++) {
    const boundary = pointers[i][1];
    for (let j = i + 1; j < len; j++) {
      if (pointers[j][0] <= boundary) {
        count++;
        if (count > 10000000) {
          return -1;
        }
      } else {
        // 범위를 벗어나면 루프 중단.
        break;
      }
    }
  }
  console.log("count", count);
}

solutionBruteForce([1, 5, 2, 1, 4, 0]);
