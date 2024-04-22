const { log } = require("../libs/util");
/**
 * 상담예약
 * 채용 설명회에는 멘토 n명이 있으며, 1~k번으로 분류되는 상담 유형이 있습니다.
 * k개의 상담 유형 중 하나만 담당할 수 있습니다
 * 멘토는 자신이 담당하는 유형의 상담만 가능하며, 다른 유형의 상담은 불가능합니다.
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
 * 대기시간의 합을 최소로 하려면..종료시간과 예약시간 사이 중복이 없어야 한다.
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
 *  겹치는 것을 먼저 찾는게 핵심.
 * ex)
 * 참가자 번호 시간  상담시간  상담유형
 * 1번 참가자 10분   60분     1번 70분                    딜레이 0분//
 * 2번 참가자 15분   100분    3번 115분         종료 115분  딜레이 0분//
 * 3번 참가자 20분   30분     1번 50분  시작 70분 종료 100분  딜레이 0분
 * 4번 참가자 30분   50분     3번 80분  시작 115분 종료165분  딜레이 85분
 * 5번 참가자 50분   40분     1번 90분  시작100분 종료 140분  딜레이 0분
 * 6번 참가자 60분   30분     2번 90분          종료  90분  딜레이  0분//
 * 7번 참가자 65분   30분     1번 95분  시작140분 종료 205분  딜레이  5분
 * 8번 참가자 70분   100분    2번 170분 시작 90분 종료 190분  딜레이 20분  100분
 *
 *
 *
 * 1번 유형 2번 유형 3번 유형
 * 2명      1명     2명
 */

// queue를 관리할 수 있어야 한다.
// append시 큐를 초과하는 작업은 추가할 수 없다.
// 이전 큐 완료여부를 체크할 수 있어야 한다.

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
 * 예약은 시간순서로 오니 그냥 차례대로 멘토들을 붙여 줘 보자.
 * 조건에 멘토는 상담가능한 유형만 상담 가능!
 * 멘토유형을 결정해야 되는 문제로 멘토 조합을 구성해 모두 판단할 필요가 있음.
 * n-k>0 조합가능한 멘토가 더 맣은 경우. ㅇㅇ
 * n: 4,
 * //멘토구성: 1번2, 2번 1명, 3번1, 
  reqs: [
    70, [10, 60, 1], end  0  1번멘토-타입1
    115[15, 100, 3],end   0 2번멘토-타입3
    50 [20, 30, 1], end   0  3번멘토-타입1 // 여기서 분기를 나눠서 진행 하는 방법은?
    115[30, 50, 3], end   85  2번멘토-타입3
    90 [50, 40, 1], end   0  3번멘토-타입1  
    90 [60, 30, 2], end   0  4번멘토-타입2           
    140 [65, 30, 1], end  5  1번멘토-타입1
    90 [70, 100, 2],end 20  4번멘토-타입2
  ]
  * 총 대기시간 110분

  [10, 60, 1], 다음상담시간  70  1번멘토-타입1
  [15, 100, 3],다음상담시작  115 2번멘토-타입3
  [20, 30, 1], 대기시간50분 100 1번멘토-타입1
  [30, 50, 3], 다음상담시작  80  3번멘토-타입3
  [50, 40, 1], 대기시간50분 140 1번멘토-타입1  
  [60, 30, 2], 다음상담시작  90  4번멘토-타입2           
  [65, 30, 1], 5분대기    100  1번멘토-타입1
  [70, 100, 2],20분대기   190  4번멘토-타입2
 * @param {*} param:object
 *        k   :상담유형 수,
 *        n   :멘토 수,
 *        reqs:상담예약정보 =[상담예약시간, 상담시간, 상담유형]
 * @returns
 */

/**
 * n을 구성할 수 있는 경우의 수 구하기.
 * 조합을 걱정해 보자.
 * 각 자리에서 중복이 발생하면 안된다.
 * 동일 수를 더할 수 있다.
 * 총 합은 n-k를 넘으면 안된다.
 * @param {*} n
 * @returns
 */
