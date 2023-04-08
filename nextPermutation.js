/**
 * 순열
 * 배열의 순열은 원소를 선형 혹은 시퀀스 순서로 배열하는 것.
 * ex arr=[1,2,3] 의 순열은
 * [1,3,2], [2,1,3],[2,3,1],[3,2,1],[3,1,2],[1,2,3]
 *
 * 일반적인 순열의 순서는 아래와 같음.
 * 오름차순에서 내림차순 순으로 정렬
 * 가장 마지막에서 부터 내림차순을 만족하는 수를 찾아 swap
 * swap시킨 위치를 시작으로 마지막까지 오름차순으로 정렬
 * input = [1,2,3] ( 오름차순 )
 *       = [1,3,2]
 *       = [2,1,3]
 *       = [2,3,1]
 *       = [3,1,2]
 *       = [3,2,1] ( 내림차순 )
 *
 *
 *
 * 정수 순열의 다음 순열의 사전적 정의는 더 큰 정수 순열이다.
 *
 * ex)
 * [1,2,3] => [1,3,2]
 * [2,3,1] => [3,1,2]
 * [3,2,1] => [1,2,3]
 * 위 예제에서 3,2,1의 다음 순열이 1,2,3 인 경우는 3,2,1 보다 더 큰 순열이 없기 때문. 그래서 초기화
 * 
 * 배열의 값은 1씩 증가할 필요가 없음.
   구성된 배열에 순서에서 다음 순열에 조건을 만족시키는 값만 리턴하면 됨.
 * 
3개일의 순열
[ 1, 2, 3 ]
[ 1, 3, 2 ]
[ 2, 1, 3 ]
[ 2, 3, 1 ]
[ 3, 1, 2 ]
[ 3, 2, 1 ]


뒤에서 부터 값이 커지는 순간을 체크 내림차순이 되는 가장 빠른 인덱스를 기준으로 변경해야 된다.

앞에서 부터 보면 오름 내림이 반복될 경우
마지막 내림을 사용
쭉 오름이 될 경우 
마지막 오름을 사용

4개의 순열
[ 1, 2, 3, 4 ]
[ 1, 2, 4, 3 ]
[ 1, 3, 2, 4 ]
[ 1, 3, 4, 2 ]
[ 1, 4, 2, 3 ]
[ 1, 4, 3, 2 ]
[ 2, 1, 3, 4 ]
[ 2, 1, 4, 3 ]
[ 2, 3, 1, 4 ]
[ 2, 3, 4, 1 ]
[ 2, 4, 1, 3 ]
[ 2, 4, 3, 1 ]
[ 3, 1, 2, 4 ]
[ 3, 1, 4, 2 ]
[ 3, 2, 1, 4 ]
[ 3, 2, 4, 1 ]
[ 3, 4, 1, 2 ]
[ 3, 4, 2, 1 ]
[ 4, 1, 2, 3 ]
[ 4, 1, 3, 2 ]
[ 4, 2, 1, 3 ]
[ 4, 2, 3, 1 ]
[ 4, 3, 1, 2 ]
[ 4, 3, 2, 1 ]

뒤에서 부터 접근하는 것은 동일하지만 
자리수가 늘어날 경우 어디를 고정수로 할 것인지를 판단해야 한다.
이 기준은?

순열의 자릴 수의 값을 비교해서 1이상 차이가 벌어지고 있는 곳중 가장 작은 곳이 
시작점. 그런 곳이 없다면 가장 마지막


5개의 순열
[ 1, 2, 3, 4, 5 ]
[ 1, 2, 3, 5, 4 ]
[ 1, 2, 4, 3, 5 ]
[ 1, 2, 4, 5, 3 ]
[ 1, 2, 5, 3, 4 ]
[ 1, 2, 5, 4, 3 ]
[ 1, 3, 2, 4, 5 ]
[ 1, 3, 2, 5, 4 ]
[ 1, 3, 4, 2, 5 ]
[ 1, 3, 4, 5, 2 ]
[ 1, 3, 5, 2, 4 ]
[ 1, 3, 5, 4, 2 ]
[ 1, 4, 2, 3, 5 ]
[ 1, 4, 2, 5, 3 ]
[ 1, 4, 3, 2, 5 ]
[ 1, 4, 3, 5, 2 ]
[ 1, 4, 5, 2, 3 ]
[ 1, 4, 5, 3, 2 ]
[ 1, 5, 2, 3, 4 ]
[ 1, 5, 2, 4, 3 ]
[ 1, 5, 3, 2, 4 ]
[ 1, 5, 3, 4, 2 ]
[ 1, 5, 4, 2, 3 ]
[ 1, 5, 4, 3, 2 ]
[ 2, 1, 3, 4, 5 ]
[ 2, 1, 3, 5, 4 ]
[ 2, 1, 4, 3, 5 ]
[ 2, 1, 4, 5, 3 ]
[ 2, 1, 5, 3, 4 ]
[ 2, 1, 5, 4, 3 ]
[ 2, 3, 1, 4, 5 ]
[ 2, 3, 1, 5, 4 ]
[ 2, 3, 4, 1, 5 ]
[ 2, 3, 4, 5, 1 ]
[ 2, 3, 5, 1, 4 ]
[ 2, 3, 5, 4, 1 ]
[ 2, 4, 1, 3, 5 ]
[ 2, 4, 1, 5, 3 ]
[ 2, 4, 3, 1, 5 ]
[ 2, 4, 3, 5, 1 ]
[ 2, 4, 5, 1, 3 ]
[ 2, 4, 5, 3, 1 ]
[ 2, 5, 1, 3, 4 ]
[ 2, 5, 1, 4, 3 ]
[ 2, 5, 3, 1, 4 ]
[ 2, 5, 3, 4, 1 ]
[ 2, 5, 4, 1, 3 ]
[ 2, 5, 4, 3, 1 ]
[ 3, 1, 2, 4, 5 ]
[ 3, 1, 2, 5, 4 ]
[ 3, 1, 4, 2, 5 ]
[ 3, 1, 4, 5, 2 ]
[ 3, 1, 5, 2, 4 ]
[ 3, 1, 5, 4, 2 ]
[ 3, 2, 1, 4, 5 ]
[ 3, 2, 1, 5, 4 ]
[ 3, 2, 4, 1, 5 ]
[ 3, 2, 4, 5, 1 ]
[ 3, 2, 5, 1, 4 ]
[ 3, 2, 5, 4, 1 ]
[ 3, 4, 1, 2, 5 ]
[ 3, 4, 1, 5, 2 ]
[ 3, 4, 2, 1, 5 ]
[ 3, 4, 2, 5, 1 ]
[ 3, 4, 5, 1, 2 ]
[ 3, 4, 5, 2, 1 ]
[ 3, 5, 1, 2, 4 ]
[ 3, 5, 1, 4, 2 ]
[ 3, 5, 2, 1, 4 ]
[ 3, 5, 2, 4, 1 ]
[ 3, 5, 4, 1, 2 ]
[ 3, 5, 4, 2, 1 ]
[ 4, 1, 2, 3, 5 ]
[ 4, 1, 2, 5, 3 ]
[ 4, 1, 3, 2, 5 ]
[ 4, 1, 3, 5, 2 ]
[ 4, 1, 5, 2, 3 ]
[ 4, 1, 5, 3, 2 ]
[ 4, 2, 1, 3, 5 ]
[ 4, 2, 1, 5, 3 ]
[ 4, 2, 3, 1, 5 ]
[ 4, 2, 3, 5, 1 ]
[ 4, 2, 5, 1, 3 ]
[ 4, 2, 5, 3, 1 ]
[ 4, 3, 1, 2, 5 ]
[ 4, 3, 1, 5, 2 ]
[ 4, 3, 2, 1, 5 ]
[ 4, 3, 2, 5, 1 ]
[ 4, 3, 5, 1, 2 ]
[ 4, 3, 5, 2, 1 ]
[ 4, 5, 1, 2, 3 ]
[ 4, 5, 1, 3, 2 ]
[ 4, 5, 2, 1, 3 ]
[ 4, 5, 2, 3, 1 ]
[ 4, 5, 3, 1, 2 ]
[ 4, 5, 3, 2, 1 ]
[ 5, 1, 2, 3, 4 ]
[ 5, 1, 2, 4, 3 ]
[ 5, 1, 3, 2, 4 ]
[ 5, 1, 3, 4, 2 ]
[ 5, 1, 4, 2, 3 ]
[ 5, 1, 4, 3, 2 ]
[ 5, 2, 1, 3, 4 ]
[ 5, 2, 1, 4, 3 ]
[ 5, 2, 3, 1, 4 ]
[ 5, 2, 3, 4, 1 ]
[ 5, 2, 4, 1, 3 ]
[ 5, 2, 4, 3, 1 ]
[ 5, 3, 1, 2, 4 ]
[ 5, 3, 1, 4, 2 ]
[ 5, 3, 2, 1, 4 ]
[ 5, 3, 2, 4, 1 ]
[ 5, 3, 4, 1, 2 ]
[ 5, 3, 4, 2, 1 ]
[ 5, 4, 1, 2, 3 ]
[ 5, 4, 1, 3, 2 ]
[ 5, 4, 2, 1, 3 ]
[ 5, 4, 2, 3, 1 ]
[ 5, 4, 3, 1, 2 ]
[ 5, 4, 3, 2, 1 ]
 */

