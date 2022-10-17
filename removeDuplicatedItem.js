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
  //const arr = nums.filter((v, idx) => nums[idx] !== nums[idx + 1]);
  //const len = nums.length;
  const { index, chars } = removeDuplicate(nums, 0);
  console.log(nums);
  return index;
}

console.log(solution([1, 1, 1, 1, 2, 3, 4, 5, 5, 5, 5, 6]));
