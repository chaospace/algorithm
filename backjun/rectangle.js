/**
 * 히스토그램(1725번)
 * 히스토그램은 직사각형 여러 개가 아래쪽으로 정렬되어 있는 도형이다.
 * 각 직사각형은 같은 너비를 가지고 있지만, 높이는 서로 다를 수도 있다.
 * 예를 들어, 왼쪽 그림은 높이가 2, 1, 4, 5, 1, 3, 3이고 너비가 1인 직사각형으로 이루어진 히스토그램이다.
 *
 * 히스토그램에서 가장 넓이가 큰 직사각형을 구하는 프로그램을 작성하시오.
 * 분할 정복이 필요한 건가?
 * 그냥 중앙에서부터 좌우로 증가하며 처리하면 될거 같은데...
 */

function solution(widths) {
  //배열 중간에서 주변으로 커져가는게 아님.
  //배열 전체에 걸쳐서 가장 넓은 범위를 가지는 것을 찾는게 핵심..
  //즉 좌우는 불규칙적으로 증가할 수 있음.
  //시작높이보다 크거나 같으면 그 방향으로 계속증가..
  //또는 영역포함 size가 증가하는 방향으로 증가..
  //작은 경우는 일단 나중에 증가해도 무방..

  //while문 조건에 따라 초기 end-1을 호출
  const loop = (start, end) => {
    //너비 1인 경우를 체크
    if (start === end) {
      return widths[start];
    }
    //
    let mid = (start + end) >> 1;
    // 분할정복을 통해 가장 큰 너비값 추출
    area = Math.max(loop(start, mid), loop(mid + 1, end));
    let l = mid;
    let r = mid + 1;
    let h = Math.min(widths[l], widths[r]);
    //너비가 2인 경우 가장 넓은 값 추출
    area = Math.max(area, h * (r - l + 1));
    while (start < l || end > r) {
      // l이 시작보다 크고 r이 종료보다 클 때까지 반복
      // l이 시작점에 도착하거나 r이 종료점보다 작고 좌측보다 높이가 더 높으면 r증가
      if (r < end && (l === start || widths[l - 1] < widths[r + 1])) {
        h = Math.min(h, widths[++r]);
      } else {
        //이후 좌즉으로 진행
        h = Math.min(h, widths[--l]); //선행 증감처리
      }

      area = Math.max(area, h * (r - l + 1));
    }
    return area;
  };

  //시작 지점을 여러 곳으로 가져가기 위한 전략임..
  let a = loop(0, widths.length - 1);
  return a;
}

/**
 * 포인터를 이용해 중간에서 부터 처리하면
 * 중앙값에서 증가하는 최대너비는 찾을 수 있지만
 * 특정 구간에만 존재하는 최대너비는 찾을 수 없음
 * 그래서 분할정복이 필요함.
 * @param {*} info
 * @returns
 */
function solutionPointer(info) {
  let mid = info.length >> 1;

  let h = info[mid];
  let max = info.length - 1;
  let area = h;
  let l = mid;
  let r = mid;
  //
  while (l > 0 || r < max) {
    if (r < max && (l === 0 || info[l - 1] < info[r + 1])) {
      h = Math.min(h, info[++r]);
    } else {
      h = Math.min(h, info[--l]);
    }
    //개별 높이 처리
    area = Math.max(area, Math.max(info[r], info[l]));
    //구간 높이 처리
    area = Math.max(area, h * (r - l + 1));
  }
  return area;
}

[
  [7, 2, 1, 4, 5, 1, 3, 3],
  [4, 1000, 1000, 1000, 1000],
  [1, 6, 2, 2, 2, 2, 10],
  [1, 6, 2, 2, 2, 10, 10],
].forEach((info) => {
  console.log(solution(info));
  console.log(solutionPointer(info));
});
