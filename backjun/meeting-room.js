/**
 * 회의실 예약
 * N개의 회의에 대해 회의실 시간표가 주어질 때.
 * 가능한 많은 회의가 가능한 시간 구성
 *
 * input
 * N : 회의 수
 *
 * schedule : 회의 시간표 배열
 */
// 가능한 많은 회의를 하려면 빨리 시작해서 빨리 끝나는 것에 우선순위를 두면 된다.
// 현재 인풋에 종료 시간은 오름차순으로 정렬되어 있어 끝나는 시간 고민없이 앞에서 부터 겹치지 않는 회의를 배열에 추가하기만 하면 된다.
// 입풋에 종료 값 정렬 보장이 없으면 적용해준다.

function solution(schedule) {
  //회의 종료 시간을 기준으로 정렬처리
  //종료 시간이 동일한 경우는 시작을 가지고 정렬한다.
  const timeList = schedule
    .map((time_info) => {
      const t = time_info.split(" ");
      return { start: t[0] * 1, end: t[1] * 1 };
    })
    .sort((a, b) => a.end - b.end || a.start - b.start);
  const answer = [];
  answer.push(timeList[0]);

  for (let i = 1; i < timeList.length; i++) {
    //다음 회의의 시작이 이전 회의 종료보다 작거나 같으면 추가한다.
    //회의 종료시간 순으로 정렬된 상태이기 때문에 겹치지만 않으면 항상 더 일찍 끝나는게 보장.
    if (answer[answer.length - 1].end <= timeList[i].start) {
      answer.push(timeList[i]);
    }
  }
  return answer;
}

[
  [
    "1 4",
    "3 5",
    "0 6",
    "5 7",
    "3 8",
    "5 9",
    "6 10",
    "8 11",
    "8 12",
    "2 13",
    "12 14",
  ],
  ["0 21", "0 1", "3 5", "6 7", "4 5", "2 5"],
].forEach((schedule) => {
  console.log(solution(schedule));
});