function getDivider({ k, n }) {
  const list = new Map();
  const base = Array.from({ length: k }).fill(1);
  const rest = n - k;
  const combination = (s, e, current) => {
    if (e <= s) {
      const path = current.join("");
      if (!list.has(path)) {
        list.set(path, [...current]);
      }
      return;
    }
    //여유가 있는 만큼 증가하며 반복.
    for (let i = 1; i <= e && s + i <= e; i++) {
      // 멘토 수 만큼 진행.
      for (let j = 0; j < k; j++) {
        current[j] += i;
        combination(s + i, e, current);
        current[j] -= i;
      }
    }
  };
  combination(0, rest, base);
  return { variables: list.values() };
}

// 새로운 멘토 추가
const cloneStack = (stack) => {
  return [...stack];
};

//큐를 추가하고 종료 시간기준으로 오름차순으로 정렬
const appendQueue = (stack, req) => {
  stack.push(req);
  stack.sort((a, b) => a.end - b.end);
};

const reqConsulting = (mento, req, rest) => {
  //
};

const createQueue = (time, duration) => {
  return {
    time,
    duration,
    end: time + duration,
    delay: 0,
    totalDelay: 0,
  };
};

/**
 * 모든 경우에 수를 따지며 값을 알아 갈 수 있는 방법을 고민하고 싶다.
 * 분기는 대기면 각각 진행 할 수 있으면 좋겠다.
 * @param {*} param0
 * @returns
 */
function solution({ k, n, reqs }) {
  /**
   * - 타입별 멘토는 반드시 존재해야 한다.
   * - 기본 멘토가 생성 후에는 배낭문제와 같은 접근으로 최소값을 찾아갈 수 있나?
   * - 일단 각 타입별 누적 대기 값을 구한다.
   * - 남은 멘토가 있다면 누적 대기가 가장 큰 type을 다시 구한다?
   * - dp를 이용해서 타입별 모든 경우의 수를 구한다면 값을 어떻게 갱신 시킬까?
   *   비교 우위가 쉽지 않다.
   * - 미리 멘토를 결정 후 최소값을 찾아 진행해 가면 쉽게 접근이 가능.
   */
  let temp = n - k;
  //유형별 멘토 초기화
  const mentos = Array.from({ length: n }).map(() => []);
  // shift를 이용해 상담내용을 제거하면 대기멘토처리가 쉽지 않다.
  // 예약순서대로 타입에 따라 멘토를 지정한다면?
  reqs.forEach(([time, duration, type]) => {
    //타입별 기본 정보 구성
    const queue = mentos[type - 1];
    const hasQueue = queue.length;

    if (hasQueue) {
      // 현재 큐에 완료 여부를 체크
      const current = queue.shift(); // 마지막 상담정보 참조
      if (current.end <= time) {
        //시작시간이 이전 상담 종료시간보다 크거나 같으면 상담내용 대체
        appendQueue(queue, {
          time,
          duration,
          end: time + duration,
          delay: current.delay,
          totalDelay: current.totalDelay,
        });
      } else {
        // 대기 멘토가 있으면 큐에 대기를 추가한다.
        if (temp) {
          temp -= 1;
          appendQueue(queue, current);
          appendQueue(queue, {
            time,
            duration,
            end: time + duration,
            delay: current.delay,
            totalDelay: current.totalDelay,
          });
        } else {
          // 대기 멘토가 없으면 이전 상담 종료시간을 기준으로 대기시간 정보 갱신처리.
          const delay = current.end - time;
          appendQueue(queue, {
            time,
            duration,
            end: current.end + duration,
            delay,
            totalDelay: current.totalDelay + delay,
          });
        }
      }
    } else {
      //시작이면 기본 상담시작
      queue.push(createQueue(time, duration));
    }

    /*
    //이전 정보 참조
    const prev = queue[queue.length - 1] || null
    const end = time + duration;
    if (prev) {
      queue.push({
        time,
        duration,
        end: prev.end + duration,
        delay: prev.delay + (prev.end - time),
      });
    } else {
      queue.push({
        time,
        duration,
        end,
        delay: 0,
      });
    }
    */
  });

  //직전타입이랑 다르면
  //누적 딜레이가 가장 큰 유형에 멘토를 충원한다.?
  //해당 타입만 다시 갱신처리가 필요하다.
  //다시 돌아가는 지점은 어디로 할까 delay가 최초 발생하는 곳 타입에.
  return mentos.filter((v) => v.length);
}
//heap을 사용해 대기를 처리한다?

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
].forEach((args) => {
  log(solution(args));
  // log(getDivider(args));
});
