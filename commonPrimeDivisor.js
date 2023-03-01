/**
소수 약수 찾기
주어진 두 수의 소수 약수 찾기

소수 D는 D * K = P와 같은 양의 정수 K가 존재하는 경우
양의 정수 P의 소수 약수 라고 합니다. 예를 들어 2와 5는 10의 소수 약수입니다.

N = 15 및 M = 75, 소수 약수는 동일합니다: {3, 5},  <-> {3,5,5};
N = 10 및 M = 30, 소수 약수는 동일하지 않습니다. {2, 5}는 ​​{2, 3, 5}와 같지 않습니다.
N = 9 및 M = 5, 소수 약수는 동일하지 않습니다. {3}은 {5}와 같지 않습니다.

두 배열 A와 B가 주어지면 A[K]와 B[K]의 소수 약수가 정확히 동일한 위치 K의 수를 반환합니다.

A[0] = 15   B[0] = 75
A[1] = 10   B[1] = 30
A[2] = 3    B[2] = 5

한 쌍(15, 75)만 동일한 소인수 집합을 가지므로 함수는 1을 반환해야 합니다.

다음 가정에 대한 효율적인 알고리즘을 작성 하십시오.

Z는 범위 [ 1 .. 6,000 ] 내의 정수 이고;
배열 A 및 B의 각 요소는 [ 1 .. 2,147,483,647 ] 범위 내의 정수 입니다.
 */

function getPrimeList(n) {
  let i = 2;
  const arr = new Array(n).fill(0);
  for (let i = 2; i < n; i++) {
    let j = i * i;
    if (arr[i] !== undefined) {
      arr.push(i);
    }
    while (j < n) {
      arr[j] = undefined;
      j += i;
    }
  }
  return arr.filter(v => v);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function gcd(a, b) {
  if (a % b === 0) {
    return b;
  }
  return gcd(b, a % b);
}

function divisors(n) {
  let i = n > 1 ? 2 : 1;
  const arr = [];
  while (i * i < n) {
    if (n % i === 0) {
      arr.push(i);
      arr.push(n / i);
    }
    i++;
  }
  if (i * i === n) {
    arr.push(i);
  }

  return arr;
}

function solution(A, B) {
  let answer = 0;
  for (let i = 0; i < A.length; i++) {
    let a = A[i];
    let b = B[i];
    // 최대공약수가 1이 되면 서로 공유할 수 있는 소수는 없다.
    const step = gcd(a, b);

    let allPass = true;
    while (a != 1) {
      const g = gcd(a, step);
      if (g === 1) {
        allPass = false;
        break;
      }
      a /= g;
    }

    while (b != 1 && allPass) {
      const g = gcd(b, step);
      if (g === 1) {
        allPass = false;
        break;
      }
      b /= g;
    }

    if (allPass) {
      answer++;
    }
  }
  return answer;
}
console.log(gcd(5, 1));
//console.log(solution([15, 10, 9], [75, 30, 5]));
//console.log(solution([2, 1, 2], [1, 2, 2]));
//console.log(solution([6059, 551], [442307, 303601]));
