/**
 *  뉴클레오티드타입 ACGT 는 각각 1, 2, 3, 4의 값을 가짐.
 *
 * DNA를 나타내는 문자열 S 와
 * M개의 원소로 이루어진 배열 P, Q가 주어질 때
 * P[K] ~ Q[K] 사이의 DNA 서열중 가장 작은 뉴클레오티드 타입의 값을 반환
 *
 * ex )
 *  S = CAGCCTA
 *  P = [2, 5, 0]
 *  Q = [4, 5, 6]
 *
 *  P[0] = 2 Q[0] = 4;
 *  S[2] ~ S[4] = GCC => 3 2 2
 *  가작 작은 값은 2
 *
 *  P[1] = 5 Q[1] = 5;
 *  S[5] ~ S[5]   = T => 4
 *
 *  P[2] = 0 Q[2] = 6;
 *  S[0] ~ S[6]   = CAGCCTA
 *  가장 작은 값은  = A => 1
 *
 *
 * 문자열 S는 ACGT 문자열로만 구성
 * 문자열의 길이는 1 ~ 100,000
 * 배열 P, Q의 길이는 1 ~ 50,000
 * P[k]<=Q[k]
 */

function calculateIndexValue(str, arr, idx, type) {
  if (str[idx] === type) {
    arr[idx] = idx;
  } else if (idx > 0) {
    arr[idx] = arr[idx - 1];
  }
}

function solution(S, P, Q) {
  const DNA_MAP = {
    A: 1,
    C: 2,
    G: 3,
    T: 4
  };
  const DNA_A = [-1];
  const DNA_C = [-1];
  const DNA_G = [-1];
  const DNA_T = [-1];
  /**
   * 타입별 등장 인덱스 순서를 문자열에서 미리 구성하기
   */
  for (let i = 0; i < S.length; i++) {
    calculateIndexValue(S, DNA_A, i, "A");
    calculateIndexValue(S, DNA_C, i, "C");
    calculateIndexValue(S, DNA_G, i, "G");
    calculateIndexValue(S, DNA_T, i, "T");
  }

  const answer = [];
  for (let i = 0; i < Q.length; i++) {
    const l = P[i];
    const r = Q[i];
    // 종료시점의 각 타입에 인덱스와 시작 인덱스를 비교하면
    // 어떤 값이 선택되야 할지 판단할 수 있음.
    if (DNA_A[r] >= l) {
      answer[i] = DNA_MAP.A;
    } else if (DNA_C[r] >= l) {
      answer[i] = DNA_MAP.C;
    } else if (DNA_G[r] >= l) {
      answer[i] = DNA_MAP.G;
    } else {
      answer[i] = DNA_MAP.T;
    }
  }
  console.log("answer", answer);
  return answer;
}

solution("CAGCCTA", [2, 5, 0], [4, 5, 6]);
