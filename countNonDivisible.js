/**
 N개의 정수로 구성된 배열 A가 주어집니다.

0 ≤ i < N인 각 숫자 A[i]에 대해 A[i]의 약수가 아닌 배열의 요소 수를 세고 싶습니다.
우리는 이러한 요소가 비제수(non-divisors)라고 말합니다.

예를 들어 다음과 같은 정수 N = 5 및 배열 A를 고려하십시오.
    A[0] = 3 
    A[1] = 1 
    A[2] = 2 
    A[3] = 3 
    A[4] = 6
다음 요소의 경우:

A[0] = 3, 비제수는 2, 6,
A[1] = 1, 비제수는 3, 2, 3, 6,
A[2] = 2, 비제수는 3, 3, 6,
A[3] = 3, 비제수는 2, 6,
A[4] = 6, 비제수가 없습니다.
함수 작성:

기능 솔루션(A);

N개의 정수로 구성된 배열 A가 주어지면 비약수의 양을 나타내는 일련의 정수를 반환합니다.

결과 배열은 정수 배열로 반환되어야 합니다.

예를 들면 다음과 같습니다.

    A[0] = 3 
    A[1] = 1 
    A[2] = 2 
    A[3] = 3 
    A[4] = 6
함수는 위에서 설명한 대로 [2, 4, 3, 2, 0]을 반환해야 합니다.

다음 가정에 대한 효율적인 알고리즘을 작성 하십시오.

N은 [ 1 .. 50,000 ] 범위 내의 정수 이고;
배열 A의 각 요소는 [ 1 .. 2 * N ] 범위 내의 정수 입니다.

 */

function getDivisor(n) {
  let i = 1;
  const arr = [];

  while (i * i < n) {
    if (n % i === 0) {
      arr.push(i);
      arr.push(n / i);
    }
    i++;
  }
  if (i * i === n) {
    arr.push(i);
  }
  return arr;
}

function solution(A) {
  const len = A.length;

  const store = {};
  const answer = [];
  for (let i = 0; i < len; i++) {
    const key = A[i];
    console.log("key", key, getDivisor(key));
  }
  console.log("store", store);
  return answer;
}

//console.log(solution([3, 1, 2, 3, 6]));

/**
 * 배열에 있는 원소의 중복을 고려해야 하기 때문에
 * 미리 배열 원소의 카운트를 배열에 저장해둠.
 *
 * 루프를 돌며 해당 원소의 약수 목록을 추출하고
 * 미리 저장한 카운트 만큼 길이에서 차감해서 나머지 원소의 카운트를 구함.
 * @param {*} A
 * @returns
 */
function solutionRefactor(A) {
  const len = A.length;
  const counters = new Array(2 * len).fill(0);
  // 배열에 자리수를 미리 카운트
  for (let i = 0; i < len; i++) {
    counters[A[i]] += 1;
  }
  //console.log("counters", counters);
  const store = {};
  const answer = [];
  for (let i = 0; i < len; i++) {
    const key = A[i];
    if (!store[key]) {
      store[key] = getDivisor(key);
    }
    const divisors = store[key];
    let count = 0;
    for (let j = 0; j < divisors.length; j++) {
      count += counters[divisors[j]];
    }
    answer.push(len - count);
  }
  //console.log("answer", answer);
  return answer;
}
solutionRefactor([3, 1, 2, 3, 6]);
