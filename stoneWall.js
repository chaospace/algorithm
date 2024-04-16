/**
N개의 원소가 담긴 배열 H가 주어진다.
H[0] ~ H[N-1] 벽의 높이값이 주어진다.
블록은 모두 사각형을 유지한다.(중요!)
이때, H높이를 만족하는 벽을 쌓기 위해 필요한 최소 벽돌의 수를 구하시오.

요구사항:
벽의 높이를 지정하는 N 양의 정수 배열 H가 주어지면 벽을 만드는 데 필요한 최소 블록 수를 반환합니다.

예를 들어, N = 9 정수를 포함하는 배열 H가 주어진 경우:

  H[0] = 8 H[1] = 8 H[2] = 5
  H[3] = 7 H[4] = 9 H[5] = 8
  H[6] = 7 H[7] = 4 H[8] = 8
함수는 7을 반환해야 합니다. 
그림은 7개 블록의 가능한 배열을 보여줍니다.

N은 범위 [ 1 .. 100,000 ] 내의 정수 이고;
배열 H의 각 요소는 [ 1 .. 1,000,000,000 ] 범위 내의 정수 입니다.


간단 정리 => 주어진 배열 H의 높이로 구성되는 실루엣을 만드는데 필요한 블럭의 최소 갯수를 하는 문제..
 */

/**
 
포인트는 최소한의 블록을 사용해야 하는 것.
블록을 최소로 사용하기 위해서는 ?
이전보다 높이가 크면 추가하고 아니면 이전 것을 최대한 재활용한다.

시작 인덱스를 기준으로 -값이 나오는 구간 전까지 stack에 추가하고
해당 스택에서 공통으로 가질 수 있는 값 최대 값을 가져온다.
마지막 인덱스 까지 이를 반복한다.

8, 5, 7, 9, 8, 7, 4, 8;

샘플 이미지처럼 block을 구성하려고 하면 어려워짐.

satck을 이용해 이전 블럭보다 큰값이 오면 추가하며 block카운트 증가
작은 값이 오면 stack을 제거해 동일 높이에 블록을 재활용할 수 있도록 접근.


 * @param {*} H
 */
function solution(H) {
  console.log(H);

  const blocks = [];
  const len = H.length;
  let count = 0;
  let popCount = 0;
  let idx = 0;

  while (idx < len) {
    // 기준값 추출
    const h = H[idx];
    // stack에 값이 존재하면 현재값과 비교 후 더 크면 스택을 제거
    while (blocks.length && blocks[blocks.length - 1] > h) {
      blocks.pop();
      popCount++;
    }
    // stack이 비어 있거나 현재 값이 더 크면 스택에 추가하며 count증가
    if (!blocks.length || blocks[blocks.length - 1] < h) {
      blocks.push(h);
      count++;
    }
    idx++;
  }

  return { popCount, count, blocks };
}

[[8, 8, 5, 7, 9, 8, 7, 4, 8]].forEach((v) => {
  console.log(solution(v));
});
/**
 * stack.push(8)
 * stack.pop()
 */
