/**
 * 체육복
 * 체격순으로 번호가 매겨져 있고, 바로 앞 뒤의 학생끼리만 체육복을 빌려 줄 수 있다.
 * 전체 학생 수 n,
 * 도난당한 학생 번호 lost,
 * 여벌 체육복을 가진 학생 번호 reserve
 * 수업을 들을 수 있는 최대값을 return
 *
 * 제한사항
 * - 전체 학생 수는 2~30
 * - 체육복을 도난당한 학생의 수는 1<=x<=n 중복은 없음.
 * - 체육복을 제공하는 reserve 학생의 수는 1<=x<=n 중복은 없음.
 * - 여벌 체육복이 있는 학생만 다른 학생에게 빌려줄 수 있다.
 * - 여벌 체육복을 가져온 학생이 도난 당할 수 있고, 이때 이 학생은 다른 학생에게
 *   빌려줄 수 없습니다.
 *
 * 참여학생 기본값
 * n - lost.length
 * 추가로 들을 수 있는 학생 기대값
 * reserve를 통한 조건처리
 */

function solution(n, lost, reserve) {
  // 중복제거
  const uniq_lost = lost
    .filter(v => reserve.indexOf(v) === -1)
    .sort((a, b) => a - b);
  const uniq_reserve = reserve
    .filter(v => lost.indexOf(v) === -1)
    .sort((a, b) => a - b);
  let answer = n - uniq_lost.length;
  let appendCount = 0;
  uniq_reserve.forEach(v => {
    const reserve_items = uniq_lost.filter(l => l === v - 1 || l === v + 1);
    if (reserve_items.length) {
      appendCount++;
      idx = uniq_lost.splice(uniq_lost.indexOf(reserve_items[0]), 1);
    }
  });
  return answer + appendCount;
}
console.log(solution(5, [2, 4], [1, 3, 5]));
console.log(solution(5, [2, 4], [3]));
//console.log(solution(3, [3], [1]));
// const start_lost = [1, 2, 3, 4, 5, 6];
// const start_reserve = [1, 2, 3, 7];
console.log(Array.sort([2, 1, 10, 4]));
// console.log(solution(10, start_lost, start_reserve));
//console.log(solution(6, [1, 3], [2, 3, 6]));
//console.log(new Set([...start_lost, ...start_lost]));
