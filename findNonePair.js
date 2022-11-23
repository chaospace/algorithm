/*
주어진 배열에서 쌍이 맞지 않은 숫자 찾기
배열에 짝이 안 맞는 수는 하나만 존재

알게된 점
 - 퍼포먼스를 생각하면 배열 메서드를 이용하는 것보다 그냥 idx를 통한 참조가 속도가 더 빠르다.
 shift. pop, indexOf는 코드는 깔끔해도 속도는 느리다.
*/
function solution(nums) {
  const store = {};
  let idx = 0;
  while (idx < nums.length) {
    const value = nums[idx++];
    if (store[value]) {
      delete store[value];
    } else {
      store[value] = value;
    }
  }
  return Object.values(store)[0];
}

console.log(solution([1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]));
console.log(solution([1]));
