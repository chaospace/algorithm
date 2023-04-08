/**
 * 여러개의 4
 * 1. 4개의 4로 257만들기
 * 2. 5개의 4로 65532만들기
 * 제약 덧셈, 뺄셈, 곱셈, 나눗셈, 거듭제곱만 가능
 *
 * 300-43
 * 함수로 접근한다면 결국 나누고 나머지를 4의 곱과 나머지가 1
 */

function getQuotientRemainder(subject, divider, count) {
  const quotient = parseInt(subject / divider);
  const remainder = subject % divider;
  //console.log(quotient, remainder);
  const sqrtCount = Math.sqrt(quotient);
  console.log("몫", quotient, "나머지", remainder, "제곱", sqrtCount);
  if (remainder == 1) {
    console.log(`${divider}/${divider}`);
  } else if (remainder == 0) {
    console.log(parseInt(quotient / divider));
  }
  console.log(divider ** sqrtCount);
}
getQuotientRemainder(257, 4, 4);
//console.log(4 ** (4 + 4 + 4));
// const t = 65532;
// const jj = t / 4;
// console.log(t % 4);
// console.log(4 ** 4 * 4 ** 4 - 4, t);
// console.log(jj);
getQuotientRemainder(65532, 4, 5);

function partitonNumber(n) {
  // 이게 곧 0 처리
  let count = 0;
  for (let i = 1; i < n; i++) {
    //arr[depth] = i; // 뎁스에 해당하는 값을 배열에 기억
    // 재귀 발생 시 마다 뎁스값을 증가시켜 전달
    count += partitonNumber(n - i);
    // 해당 뎁스 완료 후 값을 0으로 초기화
    // 고정 값 이후는 모두 1로 초기화(이게 없을 경우)
    //arr[depth] = 0;
  }
  return count + 1;
}

//console.log(partitonNumber(5));
