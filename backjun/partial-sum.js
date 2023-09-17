/**
 * 구간합 구하기
 * N개의 수에서 i ~ j번 수까지 합을 구하는 프로그램 작성.
 * 수에 목록 nums
 * 합을 구할 구간 sections
 */

function solution(nums, sections) {
  const answer = [];
  sections.forEach(([start, end]) => {
    let sum = 0;
    for (let j = start - 1; j < end; j++) {
      sum += nums[j];
    }
    answer.push(sum);
  });
  return answer;
}

[
  {
    nums: [5, 4, 3, 2, 1],
    sections: [
      [1, 3],
      [2, 4],
      [5, 5],
    ],
  },
].forEach(({ nums, sections }) => {
  console.log(solution(nums, sections));
});
