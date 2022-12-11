/**
 * 유클리드 알고리즘을 이용한 최대공약수 찾기
 *
 * 최대공약수와 최소공배수의 관계
 * lcm(a, b) = a*b / gcd(a,b)
 *
 * n개 이상의 처리는 어떻게?
 * lcm(a, lcm(b, c)); // 중첩하며 하나씩 제거하며 구해나감.
 * ... 반복
 */

// def
// gcd(a, b, res): ifa==b:
// return res * a elif(a%2==0)and(b%2==0):
// return gcd(a // 2, b // 2, 2 * res) elif(a%2==0):
// return gcd(a // 2, b, res) elif(b%2==0):
// return gcd(a, b // 2, res) elifa>b:
// return gcd(a - b, b, res) else:
// return gcd(a, b - a, res)

function gcdRefactor(a, b, res) {
  if (a === b) {
    return res * a;
  } else if (a % 2 === 0 && b % 2 === 0) {
    return gcdRefactor(a / 2, b / 2, 2 * res);
  } else if (a % 2 == 0) {
    return gcdRefactor(a / 2, b, res);
  } else if (b % 2 == 0) {
    return gcdRefactor(a, b / 2, res);
  } else if (a > b) {
    return gcdRefactor(a - b, b, res);
  }
  return gcdRefactor(a, b - a, res);
}

function gcd(a, b) {
  if (a === b) {
    return a;
  }
  return a > b ? gcd(a - b, b) : gcd(a, b - a);
}
console.log(gcd(7, 2));

function gcdByDivisor(a, b) {
  if (a % b === 0) {
    return b;
  }
  return gcdByDivisor(b, a % b);
}

//console.log(6 % 9);
console.log(gcdByDivisor(7, 2));

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

console.log("lcm", lcm(3, 30));
