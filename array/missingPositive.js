/**
 * 빠진 양수 찾기
 * 주어진 무작위 양수 배열 nums에서 빠진 가장 작은 양수 찾기
 * 

Input: nums = [1,2,0]
Output: 3

Input: nums = [3,4,-1,1]
Output: 2

Input: nums = [7,8,9,11,12]
Output: 1
 */

function solution(nums) {
  nums.sort((a, b) => a - b);
  let idx = 0;
  while (nums[idx] <= 0) {
    idx++;
  }
  if (nums[idx] === 1) {
    for (let i = idx + 1; i < nums.length; i++) {
      if (nums[i] - nums[i - 1] != 1 && nums[i] > nums[i - 1]) {
        return nums[i - 1] + 1;
      }
    }
    return nums[nums.length - 1] + 1;
  } else {
    // 1부터 증가하는 경우가 아닌경우
    return 1;
  }
  //console.log("a", nums[idx], "idx", idx);
}

// console.log(solution([1, 2, 0]));
// console.log(solution([3, 4, -1, 1]));
// console.log(solution([7, 8, 9, 11, 12]));

function solutionB(nums) {
  nums.sort((a, b) => a - b);
  let idx = 0;
  // 음수 제거
  while (nums[idx] <= 0) {
    idx++;
  }

  const stack = [];
  for (let i = idx; i < nums.length; i++) {
    const prev = stack[stack.length - 1] || 0;
    const current = nums[i];
    const diff = current - prev;
    if (diff === 0) continue;
    if (diff > 1) {
      break;
    }
    stack.push(current);
  }
  return stack.length && stack[0] === 1 ? stack.length + 1 : 1;
}
console.log(solutionB([1, 2, 0]));
console.log(solutionB([3, 4, -1, 1]));
console.log(solutionB([7, 8, 9, 11, 12]));

/**
 * 배열 변경 방식이 특이함. 참고..
 * @param {*} nums
 * @returns
 */
var firstMissingPositive = function (nums) {
  let i = 0;
  while (i < nums.length) {
    if (
      nums[i] > 0 &&
      nums[i] <= nums.length &&
      nums[nums[i] - 1] !== nums[i]
    ) {
      [nums[nums[i] - 1], nums[i]] = [nums[i], nums[nums[i] - 1]];
    } else {
      i++;
    }
  }
  for (i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) return i + 1;
  }
  return i + 1;
};

//firstMissingPositive([1, 2, 0]);
//firstMissingPositive([3, 4, -1, 1]);

// const arr = [1, 2, 3, 4];
// console.log("before-arr", arr);
// [arr[2], arr[1]] = [arr[1], arr[2]];
// console.log("after-arr", arr);

/**
 * 배열 정렬 후 empty인 index를 찾아서 반환
 * @param {*} nums
 * @returns
 */
function solutionSortArray(nums) {
  var numsLen = nums.length,
    index,
    sortedNums = [0],
    sortedNumsLen;
  if (!nums) return 1;
  for (index = 0; index < numsLen; index++) {
    if (nums[index] > 0 && nums[index] <= numsLen) {
      sortedNums[nums[index]] = nums[index];
    }
  }

  for (
    index = 0, sortedNumsLen = sortedNums.length;
    index < sortedNumsLen;
    index++
  ) {
    if (sortedNums[index] !== index) {
      break;
    }
  }
  console.log("index", index, sortedNums);
  return index;
}
solutionSortArray([3, 4, -1, 1]);

//배열에서 빠진 인덱스 찾기
