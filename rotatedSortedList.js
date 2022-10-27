/**
 *주어진 배열 nums와 targe이 주어지면 target이 위치한 index를 반환
 target이 없을 경우 -1

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1

Input: nums = [1], target = 0
Output: -1

배열에 indxOf를 이용하면 간단히 해결됨.

원소 배열 참조를 통한 방식은 
 */

function solution(nums, target) {
  let r = nums.length - 1;
  let l = 0;

  while (l <= r) {
    let mid = Math.floor((r + l) / 2);
    if (nums[mid] === target) {
      return mid;
    }
    const lValue = nums[l];
    const mValue = nums[mid];
    const rValue = nums[r];
    if (lValue <= mValue) {
      // 좌측값과 증앙값 사이에 존재할 경우 범위를 중앙값보다 작은 곳으로
      if (lValue <= target && target <= mValue) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    } else {
      if (mValue <= target && rValue >= target) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
  }
  return -1;
}

console.log("output :: ", solution([4, 5, 6, 7, 0, 1, 2], 0));
