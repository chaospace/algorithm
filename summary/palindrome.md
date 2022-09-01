# 펠린드롬(회문)만들기

> 앞뒤가 동일한 문자열( abcba )

## 문제

문자열이 하나 주어집니다. 회문을 만들기 위해서 문자열에 삽입해야 하는 최소의 문자 갯수를 찾으세요.

## 예제

- ab : 1개의 문자열이 필요 **b**ab
- aa : 이미 회문이라 문자 필요없음
- abcd : 3개의 문자열 필요. **dcb**abcd
- bcd : 2개의 문자열 필요. **dc**bcd
- abcda : 2개의 문자열 필요. a**dc**bcda

> 재미있는 점은 <code>abcda</code>를 회문으로 만드는 데 필요한 문자 갯수와 <code>bcd</code>를 회문으로 만드는데 필요한 문자갯수는 같다는 점.

## 솔루션

문자열을 더하는 것보다 지우는 방식으로 접근.
입력 문자열이 <code>str[l...h]</code>라 한다면 아래와 같은 서브 문제로 구분가능

- 부분문자열 <code>str[l + 1 ... h]</code>의 최소 문자 입력 갯수 찾기. ( 맨 처음 문자를 지움 )
- 부분문자열 <code>str[l ... h - 1]</code>의 최소 문자 입력 갯수 찾기. ( 맨 끝 문자를 지움 )
- 부분문자열 <code>str[l + 1 ... h - 1]</code>의 최소 문자 입력 갯수 찾기. ( 양쪽의 문자가 서로 같아서 회문을 이루기 때문에 고려할 필요 없음 )

## 재귀적 솔루션

문자열 str[l ... h]이 주어졌을 때 회문을 위한 추가해야 될 최소문자를 구하는 함수 **findMinInsertion**을 정의

- 시작과 끝문자가 같다면 이를 제외한 문자열( str[l+1 ... h-1]만 고려하면 됨.
- 시작과 끝의 문자가 같지 않으면, 문자열의 시작(str[l+1 ... h]) 혹은 끝 문자(str[l ... h-1])를 제거한 문자열을 고려 ( 이때 하나가 제거되는 만큼 회문구성을 위해 삽입문자가 추가되는 것을 고려해 +1을 한다. )

```javascript
// 위 내용을 코드로 만들기
if (str[l] === str[h]) {
  // 양끝이 동일한 문자면 양끝은 제거
  findMinInsertion(str, l + 1, h - 1);
} else {
  min(findMinInsertion(str, l, h - 1), findMinInsertion(str, l + 1, h)) + 1;
}
```

## 동적솔루션을 이용한 개선사항

재귀를 이용해 답을 찾다보면 중복된 계산을 수행하게 되고 대상 문자열이 길수록 반복도 많다.  
이를 방지하기 위해 DP(Dynamic Programming )를 이용할 수 있고 적용한 코드는 아래와 같다.

```javascript
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
// 원하는 결과인 str[0 ... n-1 ](전체 문자열)인 경우 필요한 최소 추가문자의 수를 추출
return map[0][len - 1];
```

## 중심 주변 확장을 이용한 방법

펠린드롬을 이루는 문자열은 중심을 기준으로 대칭을 이루는 데 이 중심은 펠린드롬을 이루는 문자열의 길이에 따라 <code>2n-1</code>에 위치합니다.

```javascript
function solution(s) {
  if (s == null || s.length < 1) return "";
  let start = 0;
  let end = 0;
  let len = s.length;
  for (let i = 0; i < len; i++) {
    let c1 = expandAroundCenter(s, i, i);
    let c2 = expandAroundCenter(s, i, i + 1);
    let c = Math.max(c1, c2);
    if (c > end - start) {
      start = i - (c - 1) / 2;
      end = i + c / 2;
    }
  }
  return s.substring(start, end + 1);
}

/**
 * 주어진 문자열 s를 기준으로 펠린드롬 여부를 체크 하면 센터index를 반환
 * left :시작
 * right: 끝
 */
function expandAroundCenter(s, left, right) {
  let L = left;
  let R = right;
  let len = s.length;
  // 문자열이 동일하지 않을 때 까지 인덱스를 밖으로 늘리며 체크
  while (L >= 0 && R < len && s[L] === s[R]) {
    L--;
    R++;
  }
  // 증감연산자로 늘어난 1을 보정 후 리턴
  return R - L - 1;
}
```
