/**
일부 직사각형의 면적을 나타내는 정수 N이 주어집니다.

변의 길이가 A, B인 직사각형의 넓이는 A * B이고 둘레는 2*(A + B)입니다.

목표는 면적이 N인 직사각형의 최소 둘레를 찾는 것입니다.
이 직사각형의 변은 정수여야 합니다.

예를 들어 정수 N = 30이 주어지면 넓이 30의 사각형은 다음과 같습니다.

(1, 30), 둘레가 62인 경우,
(2, 15), 둘레가 34인 경우,
(3, 10), 둘레가 26인 경우,
(5, 6), 둘레는 22입니다.
함수 작성:

함수 솔루션(N);

정수 N이 주어지면 면적이 N과 정확히 같은 사각형의 최소 둘레를 반환합니다.

예를 들어 정수 N = 30이 주어지면 함수는 위에서 설명한 대로 22를 반환해야 합니다.

다음 가정에 대한 효율적인 알고리즘을 작성 하십시오.

N은 [ 1 .. 1,000,000,000 ] 범위 내의 정수 입니다. 

 */

/**
 * N의 약수를 찾고 그 값을 이용해 둘레 최소값을 찾으면 된다.
 * @param {*} N
 */
function solution(N) {
  let i = 1;
  const rectangles = [];
  while (i * i < N) {
    if (N % i === 0) {
      rectangles.push({
        w: i,
        h: N / i
      });
    }
    i++;
  }
  if (i * i === N) {
    rectangles.push({
      w: i,
      h: i
    });
  }
  //console.log("arr", rectangles);

  let perimeter = Number.MAX_SAFE_INTEGER;
  while (rectangles.length) {
    const { w, h } = rectangles.shift();
    perimeter = Math.min(perimeter, 2 * (w + h));
  }
  console.log("perimeter", perimeter);
  return perimeter;
}

solution(30);
