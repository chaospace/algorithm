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
 - 좌우 벽 높이보다 작은 곳이 발견되면 낮은 벽의 높이 만큼 물을 받을 수 있다.
 - leftWall = [0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3] 
 - h        = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
 - rightWall= [3, 3, 3, 3, 3, 3, 3, 3, 2 ,2, 2 ,1]
 - minWall  = [0, 1, 1, 2, 2, 2, 2, 3, 2, 2, 2, 1]
 - water    = [0, 0, 1, 0, 1, 2, 1, 0, 0, 1, 0, 0]

 - 위 방법을 하나로 합치면 결국 two포인터를 이용한 비교처리 진행.
   left  좌측 벽중 가장 높은 값 참조.
   right 우측 벽중 가장 높은 값 참조.

   let current = 0;
   let lRef = 0;          // 좌측인덱스
   let rRef = h.length-1; // 우측인덱스
   let left = h[lRef];    // 좌측벽 초기화
   let right =h[rRef];    // 우측벽 초기화

   if(left <= right) {
    left  = Math.max(h[++lRef], left);
   } else {
    right = Math.max(h[--rRef], right);
   }
   current = Maht.min(left, right);
   water += (current - h[index]);
*/

function solution(h) {
  let current = 0;
  let lRef = 0;
  let rRef = h.length - 1;
  let left = h[lRef]; // 0
  let right = h[rRef]; // 1
  // [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
  //두 개의 포인터가 만날 때 까지 벽 높이 비교를 통해 담을 수 있는 물에 양을 구함.
  while (lRef < rRef) {
    //각 벽의 높이는 항상 큰 것을 참조.
    left = Math.max(left, h[lRef]);
    right = Math.max(right, h[rRef]);
    // 우측벽이 크거나 같을 경우
    if (left <= right) {
      // 이전 벽과 현재 벽의 높이 차이 구하고 이 값이 0보다 크다면 담을 수 있는 물의 양이 된다.
      current += left - h[lRef]; // lRef, rRef포인터를 참조 포인터와 같이 사용.
      lRef += 1;
      // 좌측벽이 더 높을 경우 우측벽의 이전과 현재 높이 차를 구하면 된다.
    } else {
      current += right - h[rRef];
      rRef -= 1;
    }
  }
  console.log("current", current);
}

solution([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