/**
 * 재귀를 이용한 순열 구성
 * visited를 통해 제외해야할 값을 체크
 * 재귀를 이용하기 때문에 너무 큰 값은 maximum call stack에 걸린다.
 */
function permutation(list) {
  const visited = {};
  const arr = [];
  let callCount = 0;
  function loop(cnt = 0) {
    callCount++;
    if (cnt === list.length) {
      console.log(arr);
      return;
    }
    for (let i = 0; i < list.length; i++) {
      if (visited[i]) {
        continue;
      }
      visited[i] = true;
      arr[cnt] = list[i];
      loop(cnt + 1);
      visited[i] = false;
    }
  }
  loop();
  console.log("callCount", callCount);
}
//permutation([1, 2, 3, 4]);

/**
 * list를 다음 순열로 변경해 리턴하기
 * 새로운 참조안됨.
 * swap을 이용해서 구성하기
 *
 * 재귀를 통해 이동해야 함.
 * - 배열의 어느 값을 이용해서 처리할지를 먼저 정해야함.
 *  - 마지막 인덱스?
 *  - 마지막 전 인덱스?
 *  - 이를 판단하는 조건은?
 *    - 배열이 내림차순
 * 
 * 
  [1,4,3,5]
  쭉 오름일 경우 마지막 
  내림 오름 이 같이 있으면?
  마지막 오름
  [1,4,5,3]
 * @param {*} list
 */

