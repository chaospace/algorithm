/**
 * 병합정렬
 * 원본배열을 유지하며 스왑을 이용한 정렬을 해보자.
 */

// function merge(array, p, q, r) {
//   var a = [],
//     b = [],
//     c = p,
//     d,
//     e;
//   // 시작부터 중간가지 배열을 옮김.
//   for (d = 0; c <= q; d++, c++) {
//     a[d] = array[c];
//   }
//   // 중간부터 끝까지 배열 옮김.
//   for (e = 0; c <= r; e++, c++) {
//     b[e] = array[c];
//   }
//   console.log("p", p, "q", q, "r", r);
//   console.log(a, "b", b);
//   c = p; // 시작 인덱스 초기화
//   // 옮긴 배열을 비교하며 정렬
//   for (e = d = 0; d < a.length && e < b.length; ) {
//     if (a[d] < b[e]) {
//       array[c] = a[d];
//       d++;
//     } else {
//       array[c] = b[e];
//       e++;
//     }
//     c++;
//   }
//   // 나머지 배열 정렬
//   // 앞에서 비교하고 남은 것은 가장 큰 값이니 비교없이 적용
//   for (; d < a.length; ) {
//     array[c] = a[d];
//     d++;
//     c++;
//   }
//   for (; e < b.length; ) {
//     array[c] = b[e];
//     e++;
//     c++;
//   }
// }

function mergeSort(array, start, middle, end) {
  let i, cindex;
  let max;
  let left = [];
  let right = [];

  // 좌측클론
  for (i = 0, cindex = start, max = middle; cindex <= max; i++, cindex++) {
    left[i] = array[cindex];
  }

  //우측클론
  for (i = 0, max = end; cindex <= max; i++, cindex++) {
    right[i] = array[cindex];
  }

  // 클론한 배열을 비교하며 정렬처리
  let lIndex, rIndex;
  i = start;
  for (
    lIndex = 0, rIndex = 0;
    lIndex < left.length && rIndex < right.length;

  ) {
    if (left[lIndex] < right[rIndex]) {
      array[i++] = left[lIndex++];
    } else {
      array[i++] = right[rIndex++];
    }
  }
  // 나머지 요소 원본배열 적용.
  for (; lIndex < left.length; ) {
    array[i++] = left[lIndex++];
  }
  for (; rIndex < right.length; ) {
    array[i++] = right[rIndex++];
  }
}

function recursive(array, p, r) {
  if (p < r) {
    let m = Math.floor((p + r) / 2);
    recursive(array, p, m);
    recursive(array, m + 1, r);
    mergeSort(array, p, m, r);
  }
}
//, 9, 11, 6, 2
//const arr = [14, 7, 3, 12, -1, 0, 3, 9, -2];
const arr = [5, 1, 4, 3, 2];
//console.log("aa", recursive(arr, 0, arr.length - 1));
//console.log("array", arr);

function mergeSort2(arr, start, end) {
  if (start === end) return 0;
  const mid = Math.floor((start + end) / 2);
  // 정렬하며 이동한 횟수 카운트
  let ret = mergeSort2(arr, start, mid) + mergeSort2(arr, mid + 1, end);

  let temp = [];
  let leftIndex = start,
    rightIndex = mid + 1;

  // // 좌측배열 구성
  // let tempL = [];
  // for (; leftIndex <= mid; ) {
  //   tempL.push(arr[leftIndex++]);
  // }

  // //우측 배열 구성
  // let tempR = [];
  // for (; rightIndex <= end; ) {
  //   tempR.push(arr[rightIndex++]);
  // }

  // //분리된 배열 하나로 정렬하며 머지
  // for (
  //   leftIndex = 0, rightIndex = 0;
  //   leftIndex < tempL.length && rightIndex < tempR.length;

  // ) {
  //   //우측이 더 클 경우
  //   if (tempL[leftIndex] < tempR[rightIndex]) {
  //     temp.push(tempL[leftIndex++]);
  //   } else {
  //     ret += tempL.length - leftIndex;
  //     temp.push(tempR[rightIndex++]);
  //   }
  // }

  // // 나머지 temp에 추가
  // for (; leftIndex < tempL.length; ) {
  //   temp.push(tempL[leftIndex++]);
  // }
  // for (; rightIndex < tempR.length; ) {
  //   temp.push(tempR[rightIndex++]);
  // }

  /**
   * 좌우 배열을 나누고 머지하는 코드 개선
   * 하나의 반복에서 처리할 수 있을 듯.
   */

  while (leftIndex <= mid || rightIndex <= end) {
    // 우측값이 더 크거나 좌측값만 유효할 경우
    if (
      leftIndex <= mid &&
      (rightIndex > end || arr[leftIndex] < arr[rightIndex])
    ) {
      temp.push(arr[leftIndex++]);
    } else {
      ret += mid - leftIndex + 1;
      temp.push(arr[rightIndex++]);
    }
  }

  for (let i = 0; i < temp.length; i++) {
    arr[start + i] = temp[i];
  }
  return ret;
}

console.log("end", mergeSort2(arr, 0, arr.length - 1));
console.log("arr", arr);
