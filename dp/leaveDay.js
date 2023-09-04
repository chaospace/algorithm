/**
 * 정해진 일정에 상담을 통해 가장 높은 수익을 낼 수 있는 값을 구하기


Ti : 기간
Pi : 페이
 	 1일	2일	 3일	4일	5일  6일 7일
Ti	3	  5	  1	  1 	2 	4	  2
Pi	10	20	10	20	15	40	200

구현내용 정리
- 날짜
- 페이

퇴사일은 N+1;
 */

/**
 * 풀이
 *  - 시작일 별 배열을 준비한다.
 *  - 일정을 추가한다.
 *
 * @param {*} times
 * @param {*} fee
 * @param {*} lastDay
 */
function solution(times, fee, workingDay) {
  // 정보 저장 테이블 생성

  /**
   * 정해진 일수에 최적 페이를 찾는게 목표
   * @param {*} restDay
   * @param {*} index
   * @param {*} time
   * @param {*} pay
   */
  const backtracking = (restDay, index, history) => {
    //종료 조건
    if (restDay <= 0 || index >= workingDay) {
      console.log("history", history);
      return 0;
    }
    const time = times[index];
    const pay = fee[index];
    //남은 기간에 할 수 없는 작업일 경우 스킵.
    if (restDay < time) {
      return backtracking(restDay - 1, index + 1, [...history]);
    } else {
      //추가하거나 계속진행하거나
      return Math.max(
        pay +
          backtracking(restDay - time, index + time, [
            ...history,
            `${pay}_${time}_${index}`,
          ]),
        backtracking(restDay - 1, index + 1, [...history])
      );
    }
  };

  const a = backtracking(workingDay, 0, []);
  console.log("result", a);
  return a;
}

// solution([3, 5, 1, 1, 2, 4, 2], [10, 20, 10, 20, 15, 40, 200], 7);
// solution([1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10);

// solution(
//   [5, 4, 3, 2, 1, 1, 2, 3, 4, 5],
//   [50, 40, 30, 20, 10, 10, 20, 30, 40, 50],
//   10
// );

solution([5, 5, 5, 5, 5, 5, 5, 5, 5, 5], [10, 9, 8, 7, 6, 10, 9, 8, 7, 6], 10);
