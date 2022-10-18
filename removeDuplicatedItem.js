/**
 * 오름차순으로 정렬된 배열 nums가 주어질 때 중복되는 원소가 없는 배열을 만들어 반환?
 * 요소의 상대적인 순서는 유지
 * input =[1, 2, 3, 4, 4]
 * output=[1, 2, 3, 4, _];
 *
 *
 * input =[1, 1, 2]
 * output=[1,2,_]
 *
 * 참조를 변경하지 않고 배열에 원소를 중복없이 정렬해야 한다.
 *
 * splice를 이용해도 되지만
 * 가장 빠른 방법은 배열 인덱스를 직접 조작하는 것이다.
 *
 * 이경우 원하는 순서로 배열을 조작만 하면 되므로
 * input=[1,1,2,3] 이 주어지면
 *
 * let matchingCount = 0;
 * for(let j=1; j<input.length;j++){
 *    if(input[j] !== input[matchingCount]){
 *       matchingCount
 *    } else {
 *    }
 * }
 *
 */

function removeDuplicate(chars, index) {
  const char = chars[index];
  let next = index + 1;
  if (char === "-") {
    return { index, chars };
  } else if (char === chars[next]) {
    next = index;
    chars.splice(index, 1);
    chars.push("-");
  }
  return removeDuplicate(chars, next);
}

function solution(nums) {
  const { index, chars } = removeDuplicate(nums, 0);
  console.log(nums);
  return index;
}

function solutionRef(nums) {
  nums.sort((a, b) => a - b);
  console.log("nums", nums);
  let len = nums.length;
  let count = 0;
  for (let i = 1; i < len; i++) {
    if (nums[count] === nums[i]) {
      //count++;
    } else {
      nums[++count] = nums[i];
    }
  }
  console.log("nums", nums, count + 1);
}

console.log(solutionRef([1, 1, 1, 2, 3, 4]));
