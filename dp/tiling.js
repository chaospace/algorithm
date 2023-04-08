/**
 * 2*n영역을 2*1타일로 채우는 경우의 수 리턴
 */

function solution(n) {
  const width = n;
  let a = 0;
  const loop = size => {
    if (size <= 1) {
      console.log("size", size);
      return 1;
    }
    return (a += loop(size - 1));
  };

  console.log("case", loop(width));
}

solution(5);
