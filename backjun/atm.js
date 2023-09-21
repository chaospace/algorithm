/**
 * atm출금
 * 인풋으로 인출에 필요한 사람 수 N과 각 사람에 인출에 사용되는 시간 목록이 주어질 경우
 * 모든 사람이 인출을 끝내는 시간의 합이 가장 빠른 값 찾기.
 *
 * ex
 * input:
 *   사람순서 :  [1, 2, 3, 4, 5]
 *   인출소요시간:[3, 1, 4, 3, 2];
 *
 *
 * 1번:3;
 * 2번:3+1;
 * 3번:3+1+4
 * 4번:3+1+4+3
 * 5번:3+1+4+3+2
 * 총 소요시간: 3 + 4 + 8 + 11 + 13 = 39분
 *
 * 사람순서: [2, 5, 1, 4, 3];
 * 2번 : 1,
 * 5번 : 1+2,
 * 1번 : 1+2+3,
 * 4번 : 1+2+3+3
 * 3번 : 1+2+3+3+4
 * 총 소요시간: 1 + 3 + 6 + 9 + 13 =  32분
 * 빨리 끝나는 순으로 줄을 세우는게 결과도 빠르다.
 */

//구간합이 최소가 되도록 소팅 후 구간합을 구하면 된다.
function solution(n, withdrawTime) {
  //origin과 소팅 후 인덱스를 알면 되나?
  withdrawTime.sort((a, b) => a - b);
  let sum = 0;
  let prev = 0;
  for (let i = 0; i < withdrawTime.length; i++) {
    //총합 누적합에 현재사람의 대기시간을 적용.
    sum += prev + withdrawTime[i];
    //이전까지의 누적합
    prev += withdrawTime[i];
  }
  return sum;
}

[[3, 1, 4, 3, 2]].forEach((withdrawTime) => {
  console.log(solution(withdrawTime.length, withdrawTime));
});
