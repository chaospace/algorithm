/**
 * k번째로 작은 배열 찾기
 * 주어진 배열에서 k번재로 작은 배열의 값을 찾아 리턴
 * 
 *  N = 6
    arr[] = 7 10 4 3 20 15
    K = 3
    Output : 7
 * 
 */

function solution(array, k) {
  //주어진 배열을 정렬없이 재정렬?
  return array.sort((a, b) => a - b)[k - 1];
}

console.log(solution([7, 10, 4, 3, 20, 15], 3));