// 내림차순이 발생하는 인덱스 값 반환
function findDecendingIndex(current, target, list) {
  const a = list[current];
  const b = list[target];
  if (a < b) {
    return current;
  } else if (current <= 0) {
    return -1;
  }
  return findDecendingIndex(current - 1, target, list);
}

function swapValue(l, r, list) {
  const lValue = list[l];
  const rValue = list[r];
  list[l] = rValue;
  list[r] = lValue;
}

function getNextPermutationIndex(list) {
  const len = list.length;

  let rIndex = len - 1;
  let lIndex = findDecendingIndex(rIndex - 1, rIndex, list);
  const limit = lIndex;
  for (let i = len - 2; i > limit; i--) {
    const temp = findDecendingIndex(i - 1, i, list);
    if (temp > lIndex) {
      lIndex = temp;
      rIndex = i;
    }
  }
  return { lIndex, rIndex };
}

function solution(list) {
  const max = list.length;
  if (max <= 2) {
    list.sort((a, b) => b - a);
    return list;
  }

  const { lIndex, rIndex } = getNextPermutationIndex(list);
  // 초기 체크 후에도 내림차순 상태라면 오름차순으로 변경 후 리턴
  if (lIndex === -1) {
    list.sort((a, b) => a - b);
    return list;
  }

  // 내림차순 발생 인덱스를 서로 swap
  swapValue(lIndex, rIndex, list);
  // swap후 나머지 배열이 존재하면 오름차순 정렬처리
  if (lIndex + 1 < max - 1) {
    const rest = list.splice(lIndex + 1);
    rest.sort((a, b) => a - b);
    const base = lIndex + 1;
    for (i = 0; i < rest.length; i++) {
      list[base + i] = rest[i];
    }
  }
  //내림차순이 발생한 이후는
  console.log("swap-sort-list", list);
}
//console.log(solution([1, 2, 3]));
//console.log(solution([1, 3, 2]));
//[5, 5, 2, 3, 4, 7];
//solution([5, 4, 7, 5, 3, 2]);

