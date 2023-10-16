/**
 * 보석모으기
 * 숌 보석상에 있는 모든 보석을 다 훔치려고 한다.
 * 가방의 개수에 제한이 있고, 한 가방마다 넣을 수 있는 보석의 개수가 제한이 있기 때문이다.
 * 세준이는 M개의 가방을 가지고 있다. 그리고 각각의 가방은 C그램의 보석을 담을 수 있다.
 * 숌 보석상에는 보석이 N개 있다.
 * N개의 보석의 무게가 주어졌을 때,
 * 세준이가 훔칠 수 있는 보석의 최대 개수를 구하는 프로그램을 작성하시오.
 *
 * 입력
 * 보석의 개수 N, 가방의 개수 M, 가방의 최대 한도 C.
 * N은 1보다 크거나 같고, 13보다 작거나 같은 자연수이고,
 * M은 1보다 크거나 같고, 10보다 작거나 같은 자연수이다.
 * C는 1보다 크고, 20보다 작거나 같은 자연수이다.
 *
 * 둘째 줄에 보석의 무게가 하나씩 주어진다.
 * 보석의 무게는 1보다 크거나 같고, 20보다 작거나 같은 자연수
 *
 * backtracking을 이용하는게 더 좋아 보임.
 * dp를 수용가능한 무게만큼 length를 만들고 무게를 채워가며 처리.
 */

/**
 *  배낭수 * 무게제한을 이용한 접근
 *  dp구성은 간단하나 물건의 무게를 나눌 수 없어 정확한 수량파악을 할 수 없음
 *  ex) 배낭 2개, 하나의 배낭무게 제한이 5인 경우 5*2=10으로 할 경우
 *      무게가 2인 물건 5개가 아닌 4개만 수납가능( 하나의 제한은 5 )
 *
 *  배낭 수와 무게제한을 고려하면 dp로 하기 애매한 부분이 나옴.
 *  무작정 추가하며 최적해를 찾는 방식이 모호해짐 중복제거도 어렵고...
 *
 * @param {*} param0
 * @returns
 */
function solution({ m, c, list }) {
  const max = list.length;
  let limit = m * c;
  const dp = Array.from({ length: max + 1 }, () =>
    Array.from({ length: limit + 1 }).fill(0)
  );
  //dp로 이거를 ?
  for (let i = 1; i <= max; i++) {
    const w = list[i - 1];
    for (let j = 1; j <= limit; j++) {
      //물건 무게가 용량보다 크면 이전 값 사용.
      if (w > j) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - w] + 1);
      }
    }
  }
  return { list, dp, limit };
}

/**
 * 재귀와 동일한 방식을 루프로 풀 수 있을까?
 * 불가능하다.. 왜?
 * 이미 배열을 채워 버릴 테니까..
 * 경우의 수를 for문으로는 표현 할 수 없음.
 * 재귀로만 가능.
 * @param {*} param0
 * @returns
 */
function solutionB({ m, c, list }) {
  //물건은 무게별로 정리
  list.sort((a, b) => a - b);

  let dp = Array.from({ length: c + 1 }, () => []);
  //list에 값을 중복없이 구성되는 합을 dp로 구할 수 있을가?
  while (list.length) {
    const node = list.shift();

    //dp를 이용하는 건 맞지만 참조 오류가 발생할 수 있어서 클론을 이용해야 함.
    let temp = JSON.parse(JSON.stringify(dp));
    for (let j = 0; j < dp.length; j++) {
      if (dp[j].length > 0 && j + node <= c) {
        const idx = j + node;
        temp[idx].push([...dp[j][dp[j].length - 1], node]);
      }
    }
    dp = temp; //추가 완료 후에는 dp를 갱신.
    if (node <= c) {
      dp[node].push([node]);
    }
  }

  return dp;
}

function solutionC({ m, c, list }) {
  list.sort((a, b) => a - b);
  const max = list.length;
  const dp = new Array(c + 1).fill(
    new Array(m).fill(new Array(1 << max).fill(0))
  );

  const recursive = (capacity, sackCount, visited) => {
    if (sackCount === -1 || visited === (1 << max) - 1) return 0;
    if (dp[capacity][sackCount][visited] !== 0)
      return dp[capacity][sackCount][visited];

    let ret = 0;
    for (let i = 0; i < max; i++) {
      //비트마스크를 이용해 가방안에 있는 물건인지 여부를 체크하고
      //무게를 담을 여유가 있다면 담아서 진행
      //for문 진행이기 때문에 모든 물건에 대해 판단할 수 있음. dp배열을 물건갯수만큼 하는 것보다 효율이 좋음..
      if ((visited & (1 << i)) === 0 && capacity - list[i] >= 0) {
        ret = Math.max(
          ret,
          1 + recursive(capacity - list[i], sackCount, visited | (1 << i))
        );
      }

      if ((visited & (1 << i)) === 0 && c - list[i] >= 0 && sackCount > 0) {
        ret = Math.max(
          ret,
          1 + recursive(c - list[i], sackCount - 1, visited | (1 << i))
        );
      }
    }
    dp[capacity][sackCount][visited] = ret;
    return dp[capacity][sackCount][visited];
  };

  let a = recursive(c, m - 1, 0);
  return a;
}

[
  {
    m: 2,
    c: 5,
    list: [2, 2, 2, 2, 2],
    o: 4,
  },
  {
    m: 2,
    c: 5,
    list: [1, 2, 3, 4, 5],
    o: 4,
  },
  {
    m: 2,
    c: 12,
    list: [7, 6, 6, 5],
    o: 4,
  },
].forEach((info) => {
  //   console.log(solution(info));
  // console.log(solutionB(info));
  // console.log(solutionC(info));
});
/**
 * 비트 마스크
 * 공집합과 꽉 찬 집합 구하기	A = 0; / A = (1 << 10) - 1;
 * 원소 추가	A |= (1 << k);
 * 원소 삭제	A &= ~(1 << k);
 * 원소의 포함 여부 확인 	if(A & (1 << k))
 * 원소의 토글(toggle)	A ^= (1 << k);
 * 두 집합에 대해서 연산	A | B       → A와 B의 합집합
 * A & B     → A와 B의 교집합
 * A & (~B) → A에서 B를 뺀 차집합
 * A ^ B     → A와 B중 하나에만 포함된 원소들의 집합
 * 집합의 크기 구하기	int bitCount(int A){
 *   if(A == 0) return 0;
 *   return A%2 + bitCount(A / 2);
 * }
 * [내장 명령어]
 * gcc/g++ → __builtin_popcount(A)
 * visual C++ → __popcnt(A)
 * Java → Integer.bitCount(A)
 * 최소 원소 찾기	int first = A & (-A);
 * 최소 원소 지우기	A &= (A - 1);
 * 모든 부분 집합 순회하기	for (int subset = A ; subset ; subset = ((subset - 1) & A)){ }
 */

function bitmaskTest(arr, bitmask) {
  let max = arr.length;
  for (let i = 0; i < max; i++) {
    let pos = 1 << i;
    if (i === max - 1) continue;
    if ((bitmask & pos) === 0) {
      //방문여부를 체크
      bitmask = bitmask | pos;
    }
  }

  let bit = bitmask.toString(2);
  let sum = 0;
  for (let i = 0; i < bit.length; i++) {
    if (bit[i] === "1") {
      sum += arr[i];
    }
  }

  console.log("bitmask", bitmask, bit, sum);
}

let a = [1, 4, 5, 10];

bitmaskTest(a, 0);
