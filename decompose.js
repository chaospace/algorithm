/**
 * 주어진 자연수를 구성하는 방법
 */

function decompose(n) {
  let stack = [n];
  while (true) {
    console.log("stack", stack);
    let temp = stack.pop();
    if (temp != 1) {
      stack.push(temp - 1);
      stack.push(1);
    } else {
      let sum = 2;
      // 배열이 존재하고 마지막이 1이면 제거하면서 sum을 1씩 증가시킴
      for (; stack.length !== 0 && stack[stack.length - 1] == 1; stack.pop()) {
        sum++;
      }
      // 위에 조건에 의해 모든 배열이 1로 구성되면 탐색을 종료
      if (stack.length == 0) {
        break;
      }
      let pivot = stack.pop() - 1;
      stack.push(pivot);
      while (sum > pivot) {
        stack.push(pivot);
        sum -= pivot;
      }
      stack.push(sum);
    }
  }
  return stack;
}

console.log("output", decompose(5));
