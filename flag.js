/**

N개의 정수로 구성된 비어 있지 않은 배열 A가 제공됩니다.

피크는 이웃보다 큰 배열 요소입니다.
보다 정확하게는 0 < P < N − 1이고 A[P − 1] < A[P] > A[P + 1]인 인덱스 P입니다.

예를 들어, 다음 배열 A:
    A[0] = 1
    A[1] = 5
    A[2] = 3
    A[3] = 4
    A[4] = 3
    A[5] = 4
    A[6] = 1
    A[7] = 2
    A[8] = 3
    A[9] = 4
    A[10] = 6
    A[11] = 2
정확히 4개의 피크(요소 1, 3, 5 및 10)가 있습니다.

아래 그림과 같이 상대 높이가 배열 A로 표시되는 산 범위로 여행을 떠납니다.
얼마나 많은 깃발을 가져갈 것인지 선택해야 합니다.
목표는 특정 규칙에 따라 봉우리에 최대 플래그 수를 설정하는 것입니다.



플래그는 피크에만 설정할 수 있습니다.
게다가 K 플래그를 사용하는 경우 두 플래그 사이의 거리는 K보다 크거나 같아야 합니다.
인덱스 P와 Q 사이의 거리는 절대값 |P − Q|입니다.

예를 들어 위의 배열 A로 표시된 산맥이 주어지고 N = 12인 경우 다음을 취합니다.

두 개의 플래그는 피크 1과 5에 설정할 수 있습니다.
세 개의 플래그, 피크 1, 5 및 10에 설정할 수 있습니다.
플래그가 4개인 경우 피크 1, 5 및 10에 3개의 플래그만 설정할 수 있습니다.
따라서 이 경우 최대 3개의 플래그를 설정할 수 있습니다.

함수 작성:

function solution(A);

N 정수의 비어 있지 않은 배열 A가 주어지면 배열의 피크에 설정할 수 있는 플래그의 최대 수를 반환합니다.

예를 들어, 다음 배열 A:
    A[0] = 1
    A[1] = 5
    A[2] = 3
    A[3] = 4
    A[4] = 3
    A[5] = 4
    A[6] = 1
    A[7] = 2
    A[8] = 3
    A[9] = 4
    A[10] = 6
    A[11] = 2
함수는 위에서 설명한 대로 3을 반환해야 합니다.

다음 가정에 대한 효율적인 알고리즘을 작성 하십시오.

N은 범위 [ 1..400,000 ] 내의 정수 이고 ;
배열 A의 각 요소는 [ 0 .. 1,000,000,000 ] 범위 내의 정수 입니다.
 */

/**
 * peak위치를 찾는다.
 * 깃발을 꽂는 갯수는 한 peak에 하나만 가능하고
 * 깃발의 갯수만큼 거리차이도 확보되야 한다.
 * 거리 차이는 peak의 index 차이로 결정한다.
 * @param {*} A
 */
function solution(A) {
  const peaks = [];
  // 배열을 순회하며 peak 추출
  A.forEach((value, idx) => {
    if (idx > 0 && idx + 1 < A.length) {
      if (A[idx - 1] < value && value > A[idx + 1]) {
        peaks.push(idx);
      }
    }
  });

  let maxCount = 0;
  let start = 0;
  let end = peaks.length;

  if (end < 2) {
    console.log("end", end);
    return end;
  }

  while (start <= end) {
    let flag = Math.floor((start + end) / 2);

    let count = 1;
    let prevIndex = peaks[0];
    for (let j = prevIndex + 1; j < peaks.length && count < flag; j++) {
      if (peaks[j] - prevIndex >= flag) {
        count++;
        prevIndex = peaks[j];
      }
    }
    if (count === flag) {
      start = flag + 1;
      maxCount = count;
    } else {
      end = flag - 1;
    }
  }
  console.log("maxCount", maxCount);
  return maxCount;
}

solution([1, 5, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2]);
solution([0, 1000000000, 0]);
//solution([1, 5, 3, 1, 3, 4, 1, 2, 3, 7, 3, 2]);

function divisor(n) {
  let i = 1;
  let count = 0;
  const values = [];
  while (i * i < n) {
    if (n % i === 0) {
      count += 2;
      values.push(i);
      values.push(n / i);
    }
    i++;
  }
  if (i * i === n) {
    count++;
    values.push(i);
  }
  console.log("factor", values, "n", n);
  return count;
}
