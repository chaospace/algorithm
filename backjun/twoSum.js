/**
 * 두 수의 합
 * 주어진 수 목록에서 두 수를 합하여 k가 되는 쌍을 구하는 함수 작성.
 * 1<=n<=100000, 1<=x<=2000000
 *
 * 포인터를 이용해 찾아보자.
 */

function solution(list, k) {
  const answer = [];
  let l = 0;
  let r = list.length - 1;

  //소팅 후 포인터를 이동하며 조합한다.
  list.sort((a, b) => a - b);

  while (l < r) {
    const sum = list[l] + list[r];
    if (sum === k) {
      answer.push([list[l], list[r]]);
      r--;
    } else if (sum > k) {
      r--;
    } else {
      l++;
    }
  }

  return answer;
}

[{ list: [5, 12, 7, 10, 9, 1, 2, 3, 11], k: 13 }].forEach(({ list, k }) => {
  // console.log(solution(list, k));
  console.log(solutionPointer(list, k));
});
