/**
N개의 정수로 구성된 배열 A가 주어집니다. 배열 A 의 도미네이터 는 A 요소의 절반 이상에서 발생하는 값입니다.

예를 들어 다음과 같은 배열 A를 고려하십시오.

A[0] = 3 A[1] = 4 A[2] = 3
A[3] = 2 A[4] = 3 A[5] = -1
A[6] = 3 A[7] = 3
A의 도미네이터는 A의 8개 요소 중 5개(즉, 인덱스가 0, 2, 4, 6, 7인 요소)에 나타나기 때문에 3이고 5는 8의 절반보다 큽니다.

함수 작성

N개의 정수로 구성된 배열 A가 주어지면 A의 도미네이터가 발생하는 배열 A의 모든 요소에 대한 인덱스를 반환합니다. 배열 A에 도미네이터가 없으면 함수는 -1을 반환해야 합니다.

예를 들어 다음과 같은 배열 A가 주어진 경우

A[0] = 3 A[1] = 4 A[2] = 3
A[3] = 2 A[4] = 3 A[5] = -1
A[6] = 3 A[7] = 3
함수는 위에서 설명한 대로 0, 2, 4, 6 또는 7을 반환할 수 있습니다.

다음 가정에 대한 효율적인 알고리즘을 작성 하십시오.

N은 [ 0 .. 100,000 ] 범위 내의 정수 이고;
배열 A의 각 요소는 [ −2,147,483,648 .. 2,147,483,647 ] 범위 내의 정수 입니다.
*/

/*
배열에서 가장많이 나오는 숫자를 찾고 
해당 인덱스 배열 반환하기
가장많이 나온 수를 찾는 방법은 어떻게 할까?
맵을 사용하는게 좋을거 같음 한번에 loop로 해결가능 하니까.
*/
function solution(A) {
  // write your code in JavaScript (Node.js 14)
  const len = A.length;
  const candidates = {};
  let dominator = -1;
  for (let i = 0; i < len; i++) {
    const value = A[i];
    if (!candidates[value]) {
      candidates[value] = [];
    }
    candidates[value].push(i);
    if (candidates[value].length > len / 2) {
      dominator = value;
      break;
    }
  }

  return candidates[dominator] ? candidates[dominator][0] : -1;
}

//solution([3, 4, 3, 2, 3, 01, 3, 3]);
console.log(solution([2147483647]));
