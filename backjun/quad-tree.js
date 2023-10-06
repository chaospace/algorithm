/**
 * 쿼드트리
 * 흑백 영상을 압축하여 표현하는 데이터 구조로 쿼드 트리(Quad Tree)라는 방법이 있다.
 * 흰 점을 나타내는 0과 검은 점을 나타내는 1로만 이루어진 영상(2차원 배열)에서 같은 숫자의 점들이 한 곳에 많이 몰려있으면,
 * 쿼드 트리에서는 이를 압축하여 간단히 표현할 수 있다.
 * 주어진 영상이 모두 0으로만 되어 있으면 압축 결과는 "0"이 되고, 모두 1로만 되어 있으면 압축 결과는 "1"이 된다.
 * 만약 0과 1이 섞여 있으면 전체를 한 번에 나타내지를 못하고, 왼쪽 위, 오른쪽 위, 왼쪽 아래,
 * 오른쪽 아래, 이렇게 4개의 영상으로 나누어 압축하게 되며, 이 4개의 영역을 압축한 결과를 차례대로 괄호 안에 묶어서 표현한다
 * 
11110000
11110000
00011100
00011100
11110000
11110000
11110011
11110011

//루핑에 들어가기 전에 괄호

((110(0101))(0010)1(0001))
 */

const convertGrid = (info, n) => {
  const grid = [];
  // const n = info.length;
  for (let i = 0; i < info.length / n; i++) {
    grid.push(
      info
        .slice(i * n, i * n + n)
        .split("")
        .map((v) => Number(v))
    );
  }
  return grid;
};

//재귀로 어떻게 표현할까?
function solution(grid, n) {
  if (n > 2) {
    let k = n >> 1;
    let results = [];
    for (let sy = 0; sy <= k; sy += k) {
      for (let sx = 0; sx <= k; sx += k) {
        let a = "";
        let sub = [];
        //그룹을 나눔.
        for (let y = sy; y < sy + k; y++) {
          let row = [];
          for (let x = sx; x < sx + k; x++) {
            a += grid[y][x];
            row.push(grid[y][x]);
          }
          sub.push(row);
        }
        results.push(a);
        // if (!isSame(a)) {
        //   if (n / 2 > 2) {
        //     solution(sub, n >> 1);
        //   } else {
        //     console.log("a", a);
        //   }
        // } else {
        //   console.log("same", a[0]);
        //   // return a[0];
        // }
      }
    }
    //분리한 구간의 압축여부를 체크

    console.log("results", results);
  }
}

const isSame = (value) => {
  let l = 0;
  let r = value.length - 1;
  let allSame = true;
  while (l < r) {
    if (value[l] !== value[r]) {
      allSame = false;
      break;
    }
    l++;
    r--;
  }
  return allSame;
};

const allSame = (source) => {
  source = source.flatMap((v) => v);
  let l = 0;
  let r = source.length - 1;
  let isSame = true;
  while (l < r) {
    if (source[l] !== source[r]) {
      isSame = false;
      break;
    }
    l++;
    r--;
  }
  return isSame; // ? source[0] : source;
};

function solutionRecursive(info, n) {
  // 모든 문자열이 일치하면 첫글자를 반환
  if (isSame(info)) {
    return info[0];
    //일치하지 않고 길이가 4이하면 전체문자열 리턴
  } else if (info.length <= 4) {
    return info;
  }
  //전체를 분할
  const next = n >> 1;
  let output = "";
  for (let sy = 0; sy <= next; sy += next) {
    for (let sx = 0; sx <= next; sx += next) {
      //문자를 4그룹으로 나누어 비교하고 이를 반복.
      let a = "";
      for (let y = sy; y < sy + next; y++) {
        let begin = y * n + sx;
        a += info.slice(begin, begin + next);
      }
      //모두 동일할 경우는 괄호가 필요없음.
      if (isSame(a)) {
        output += a[0];
      } else {
        // 동일하지 않은 경우 괄호를 적용
        output += `(${solutionRecursive(a, next)})`;
      }
    }
  }
  return output;
}

function uncompress(info, n) {
  /**
   * quad-tree를 풀어보자.
   * - 압축에 역순을 기록해보자.
   * - 괄호를 만나면 없애고
   * - ((110(0101))(0010)1(0001))
   * 8 -> 4 -> 2
   * - 괄호를 기준으로 문자열을 나눌 수 있을까?..
   * 괄호가 있는 인덱스를 기억해야 됨.
   *
   */
  //쌍에 인덱스를 찾으려면 역시 stack을 이용해야 되려나...
  let parentheses = [];
  let k = n;
  let stack = [];
  let str = info;
  while (k >= 4) {
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "(") {
        stack.push(i);
      } else if (str[i] === ")") {
        let a = stack.pop();
        // 올바른 괄호가 완성되면 해당 위치를 기억
        if (stack.length === 0) {
          parentheses.push([a, i]);
        }
      }
    }
    k = k >> 1;
    let a = [];
    //괄호를 제거한 문자열 기억
    parentheses.forEach(([s, e]) => {
      a.push(str.slice(s + 1, e));
    });
    //하나로 조인
    str = a.join("");
    stack = [];
    parentheses = [];
  }

  return { info, parentheses };
}

[
  {
    n: 8,
    str: "1111000011110000000111000001110011110000111100001111001111110011",
  },
].forEach(({ n, str }) => {
  // const grid = convertGrid(str, n);
  // console.log(solution(grid, n));
  //전체를 감싸는 괄호는 함수를 한번 더 감싸야 함.
  const results = solutionRecursive(str, n);
  console.log(uncompress(`(${results})`, n));
});
