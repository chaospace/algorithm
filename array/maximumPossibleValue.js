/**
 * 가능한 큰 값 찾기
 *
 * 주어진 배열 A, B는 길이가 같다.
 *
 * A는 막대의 길이, B는 막대의 수량을 나타낸다.
 *
 * 주어진 막대를 이용해 정사각형, 혹은 직사각형을 만든다.
 * 하나의 스틱은 한번만 사용가능
 *
 * S를 정사각형과 직사각형을 만드는 데 사용되는 모든 막대 길이의 합이라고 할때,
 * S의 가능한 최대 길이의 값을 계산.
 *
 *
 * 주어진 막대로 만들 수 있는 사각형을 최대로 만들어라.
 * 사각형을 만들려면 막대는 4개씩 사용해야 된다.
 *
 * 5*4=20
 * 4*2+5*2=18
 */

function createAble(B) {
  const ableIndex = B.map((count, idx) => {
    if (count >= 2) {
      return idx;
    }
  });
  return ableIndex;
}

/**
 * 사각형 제작 가능 여부를 판단하는 방법은?
 *  - 수량이 2개 이상 남은 stick이 쌍을 이루는지 파악한다.
 * @param {*} A
 * @param {*} B
 */
function solution(A, B) {
  let total = 0;
  let stacks = [];
  for (let i = 0; i < B.length; i++) {
    let sum = B[i];
    // 하나의 스틱으로 사각형을 만들 수 있을 때
    if (sum >= 4) {
      sum -= 4;
      total += A[i] * 4;
    }
    // 두 개의 스틱이 있을 때 나머지 반을 준비해둠.
    if (sum >= 2) {
      sum -= 2;
      stacks.push(A[i] * 2);
    }
    if (stacks.length === 2) {
      total += stacks[0];
      total += stacks[1];
      stacks = [];
    }
  }
  console.log("total", total);
}

// solution([3, 4, 6, 5], [2, 3, 1, 6]);

// solution([3], [2]);

function solutionRecursive(A, B) {
  const sticks = A.reduce((current, value, idx) => {
    const count = B[idx];
    if (count >= 2) {
      current.push({
        value,
        count
      });
    }
    return current;
  }, []).sort((a, b) => b.value - a.value);
  //console.log("sticks", sticks);
  function getTotalStickLength(total, stack) {
    let stick = sticks.shift();
    if (stick.count >= 4) {
      let n = parseInt(stick.count / 4);
      total += stick.value * 4 * n;
      stick.count -= 4 * n;
    }
    if (stick.count >= 2) {
      stick.count -= 2;
      stack.push(stick.value * 2);
    }

    if (stack.length >= 2) {
      total = stack.reduce((c, v) => c + v, total);
      stack = [];
    }

    return (sticks.length && getTotalStickLength(total, stack)) || total;
  }

  return getTotalStickLength(0, []);
}

// console.log("total", solutionRecursive([3, 4, 6, 5], [2, 3, 1, 6]));
// console.log("total", solutionRecursive([3], [2]));

/**
 * reduce를 이용한 접근.
 * 가장 큰 값을 계산하기 위해 길이 순으로 정렬함.
 */
function solutionWithReduce(A, B) {
  const sticks = A.reduce((current, value, idx) => {
    const count = B[idx];
    if (count >= 2) {
      current.push({
        value,
        count
      });
    }
    return current;
  }, []).sort((a, b) => b.value - a.value);
  console.log("sticks", sticks);
}

console.log("total", solutionWithReduce([3, 4, 6, 5], [2, 3, 1, 6]));
