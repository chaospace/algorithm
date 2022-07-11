// 포켓몬
/**
 * 홍박사님은 당신에게 자신의 연구실에 있는 N 마리의 포켓몬 중 N/2마리를 가져가도 좋다고 했음.
 * 제한사항
 * - nums는 포켓몬의 종류 번호가 담긴 1차원 배열
 * - nums의 길이(N)는 1이상 10,000이하의 자연수이며 항상 짝수로 주어집니다.
 * - 포켓몬의 종류 번호는 1이상 200,000이하의 자연수로 나타냅니다.
 * - 가장 많은 종류의 포켓몬을 선택하는 방법이 여러 가지인 경우, 선택할 수 있는 포켓몬 종류 개수의 최대값 하나만 리턴
 *
 * 요약
 *  - 주어진 배열(nums)에서 중복되지 않는 값을 추출 후 가질 수 있는 몫(nums/2)를 비교 후 선택적 리턴
 */
const arr_0 = [3, 1, 2, 3];
const arr_1 = [3, 3, 3, 2, 2, 4];
const arr_2 = [3, 3, 3, 2, 2, 2];
function solution(nums) {
  const gain_value = nums.length / 2;
  const unique_nums = [...new Set(nums)].length;
  return gain_value < unique_nums ? gain_value : unique_nums;
}

console.log("input arr_0", solution(arr_0));
console.log("input arr_1", solution(arr_1));
console.log("input arr_2", solution(arr_2));
