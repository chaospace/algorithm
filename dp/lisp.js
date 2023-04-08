/**
 * 배열에서 부분증가순열을 찾아서 반환
 * 정렬은 안됨.
 */

/**
 * 루프를 돌며 해당 인덱스보다 크고 큰 값을 추출해 가며 모든 대상을 조회
 * 단순 무식한 방법.
 * @param {*} p
 */
function solution(p) {
  function loop(current, candidate) {
    if (candidate.length === 0) {
      console.log("current", current);
      return;
    }
    for (let i = 0; i < candidate.length; i++) {
      const value = candidate[i];
      loop(
        [...current, value],
        candidate.filter((v, idx) => v > value && idx > i)
      );
    }
  }

  loop([], p);
}

//console.log("ret", solution([3, 2, 1, 7, 5, 4, 2, 6]));

/**
 * 주어진 배열의 인덱스 정보로 각 재귀 함수를 호출
 * 함수 내부에서 인덱스+1를 하며 반복.
 * 현재 값보다 큰 수를 반나면 새로운 값을 추가한 분기 생성.
 * @param {*} p
 */
function solutionWithRecursive(p) {
  const searchSubProblem = (current, start) => {
    if (start >= p.length) {
      console.log("searchSubProblem-current", current);
      return;
    }
    //추가되는 것
    const next = start + 1;
    const a = current[current.length - 1];
    const b = p[start];
    a < b && searchSubProblem([...current, b], next);
    searchSubProblem([...current], next); //찾은게 없어도 끝까지 진행
  };

  //시작 값으로 재귀를 한번 씩 호출
  for (let i = 0; i < p.length; i++) {
    searchSubProblem([p[i]], i + 1);
  }
}

//solutionWithRecursive([3, 2, 1, 7, 5, 4, 2, 6]);

/**
 * 배열이 하나가 아니라 2개라면 어떻게 할것인가.
 * 주어진 배열 1, 2에서 가장 긴 증가 부분 순열을 반환,
 *
 * ex)
 * input
 * a [10, 20, 30, 1, 2]
 * b [10, 20, 30]
 *
 * output
 *  [1, 2, 10, 20, 30]
 *
 * 개별 아이템을 비교하며 서로 다른 포인터를 가지고 진행되야 한다.
 * 개별 인덱스마다 그 다음 인덱스로 진행이 되야 한다.
 */

function solutionWithMemo(p) {
  const map = {};

  const lip = start => {
    const v = map[start];
    if (v) {
      return v;
    }
    let ret = 1;
    for (let i = start + 1; i < p.length; i++) {
      if (start >= 0 && p[start] < p[i]) {
        ret = Math.max(ret, lip(i) + 1);
        if (!map[start] || map[start] !== ret) map[start] = ret;
      } else {
        ret = Math.max(ret, lip(i));
      }
    }
    return ret;
  };

  console.log("map", map, "maxLen", lip(-1));
}
//solutionWithMemo([3, 1, 9, 2, 4]);

/**
 * 두 개의 배열에 있는 증가 부분 순열을 찾아 길이가 가장 긴 것을 찾아서 리턴
 * 순연 부분을 찾아도 서로 중복되지 않는 것을 찾아야 하는 문제가 있음.
 * 인덱스를 밀어도 해당 인덱스 부터 탐색을 처음부터 진행시켜야 함.
 * 해당 인덱스부터 다른 배열의 인덱스는 초기화 처리도 되어야 함.
 * @param {*} array1
 * @param {*} array2
 */
function solutionTwoArray(array1, array2) {
  let left = 0;
  let right = 0;

  const stack = [];
  while (left < array1.length && right < array2.length) {
    const a = array1[left];
    const b = array2[right];

    if (a === b) {
      if (!stack.includes(a)) {
        stack.push(a);
      }
      left += 1;
    } else {
      if (!stack.includes(a)) {
        stack.push(a);
        left += 1;
      }
      if (!stack.includes(b)) {
        stack.push(b);
        right += 1;
      }
    }
  }
  console.log("end", stack, right, left);
}
console.log("answer", solutionTwoArray([10, 20, 30, 1, 2], [10, 20, 30]));
console.log("answer", solutionTwoArray([1, 2, 4], [2, 3, 5, 6]));

/**
 * dp를 이용해 부분 증가순열을 기억하자
 * 어떻게 하면 부분 증가순열을 기억할 수 있을까.
 *
 * 가장 긴 순열을 만들기 위해서는 어떻게 할까.
 * @param {*} array1
 * @param {*} array2
 */
function solutionMergeLisp(array1, array2) {
  const maxA = array1.length;
  const maxB = array2.length;
  console.log("인덱스 넘어서 접근", array2[maxB] || Number.MIN_SAFE_INTEGER);
  // 중복되지 않는 순열을 꺼낸다.
  const decreaseOrder = array1.map((value, idx) => {
    return (array1[idx + 1] || value) - value;
  });
  console.log("decrease", decreaseOrder);
}

solutionMergeLisp([10, 20, 30, 1, 2], [10, 20, 30]);
