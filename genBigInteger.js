// 큰 수 만들기
/**
 * 어떤 숫자에서 k개의 수를 제거했을 때 얻을 수 있는 가장 큰 숫자 구하기.
 * 숫자는 왼쪽에서 오른쪽으로만 조합.
 *  number	    k	return
 *  1924	      2	94
 *  1231234	    3	3234
 *  4177252841	4	775841
 * 
 *  1231
 *  1232
제한사항
- number는 2자리 이상, 1,000,000자리 이하인 숫자입니다.
- k는 1 이상 number의 자릿수 미만인 자연수입니다.
 * ex)
 *  1924에서 두 개를 제거하면 [19, 12, 14, 92, 94, 24];
 *  가장 큰수는 94
 *
 *  1231234에서 세 개를 제거하면 나올 수 있는 수의 경우의 수
 * 
 * 1924 경우의 수를 조합하려면 
 *  - 최초 1을 추출
 *  - k 번재 까지 이어서 수를 추출
 * 
 * 추출할게 아니라 조합해 관리해야 한다.
 *  shift를 이용해 조합할 경우 조합에 자리수가 길어지면 빠지는 경우 발생 
 *  가장 확실한 방법은 시작 인덱스를 늘려가고 하위 루프에서 이를 조합하는 것.
 *  
 * 조합 방법 정리
 *  - 기준값에서 차례대로 조합
 *  - 기분값 제거 후 차례대로 조합
 */
/**
 * 조건에 해당하는 자리 수를 만족할 때 까지 가장 큰 수를 찾아서 조합한다.
 * @param {} number
 * @param {*} k
 * @returns
 */
function solution(number, k) {
  const answer = [];
  const precise = number.length - k;
  for (let i = 0; i < number.length; i++) {
    const value = number.charAt(i);
    while (k && answer[answer.length - 1] < value) {
      answer.pop();
      k--;
    }

    answer.push(value);
    if (k === 0) {
      answer.push(number.substring(i + 1));
      break;
    }
  }
  return answer.join("");
}

console.log(solution("1924", 2));
console.log(solution("1231234", 3));
console.log(solution("4177252841", 4));
