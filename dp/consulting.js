/**
 * 상담예약
 * 채용 설명회에는 멘토 n명이 있으며, 1~k번으로 분류되는 상담 유형이 있습니다.
 * k개의 상담 유형 중 하나만 담당할 수 있습니다
 * 멘토는 자신이 담당하는 유형의 상담만 가능하며,
 * 다른 유형의 상담은 불가능합니다.
 * 멘토는 동시에 참가자 한 명과만 상담 가능하며, 상담 시간은 정확히 참가자가 요청한 시간만큼 걸립니다.
 *
 * -상담규칙
 *  - 참가자가 상담 요청 시, 상담 유형을 담당하는 상담 중이 아닌 멘토와 상담시작.
 *  - 요청이 들어온 유형의 모든 멘토가 상담중이면 대기. 참가자의 대기시간은 상담을 요청했을 때부터 멘토와 상담을 시작할 때 까지의 시간.
 *  - 모든 멘토는 상담이 끝나는 즉시 기다리는 참가자와 상담을 시작.이때 순서는 먼저 상담을 요청한 순서대로 시작.
 *
 * -인풋
 *  k: 상담 유형의 수를 나타내는 정수
 *  n: 멘토의 수
 *  reqs: 상당 요청을 담은 2차원 정수 배열
 *
 * - 요구사항
 * 참가자의 상담요청 정보가 주어질 때, 참가자의 상담 시작까지의 대기 시간의 합이 최소가 되는 함수 작성.
 * 각 유형별 멘토 인원이 적어도 한 명이상 이어야 함. // 유형별 신청자가 0명일 경우는 예외?라는 말인가.
 *
 * 제한사항
 *  - 1<=k<=5
 *  - k<=n<=20
 *  - 3<=reqs<=300
 *      - req의 원소는 [a, b, c] 형태의 길이가 3인 정수 배열이며, c 유형의 상담을 원하는 참가자가 a분에 b분 동안의 상담을 요청했음을 의미.
 *      - 1<=a<=1000
 *      - 1<=b<=100
 *      - 1<=c<=k
 *  - reqs는 a를 기준으로 오름차순으로 정렬
 *  - reqs에서 a는 중복되지 않음(요청시간 중복없음)
 *
 *
 * ex)
 * 참가자 번호 시간  상담시간  상담유형
 * 1번 참가자 10분   60분     1번
 * 2번 참가자 15분   100분    3번
 * 3번 참가자 20분   30분     1번
 * 4번 참가자 30분   50분     3번
 * 5번 참가자 50분   40분     1번
 * 6번 참가자 60분   30분     2번
 * 7번 참가자 65분   30분     1번
 * 8번 참가자 70분   100분    2번
 *
 * 1번 유형 2번 유형 3번 유형
 * 2명      1명     2명
 */

//힙을 이용한 처리가 필요하다. 이유는 멘토가 증가할 때 마다 대기 여부를 배열로 판단하기는 모든 원소를 순회해야 되기 때문.
class Heap {
  constructor() {
    this._heap = [null];
  }
  swap(from, to) {
    [this._heap[from], this._heap[to]] = [this._heap[to], this._heap[from]];
  }
  //새로운 값 추가, 가장 마지막에 추가 후 부모노드가 추가 값보다 작으면 반복하며 노드를 swap
  push(value) {
    this._heap[this._heap.length] = value;
    let childID = this.size();
    let rootID = (childID / 2) >> 0;
    while (rootID >= 1 && this._heap[rootID] > this._heap[childID]) {
      this.swap(rootID, childID);
      childID = rootID;
      rootID = (childID / 2) >> 0;
    }
    return this.childID;
  }

  pop() {
    //루트 요소 참조.
    const value = this._heap[1];
    if (this.size() <= 1) this._heap = [null];
    else this._heap[1] = this._heap.pop();
    // [null, 1, 4, 8]
    let rootID = 1;
    let leftID = rootID * 2;
    let rightID = rootID * 2 + 1;
    //left노드가 존재하지 않으면 swap은 필요없음.
    if (!this._heap[leftID]) {
      return value;
    }
    //우측 노드가 없고 좌측노드보다 root노드가 더 크면 swap후 종료
    if (!this._heap[rightID] && this._heap[rootID] > this._heap[leftID]) {
      this.swap(rootID, leftID);
      return value;
    }

    //루트노드와 비교하면 swap처리..
    //배열에 숫자 값이라 boolean을 리턴해 가능 인덱스 유효성을 체크하지 않아도 동작.
    while (
      this._heap[rootID] > this._heap[leftID] ||
      this._heap[rootID] > this._heap[rightID]
    ) {
      const minID = this._heap[leftID] > this._heap[rightID] ? rightID : leftID;
      this.swap(rootID, minID);
      rootID = minID;
      leftID = rootID * 2;
      rightID = rootID * 2 + 1;
    }

    return value;
  }

  size() {
    return this._heap.length - 1; // 시작값 null을 제외한 length를 반환
  }

