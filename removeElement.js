/**
 * 주어진 정수 배열 nums에서 val에 해당하는 값을 제거 후 남은 배열의 길이를 리턴
 * 단 배열 참조를 변경하면 안됨.
 
Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2,_,_]
 
Input: nums = [0,1,2,2,3,0,4,2], val = 2
Output: 5, nums = [0,1,4,0,3,_,_,_]
 */

function solution(nums, val) {
  function loop() {
    const n = nums.indexOf(val);
    if (n < 0) {
      return nums;
    }
    nums.splice(n, 1);
    return loop();
  }

  const o = loop();
  console.log("nums", nums === o);
}

function solutionLR(nums, val) {
  nums.sort((a, b) => a - b);
  let l = 0;
  let r = nums.length - 1;
  while (l <= r) {
    console.log("l", l, "r", r);
    if (nums[l] === val) {
      nums[l] = nums[r];
      r--;
    } else {
      l++;
    }
  }
  console.log(nums, "l", l);
}

solutionLR([1, 2, 3, 2, 5, 2, 7], 2);
