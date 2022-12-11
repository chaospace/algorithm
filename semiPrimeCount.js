/**
 소수 는 1과 X라는 정확히 두 개의 다른 약수를 갖는 양의 정수 X입니다.
 처음 소수 정수는 2, 3, 5, 7, 11 및 13입니다.

반소수는 두 개의 소수(반드시 구별되지는 않음)의 곱인 자연수입니다.
처음 몇 개의 세미프라임은 4, 6, 9, 10, 14, 15, 21, 22, 25, 26입니다.

각각 M개의 정수로 구성된 두 개의 비어 있지 않은 배열 P와 Q가 주어집니다.
이러한 배열은 지정된 범위 내의 세미프라임 수에 대한 쿼리를 나타냅니다.

쿼리 K에서는 범위(P[K], Q[K])(1 ≤ P[K] ≤ Q[K] ≤ N) 내에서 세미프라임의 수를 찾아야 합니다.

예를 들어, 다음과 같은 정수 N = 26 및 배열 P, Q를 고려하십시오.
    P[0] = 1  Q[0] = 26
    P[1] = 4  Q[1] = 10
    P[2] = 16 Q[2] = 20
이러한 각 범위 내의 세미프라임 수는 다음과 같습니다.

(1, 26)은 10이고,
(4, 10)은 4,
(16, 20)은 0입니다.
함수 작성:

함수 솔루션(N, P, Q);

정수 N과 M 정수로 구성된 두 개의 비어 있지 않은 배열 P와 Q가 주어지면 모든 쿼리에 대한 연속적인 답변을 지정하는 M 요소로 구성된 배열을 반환합니다.

예를 들어 정수 N = 26이고 배열 P, Q가 다음과 같이 주어진 경우:

    P[0] = 1 Q[0] = 26
    P[1] = 4 Q[1] = 10
    P[2] = 16 Q[2] = 20
함수는 위에서 설명한 대로 값 [10, 4, 0]을 반환해야 합니다.

다음 가정에 대한 효율적인 알고리즘을 작성 하십시오.

N은 [ 1 .. 50,000 ] 범위 내의 정수 이고;
M은 [ 1 .. 30,000 ] 범위 내의 정수 이고;
배열 P 및 Q의 각 요소는 범위 [ 1 .. N ] 내의 정수입니다 .
P[i] ≤ Q[i].
 */

/**
 * P ~ Q 범위에 있는 반소수의 수를 찾아 배열로 반환
 * 반소수에 개수를 배열로 구성 후 해당 인덱스에 따른 -처리만 하는게 베스트
 *
 * @param {*} N
 * @param {*} P
 * @param {*} Q
 */
function solution(N, P, Q) {
  const answer = [];
  const semiPrimes = new Array(N + 1).fill(0);
  for (let i = 2; i <= N; i++) {
    if (i * i < N) {
      for (let sqrt = i * i; sqrt <= N; sqrt += i) {
        if (semiPrimes[sqrt] === 0) semiPrimes[sqrt] = i;
      }
    }
  }

  let sum = 0;
  const semiClone = [...semiPrimes];
  for (let i = 1; i <= N; i++) {
    if (semiPrimes[i] !== 0) {
      let j = i / semiPrimes[i];
      console.log(
        "j",
        j,
        "semiPrimes[j]",
        semiPrimes[j],
        "i",
        i,
        "semiPrimes[i]",
        semiPrimes[i]
      );
      if (semiPrimes[j] == 0) {
        sum += 1;
      }
    }
    semiClone[i] = sum;
  }
  console.log("semiPrimes", semiPrimes);
  console.log("semiClone", semiClone);
  return answer;
}

solution(26, [1, 4, 16], [26, 10, 20]);

function solutionRefactoring(N, P, Q) {
  const integers = new Array(N + 1).fill(0);
  let i = 2;
  while (i * i <= N) {
    if (integers[i] === 0) {
      let sqrt = i * i;
      while (sqrt <= N) {
        if (integers[sqrt] === 0) {
          integers[sqrt] = i;
        }
        sqrt += i;
      }
    }
    i += 1;
  }
  //console.log("intergers", integers);
  const semiPrimes = new Array(N + 1).fill(0);
  let sum = 0;
  for (let i = 1; i <= N; i++) {
    if (integers[i] !== 0) {
      let j = i / integers[i];
      if (integers[j] === 0) {
        sum++;
      }
    }
    //console.log("i", i, "sum", sum);
    semiPrimes[i] = sum;
  }
  console.log("semiPrimes", semiPrimes);
}

solutionRefactoring(26);
