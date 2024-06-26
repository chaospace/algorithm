const { log } = require("./libs/util");
/**
 
N개의 정수로 구성된 두 개의 비어 있지 않은 배열 A와 B가 주어집니다.
배열 A와 B는 강의 흐름을 따라 하류로 정렬된 강의 N개의 게걸스러운 물고기를 나타냅니다.

물고기는 0에서 N-1까지 번호가 매겨집니다.
P와 Q가 두 마리의 물고기이고 P < Q인 경우 물고기 P는 처음에 물고기 Q의 상류에 있습니다.
처음에 각 물고기는 고유한 위치를 가집니다.

물고기 번호 P는 A[P]와 B[P]로 표시됩니다. 
배열 A는 물고기의 크기를 포함합니다. 모든 요소는 고유합니다.
배열 B는 물고기의 방향을 포함합니다. 여기에는 0 및/또는 1만 포함되며, 각 항목의 의미는 다음과 같습니다.

0은 상류로 흐르는 물고기를 나타내고,
1은 하류로 흐르는 물고기를 나타낸다.

두 마리의 물고기가 서로 반대 방향으로 움직이고
그들 사이에 다른 (살아 있는) 물고기가 없다면 결국 서로 만나게 될 것입니다.
그러면 한 마리의 물고기만 살아남을 수 있습니다.
큰 물고기가 작은 물고기를 잡아먹습니다.
더 정확하게는 P < Q, B[P] = 1 및 B[Q] = 0일 때 두 물고기 P와 Q가 서로 만나고
둘 사이에 살아있는 물고기가 없다고 말합니다.

만난 후:
A[P] > A[Q]이면 P는 Q를 먹고 P는 여전히 하류로 흐를 것입니다.
A[Q] > A[P]이면 Q는 P를 먹고 Q는 여전히 상류로 흐를 것입니다.
우리는 모든 물고기가 같은 속도로 흐르고 있다고 가정합니다.
즉, 같은 방향으로 움직이는 물고기는 절대 만나지 않습니다.
목표는 살아남을 물고기의 수를 계산하는 것입니다.

예를 들어 다음과 같은 배열 A와 B를 고려하십시오.
  A[0] = 4 B[0] = 0
  A[1] = 3 B[1] = 1
  A[2] = 2 B[2] = 0
  A[3] = 1 B[3] = 0
  A[4] = 5 B[4] = 0
처음에는 모든 물고기가 살아 있고 1번 물고기를 제외한 모든 물고기가 상류로 이동합니다.
1번 물고기가 2번 물고기를 만나서 먹고,
3번 물고기를 만나서 또 먹습니다.
드디어 4번 물고기를 만나 먹게 된다.
나머지 0번과 4번 물고기 두 마리는 절대 만나지 않고 살아 남습니다.

함수 작성:
function solution(A, B);

N개의 정수로 구성된 두 개의 비어 있지 않은 배열 A와 B가 주어지면 살아남을 물고기의 수를 반환합니다.


ex ) 
예를 들어 위에 표시된 배열이 주어지면 함수는 위에서 설명한 대로 2를 반환해야 합니다.
다음 가정에 대한 효율적인 알고리즘을 작성 하십시오.

N은 범위 [ 1 .. 100,000 ] 내의 정수 이고;
배열 A의 각 요소는 [ 0 .. 1,000,000,000 ] 범위 내의 정수입니다 .
배열 B의 각 요소는 다음 값 중 하나를 가질 수 있는 정수입니다. 0, 1;
A의 요소는 모두 구별됩니다.
 */

/**
 * stack과 queue를 이용하는 문제 
 * 
 * @param {*} A 물고기 크기
 * @param {*} B 물고기 진행방향 ( 0 상류, 1 하류 )
 *
 * 만나는 물고기는 둘 중 큰쪽이 작은쪽을 먹고 진행방향으로 흐름.
  A[0] = 4 B[0] = 0
  A[1] = 3 B[1] = 1
  A[2] = 2 B[2] = 0
  A[3] = 1 B[3] = 0
  A[4] = 5 B[4] = 0



  같은 방향은 문제가 안됨.
 */
function solution(A, B) {
  const len = B.length;
  let l = 0;
  const upStream = [];
  const downStream = [];
  const UP_STREAM = 0;
  while (l < len) {
    // 다운스트림 스택이 있는 경우
    while (downStream.length && B[l] === UP_STREAM) {
      if (downStream[downStream.length - 1] < A[l]) {
        downStream.pop();
      } else {
        l++;
      }
    }

    if (B[l] === UP_STREAM) {
      upStream.push(A[l]);
      // 연속 업스트립 추가
      while (l + 1 < len && B[l + 1] === UP_STREAM) upStream.push(A[++l]);
    } else if (B[l]) {
      downStream.push(A[l]);
      // 연속 다운스트림 추가
      while (l + 1 < len && B[l + 1] !== UP_STREAM) {
        downStream.push(A[l + 1]);
        l++;
      }
    }
    l++;
  }

  //  console.log("i", l);

  console.log("upStream", upStream, "downStream", downStream);
  return [...upStream, ...downStream].length;
}

/**
 *
 * @param {*} param0
 * @returns
 */
function solutionStack({ fish, stream }) {
  // stream과 fish 포인터 두개를 관리해야 된다.
  const queue = [];
  fish.forEach((size, idx) => {
    // dir 0은 상류, 1은 하류.
    queue.push({ size, dir: stream[idx] });
  });
  const stack = [];
  while (queue.length) {
    const current = queue.shift();
    if (stack.length) {
      const last = stack[stack.length - 1];
      // 이전은 하류 현재는 상류라면 서로 만난다.
      if (last.dir === 1 && current.dir === 0 && last.size < current.size) {
        stack.pop(); //이전 것은 제거하고 새로운 방향을 추가.
        stack.push(current);
      } else if (
        (last.dir === 0 && current.dir === 1) ||
        current.dir === last.dir
      ) {
        //이전 상류, 현재 하류는 서로 만날 일이 없어 그냥 추가하면 된다.
        // stack.pop(); //이전 것은 제거하고 새로운 방향을 추가.
        stack.push(current);
      }
    } else {
      stack.push(current);
    }
  }

  return { queue, stack };
}

// solution([4, 3, 2, 1, 5], [0, 1, 0, 0, 0]);
// solution([4, 3, 2, 1, 5], [0, 1, 0, 0, 1]);
// solution([4, 3, 2, 1, 5], [1, 1, 0, 0, 0]);
// solution([4, 3, 2, 1, 5], [1, 0, 1, 0, 1]);
// solution([1, 2, 10, 12, 4, 5], [0, 1, 1, 0, 1, 0]);
//solution([1, 2, 10, 12, 4, 5], [0, 1, 1, 0, 1, 0]);
solution([1, 3, 2, 5, 10, 4], [0, 1, 1, 0, 1, 0]);

[
  {
    fish: [4, 3, 2, 1, 5],
    stream: [0, 1, 0, 0, 0],
  },
].forEach((args) => {
  log(solutionStack(args));
});
