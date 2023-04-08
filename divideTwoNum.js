/**
 * 두 정수가 주어지면 곱셈, 나눗셈, 나머지 연산자를 사용하지 않고 두 정수를 나눕니다.
 * 곱셈, 나눗셈 없이 나누려면 빼기를 이용해야 한다.
 * 빼기는 ok 소수점은 어떻게 제거해야 할까?
 * 결국 바이너리를 이용한 나누셈을 만들라는 것 같음... 공부필요..
 *
 * 2진 나눈셈
 * 초기 2자리 부터 하나씩 추가하며 10진수 나머지 처럼 구해가면 됨.
 */

function solution(dividend, divisor) {
  //   const sign =
  //     (dividend < 0 && divisor < 0) || (dividend > 0 && divisor > 0) ? 1 : -1;

  //   divisor = Math.abs(divisor);
  //   let rest = Math.abs(dividend);
  //   let quotient = 0;

  //   const max = Math.pow(2, 31) - 1;
  //   const min = Math.pow(-2, 31);

  //   while (rest >= divisor) {
  //     rest = rest - divisor;
  //     quotient += sign;
  //   }
  //   return Math.min(max, Math.max(quotient, min));
  let d = dividend.toString(2);
  let k = divisor.toString(2);
  let idx = 2;
  
  while (idx >= d.length) {
    divisor[idx];
    idx++;
  }

  console.log(dividend.toString(2), divisor.toString(2));
}

//console.log(-1, -1);

// solution(-1, -1);
// solution(1, -1);
// solution(-1, 1);
console.log(solution(30, 16));
// solution(10, 3);
// solution(7, -3);
// solution(-10, 2);
