/**
 * 내림차순으로 정렬된 배열 nums와 target이 주어질 때
 * target의 시작 마지막 인덱스 반환
 *  
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]

Input: nums = [], target = 0
Output: [-1,-1]
 */

function solution(nums, target) {
  let index = -1;

  let l = 0;
  let r = nums.length - 1;

  while (l <= r && index <= -1) {
    const m = Math.floor((r + l) / 2);
    if (nums[m] === target) {
      index = m;
    }
    const left = nums[l];
    const right = nums[r];
    const middle = nums[m];
    if (left <= middle) {
      if (left <= target && target <= middle) {
        r = m - 1;
      } else {
        l = m + 1;
      }
    } else {
      if (target >= middle && right >= target) {
        l = m + 1;
      } else {
        r = m - 1;
      }
    }
  }

  let next = index;
  if (index > -1) {
    //if (nums[next + 1] === target) {
    while (nums[++next] === target) {}
    next--;
    //}

    //if (nums[index - 1] === target) {
    while (nums[--index] === target) {}
    index++;
    //}
  }
  console.log("results ::", [index, next]);
  return [index, next];
}

solution([5, 7, 7, 8, 8, 10], 8);
solution([5, 7, 7, 8, 8, 10], 6);
solution([], 0);
solution([2, 2, 5, 6, 10, 12], 2);
solution([3, 3, 3], 3);
