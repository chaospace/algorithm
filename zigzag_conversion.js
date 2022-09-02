/**
 * 주어진 문자열 s를 row행으로 나누어 zigzag(세로로 보았을 경우, 가로는 N이 맞을 뜻)로 변경하기
 * s    :문자열
 * row  :행 수
 *
 * ex ) s:  "PAYPALISHIRING" row : 3
 * 
 * 0 1 2 / 3 4 / 5 6 / 7 8 / 9 10 / 11 12 / 13 
 * 
 * 
 * 0 1 2 1 0 1 2 1 0
 *       
 * 0 1 2 3 4 5 6 7 8
 * 
 * 0 1 2 3 2 1 0 1 2 3 2 1 0 
 * 
 * 
 * 
 * 
 * output =>
 * P A H N     
 * APLSIIG
 * Y I R
 *
 * n = 4
 * columnIndex > 0 numRows - 1
 * 0 1 2 3 / 4 5 6 / 7 8 9 / 10 11 12 / 13
 * 
 * P  I  N   numRows - 2
 * A LS IG   numRows - 3
 * YA HR     numRows - 3
 * P  I      numRows - 2
 * 
 
Math.floor(14/3) = 3 * 3 = 9 - 2 = 7
Math.floor(14/4) = 3 + 3-1  = 5

시작 row를 순차적으로 채우고
다음부터는 row - index

row = 3 20
 arr = [
  [P],[ ],[A],[ ],[N],[ ],[H],
  [A],[P],[L],[S],[I],[I],[G],
  [Y],[ ],[I],[ ],[R],[ ],
 ]

 14/4-1 = 5
row = 4 26
 arr = [
  [P],[ ],[ ],[I],[ ],[ ],[H],
  [A],[ ],[L],[S],[ ],[I],[G]
  [Y],[A],[ ],[H],[R],[ ],
  [P],[ ],[ ],[I],[ ],[ ],
 ]
 
 5 =  Math.ceil(14/3);
 arr = [
  [P],[ ],[ ],[ ],[N],[ ]
  [A],[ ],[ ],[S],[I],[ ]
  [Y],[ ],[I],[ ],[R],[ ]
  [P],[L],[ ],[ ],[I],[G]
  [A],[ ],[ ],[ ],[N],[ ]
 ]
 *
 * 접근 방식
 * 문자열을 배열로 변경 순회하며 적절히 여백(예시 문제의 경우 n%row == 0 일 경우)을 추가해야 함.
 * row증가를 나머지와 나누기 연산자로 제어 가능할 듯
 * 문자열에 공백을 제거하는 게 쉽나?
 * 012 / 345 / 678 /9 10 11 / 12 13
 * PAY / PAL / ISH /I  R I  / N   G
 * 
 * 
 * PAYP / ALIS / HIRI / NG
 * 
 *
 * 0   4   8    12  // index:0 + 간격:(row-1)*2 - index :4-0          공백: 4 - row => 1
 * 1 3 5 7 9 11 13  // index:1 + 간격:4-1               :3            공백: 3 - row => 0
 * 2   6  10        // index:2 + 간격:4-2               :4-0          공백: 4 - row => 1
 *
 *
 * 0   8            // 0 + (5-1)*2 * index
 * 1  79            // 1 + 8-1
 * 2 610            // 2 + 8-2
 * 35 11            // 3 + 8-3
 * 4  12            //     8-4
 */

function solution(s, numRows) {
  const len = s.length;
  let zigzag = "";
  let map = new Map();
  let isUpRow = false;
  let rowIndex = 0;
  let rowLimit = numRows - 1;
  // 문자열이 짧거나 row를 나눌 필요 없으면 원본 리턴
  if (s.length < 2 || rowLimit < 1) {
    return s;
  }
  for (let i = 0; i < len; i++) {
    if (rowIndex == 0 || rowIndex == rowLimit) {
      isUpRow = !isUpRow;
    }

    answer[rowIndex] += s[i];
    const prev = map.get(rowIndex) || "";
    map.set(rowIndex, prev + s[i]);

    if (isUpRow) {
      rowIndex++;
    } else {
      rowIndex--;
    }
  }

  for (const [_, value] of map.entries()) {
    zigzag += value;
  }

  return zigzag;
}

const input = "PAYPALISHIRING";
solution(input, 1); // PAHNAPLSIIGYIR
