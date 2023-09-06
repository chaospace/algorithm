/**
 * 풍선 터트리기 게임.
 *
 * 1번 부터 N번까지 풍선을 원형 배치.
 * i번 우측은 i+1, 좌측은 i-1
 *
 * 1번 왼쪽에 N번 풍선이 있고, N번 풍선의 우측에 1번 풍선이 있다.
 * 각 풍선에는 종이가 있고, 종이에는 -N<=x<=N
 *
 * 우선, 제일 처음에는 1번 풍선을 터트린다.
 * 1번에 들어있던 종이에 적힌 값만큼 이동 후 다음 풍선을 제거.
 * 이동 시 이미 터진 풍선은 빼고 이동.
 *
 * ex)
 * input    :
 * 3, 2, 1, -3, -1
 * output   :
 * 1, 4, 5, 3, 2
 * - 1번 제거 후 오른쪽 3칸 앞인 4번으로 이동
 * - 4번 제거 후 왼쪽으로 3칸 이동 한 5번으로 이동
 * - 5번 제거 후 왼쪽 1칸 이동해 3번으로
 * - 3번 제거 후 우측 1칸 이동해 2번으로
 *
 * ..제거 하는 인덱스를 기억해 반환.
 */

//값에 유효성을 가지고 판단하는 처리.
//중복값이 있으면 버그확률이 있음.
function solution(queue) {
  const stack = [];
  let p = 0;
  while (stack.length !== queue.length) {
    const v = queue[p];
    if (stack.indexOf(v) === -1) {
      stack.push(v);
      p += v;
    } else if (stack[stack.length - 1] >= 0) {
      p++;
      if (p >= queue.length) {
        p = 0;
      }
    } else {
      p--;
      if (p < 0) {
        p = queue.length - 1;
      }
    }
  }
  return stack.map((v) => queue.indexOf(v) + 1);
}

/**
 * 값이 아닌 인덱스 위치를 이용해 보자.
 * @param {*} queue
 */
function solutionByIndex(queue) {
  //시작 인덱스는 항상 1번 부터 시작
  let pivot = 0;
  const stack = [];
  //초기 배열보다 추가된 요소가 적을 때 까지 반복.
  while (stack.length < queue.length) {
    if (stack.indexOf(pivot) === -1) {
      stack.push(pivot);
      pivot += queue[pivot]; //피벗 위치를 다음 위치로 설정.
    } else {
      //이미 추가된 인덱스일 경우
      pivot = queue[stack[stack.length - 1]] >= 0 ? pivot + 1 : pivot - 1;
      if (pivot >= queue.length) {
        pivot = 0;
      } else if (pivot < 0) {
        pivot = queue.length - 1;
      }
    }
  }
  return stack.map((v) => v + 1);
}

function solutionBackTracking(pos) {
  //const stack=[];
  const backtracking = (pivot, max, stack) => {
    //종료조건 모든 원소가 스택에 추가되면
    if (stack.length === max) {
      return stack.map((v) => v + 1);
    }

    if (stack.indexOf(pivot) === -1) {
      return backtracking(pivot + pos[pivot], max, [...stack, pivot]);
    } else {
      pivot = pos[stack[stack.length - 1]] >= 0 ? pivot + 1 : pivot - 1;
      if (pivot >= max) {
        pivot = 0;
      } else if (pivot < 0) {
        pivot = max - 1;
      }
      return backtracking(pivot, max, [...stack]);
    }
  };

  return backtracking(0, pos.length, []);
}

[[3, 2, 1, -3, -1]].forEach((pos) => {
  console.log("by-value", solution(pos));
  console.log("by-index", solutionByIndex(pos));
  console.log("by-backtracking", solutionBackTracking(pos));
});
