/**

1. 인쇄 대기목록의 가장 앞에 있는 문서(J)를 대기목록에서 꺼냅니다.
2. 나머지 인쇄 대기목록에서 J보다 중요도가 높은 문서가 한 개라도 존재하면 J를 대기목록의 가장 마지막에 넣습니다.
3. 그렇지 않으면 J를 인쇄합니다.

요구사항
  - 대기목록(priorities)과 출력을 원하는 문서 위치(location)이 주어질 때 해당 문서(location)이 출력되는 순서

풀이 
  - 대기목록의 처음부터 순회하면 우선순위를 비교해 우선순위가 존재하면 해당 아이템을 제일 아래로 이동
    - 기존 아이템을 뒤로 이동 했으니 location-1을 해 위치 조정 이때 location이 0보다 작을 경우 대기목록 마지막으로 조정
  - 해당대기 목록 우선순위가 가장 높으면 출력하며 해당 아이템 제거( 이때 출력 카운트 증가 )

제한사항
현재 대기목록에는 1개 이상 100개 이하의 문서가 있습니다.
인쇄 작업의 중요도는 1~9로 표현하며 숫자가 클수록 중요하다는 뜻입니다.
location은 0 이상 (현재 대기목록에 있는 작업 수 - 1) 이하의 값을 가지며 대기목록의 가장 앞에 있으면 0, 두 번째에 있으면 1로 표현합니다

 * priorities	location	return
    [2, 1, 3, 2]	2	1
    [1, 1, 9, 1, 1, 1]	0	5
*/

/**
 * 초반 지문 이해를 잘못해서 가장 우선순위가 높은 문서를 찾을 때 까지만 stack을 조정하고 해당 시점에 요청 문서가 존재하는 index를 찾아 반환하게 함.
 * 예시에 대기목록이 우연히도 최상위 순서로만 정렬하면 요청 우선순위로 나열되니 문제없이 동작해 뭐가 문제인지 몰라 당황했음.
 * @param {*} priorities
 * @param {*} location
 * @returns
 */
// function solution2(priorities, location) {
//   const stack = priorities.map((_, idx) => {
//     return idx === location ? "X" : "O";
//   });
//   let task = priorities[0];
//   while (priorities.some(v => v > task)) {
//     priorities.push(priorities.shift());
//     stack.push(stack.shift());
//     task = priorities[0];
//   }
//   console.log(priorities);
//   console.log("task", task);
//   //console.log("stack", stack);
//   return stack.indexOf("X") + 1;
// }

function solution(priorities, location) {
  const s = priorities.concat();
  let count = 0;
  while (true) {
    const printTarget = s.shift();
    const hasPrimaryTarget = s.some(v => v > printTarget);
    // 우선순위가 존재하면 해당 문서를 가장 뒤에 추가
    if (hasPrimaryTarget) {
      s.push(printTarget);
    } else {
      // 우선순위가 가장 높다면 해당 문서는 출력하고 대기열에서 제거
      count++;
      console.log(
        "출력문서",
        printTarget,
        "요청문서 위치",
        location,
        "출력카운트",
        count
      );
      // 요청문서가 출력되는 순간이면 루프해제
      if (location === 0) {
        break;
      }
    }
    location--;
    if (location < 0) {
      location = s.length - 1;
    }
  }
  return count;
}

console.log(solution([2, 1, 3, 2], 2));
console.log(solution([1, 1, 9, 1, 1, 1], 0));
console.log(solution([1, 8, 3, 9, 1, 5], 4));
console.log(solution([0, 2, 1, 2], 1));
