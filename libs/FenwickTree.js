/**
 * 인덱스 정보를 2진수로 표현시 최하위 비트를 가져오는 법
 * index & -index;
 * ex)
 * index = 110
 * ~index= 001
 * -index= ~index+1 = 001+1 = 010
 *
 * index & -index = 110 & 010 = 010
 *
 */
class FenwickTree {
  constructor(size) {
    this.tree = Array(size + 1).fill(0);
  }

  sum(index) {
    let answer = 0;
    while (index > 0) {
      answer += this.tree[index];
      //최하위 비트를 제거하며 값을 감소시킴
      index -= index & -index;
    }
    return answer;
  }

  add(index, value) {
    //마지막 이진값을 조작하며 tree에 길이보다 보다 작을 때까지 반복
    while (index < this.tree.length) {
      this.tree[index] += value;
      //최하위 비트를 더하며 값을 증가시킴
      index += index & -index;
    }
  }

  /**
   * 구간 합 결과를 리턴
   * @param {*} start : 시작 인덱스
   * @param {*} end   : 종료 인덱스
   * @returns 구간합 결과
   */
  rangeQuery(start, end) {
    return this.sum(end) - this.sum(start - 1);
  }

  /**
   * 구간 변경 값 업데이트 처리
   * @param {*} start 시작 인덱스
   * @param {*} end   종료 인덱스
   * @param {*} newValue 구간에 변경 값( 기존 값과 diff값 )
   */
  rangeUpdate(start, end, newValue) {
    this.add(start, newValue);
    this.add(end + 1, -newValue);
  }
}

module.exports = FenwickTree;
