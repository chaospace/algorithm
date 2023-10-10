/**
 * 버스노선
 *
 * 버스노선 정보가 주어질 때,
 * 중복이 되는 노선은 제거 후 중복되지 않는 노선을 반환하는 함수를 작성.
 * 버스에 노선은 시계방향으로 주어진다.
 * 노선에 a-b는 시계방향, b-a는 반시계방향 이다.
 *
 *
 * 입력:
 * 첫 번째 줄에는 버스 정류소의 개수 N(3 ≤ N ≤ 1,000,000,000)이 주어지고
 * 두 번째 줄에는 버스 노선의 수 M(2 ≤ M ≤ 500,000)이 주어진다.
 * 각 버스 노선은 1부터 M까지의 번호로 구분된다.
 * 그 다음 M개의 줄에는 1번 노선부터 순서대로 각 버스 노선 [a, b]를 나타내는 두 개의 정수 a와 b가 한 줄에 주어진다,
 * 단, 0 ≤ a, b ≤ N-1이고 a ≠ b이며 동일한 버스 노선이 두 번 이상 입력으로 주어지는 경우는 없다.
 * 또한 순환 도로 상의 모든 정류소를 포함하는 버스 노선은 존재하지 않는다.
 * 출력:
 * 입력으로 주어진 버스 노선들 중에서 다른 노선에
 * 포함되지 않은 노선들의 번호를 번호가 작은 것부터 순서대로 빈칸을 사이에 두고 출력한다.
 *
 * input:
 *  [0, 4], [2, 6], [5, 0], [7, 9], [9, 4]
 * output:
 *   ②, ③, ⑤
 *  [2,6],[5,0],[9,4]
 *
 * n:20
 * m:4
 * 14 17
 * 18 3
 * 8 6
 * 9 13
 *
 *
 * 전체 :0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
 * 1번 :                                               14---------종착
 * 2번 :--------종착,                                                   시작-------
 * 3번 :------------------종착   시작----------------------------------------------
 * 4번 :                            시작------------종착
 *
 * 라인 스위핑을 이용하면 좋고 노선에 종류는 크게 2가지로 분류 가능( start>end, start<end )
 *  - 0을 중간점으로 경유하지 않는 일반노선 start < end
 *  - 0을 중간점으로 경유하는 순환노선 start > end
 *
 * 라인 비교 방식
 *  - 일반적인 방식( start < end )
 *    각 노선에 시작값과 종료값을 통해 포함여부 판단.
 *
 *  - 0을 중간점으로 경유하는 순환노선간의 비교 ( start > end )
 *    끝 점에 전체노선을 뜻하는 n을 더하여 계산하면 일반 라인처럼 비교가 가능
 *  ex) [5, 0], [9, 4] -> [5, 10], [9, 14]
 *
 *  - 일반 노선과 순환노선 비교
 *    일반 라인은 시작점이 0이상이고, 순환노선은 0 이전이 시작점이라는 것에 주목!
 *    순환노선에 시작점은 항상 일반라인의 시작점을 포함하고 결국 종료점을 비교해서 포함여부를 판단할 수 있다.
 *    - 순환노선에 종료점이 일반노선에 종료점보다 크거나 같으면 포함된다.
 */

function solution({ n, m }) {
  //from, to를 이용해 배열을 순회하며 제거되는 값을 찾을 수 있을까?
  //노선은 무조건 시계방향으로 증가한다.
  //조건은 from1 < from2, to2 <= to1
  //from보다 to가 작을 경우 n으로 나머지 연산을 적용해야 한다.
  //
  const convert = (from, to) => {
    let answer = [];
    while (from !== to) {
      answer.push(from);
      from++;
      from = from % n;
    }
    answer.push(to);
    return answer.join("");
  };
  const line = m.map(([from, to]) => {
    return convert(from, to);
  });

  const hasIncludeLine = (t) => {
    const target = line[t];
    for (let i = 0; i < line.length; i++) {
      if (i === t) {
        //대상은 제외
        continue;
      }
      if (line[i].includes(target)) {
        return true;
      }
    }
    return false;
  };
  const answer = [];
  for (let i = 0; i < line.length; i++) {
    if (!hasIncludeLine(i)) {
      answer.push(i + 1);
    }
  }

  return { line, answer };
}

function solutionLineSwiping({ n, m }) {
  //이중루프를 통해 앞에서 정리한 3가지 케이스의 비교를 처리한다.
  const line = JSON.parse(JSON.stringify(m));
  let circleMax = 0;
  //순환노선 정보 변경을 위해 포인트 가공처리
  for (let i = 0; i < m.length; i++) {
    //순환노선의 경우 종료값 중 최대값을 찾고, 일반라인 비교를 위해 종료점에 +n을 해준다.
    if (line[i][0] > line[i][1]) {
      circleMax = Math.max(circleMax, line[i][1]);
      line[i][1] += n;
    }
    //정렬 시 원래 인덱스가 변경되니 기억해둠.
    line[i][2] = i + 1;
  }
  //라인 정렬
  //시작점은 오름차순, 종료점이 내림차순을 이용
  //직전 라인과 종료값을 비교 해 포함여부를 판단할 수 있다.
  line.sort((a, b) => {
    if (a[0] > b[0]) {
      return 1;
    } else if (a[0] < b[0]) {
      return -1;
    }
    return a[1] > b[1] ? -1 : 1;
  });

  const answer = [];
  for (let i = 0; i < line.length; i++) {
    //일반라인과 순환라인 비교처리
    if (line[i][1] <= circleMax) {
      //순환노선의 종료점보다 작은 종료노선은 폐지.
      continue;
    }

    if (
      !answer.length ||
      (answer.length && answer[answer.length - 1][1] < line[i][1])
    ) {
      answer.push(line[i]);
    }
  }

  return { line, circleMax, answer, index };
}

//from이 to보다 크고, to가 from보다 크면 포함이네
[
  {
    n: 10,
    m: [
      [0, 4],
      [2, 6],
      [5, 0],
      [7, 9],
      [9, 4],
    ],
  },
  {
    n: 20,
    m: [
      [14, 17],
      [18, 3],
      [8, 6],
      [9, 13],
    ],
  },
].forEach((info) => {
  //console.log(solution(info))
  console.log(solutionLineSwiping(info));
});
