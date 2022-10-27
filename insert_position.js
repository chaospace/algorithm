/**
 * 정렬된 배열 nums와 target 이 주어질 때 
 * 삽입 인덱스를 반환


Input: nums = [1,3,5,6], target = 5
Output: 2


Input: nums = [1,3,5,6], target = 2
Output: 1

Input: nums = [1,3,5,6], target = 7
Output: 4
 
O(log n) 의 실행시간을 사용해야 함.
 */

// center를 중심으로 경우의 수를 줄여나가야 한다.
function solution(nums, target) {
  let l = 0;
  let r = nums.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);

    if (nums[m] > target) {
      r = m - 1;
    } else if (nums[m] < target) {
      l = m + 1;
    } else {
      //console.log("find", m, nums[m], "low", l, "high", r);
      l = m;
      break;
    }
  }
  console.log("low", l, "high", r);
}

function solutionEx(nums, target) {
  let l = 0;
  let r = nums.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] < target) {
      l = m + 1;
    } else {
      r = m - 1;
    }
  }
  console.log("l", l);
  return l;
}

// solution([1, 3, 5, 6], 2);
// solution([1, 3, 5, 6], 7);
// solution([1, 3, 5, 6], 5);

solution([1, 2, 3, 5, 6, 7], 4);
solutionEx([1, 2, 3, 5, 6, 7], 4);
