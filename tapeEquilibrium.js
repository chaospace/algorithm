/**
 * 배열 nums가 주어지면 각 인데스별로 나눈 합이 차이가 가장 작은 수를 반환
 * 
 * input : [3, 1, 2, 4, 3];
 * output : 1
 * 
 * why ? :
P = 1, difference = |3 − 10| = 7
P = 2, difference = |4 − 9| = 5
P = 3, difference = |6 − 7| = 1
P = 4, difference = |10 − 3| = 7

reduce를 이용하면 퍼포먼스가 떨어지게 됨.
이유는 ? 내부에서 for문을 여러번 해야 되니까.
이를 개선한다면? 참조를 통해 더해야 할까?? 음...
 */

function sum(a, b) {
  return a + b;
}

function solution(nums) {
  const len = nums.length;
  let results = Number.MAX_SAFE_INTEGER;
  if (len <= 1) {
    results = nums[0] || 0;
  } else {
    let total = nums.reduce(sum); // 미리 총합을 구해놓음.
    let left = 0;
    for (let i = 0; i < len - 1; i++) {
      left += nums[i];
      const right = total - left;
      results = Math.min(results, Math.abs(left - right));
    }
  }

  console.log("sum", results);
}
//solution([3, 1, 2, 4, 3]);
//solution([3, -2990]);
//solution([-2000, -2990]);
//solution([-2000]);
solution([-1000, -1000]);
