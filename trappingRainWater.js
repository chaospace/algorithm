/**
 * 빗물 가두기
 * trapping rain water
 *
 * 각 막대의 너비가 1인 높이 지도를 나타내는 n개의 음이 아닌 정수가 주어지면
 * 비가 내린 후 얼마나 많은 물을 가둘 수 있는지 계산하십시오.
 * 
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented 
by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water
(blue section) are being trapped.

Input: height = [4,2,0,3,2,5]
Output: 9

골짜기를 찾는 법
 - 좌우에 높이를 알 수 있는 index부터 시작 ex 1
 - 가장 낮은 곳에서 좌우에 값이 높다면 주변 인덱스를 넓혀가기 시작.
 */

function solution(height) {
  const len = height.length;
  if (len < 3) {
    return 0;
  }

  let sum = 0;
  //let stack = [];
  for (let i = 1; i < len - 1; i++) {
    const value = height[i];
    let l = i - 1;
    let r = i + 1;
    if (height[l] > value && height[r] > value) {
      // gap이 형성되는 포인트 찾기
      while (height[l - 1] > height[l]) {
        l--;
      }
      while (height[r + 1] > height[r]) {
        r++;
      }
      console.log("l", height[l], "r", height[r], "current", height[i]);
      // 웅덩이 값 추출
    }
  }
  console.log("======================");
}
//solution([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
//solution([4, 2, 0, 3, 2, 5]);

/**
 * 웅덩이가 있는 영역을 채워가나며 값을 채움.
 * 루프를 돌며 높은 값을 만나면 자신보다 큰 값이 나오기 전까지
 * 부족한 부분을 채우면 진행.
 *
 * 높은 값을 만나면 값을 변경
 * 변경된 기준을 가지고 다시 반복.
 *  - 위 방식에 문제점은?
 *   - 현재 값보다 큰 값이 있을 경우만 유효.
 *   - 현재가 가장 높은 값이면 공통 높이로 변경.
 */

function fillDownArea(height) {
  // 시작 높이 설정
  let current = height[0];
  const diffs = [];
  for (let i = 1; i < height.length; i++) {
    if (current > height[i]) {
      // 부족한 값을 채움.
      diffs.push(current - height[i]);
    } else {
      // 기본 높이 변경
      current = Math.max(current, height[i]);
    }
  }
  console.log("diff", diffs);
}

fillDownArea([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
fillDownArea([4, 2, 0, 3, 2, 5]);