  getMin() {
    return this.size() >= 1 ? this._heap[1] : null;
  }
}

/**
 * 중복조합 함수.
 * 1,1,1
 * k~n를 이용해 만들 수 있는 조합.
 
//중복조합 처리
const combination = (array, start, end, list) => {
  if (end <= 0) {
    list.push([...array]);
    return;
  }
  for (let i = 1; i <= end; i++) {
    for (let j = start; j < array.length; j++) {
      array[j] += i;
      combination(array, j + 1, end - i, list);
      array[j] -= i;
    }
  }
}

class MaxHeap extends Heap {
  constructor() {
    super();
  }

  getMax() {
    return this.size() >= 1 ? this._heap[1] : null;
  }

  push(value) {
    this._heap[this._heap.length] = value;
    let childID = this.size();
    let rootID = (childID / 2) >> 0;
    while (rootID >= 1 && this._heap[childID] > this._heap[rootID]) {
      this.swap(rootID, childID);
      childID = rootID;
      rootID = (childID / 2) >> 0;
    }
    return childID;
  }

  pop() {
    const value = this._heap[1];
    if (this.size() <= 1) this._heap = [null];
    else this._heap[1] = this._heap.pop();

    let rootID = 1;
    let leftID = rootID * 2;
    let rightID = rootID * 2 + 1;

    if (!this._heap[leftID]) {
      return value;
    } else if (
      !this._heap[rightID] &&
      this._heap[leftID] > this._heap[rootID]
    ) {
      this.swap(leftID, rootID);
      return value;
    }

    while (
      this._heap[rootID] < this._heap[leftID] ||
      this._heap[rootID] < this._heap[rightID]
    ) {
      const maxID = this._heap[leftID] < this._heap[rightID] ? rightID : leftID;
      this.swap(rootID, maxID);
      rootID = maxID;
      leftID = rootID * 2;
      rightID = rootID * 2 + 1;
    }
  }

  toString() {
    return this._heap.toString();
  }
}

const mHeap = new MaxHeap();
mHeap.push(20);
mHeap.push(1);
mHeap.push(30);
mHeap.push(10);

console.log("!!", mHeap.pop(), mHeap.toString());

/**
 * 큐에 길이를 조절하며 테스트 해보고 최소값을 가져오면 되는데 이게 맞는 접근인 건지가 의문.
 * @param {*} k
 * @param {*} n
 * @param {*} reqs
 * @returns
 */
function solution(k, n, reqs) {
  const mentoPool = Array.from({ length: k + 1 }, () => 1);
  const waits = Array.from({ length: k + 1 }, () => [0]);
  const rest = n - k;
  //큐는 end값으로만 저장.
  const calculateReq = (pools) => {
    const mentos = Array.from(pools, (v) => new Array(v));
    for (let i = 0; i < reqs.length; i++) {
      const [start, duration, type] = reqs[i];
      const mento = mentos[type];
      let qIndex;
      let lastEnd = Number.MAX_SAFE_INTEGER;
      for (let q = 0; q < mento.length; q++) {
        if (mento[q]) {
          if (mento[q].end <= start) {
            qIndex = q;
            break;
          }

          lastEnd = Math.min(lastEnd, mento[q].end);
          if (lastEnd === mento[q].end) {
            qIndex = q;
          }
        } else {
          qIndex = q;
          lastEnd = 0;
          break;
        }
      }
      if (mento[qIndex]) {
        let w = mento[qIndex].end - start;
        if (w < 0) w = 0;
        mento[qIndex] = {
          start: start + w,
          end: start + duration + w,
          wait: w,
        };
      } else {
        mento[qIndex] = {
          start,
          end: start + duration,
          wait: 0,
        };
      }
      waits[type] = Math.max(waits[type], mento[qIndex].wait);
    }
    return mentos;
  };

  mentoPool[1] = 2;
  mentoPool[3] = 2;
  return calculateReq(mentoPool);

  // 하나의 스택으로 처리 하는 코드
  /* for (let i = 0; i < reqs.length; i++) {
    const [start, duration, type] = reqs[i];
    if (mentos[type].length) {
      const prev = mentos[type][mentos[type].length - 1];
      const w = prev.end - start;
      //누적 대기시간 추출..
      mentos[type].push({
        start: start + w,
        end: start + duration + w,
        wait: w,
      });
    } else {
      mentos[type].push({
        start,
        end: start + duration,
        wait: 0,
      });
    }
  } */
  return 0; //mentos.forEach((v) => console.log(v));
}

// console.log("upper", uppperBound([1, 2, 3], 4));

/**
 * 대기와 여유가 있다는 것을 처리하는 가장 손쉬운 방법은?
 * dp처럼 이전 값을 사용할 수 있을까?
 * @param {*} k
 * @param {*} n
 * @param {*} reqs
 * @returns
 */
