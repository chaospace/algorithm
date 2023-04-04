/**
 * heap에 조건
 * 힙은 특정한 규칙을 만족시키는 이진트리.
 * 최대 원소를 가능한 빠르게 찾을 수 있음.
 * - 부모 노드가 가진 원소는 항상 자식 노드가 가진 원소 이상.(힙의 대소관계 규칙)
 * - 힙의 대소관계 규칙은 이진트리와 달리 부모,자식의 관계에서만 적용.
 * - 마지막 레벨을 제외한 모든 레벨에 노드가 꽉 차 있어야 한다.
 * - 마지막 레벨에 노드가 있을 때는 항상 가장 왼쪽부터 순서대로 채워져 있어야 한다.
 *
 * 배열을 이용해 구현할 때 규칙
 * A[i]에 대응되는 노드의 좌측 자손은 ( A[2*i+1] )에 대응.
 * A[i]에 대응되는 노드의 우측 자손은 ( A[2*i+2] )에 대응.
 * A[i]에 대응되는 노드의 부모는( A[(i-1)/2](나머지는 내림) )에 대응.
 *
 *
 * 힙은 자원 조작시 규칙보다 모양을 우선하는게 접근이 쉬움.
 **/
class Heap {
  constructor() {
    this.stack = [];
  }

  get length() {
    return this.stack.length;
  }

  swap(currentIdx, changeIdx) {
    [this.stack[currentIdx], this.stack[changeIdx]] = [
      this.stack[changeIdx],
      this.stack[currentIdx]
    ];
  }

  get top() {
    return this.length > 0 ? this.stack[0] : null;
  }

  /**
   * heap에 새로운 값 추가
   * @param {*} v
   */
  push(v) {
    console.error("push-메서드 override필요");
  }

  /**
   * heap에서 원소를 제거한다는 것은
   * 최소값을 루트로 이동 시킨 후 다시 대소관계를 비교하며 마지막 레벨까지 이동하는 것.
   */
  pop() {
    console.error("pop-메서드 override필요");
  }

  toString() {
    return this.stack;
  }
}

class MinHeap extends Heap {
  /**
   * heap에 새로운 값 추가
   * @param {*} v
   */
  push(v) {
    //항상 마지막에 일단 추가
    this.stack.push(v);
    let idx = this.length - 1;
    let pIdx = Math.floor((idx - 1) / 2);
    //루트가 아니고 추가노드에 값이 부모보다 클 경우 반복
    // idx-1과 비교하니 0보다 커야 함.
    while (idx > 0 && this.stack[pIdx] > this.stack[idx]) {
      this.swap(idx, pIdx);
      // 인덱스 값을 부모로 변경
      idx = pIdx;
      pIdx = Math.floor((idx - 1) / 2);
    }
  }

  /**
   * heap에서 원소를 제거한다는 것은
   * 최소값을 루트로 이동 시킨 후 다시 대소관계를 비교하며 마지막 레벨까지 이동하는 것.
   */
  pop() {
    // 마지막 값 추출
    let last = this.stack[0];
    // 루트에 마지막 값 설정.
    this.stack[0] = this.stack[this.stack.length - 1];
    this.stack.pop();

    let idx = 0;
    while (true) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      // 좌측 리프 인덱스가 힙의 마지막이면 종료
      if (left >= this.length) {
        break;
      }
      // next 인덱스 참조
      let next = idx;
      // 좌측 리프값보다 클 경우 swap
      if (this.stack[next] > this.stack[left]) {
        next = left;
      }
      // 우측 리프값보다 클 경우 swap
      if (right < this.length && this.stack[next] > this.stack[right]) {
        next = right;
      }
      // 변화가 없다면 중단
      if (next === idx) break;
      this.swap(idx, next);
      idx = next;
    }
    return last;
  }
}

class MaxHeap extends Heap {
  /**
   * heap에 새로운 값 추가
   * @param {*} v
   */
  push(v) {
    //항상 마지막에 일단 추가
    this.stack.push(v);
    let idx = this.length - 1;
    // 루트가 아니고 추가노드에 값이 부모보다 클 경우 반복
    // idx-1과 비교하니 0보다 커야 함.
    while (idx > 0 && this.stack[Math.floor((idx - 1) / 2)] < this.stack[idx]) {
      this.swap(idx, Math.floor((idx - 1) / 2));
      // 인덱스 값을 부모로 변경
      idx = Math.floor((idx - 1) / 2);
    }
  }

  /**
   * heap에서 원소를 제거한다는 것은
   * 마지막요소를 루트로 이동 시킨 후 다시 대소관계를 마지막 레벨까지 비교
   */
  pop() {
    // 마지막 값 추출

    let last = this.stack[0];
    // 루트에 마지막 값 설정.
    this.stack[0] = this.stack[this.stack.length - 1];
    this.stack.pop();

    let idx = 0;
    while (true) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      if (left >= this.length) {
        break;
      }
      // heap규칙에 맞는 이동처리
      let next = idx;
      // 현재값보다 좌측 리프값이 클 경우
      if (this.stack[next] < this.stack[left]) {
        next = left;
      }
      if (right < this.length && this.stack[next] < this.stack[right]) {
        next = right;
      }
      // 변화가 없다면 중단
      if (next === idx) break;
      this.swap(idx, next);
      idx = next;
    }
    return last;
  }
}

module.exports = { MinHeap, MaxHeap };
