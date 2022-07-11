/**
 *
 * k번째 수
 * 배열 array의 i번째 숫자부터 j번째 숫자까지 자르고 정렬했을 때,
 * k번째에 있는 수를 구하려 합니다.
 *
 * input
 *  array = [1,5,2,6,3,7,4];
 *  i = 2,
 *  j = 5,
 *  k = 3
 * - array의 2~5를 자르면 [5,2,6,3]
 * - 위에 array를 정렬하면 [2,3,5,6]
 * - k번에 해당하는 3번째 숫자는 5입니다.
 *
 * 배열 array, [i,j,k]를 원소로 가진 2차원 배열 commands가 매개변수로 주어질 때,
 * 연산 결과를 배열에 담아 return 하는 solution함수를 작성해 주세요.
 *
 * 제한사항
 *  - array의 길이는 1<=x<=100;
 *  - array 원소의 값은 1<=v<=100
 *  - 1 <= commands.length <= 50
 *  - commands의 각 원소는 길이가 3입니다.
 */
function solution(array, commands) {
  const answer = commands.reduce((result, source) => {
    const [start, end, pickIndex] = source;
    const r = array.slice(start - 1, end).sort((a, b) => a - b);
    result.push(r[pickIndex - 1]);
    return result;
  }, []);
  return answer;
}
const start_arr = [1, 5, 2, 6, 3, 7, 4];
console.log(start_arr.slice(3, 4));
