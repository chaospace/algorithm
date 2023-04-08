/**
 * 고유한 정수 배열 candidates와 target이 주어질 경우
 * target을 만들 수 있는 조합을 모두 반환( 덧셈을 통한 조합, 같은 수를 여러번 사용가능.)
 * 
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations


Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]

Input: candidates = [2], target = 1
Output: []

1 <= candidates.length <= 30
2 <= candidates[i] <= 40
All elements of candidates are distinct.
1 <= target <= 40

[
    [3,3,3,3,3,3,3,3,3,3],
    [3,3,3,3,3,3,4,4,4],
    [3,3,3,3,3,3,12],
    [3,3,3,3,3,4,4,7],
    [3,3,3,3,4,4,10],
    [3,3,3,3,4,7,7],
    [3,3,3,4,7,10],
    [3,3,3,7,7,7],
    [3,3,4,4,4,4,4,4],
    [3,3,4,4,4,12],
    [3,3,4,10,10],
    [3,3,7,7,10],
    [3,3,12,12],
    [3,4,4,4,4,4,7],
    [3,4,4,7,12],
    [3,7,10,10],
    [4,4,4,4,4,10],
    [4,4,4,4,7,7],
    [4,4,10,12],
    [4,7,7,12],
    [10,10,10],
    [30]
]
 */

function getQuotientRemainder(base, target) {
  const quotient = Math.floor(target / base);
  const remainder = target % base;
  return {
    quotient,
    remainder
  };
}

function getRepeatValue(value, count) {
  const arr = [];
  while (count) {
    arr.push(value);
    count--;
  }
  return arr;
}

function excludeSame(a, b) {
  return a > b;
}

function includeSame(a, b) {
  return a >= b;
}

function composeCombination(v, q, appendee) {
  const arr = getRepeatValue(v, q);
  if (appendee) {
    arr.push.apply(arr, Array.isArray(appendee) ? appendee : [appendee]);
  }
  arr.sort((a, b) => a - b);
  return arr;
}

let combinationMap;
function combinations(candidates, target, compareFunc = excludeSame) {
  if (combinationMap[target] && combinationMap[target].length) {
    return combinationMap[target];
  }
  const min = candidates[0];
  if (min > target) return [];
  const list = candidates.filter(element => compareFunc(target, element));
  const len = list.length;
  const source = {};
  if (len <= 1) return [];
  for (let i = len - 1; i >= 0; i--) {
    const v = candidates[i];
    if (compareFunc(target, v)) {
      let { quotient, remainder } = getQuotientRemainder(v, target);
      let remainderIndex = candidates.indexOf(remainder);
      if (remainder === 0) {
        const arr = getRepeatValue(v, quotient);
        source[arr.join(",")] = arr;
      } else if (remainderIndex > -1) {
        const arr = composeCombination(v, quotient, candidates[remainderIndex]);
        source[arr.join(",")] = arr;
      }
      while (quotient) {
        if (remainder > min) {
          const subset = combinations(candidates, remainder);
          for (let j = 0; j < subset.length; j++) {
            const items = subset[j];
            if (items.length) {
              const arr = composeCombination(v, quotient, items);
              source[arr.join(",")] = arr;
            }
          }
        }
        quotient -= 1;
        remainder += v;
      }
    }
  }
  const r = Object.values(source);

  if (r.length > 1) {
    combinationMap[target] = r;
  }

  return r;
}

function solution(candidates, target) {
  combinationMap = {};
  candidates.sort((a, b) => a - b);
  if (candidates[0] > target) return [];
  const arr = combinations(candidates, target, includeSame);
  console.log("arr", arr.length);
  return arr;
}
// solution([2, 3, 5], 8);
// solution([2, 3, 6, 7], 7);
// solution([3, 4, 7, 10, 12, 30], 30);

function backtracking(candidates, target) {
  const temp = [];
  const results = [];
  let index = 0;

  function loop(index, target, tempList) {
    if (target === 0) {
      results.push([...tempList]);
    }
    if (target < 0) return;
    for (let i = index; i < candidates.length; i++) {
      tempList.push(candidates[i]);
      loop(i, target - candidates[i], tempList);
      tempList.pop();
    }
  }
  loop(index, target, temp);
  return results;
}

function solutionDP(candidates, target) {
  const sortedNums = candidates.sort((a, b) => a - b);
  let opt = [];

  for (let sum = 0; sum <= target; sum++) {
    opt[sum] = [];
    let combineList = [];

    for (let i = 0; i < sortedNums.length && sortedNums[i] <= sum; i++) {
      if (sum === sortedNums[i]) {
        combineList.push([sortedNums[i]]);
      } else {
        // 맵에 마지막 값이 현재 값보다 작거나 작으면 조합에 추가
        for (let prevList of opt[sum - sortedNums[i]]) {
          if (sortedNums[i] >= prevList[prevList.length - 1]) {
            combineList.push([...prevList, sortedNums[i]]);
          }
        }
      }
    }
    opt[sum] = combineList;
  }
  console.log("opt", opt);
  return opt[target];
}

console.log(solutionDP([2, 3, 6, 7], 7));
