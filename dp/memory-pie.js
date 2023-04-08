/**
 * 원주율 외우기
 *
 * case                                     난이도
 * 모든 숫자가 같을 경우        333,5555           1
 * 숫자가 1씩 증가,감소할때     23456,321           2
 * 두 개의 숫자가 번가라 나옴   323,54545           3
 * 숫자가 등차수열            147, 8642           4
 * 이 외의 모든 경우         17912, 331           5
 *
 * 원주율이 들어올 때 난이도의 합을 최소화 하도록 숫자들을 3~5자리로 끊어서 읽고 싶다.
 * 최소의 난이도를 계산하는 프로그램을 작성.
 *
 *
 */

/** 해당구간 난이도를 반환 */
function getDifficulty(source) {
  const arrSource = source.split("");
  // 앞뒤 숫자 차이 값
  const diff = source[0] - source[1];
  // 모두 같은 경우
  const allSame = arrSource.every(v => v === source[0]);
  // 앞뒤 숫자가 번가라 나오는 경우
  const alernating = arrSource.every((v, idx) =>
    idx % 2 === 0 ? v === source[0] : v === source[1]
  );

  // 증가 혹은 감소하는 경우
  const arithmeticSquence = arrSource.every((v, idx) =>
    idx > 0 ? arrSource[idx - 1] - v === diff : true
  );

  if (allSame) {
    return 1;
    // 증감 1
  } else if (arithmeticSquence && Math.abs(diff) === 1) {
    return 2;
    // 번가라
  } else if (alernating) {
    return 4;
    // 등차
  } else if (arithmeticSquence) {
    return 5;
  }
  return 10;
}

/**
 * 3~5자리로 짤라서 해당하는 구간의 난이도를 추출
 * @param {*} list
 */
function solution(list) {
  //   for (let s of list) {
  //     console.log("value", getDifficulty(s.substring(0, 4)));
  //   }
  // 조각 낼 문자열
  ///const p = list[0];
  const min_values = Array(list.length).fill(100);

  list.forEach((s, idx) => {
    for (let i = 3; i <= 5; i++) {
      const max = Math.ceil(s.length / i);
      let sum = 0;
      for (let j = 0; j < max; j++) {
        let start = j * i;
        sum += getDifficulty(s.substring(start, start + i));
      }
      min_values[idx] = Math.min(min_values[idx], sum);
      console.log("난이도", min_values);
    }
  });
}

solution(["12341234", "11111222", "12122222"]);
