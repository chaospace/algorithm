/**
문자열 s가 주어지면 대칭을 만드는 인덱스를 찾아 반환
빈 문자열일 경우 0을 리턴

대칭을 만드는 인덱스를 찾아야 한다.
대칭만 되고 다른 글자가 중간에 없으면 의마가 없음.
ex)
reacecar
output 3
*/
function solution(S) {
  const len = S.length;
  if (len < 1) return -1;
  if (len === 1) return 0;
  let l = 0;
  let r = len - 1;
  if (S[l] === S[r]) {
    // 시작과 마지막이 같을 경우 루프 시작
    while (l + 1 <= r - 1 && S[l + 1] === S[r - 1]) {
      l += 1;
      r -= 1;
    }
  }
  console.log(l === r ? l : -1);
  return l === r ? l : -1;
}
solution("racecar");
solution("racecae");
solution("rer");
solution("abba");
solution("ab");
