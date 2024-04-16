/**
 * 라면사기(18185번)
 * 집 주변 1번 부터 N개의 라면 공장이 있다.
 * i번 공장에서 정확하게 Ai개의 라면을 구매하고자 한다(1 <= i <= N )
 * 구매방법
 *  - i번 공장에서 라면을 하나 구매한다( 1 <= i<=n ). 비용은 3원
 *  - i번 공장과 i+1공장에서 각각 라면을 하나씩 구매( 1 <= i <= n-1 ). 비용은 5원
 *  - i번 공장과 i+1, i+2 공장에서 각각 라면을 하나씩 구매. ( 1 <= i <= n-2 ). 비용은 7원
 *
 * 최소비용으로 라면을 구입하고자 할때. 필요금액을 출력하는 함수 작성
 *
 * 가능한 연속구매를 통해 원가를 절감해야 한다.
 * 101의 경우 연속되지 않으므로 3+3으로 6원이 사용.
 * 1111이 오는 경우는?3+7  = 10 ?이 되는건가?
 *
 * 최소비용처리를 위해 해야할 일..
 * 7짜리를 가능한 많이 사용한다.
 * 단일 3원짜리 사용을 줄인다.
 *
 * 1 0 1     = 3 + 3 = 6;
 * 1 1 1 0 2 = 7 + 6 = 13
 * 무작정 7을 적용하면이 되고 개별 6 = 총 비용 13이 적용
 * 1 2 1 1   = 0 1 0 1
 *
 * 1 2 1 1   = 0 1 1 1 = 5 + 7 = 12에 비용처리가 됨.
 * 1 2 0 1
 */

function solution(factory) {
  //시작인덱스는 항상 0부터 앞에 값이 0이 되지 않으면 이동하지 않음.
  let current = 0;
  let cost = 0;
  while (current < factory.length) {
    const v1 = factory[current] || 0;
    const v2 = factory[current + 1] || 0;
    const v3 = factory[current + 2] || 0;
    //조건없이 while로 처리하면 종료 후 조건을 체크해 배열범위를 넘어가면 더 이상 로직실행 멈출 필요가 있다.
    if (v1 === 0) {
      while (factory[current] === 0) {
        current += 1;
      }
    } else if (v2 > v3 && v2 > 0) {
      cost += 5;
      factory[current] -= 1;
      factory[current + 1] -= 1;
    } else if (v2 <= v3 && v2 > 0) {
      cost += 7;
      factory[current] -= 1;
      factory[current + 1] -= 1;
      factory[current + 2] -= 1;
    } else if (v1 > 0) {
      cost += 3;
      factory[current] -= 1;
    }
  }
  return cost;
}

[
  [1, 0, 1],
  [1, 1, 1, 0, 2],
  [1, 2, 1, 1],
  [2, 3, 2, 1],
].forEach((factory) => {
  console.log(solution(factory));
});
