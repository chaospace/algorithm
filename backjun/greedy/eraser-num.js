/**
 * 수 지우기
 * N자리의 수와 지울 수 M이 주어진다.
 * N자리의 수에 M이 여러 개 있을 경우 하나만 제거 가능할 때,
 * 지워서 가장 큰 수를 반환하는 함수 작성.
 *
 * -숫자의 경우니까 가장 뒤에 수를 지우는게 정답?
 */

function solution({ n, m }) {
  const earser = (source, target) => {
    if (target.length === 0) {
      return source;
    }
    const t = target[target.length - 1];
    const l = source.indexOf(t);
    const r = source.lastIndexOf(t);
    if (l > -1 && r > -1) {
      source = Math.max(
        Number(source.slice(0, l) + source.slice(l + 1)),
        Number(source.slice(0, r) + source.slice(r + 1))
      ).toString();
      //좌측만 존재
    }

    return earser(source, target.slice(0, target.length - 1));
  };

  return earser(n, m);
  //제거 문자가 없으면 종료
}

[
  {
    n: "12345",
    m: "5",
    o: "1234",
  },
  {
    n: "123123",
    m: "1322",
    o: "31",
  },
  {
    n: "112352",
    m: "1123",
    o: "52",
  },
].forEach((info) => console.log(solution(info)));