/**
 *
 */

function singlePassApproach(nums) {
  const len = nums.length;
  //console.log("input", nums);
  // 시작값은 우측 끝으로 설정
  let idx = len - 2;
  // 이전 값과 비교해 내림차순이 발생하면 반복
  while (idx >= 0 && nums[idx + 1] <= nums[idx]) {
    idx--;
  }
  console.log("idx", idx, "value", nums[idx]);
  if (idx >= 0) {
    let j = len - 1;
    while (nums[j] <= nums[idx]) {
      j--;
    }
    console.log("j", j, "value", nums[j]);
    swap(nums, idx, j);
    console.log("swap", nums);
  }
  //console.log("nums", nums);
  //reverse(nums, idx + 1);
  console.log("reverse-nums", nums);
}

function reverse(nums, start) {
  let i = start;
  let j = nums.length - 1;
  while (i < j) {
    swap(nums, i, j);
    i++;
    j--;
  }
}

function swap(list, i, j) {
  const temp = list[i];
  list[i] = list[j];
  list[j] = temp;
}

//singlePassApproach([5, 4, 1, 2, 3]);

/**
 * 다음순열 구하기
 *
 * 순열은 오름차순에서 내림차순으로 구성됨.
 * ex) [1,2,3] -> [3, 2, 1]
 *
 * 동작방식
 * 다음 순열을 찾기 위해 우측값을 기준으로 오름차순이 발생하는 구간을 찾기.
 * 찾은 곳은 기준으로 배열의 마지막까지의 차가 가장 작은 곳에 인덱스를 찾아서 서로 swap
 * swap후 오른쪽에 배열은 내림차순으로 정렬.
 *
 * 모든 값이 증가하며 끝나면 다음 순열이 존재하지 않는 것으로 판단해 종료.
 *
 *
 * 다음 순열에 이동은 오름차순에서 내림차순으로 진행.
 * 단계별 내림차순을 적용하기 위한 조건.
 * 1 오름차순이 끝나는 곳 A를 찾는다.
 * 2 A 인덱스에 값을 배열 우측 값과  오름 차순이 발생하는 가장 가까운 인덱스 B를 찾는다.
 * 3.A와 B를 swap 한다.
 */

function solutionNextPermutation(p, k = 1) {
  const len = p.length;
  // 시작값은 우측 끝으로 설정
  // -1로 비교하면 기준이 되는 인덱스 설정을 위해 보정값을 줘야 하므로 -2로 사용
  let idx = len - 2;
  // 배열에 우측 에서 부터 두개의 값을 비교하며 내림차순이 발생하면 기준 인덱스를 좌측으로 이동
  // ex) 1 , 3,  2  : 기준 index = 1 -> 0 으로 변경
  while (idx >= 0 && p[idx + 1] < p[idx]) {
    idx--;
  }

  // 다음 순열은 크기 순으로 진행되야 하니까 배열 끝에서 부터 현재 기준인덱스의 값보다 작을 경우 swap인덱스를 앞으로 조정
  let j = len - 1;
  while (p[idx] >= p[j]) {
    j--;
  }

  //j와 idx swap처리
  swap(p, idx, j);

  // idx를 기준으로 우측 값들 모두를 swap
  // 이런 swap대신 특정 인덱스 이상부터 sort를 적용 시킬 수 있을까?
  console.log("head", p.slice(0, j));
  console.log("tail", p.slice(j));
  p = [...p.slice(0, j), ...p.slice(j).sort((a, b) => a - b)];
  return k - 1 > 0 ? solutionNextPermutation(p, k - 1) : p;
}

//console.log(solutionNextPermutation([4, 5, 3, 2, 1]));
console.log(solutionNextPermutation([4, 5, 3, 2, 1], 2));

/**
 * 머리에서 정리된 내용을 한글로 적는다.
 * 이를 코드로 변경한다.
 * 머리에서 정리가 안되면 코드 변환도 안된다.
 */
