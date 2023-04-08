/**
 * 주어진 배열 A를
 * 인덱스 순서 B의 순서대로 정렬하기
 *
 * input
 * A = [10, 11, 12];
 * Index = [1, 0, 2]
 *
 * output
 * A = [11, 10, 12];
 * Index = [0, 1, 2];
 */

/**
 * index 배열 순서에 맞게 모든 파라미터를 재정렬 후 반환
 * 새로운 배열에 그대로 옮기면 그냥 끝인데..
 * 기존 배열을 유지하며 temp를 이용해 정렬하긴 원하는 건가?
 * @param {*} array
 * @param {*} index
 */
function solution(array, index) {
  //값 swap처리
  let cloneArray = [];
  // index정보를 이용해 array 값 클론 및 정렬
  index.forEach((v, idx) => {
    cloneArray[idx] = array[v];
  });
  // 정렬된 값을 array에 다시 설정
  cloneArray.forEach((value, idx) => {
    array[idx] = value;
    index[idx] = idx;
  });
  console.log("answer", array, "index", index);
}

//console.log("array", [...Array(10)]);

solution([10, 11, 12], [1, 0, 2]);
