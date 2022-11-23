/**
 * 빠진 정수 찾기
 * 주어진 배열 nums에서 중간에 건너띄는 값 찾아서 반환하기
 * 
A[0] = 2
A[1] = 3
A[2] = 1
A[3] = 5

reutrn 4

조건 
- 모든 수는 구분됨.( 중복 없음 )
- N은 0 ~ 100000
- 배열의 원소는 1 ~ N + 1 범위에 존재


체크사항
N은 0부터 시작하지만 배열은 1부터 시작한다는 함정을 체크해야 됨.
 */

function solution(nums) {
  let results = 1;
  const len = nums.length;
  if (len >= 1) {
    //let allpass = true;
    nums.sort((a, b) => a - b);
    let allpass = true;
    for (let i = 0; i < len && allpass; i++) {
      if (nums[i] !== i + 1) {
        results = i + 1;
        allpass = false;
      }
    }
    //console.log("i", i, nums);
    if (allpass) {
      results = nums[len - 1] + 1;
    }
  }
  console.log("results", results);
  return results;
}

solution([]);
solution([3]);
solution([1, 2, 3]);
solution([1, 4, 3, 5, 6]);
