/**
 * 도서관.
 * 세준이는 도서관에서 일한다.
 * 도서관의 개방시간이 끝나서 세준이는 사람들이 마구 놓은 책을 다시 가져다 놓아야 한다.
 * 세준이는 현재 0에 있고, 사람들이 마구 놓은 책도 전부 0에 있다.
 * 각 책들의 원래 위치가 주어질 때,
 * 책을 모두 제자리에 놔둘 때 드는 최소 걸음 수를 계산하는 프로그램을 작성하시오.
 * 세준이는 한 걸음에 좌표 1칸씩 가며,
 * 책의 원래 위치는 정수 좌표이다.
 * 책을 모두 제자리에 놔둔 후에는 다시 0으로 돌아올 필요는 없다.
 * 그리고 세준이는 한 번에 최대 M권의 책을 들 수 있다.
 *
 * 책을 제자리에 정리하는데 걸리는 최소 걸음 구하기.. ? dfs, bfs
 *
 * 입력
 * 첫째 줄에 책의 개수 N과, 세준이가 한 번에 들 수 있는 책의 개수 M이 주어진다.
 * 둘째 줄에는 책의 위치가 주어진다.
 * N과 M은 50보다 작거나 같은 자연수이다.
 * 책의 위치는 0이 아니며, 절댓값은 10,000보다 작거나 같은 정수이다.
 *
 * input
 * N:7(책에 수), M:2(소지수)
 * 책에 시작위치는 모두 0;
 * 마지막에 제자리에 오는 것은 필요없음( 가까운 곳부터 정리하는게 좋음 = 정렬 )
 * -37 2 -6 -39 -29 11 -28
 * -39, -37, -29, -28, -6, 2, 11,
 * 22걸음( 양수 2개를 제거)
 * 12걸음( -6 제거 )
 * 29*2=58걸음(-29까지 제거)
 * 39걸음 ( 모두 제거 )
 * 34+58=92+39=131걸음
 * output
 * 131
 */
/**
 * 접근
 *  - 오름차순 정렬 후 음수, 양수를 분리
 *  - 분리한 배열길이를 소지수를 이용해 나머지 연산을 적용하고 나머지값이 있다면 가장 가까운 거리를 이용해 나머지를 제거한다.
 *  - 마지막은 복귀가 필요없으니 가장 큰 수를 마지막에 처리하도록 한다.
 *  - 하나로 처리 할 수 있지만 음,양 둘로 나눠서 처리 후 합쳐도 가능.
 */

function solution({ m, books }) {
  books.sort((a, b) => Math.abs(a) - Math.abs(b));
  const minus = [];
  const plus = [];
  for (let i = 0; i < books.length; i++) {
    if (books[i] > 0) {
      plus.push(books[i]);
    } else {
      minus.push(Math.abs(books[i]));
    }
  }

  let pRest = plus.length > m ? plus.length % m : 0;
  let mRest = minus.length > m ? minus.length % m : 0;
  const plusWorker = Array.from({
    length: Math.ceil(plus.length / m),
  }).fill(plus.length > m ? m : plus.length);
  const minWorker = Array.from({
    length: Math.ceil(minus.length / m),
  }).fill(minus.length > m ? m : minus.length);
  if (pRest) {
    plusWorker[0] = pRest;
  }
  if (mRest) {
    minWorker[0] = mRest;
  }

  let lCount = 0;
  let rCount = 0;
  let mIdx = 0;
  let pIdx = 0;
  //마지막 돌아오는 값은 어떻게 판단할까?
  const minusMoreThen =
    Math.abs(minus[minus.length - 1]) > plus[plus.length - 1];
  while (plusWorker.length || minWorker.length) {
    if (plusWorker.length) {
      pIdx += plusWorker.shift();
      let pValue = plus[pIdx - 1];
      if (!(plusWorker.length === 0 && !minusMoreThen)) {
        pValue *= 2;
      }
      lCount += pValue;
    }

    if (minWorker.length) {
      mIdx += minWorker.shift();
      let mValue = minus[mIdx - 1];
      if (!(minWorker.length === 0 && minusMoreThen)) {
        mValue *= 2;
      }
      rCount += mValue;
    }
  }
  /*
  const worker =
    Math.abs(minus[0]) < plus[0]
      ? [...minWorker, ...plusWorker]
      : [...plusWorker, ...minWorker];
  const list =
    Math.abs(minus[0]) < plus[0] ? [...minus, ...plus] : [...plus, ...minus];
  let count = 0;
  let idx = 0;
  for (let i = 0; i < worker.length; i++) {
    idx += worker[i];
    const v = Math.abs(list[idx - 1]);
    if (i < worker.length - 1) {
      count += v * 2;
    } else {
      count += v;
    }
  }
  return { count, list, worker };*/

  return { lCount, rCount, sum: lCount + rCount };
}

[
  {
    m: 2,
    books: [-37, 2, -6, -39, -29, 11, -28],
  },
  {
    m: 3,
    books: [-18, -9, -4, 50, 22, -26, 40, -45],
  },
  {
    m: 2,
    books: [3, 4, 5, 6, 11, -1],
  },
].forEach((info) => {
  console.log(solution(info));
});
console.log(Math.ceil(4 / 6));
