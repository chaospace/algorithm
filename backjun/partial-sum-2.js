const { getStartTime } = require("../libs/util");

/**
 * 나머지 합.
 * 목록 list에 부분합에서 k로 나누어 떨어지는 쌍의 개수를 구하기.
 *
 * 비고 1, 2, 3, 1, 2
 * 1,  1, 3, 6, 7, 9
 *
 * 2,     2, 5, 6, 8
 *
 * 3,        3, 4, 6
 *
 * 1,           1, 3
 *
 * 2               2
 *
 *
 * 일반적인 방법은 루프를 돌며 직접 값을 확인하면 됨.
 * 시간을 절약하려면 조합을 이용.
 */
//2중 포문.
function solution(list, k) {
  //전체합을 구하고 앞에서부터 제거하면서 다시 본다.
  const answer = [];
  for (let i = 0; i < list.length; i++) {
    if (answer.length) {
      answer.push(answer[answer.length - 1] + list[i]);
    } else {
      answer.push(list[i]);
    }
  }

  let count = 0;
  for (let j = 0; j < answer.length; j++) {
    if (answer[j] % k === 0) {
      count += 1;
    }
    for (let m = j + 1; m < answer.length; m++) {
      if ((answer[m] - answer[j]) % k === 0) {
        count += 1;
      }
    }
  }
  return count;
}

//재귀를 사용하지만 결국 2중 루프
function solutionBackTracking(list, k) {
  const max = list.length;
  const backtracking = (sum, index, count) => {
    //종료 조건.
    if (index >= max) {
      return count;
    }

    //나누어지면 카운트 증가
    if (sum % k === 0) {
      count += 1;
    }

    return backtracking(sum + (list[index + 1] || 0), index + 1, count);
  };

  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += backtracking(list[i], i, 0);
  }

  return sum;
}

function solutionAd(list, k) {
  const combi_two = (n) => {
    if (n <= 1) return 0;
    else return (n * (n - 1)) / 2;
  };
  let answer = Array.from({ length: 10 }).fill(0);
  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += list[i];
    sum %= k;
    /**
     * 나머지가 동일한 것에 카운트를 증가.
     * 나머지가 0인 경우는 이미 만족
     * 나머지가 동일한 것은 서로 빼면 0으로 만족.
     */
    answer[sum]++;
  }
  sum = answer[0];

  for (i = 0; i < k; i++) {
    // 조합을 통해 경우의 수를 카운트.
    sum += combi_two(answer[i]);
  }
  console.log("list", answer);
  console.log("answer", sum);
}

[
  {
    list: [1, 2, 3, 1, 2],
    k: 3,
  },
].forEach(({ list, k }) => {
  let begin = getStartTime();
  //console.log(`start : ${begin}`);
  //   console.log(solution(list, k));
  //   console.log(solutionBackTracking(list, k));
  solutionAd(list, k);
  console.log(`diff-time : ${performance.now() - begin}`);
});
