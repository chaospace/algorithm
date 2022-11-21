/**
 * candidates와 target이 주어지면 모든 조합을 중복없이 찾아서 반환
 * candidates의 숫자는 한번만 사용가능
 * 
 

Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: 
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]

Input: candidates = [2,5,2,1,2], target = 5
Output: 
[
[1,2,2],
[5]
]
*/

function solution(candidates, target) {
  const max = candidates.length;
  const temp = [];
  const results = {};
  candidates.sort((a, b) => a - b);

  function loop(current, target, tempList) {
    if (target === 0) {
      results[tempList.join("")] = [...tempList];
    }

    if (target <= 0) {
      return;
    }

    for (let i = current; i < max; i++) {
      let tempTarget = target;
      tempList.push(candidates[i]);
      tempTarget -= candidates[i];
      let step = 1;
      // 중복숫자 처리
      while (
        candidates[i] === candidates[i + step] &&
        tempTarget - candidates[i] >= 0
      ) {
        tempTarget -= candidates[i];
        tempList.push(candidates[i]);
        step += 1;
      }
      loop(i + step, tempTarget, tempList);
      while (step > 0) {
        tempList.pop();
        step--;
      }
    }
  }

  loop(0, target, temp);
  console.log("results", results);
}

function solutionNext(candidates, target) {
  const results = {};
  const max = candidates.length;
  candidates.sort((a, b) => a - b);
  function dfs(current, rest, tempList) {
    if (rest === 0) {
      results[tempList.join("")] = [...tempList];
    } else if (rest <= 0) {
      return;
    }

    for (let i = current; i < max; i++) {
      dfs(i + 1, rest - candidates[i], [...tempList, candidates[i]]);
      while (candidates[i + 1] === candidates[i]) {
        i++;
      }
    }
  }

  dfs(0, target, []);

  return results;
}

console.log(solutionNext([2, 5, 2, 1, 2], 5));
console.log(solutionNext([10, 1, 2, 7, 6, 1, 5], 8));
console.log(
  solutionNext(
    [
      1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ],
    30
  )
);
// console.log(solution([10, 1, 2, 7, 6, 1, 5], 8));
// console.log(solution([2, 5, 2, 1, 2], 5));

// console.log(
//   solution(
//     [
//       1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
//     ],
//     30
//   )
// );

// var combinationSumNoLoop = function (candidates, target) {
//   let results = [];
//   candidates.sort((a, b) => a - b);

//   const helper = (start, target, combinations = []) => {
//     if (target === 0) {
//       results.push([...combinations]);
//       return;
//     }

//     for (
//       let i = start;
//       i < candidates.length && target - candidates[i] >= 0;
//       i++
//     ) {
//       if (i > start && candidates[i] === candidates[i - 1]) continue;

//       helper(i + 1, target - candidates[i], [...combinations, candidates[i]]);
//     }
//   };

//   helper(0, target);
//   return results;
// };

// console.log(combinationSumNoLoop([2, 5, 2, 1, 2], 5));
