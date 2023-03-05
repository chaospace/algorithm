/**
 * 퀵정렬
 *  - 기준 값(배열의 가장 우측)을 기준으로 좌우로 배열을 구분.
 *  - 좌우로 구분 후 기준에 사용한 값을 우측에 가장 앞으로 이동.
 *  - 기준에 사용된 값이 위치한 인덱스 반환
 *  - 반환값을 이용해 반복.
 */

function swap(array, first, second) {
  let temp = array[second];
  array[second] = array[first];
  array[first] = temp;
}

function quickSort(array, p, r) {
  let q = p;
  for (let j = p; j < r; j++) {
    // 기준값보다 작은 왼쪽으로 정렬
    if (array[r] >= array[j]) {
      swap(array, j, q);
      q++;
    }
  }

  swap(array, r, q);
  return q;
}

function quickSortBetter(array, p, r) {
  if (r - p < 1) return;

  let q = p;
  for (let j = p; j < r; j++) {
    if (array[r] >= array[j]) {
      swap(array, j, q);
      q++;
    }
  }
  swap(array, r, q);

  quickSortBetter(array, p, q - 1);
  quickSortBetter(array, q + 1, r);
}

function recursive(array, p, r) {
  if (r > p) {
    // 정렬을 한번 실행 후 재귀적인 호출을 한다.
    const q = quickSort(array, p, r);
    recursive(array, p, q - 1);
    recursive(array, q + 1, r);
  }
}

function quickSortPureFunc(array, p, r) {
  let temp = [...array];
  quickSortBetter(temp, p, r);
  return temp;
}

let arr = [1, 4, 10, -1, 5, 9, 7, 12];
const results = quickSortPureFunc(arr, 0, arr.length - 1);
console.log("array", arr);
console.log("result", results);