function solutionDP(k, n, reqs) {
  const mentos = Array.from({ length: k + 1 }, () => 1);
  let rest = n - k;
  //타입별 시간을 체크.
  const tracking = (pools) => {
    //모든 것을 배열로 구분할까?
    const stack = Array.from(pools, (v) =>
      Array.from({ length: v }, () => [[0, 0, 0]])
    );

    const waits = Array.from(pools, (_, v) => [v, 0]);
    for (let i = 0; i < reqs.length; i++) {
      const [start, duration, type] = reqs[i];
      const typeStack = stack[type];
      /**
       * 큐에서 할 일은 현재 요청을 가장 빠르게 처리할 수 있는 멘토를 찾는 것.
       * 큐 동작원리
       * 현재 큐에 처리중인 상담이 있는지 확인 없으면 바로 추가
       * 모든 멘토가 상담중이면 가장 대기 시간이 짧은 멘토를 추천.
       */
      let matchingQueue = 0;
      let recentEndTime = Number.MAX_SAFE_INTEGER;
      for (let q = 0; q < typeStack.length; q++) {
        const queue = typeStack[q];
        const [_, cEnd, __] = queue[queue.length - 1];
        if (cEnd <= start) {
          matchingQueue = q;
          recentEndTime = cEnd;
          break;
        }
        recentEndTime = Math.min(cEnd, recentEndTime);
        if (recentEndTime === cEnd) {
          matchingQueue = q;
        }
      }
      let w = recentEndTime - start;
      if (w <= 0) w = 0;
      waits[type][1] = Math.max(waits[type][1], w);
      typeStack[matchingQueue].push([start + w, start + duration + w, w]);
    }
    return waits;
  };

  //경우에 수로 모둔 큐를 처리하는 로직은 어떻게 하는게 좋을까?..

  let w;
  do {
    w = tracking(mentos);
    w.sort((a, b) => b[1] - a[1]);
    while (w.length && rest > 0) {
      const [t, c] = w.shift();
      if (c > 0) {
        mentos[t] += 1;
        rest -= 1;
      }
    }
  } while (rest > 0);
  // console.log(mentos);
  return tracking(mentos);
}

//중복조합 처리
const combination = (array, start, end, list) => {
  if (end <= 0) {
    list.push([...array]);
    return;
  }
  for (let i = 1; i <= end; i++) {
    for (let j = start; j < array.length; j++) {
      array[j] += i;
      combination(array, j + 1, end - i, list);
      array[j] -= i;
    }
  }
};

/**
 * 이 방식을 history까지 보고 싶다면...
 * @param {*} k
 * @param {*} n
 * @param {*} reqs
 * @returns
 */
function solutionDP(k, n, reqs) {
  const dp = Array.from({ length: k + 1 }, () =>
    Array.from({ length: n - k + 1 }).fill(0)
  );
  for (let m = 1; m <= k; m++) {
    const heaps = Array.from({ length: k + 1 }, () => new Heap());
    for (let i = 0; i < reqs.length; i++) {
      const [start, duration, type] = reqs[i];
      const h = heaps[type];
      let w = 0;
      if (m - h.size() > 0) {
        h.push(start + duration);
      } else {
        // MinHeap이라 배열에 값 중 가장 낮은 값이 리턴됨.
        // 즉 가장 빠르게 끝나는 상담값.
        const lastEnd = h.pop();
        w = lastEnd - start;
        if (w > 0) {
          h.push(start + duration + w);
        } else {
          h.push(start + duration);
        }
      }
      dp[type][m - 1] = Math.max(dp[type][m - 1], w);
    }
  }
  // dp배열에서 추가멘토를 사용할 타입을 정하는 방법
  // 멘토 인원별 대기 시간이 높은 곳부터 단계별로 추가한다.
  // 조합 리스트를 구해서 dp중 가장 낮은 값을 찾는게 수월해 보임.
  let base = Array.from({ length: k }).fill(1);
  let pool = [base];
  combination(base, 0, n - k, pool);
  let wait = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < pool.length; i++) {
    const candiate = pool[i];
    let sum = 0;
    candiate.forEach((v, i) => {
      sum += dp[i + 1][v - 1];
    });
    wait = Math.min(wait, sum);
  }
  return wait;
}

[
  {
    k: 3,
    n: 4,
    reqs: [
      [10, 60, 1],
      [15, 100, 3],
      [20, 30, 1],
      [30, 50, 3],
      [50, 40, 1],
      [60, 30, 2],
      [65, 30, 1],
      [70, 100, 2],
    ],
  },
].forEach(({ k, n, reqs }) => {
  // console.log(solution(k, n, reqs));
  // console.log(solutionAd(k, n, reqs));
  console.log(solutionDP(k, n, reqs));
});

/**
 * 멘토관리 배열 필요동작
 *  - 배열에 여유가 있으면 상담종료시간을 추가
 *  - 여유가 없으면 가장 빨리 끝나는 시간을 반납.
 *  - 히스토리를 관리한다면 전체에서 조사하는게 아니라 마지막 상담에서 이를 체크해야 됨.
 *  - 이 배열은 스택처럼 완료된 상담은 조회에서 제외되야 한다.
 *  -
 */
