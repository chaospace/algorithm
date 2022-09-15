/**
 * height = 길이가 n인 높이가 든 배열
 * n개의 세로 라인이 좌표 line[i,0], line[i, height[i]] 로 그려짐
 * 컨테이너가 가장 많은 물을 포함할 수 있는 라인 2개를 찾아서 반환
 *
 * input : height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
 * output: 49 ( 1, 8 ,  8, 7 )
 *
 * 요구사항
 *  - 좌표의 width, height 의 곲이 가장 높은 수 찾기
 */

// function solution(height) {
//   let points = [];
//   height.map((v, idx) => {
//     if (points.length) {
//       const last = points[points.length - 1];
//       if (last.y <= v) {
//         // 포인트 길이가 1보다 크면 비교해서 필요없는 포인트를 제거
//         if (points.length > 1) {
//           const a = points[0];
//           const b = points[1];
//           if (
//             (idx - a.x) * Math.min(a.y, v) <=
//             (idx - b.x) * Math.min(b.y, v)
//           ) {
//             points.shift();
//           } else {
//             points.pop();
//           }
//         }
//         points.push({ x: idx, y: v });
//       }
//     } else {
//       points.push({ x: idx, y: v });
//     }
//   });

//   return (points[1].x - points[0].x) * Math.min(points[0].y, points[1].y);
// }

function getReactArea(p1, p2) {
  const w = p2.x - p1.x;
  const h = Math.min(p2.y, p1.y);
  return w * h;
}

function calculate(points, p) {
  const len = points.length;
  if (len) {
    if (len > 1) {
    }
  }
  points.push(p);
}
/**
 * 사각형 left, right를 갱신하는 조건을 어떻게 하는게 좋을까?..
 * index는 무조건 증가하니 left는 일단 h가 큰 값을 설정하는게 맞는건가.
 *
 * points가 빈 배열이면
 *  - points배열에 포인트를 추가
 * points가 length가 2면 현재 포인트들과 비교해서 현재 포인트(current) 추가여부를 결정
 *  - current - points[0]   왼쪽 포인트를 축으로 할 경우 넓이
 *  - current - points[1]   우측 포인트를 축으로 할 경우 넓이
 *  - points[1] - points[0] 기존 값을 축으로 할 경우 넓이
 *  - 기존 축이 비교 값보다 클 경우 포인트 변환 필요 없음.
 *  - 왼쪽 포인트 축이 더 넓을 경우 points[1]을 제거 후 current 추가
 *  - 우측 포인트 축이 더 넓을 경우 pionts[0]을 제거 후 current 추가
 *
 *
 * 현재 포인트와 다음 포인트도 고려해야 한다.
 *
 * @param {*} height : ;
 * @returns
 */
function solution(height) {
  let leftId = 0;
  let rightId = max - 1;
  let sum = 0;
  // 시작값은 항상 좌우 끝값으로 설정
  // 좌우 높이를 비교하며 더 낮을 쪽의 인덱스를 변경하며 높이를 계산해 가장 높을 값을 기억.
  while (rightId - leftId >= 1) {
    const nextLId = leftId + 1;
    const nextRId = rightId - 1;
    const pl = { x: leftId, y: height[leftId] };
    const pr = { x: rightId, y: height[rightId] };
    const plNext = { x: nextLId, y: height[nextLId] };
    const prNext = { x: nextRId, y: height[nextRId] };

    const base = getReactArea(pl, pr); // 현 위치에 크기
    const nextR = getReactArea(pl, prNext); // 우측을 당길 경우 크기
    const nextL = getReactArea(plNext, pr); // 좌측을 당길 경우 크기

    sum = Math.max(sum, Math.max(base, Math.max(nextR, nextL)));

    // 좌측 높이가 더 크면 우측을 당김
    if (pl.y > pr.y) {
      rightId--;
      //우측이 더 크면 좌측을 당김
    } else if (pl.y < pr.y) {
      leftId++;
      // 이전, 다음 높이를 비교해 낮은 쪽을 당김.
    } else if (plNext.y > prNext.y) {
      rightId--;
    } else {
      leftId++;
    }
  }

  return sum;
}

// console.log(solution([1, 8, 6, 2, 5, 4, 8, 3, 7]));

// console.log(solution([1, 7, 6, 2, 5, 4, 8, 3, 8]));
// console.log(solution([1, 8, 100, 2, 100, 4, 8, 3, 7]));
// console.log(solution([1, 1]));
// console.log(solution([1, 0, 0, 0, 2]));
// console.log(solution([2, 3, 10, 5, 7, 8, 9]));
// console.log(solution([1, 2, 1]));
// console.log(solution([0, 2]));
// console.log(solution([1, 3, 2, 5, 25, 24, 5]));
console.log(solution([0, 0, 2, 5, 25, 0, 0]));
//console.log(solution(arr));
