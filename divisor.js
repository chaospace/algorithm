function reverseCoins(n) {
  let answer = 0;
  const conins = new Array(n + 1).fill(0);
  const len = conins.length;
  for (let i = 1; i < len; i++) {
    let k = i;
    console.log("i-k", k);
    while (k <= n) {
      conins[k] = (conins[k] + 1) % 2;
      k += i;
      console.log("k", k);
    }
    answer += conins[i];
  }
  console.log("coins", conins, "answer", answer);
  return answer;
}

reverseCoins(4);

/**
 * 제수 구하기
 * n의 제수 구하기
 */
function divisors(n) {
  let i = 1;
  let answer = 0;
  while (i * i < n) {
    if (n % i === 0) {
      answer += 2;
    }
    i += 1;
  }

  if (i * i === n) {
    answer += 1;
  }
  console.log("answer", answer);
  return answer;
}

// divisors(4);
// divisors(8);

function primality(n) {
  let i = 2;
  while (i * i <= n) {
    if (n % i === 0) {
      return false;
    }
    i += 1;
  }
  return true;
}

// console.log(primality(4));
// console.log(primality(5));
// console.log(primality(9));
