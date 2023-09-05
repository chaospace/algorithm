/**
 
예전에는 운영체제에서 크로아티아 알파벳을 입력할 수가 없었다. 따라서, 다음과 같이 크로아티아 알파벳을 변경해서 입력했다.
  
 크로아티아 알파벳	변경
č	            c=
ć	            c-
dž	            dz=
đ	            d-
lj	            lj
nj	            nj
š	            s=
ž	            z=

예를 들어, ljes=njak은 크로아티아 알파벳 6개(lj, e, š, nj, a, k)로 이루어져 있다. 단어가 주어졌을 때, 몇 개의 크로아티아 알파벳으로 이루어져 있는지 출력한다.
dž는 무조건 하나의 알파벳으로 쓰이고, d와 ž가 분리된 것으로 보지 않는다. lj와 nj도 마찬가지이다. 위 목록에 없는 알파벳은 한 글자씩 센다.
*/

const charMap = new Map();
charMap.set("č", "c=");
charMap.set("ć", "c-");
charMap.set("dž", "dz=");
charMap.set("đ", "d-");
charMap.set("lj", "lj");
charMap.set("nj", "nj");
charMap.set("š", "s=");
charMap.set("ž", "z=");
let croatiaChar = [];
for (let v of charMap.keys()) {
  croatiaChar.push(v);
}

let replaceChar = [];
for (let v of charMap.values()) {
  replaceChar.push(v);
}

const matchingPartialChar = (char) => {
  return (char && replaceChar.some((v) => v.includes(char))) || false;
};

const matchingChar = (char) => {
  return replaceChar.includes(char);
};

/**
 * 주어진 문자열을 크로아티아 문자 배열로 변환 후  반환.
 * @param {*} str
 */
function solution(str) {
  //문자열을 하나씩 옮기며 대체문자가 나오면 인덱스 증가를 문자열 만큼 한다.
  let answer = [];
  //사전목록에 의지하는게 아니라 문자열에 의존해야 함.

  const checkChar = (char, index) => {
    //인덱스가 문자열보다 크면 종료
    if (index >= str.length) {
      return;
    }

    if (matchingChar(char)) {
      answer.push(croatiaChar[replaceChar.indexOf(char)]);
      //console.log("char", char, "index", index + 1, index + 1 - char.length);
      char = "";
      //index=index+1; //인덱스 위치는 현재 매칭문자의 끝으로 이동
    }

    //일치하는 문자열이 있을 경우
    if (matchingPartialChar(char)) {
      //기존 문자열에 하나를 더하여 진행
      checkChar(char + str[index + 1], index + 1);
    } else {
      // 매칭이 필요없는 문자 참조
      const firstChar = char.slice(0, 1);
      if (firstChar) {
        answer.push(firstChar);
      }
      if (char.length > 1) {
        checkChar(char.slice(1), index);
      } else {
        checkChar(str[index + 1], index + 1);
      }
    }
  };

  /**
   * 문자열 조작을 재귀로 해결
   * @param {*} left
   * @param {*} right
   * @returns
   */
  const checkCharAdvance = (left, right, results) => {
    //기저 조건: 시작인덱스가 문자열보다 크거나 같으면 종료
    if (left >= str.length) {
      return results;
    }
    //현재 문자열 참조
    //const char = str.slice(left, right);
    if (matchingChar(str.slice(left, right))) {
      //문자열이 일치하면 매칭 문자열에 마지막 인덱스 값에서 부터 시작.
      return checkCharAdvance(right, right + 1, [
        ...results,
        str.slice(left, right),
      ]);
    } else if (matchingPartialChar(str.slice(left, right))) {
      //기존 문자열에 하나를 더하여 진행
      return checkCharAdvance(left, right + 1, [...results]);
    }
    //단일 문자열 참조 체크
    return checkCharAdvance(left + 1, right + 1, [
      ...results,
      str.slice(left, right).slice(1) || str.slice(left, right),
    ]);
  };

  return checkCharAdvance(0, 1, []).map((char) =>
    replaceChar.includes(char) ? croatiaChar[replaceChar.indexOf(char)] : char
  );
}
//시작인덱스로 시작되는 글자가 있는지 체크
//일치 문자가 없으면 제일 앞에를 잘라내고 다시 체크
//시작 글자가 일치하면 몇 글자까지 일치하는지 체크,
//일치 문자열을 만나면 일치 인덱스를 기록
console.log(solution("ljes=njak"));
console.log(solution("ddz=z="));

//반복문을 통한 변환처리
function solutionLoop(str) {
  let l = 0;
  let r = l + 1;
  const answer = [];
  while (l < str.length) {
    //
    if (matchingPartialChar(str[l])) {
      // 시작문자가 매칭할 경우
      while (matchingPartialChar(str.slice(l, r))) {
        const char = str.slice(l, r);
        if (matchingChar(char)) {
          // 전체문자가 일치할 경우 문자 변경
          answer.push(croatiaChar[replaceChar.indexOf(char)]);
          l = r; //문자 시작위치를 매칭문자 끝으로 이동
        }
        //끝문자 위치 값을 1씩 증가
        r += 1;
      }
    }
    // 매칭이 필요없는 문자열 참조 가져오기
    const restChar = str.slice(l, r);
    if (restChar.length) {
      answer.push(restChar.length > 1 ? restChar.slice(1) : restChar);
    }

    l = l + 1;
    r = l + 1;
  }
  return answer;
}

// console.log(solutionLoop("ljes=njak"));
// console.log(solutionLoop("ddz=z="));
// 파라미터만 받아서 처리하는 꼬리재귀
