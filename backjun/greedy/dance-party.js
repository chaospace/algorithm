/**
 * 남자 N명과 여자 N명이 상근이가 주최한 댄스 파티에 왔다.
 * 상근이는 모든 사람의 키를 알고있다.
 * 각 남자는 모두 여자와 춤을 출 수 있고, 여자는 남자와 춤을 출 수 있다.
 *
 *
 * 아래와 같은 제한이 있을 때,
 * 상근이는 최대 몇 쌍을 만들 수 있을까?
 *
 * 남자가 선호하는 유형
 *  - 자신보다 키가 큰 여성.
 *  - 자신보다 키가 작은 여성.
 *
 * 여자가 선호하는 유형
 *  - 자신보다 키가 큰 남성
 *  - 자신보다 키가 작은 남성
 *
 * 키가 같은 남여가 춤을 추는 경우는 없다.
 *
 * 입력
 *
 * 첫째 줄에 N이 주어진다. (1 ≤ N ≤ 100,000)
 *
 * 둘째 줄에는 남자의 키가 밀리미터 단위로 주어진다.
 * 키는 절댓값이 1500보다 크거나 같고, 2500보다 작거나 같은 정수이다.
 * 사람의 키는 주어지는 값의 절댓값이다.
 * 키가 양수인 경우에는 자신보다 키가 큰 여자와 춤을 추기를 원하는 남자이고,
 * 음수인 경우에는 키가 작은 사람과 춤을 추기를 원하는 남자이다.
 *
 * 셋째 줄에는 여자의 키가 밀리미터 단위로 주어진다.
 * 키의 범위나 의미 역시 남자와 동일하다.
 *
 * ex)
 * 1
 * -1800
 * 1800
 * output
 * 0 (서로 동일한 경우는 절대 출 수 없다.)
 *
 * 1
 * 1700
 * -1800
 * output: 1 ( 남자는 170이상 여자는 180이하를 원하므로 1쌍 성립.)
 * 2
 * -1800 -2200
 * 1900  1700
 * output : 남자:180, 여자:170, 남자:2200, 여자:190( 2쌍 성립 )
 *
 */

function solution({ male, female }) {
  // 기본은 정렬 처리 후 시작
  male.sort((a, b) => Math.abs(a) - Math.abs(b));
  female.sort((a, b) => Math.abs(a) - Math.abs(b));
  //dfs혹은 bfs로도 가능은 할 듯.
  //두 개의 조건이 서로 맡아야 함.
  let answer = [];
  for (let i = 0; i < male.length; i++) {
    const absM = Math.abs(male[i]);
    const moreThen = male[i] > 0;
    for (let j = 0; j < female.length; j++) {
      const absF = Math.abs(female[j]);
      const moreThenF = female[j] > 0;
      if (moreThen === moreThenF || female[j] === male[i]) continue;
      if (moreThen && absM < absF) {
        const a = female.splice(j, 1);
        answer.push([male[i], ...a]);
        break;
      } else if (!moreThen && absM > absF) {
        const a = female.splice(j, 1);
        answer.push([male[i], ...a]);
        break;
      }
    }
  }

  return { male, female, answer };
}

/**
 * 음양을 구분하는게 좋은가?
 * 절대값을 이용해 정렬하고 남자, 혹은 여자를 기준으로 stack으로 비교하면 처리하면 된다..
 * 단 비교를 위한 시간이 걸린다..
 * 동일 기호는 서로 비교대상이 아니다. 동일 숫자가 짝이 될수 없기 때문에
 * 타깃을 추출.
 * 조건을 추출
 * 조건과 차이가 가장 적은 값을 추출.
 * dp를 통해 가능할까?
 */
[
  {
    male: [-1800],
    female: [1600],
  },
  {
    male: [-1800, -2200, -1500],
    female: [1900, -1700, 1600],
  },
  {
    male: [-1550, -1600, -2000],
    female: [1500, 1550, 1800, 2100],
  },
].forEach((info) => {
  console.log(solution(info));
});
