/**
 *
 * 배열 arr의 원소의 합이 x보다 크지만 가장 작은 값을 가진 원소의 수를 반환
 * ex)
 * input
 *
 * array = [1, 4, 45, 6, 0, 19];
 * x     = 51
 * output= 3
 *
 * array = [1, 10, 5, 2, 7]
 * x     = 9
 * output= 1
 */

/**
 * 이전값을 유지하며 빼는 로직과 새로운 인덱스에서 시작하는 로직 둘다 돌린다.
 *
 * 재귀 로직을 어떻게 구성하면 좋을까?
 * 하고 싶은거 동작.
 * 함수 하나를 호출하면 그 안에서 둘로 나누어 호출을 한다?
 * @param {*} array
 * @param {*} k
 */
function solution(array, k) {
  const backtracking = (subArray, next, end) => {
    const sum = subArray.reduce((c, v) => c + v, 0);
    if (sum > k) {
      return subArray;
    } else if (next + 1 <= end) {
      return backtracking([...subArray, array[next]], next + 1, end);
    }
    return null;
  };

  array.forEach((v, i) => {
    console.log("--aaa", backtracking([v], i + 1, array.length));
  });
}

//solution([1, 4, 45, 6, 0, 19], 51);

//solution([1, 10, 5, 2, 7], 9);
//solution([1, 2, 4], 8);
/**
 * 함수에 어울리도록 참조를 더 개선한다면...
 * 인덱스를 기준으로 분열하며 호출 할 수 있을까?
 *
 * 요구하는 것은 subarray라면 subArray를 이용하는게 답이다.
 * 재귀를 이용하는 것 보다 그냥 reduce로 쉽게 해결이 됨.
 * @param {*} array
 * @param {*} k
 */
function solutionTailCall(array, k) {
  const results = array.reduce(
    (current, value) => {
      for (let subArray of current) {
        if (subArray[0] < k) {
          subArray[0] += value;
          subArray[1].push(value);
        }
      }
      return [...current, [0, []]];
    },
    [[0, []]]
  );
  console.log("a", results);
}

solutionTailCall([1, 4, 45, 6, 0, 19], 51);
// solutionTailCall([1, 10, 5, 2, 7], 9);
// solutionTailCall([1, 2, 4], 8);
