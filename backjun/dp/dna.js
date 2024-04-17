/**
 * DNA(2306번)
 *
 * DNA 서열은 4개의 문자 {a,c,g,t} 로 이루어진 문자열이다.
 * DNA 서열에는 생명의 신비를 풀 수 있는 많은 정보가 들어 있다.
 * 특히 KOI 유전자의 길이는 사람의 키와 깊은 상관 관계가 있다는 것이 알려져 있다.
 * 이러한 KOI 유전자는 다음의 조건을 만족한다.
 *
 *
 * at 와 gc 는 가장 짧은 길이의 KOI 유전자이다.
 *
 * 어떤 X가 KOI 유전자라면, aXt와 gXc도 KOI 유전자이다.
 * 예를 들어, agct 와 gaattc는 KOI 유전자이나, tgca 와 cgattc는 KOI 유전자가 아니다.
 * 어떤 X와 Y가 KOI 유전자라면, 이 둘을 연결한 XY도 KOI 유전자이다.
 * 예를 들면, aattgc 또는 atat는 KOI 유전자이나 atcg 또는 tata는 KOI 유전자가 아니다.
 * KOI 유전자는 DNA 서열 중에서 부분 서열로 구성되어 있다.
 *
 * 부분 서열이란 주어진 서열에서 임의의 위치에 있는 0개 이상의 문자들을 삭제해서 얻어지는 서열이다.
 * 예를 들면, DNA 서열
 * acattgatcg 에서 두 번째 문자 c와 마지막 문자 g를 삭제하여 생긴
 * 부분 서열 aattgatc는 길이가 8인 KOI 유전자이다.
 * 그러나 마지막 문자 g를 삭제하여 만들어진 부분 서열 acattgatc는 KOI 유전자가 아니다
 *
 * 문제는 주어진 DNA 서열의 부분 서열들 중에서 길이가 최대가 되는 KOI 유전자를 찾아 그 길이를 출력하는 것이다.
 *
 * 입력
 * 분석하고자 하는 DNA 서열이 주어진다. DNA 서열의 길이는 최대 500이다.
 *
 * 출력
 * 입력 DNA 서열로부터 계산된 가장 긴 KOI 유전자의 길이를 첫 번째 줄에 출력한다.
 * 단, KOI 유전자가 없는 경우에는 0을 출력한다
 *
 * 정리
 * 문자열에 a(X)t, g(X)c 사이에 있는 것들은 KOI유전자 DNA로 판단.
 * 가운데 X역시 KOI유전자일 경우.
 * 모두 atgc로 구성된 경우를 유효한 문자열로 판단한다.
 *
 */

/**
 * 문자열에서 유효한 KOI문자열에 최대 길이를 찾는 문제..
 * 유효한 문자열에 기준
 *  - a()t, a와 t로 감싸진 문자
 *  - g()c  g와 c로 감싸진 문자
 *  처음에 만나는 a, g를 기준으로 종료하는 위치만 찾으면 될듯 한데..
 *  acattgagtc
 *
 *  acaagttgagtc
 *  재귀를 통해 문자열을 구성하며 가장 긴 값을 찾아내는 방법은 어떻게 될까?
 *  - a, g로 시작하는 가장 빠른 인덱스를 찾는다.
 *  - 각 시작 인덱스는 가장 먼저 만나는 쌍에 인덱스를 만나면 종료하고 반환한다.
 *  - a
 *
 * @param {*} param0
 * @returns
 */
function solution({ dna }) {
  const max = dna.length;
  const dp = Array.from({ length: dna.length }, () =>
    Array.from({ length: dna.length }).fill(0)
  );

  //간격을 체크하기 위해 i+size를 제한으로 설정
  for (let size = 1; size < max; size++) {
    for (let i = 0; i + size < max; i++) {
      let j = i + size;
      //at, gc와 매칭하는 곳에 카운트를 증가처리

      if (
        (dna[i] === "a" && dna[j] === "t") ||
        (dna[i] === "g" && dna[j] === "c")
      ) {
        //aXt, gXc 처리를 위한 i+1, j-1
        dp[i][j] = dp[i + 1][j - 1] + 2;
      }

      // at, gc, 사이에 연결된 부분 문자열 갱신처리
      // 구간 사이에 있는 문자열을 찾아서 구간 갱신.
      for (let mid = i; mid < j; mid++) {
        const temp = dp[i][mid] + dp[mid + 1][j];
        dp[i][j] = Math.max(temp, dp[i][j]);
      }
    }
  }

  return { dna, dp };
}

[
  {
    dna: "acattgagtc",
    o: 8,
  },
  //   {
  //     dna: "aattgatc",
  //     o: 8,
  //   },
].forEach((info) => {
  console.log(solution(info));
});
