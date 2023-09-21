const { getStartTime } = require("../libs/util");

/**
 * 나머지 합.
 * 목록 list에 부분합에서 k로 나누어 떨어지는 쌍의 개수를 구하기.
 * input      : 0, 1, 2, 3, 1, 2
 * 부분합       : 0, 1, 3, 6, 7, 9
 * k(3)나눈 나머지  :  , 1, 0, 0, 1, 0
 * 나머지에 결과를 저장하는 배열의 길이는 k-1
 * k나머지 결과  : 3(완전히 나누어지는 경우), 2(나머지가 1이 되는 경우), 0
 * 위에 결과에서 나머지가 0이상인 경우는 서로 빼주는 경우 나머지가 0이 되므로 n*(n-1)/2 를 적용해 구할 수 있음.
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
  console.log("backtracking", sum);
  return sum;
}

function solutionAd(list, k) {
  const combi_two = (n) => {
    if (n <= 1) return 0;
    else return (n * (n - 1)) / 2;
  };
  let answer = Array.from({ length: k }).fill(0);
  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += list[i];
    // 부분합을 k로 나눈 값의 카운트를 체크
    sum %= k;
    answer[sum]++;
  }

  //나머지가 0인 확실한 카운트를 기본값으로 사용.
  sum = answer[0];
  // 조합을 통해 경우의 수를 카운트를 더하여 총 합을 구한다.
  for (i = 0; i < k; i++) {
    sum += combi_two(answer[i]);
  }
  return { sum, answer };
}

[
  {
    list: [1, 2, 3, 1, 2],
    k: 3,
  },
].forEach(({ list, k }) => {
  console.log(solution(list, k));
  console.log(solutionBackTracking(list, k));
  console.log(solutionAd(list, k));
});

/**
 
 * 1+2 = 3   = 0
 * 1+2+3 = 6 = 0
 * 1+2+3+1+2 = 9 = 0
 * 
 * 2+3+1 = 6 = 0
 * 
 * 3         = 0
 * 3+1+2 = 6 = 0
 * 
 * 1+2   = 3 = 0
 *
 */
