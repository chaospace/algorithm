/**
 * 특이한 정렬
 * n개의 정수를 가진 배열이 있다. 이 배열은 양의정수와 음의 정수를 모두 가지고 있다. 이제 당신은 이 배열을 좀 특별한 방법으로 정렬해야 한다.
 * 정렬이 되고 난 후, 음의 정수는 앞쪽에 양의정수는 뒷쪽에 있어야 한다. 또한 양의정수와 음의정수의 순서에는 변함이 없어야 한다.
 * 예. -1 1 3 -2 2 ans: -1 -2 1 3 2.
 *
 *
 * 요구사항 정리
 *  - 음수, 양수를 구분해서 정렬
 *  - 음수는 왼쪽, 양수는 오른쪽
 *  - 단 정렬된 수는 초기 입력값 순서와 동일해야 한다.
 */

function solution(number) {
  let answer = [];
  answer = number.filter(v => v < 0);
  return answer.concat(number.filter(v => v > -1));
}

console.log(solution([-1, 1, 3, -2, 2]));

function solutionRef(array) {
  let negatives = [];
  let positives = [];
  // 원본배열에서 음수와 양수를 나눔.
  for (let i = 0; i < array.length; i++) {
    if (array[i] < 0) {
      negatives.push(array[i]);
    } else {
      positives.push(array[i]);
    }
  }

  return negatives.concat(positives);
  //console.log("ne", negatives);
}

console.log(solutionRef([-1, 1, 3, -2, 2]));
