/**
초기에 0으로 설정된 N개의 카운터가 제공되며 두 가지 가능한 작업이 있습니다.

증가(X) - 카운터 X가 1씩 증가합니다.
최대 카운터 - 모든 카운터는 카운터의 최대값으로 설정됩니다.
M 정수의 비어 있지 않은 배열 A가 제공됩니다. 이 배열은 연속 작업을 나타냅니다.

A[K] = X이면 1 ≤ X ≤ N이면 연산 K는 증가(X),
A[K] = N + 1이면 연산 K는 최대 카운터입니다.
예를 들어 정수 N = 5이고 배열 A가 다음과 같이 주어진 경우:

    A[0] = 3
    A[1] = 4
    A[2] = 4
    A[3] = 6
    A[4] = 1
    A[5] = 4
    A[6] = 4
각 연속 작업 후 카운터 값은 다음과 같습니다.

    (0, 0, 1, 0, 0)
    (0, 0, 1, 1, 0)
    (0, 0, 1, 2, 0)
    (2, 2, 2, 2, 2) 
    (3, 2, 2, 2, 2)
    (3, 2, 2, 3, 2)
    (3, 2, 2, 4, 2)
목표는 모든 작업 후 모든 카운터의 값을 계산하는 것입니다

N 및 M은 범위 [ 1 .. 100,000 ] 내의 정수이고 ;
배열 A의 각 요소는 [ 1 .. N + 1 ] 범위 내의 정수 입니다.

퍼포먼스를 위해서는 fill을 이용한 array 초기화 대신
인덱스에 해당하는 값을 증가 시 맥스값 적용 상태에 따라 부분적용 후 
마지막 루프를 순회하며 적용되지 않은 맥스값을 한번에 적용해야 함.
 */

function solution(N, A) {
  let counters = new Array(N).fill(0);
  let maxCount = 0;

  let applyCount = 0;
  for (let i = 0; i < A.length; i++) {
    const x = A[i];
    if (x <= N) {
      let counter = counters[x - 1];
      if (applyCount && applyCount > counter) {
        counter = applyCount;
      }
      counters[x - 1] = ++counter;
      maxCount = Math.max(maxCount, counters[x - 1]);
    } else {
      applyCount = maxCount;
    }
  }

  if (applyCount) {
    counters = counters.map(value => (value < applyCount ? applyCount : value));
  }
  console.log("counters", counters);
  return counters;
}
solution(5, [3, 4, 4, 6, 1, 4, 4]);
/**
 
    A[0] = 3
    A[1] = 4
    A[2] = 5
    A[3] = 1
    A[4] = 6
    A[5] = 1
    A[6] = 4
    A[7] = 4

    3 {0,0,1,0}
    4 {0,0,1,1}
    5 {1,1,1,1}
    1 {2,1,1,1}
    6 {2,2,2,2}
    1 {3,2,2,2}
    4 {3,2,2,3}
    4 {3,2,2,4}
 */
solution(4, [3, 4, 5, 1, 6, 1, 4, 4]);
