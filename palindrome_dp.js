/**
 * 동적 프로그래밍을 이용한 펠린드롬 찾기
 * 
 * ex) str = 'abb'
 * findMinIntersection( str, 0, 2 );
 * 
 * 시작과 마지막이 같지 않을 경우
   // 뒷글자를 줄이는 경우 s: a l: b
   findMinIntersection( str, 0, 1 ) => 1;
   // 앞글자를 줄이는 경우 s: b l : b
   // 1 === 2-1 ? 
   findMinIntersection( str, 1, 2 ) => 0;
 */
/**
 * 
input = "abcd"
i =0 
h =3
input[i] = a
input[h] = d
Math.min(
  input, 1, 3, 
    => i = 1, h = 3 => input[i] =b, input[h] = d
     => Math.min(
       input, 2, 3,
        => i = 2, h = 3 => input[i] = c, input[h] = d
          => i === h-1 => input[i] !== input[h] => 1; 
       input, 1, 2
          => i === h-1 => input[i] !== input[h] => 1; 
     ) + 1 => 2
  input, 0, 2
   => i = 0, h = 2 => input[i] = a, input[h] = c
    => Math.min(
      input, 1, 2,
       => i = 1, h = 2, input[i] = b, input[h] = c
        => i === h - 1 => input[i] !== input[h] => 1
      input, 0, 1
        => i = 0, h = 1 => input[i] = a, input[h] = b
         => i === h - 1 => input[i] !== input[h] => 1
    ) + 1 => 2
) + 1 => 3
 */
function findMinInsertion(str, i, h) {
  //console.log(" i", i, "h", h, "str", str[i], str[h]);
  // 제거해야 할 문자열 수 0 or 1
  if (i > h) return Number.MAX_VALUE;
  if (i === h) return 0;
  if (i === h - 1) return str[i] === str[h] ? 0 : 1;

  // console.log("재귀시작", i, h, str[i], str[h]);
  const result =
    str[i] === str[h]
      ? findMinInsertion(str, i + 1, h - 1)
      : Math.min(
          findMinInsertion(str, i + 1, h),
          findMinInsertion(str, i, h - 1)
        ) + 1;
  return result;
}

function findMinInsertionDP(str) {
  //정보를 기억할 맵생성
  const len = str.length;
  const map = [];
  let i = 0;
  let h = 0;
  let gap = 0;
  for (i = 0; i < len; i++) {
    map[i] = [];
    for (h = 0; h < len; h++) {
      map[i][h] = 0;
    }
  }
  // 기준문자를 늘려가며 체크
  for (gap = 1; gap < len; gap++) {
    // 시작과 끝문자를 비교해가며 조건체크
    for (i = 0, h = gap; h < len; i++, h++) {
      map[i][h] =
        str[i] === str[h]
          ? map[i + 1][h - 1]
          : Math.min(map[i + 1][h], map[i][h - 1]) + 1;
    }
  }
  return map[0][len - 1];
}

const a = "abcde";
console.log("findMinInsertion", findMinInsertion(a, 0, a.length - 1));
console.log("findMinInsertionDP", findMinInsertionDP(a));
