function fib(n) {
  if (n === 1 || n === 2) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
}

//메모제이션을 이용하는게 반응이 더 빠름.
function dpFib(n) {
  const store = {};
  callcount = 0;
  const inner = (m) => {
    if (m < 3) {
      store[m] = 1;
    }

    if (!store[m]) {
      callcount++;
      store[m] = inner(m - 1) + inner(m - 2);
    }

    return store[m];
  };

  const a = inner(n);
  console.log("value", a, "count", callcount);
  return a;
}

let before = performance.now();
console.log("before", before);
console.log(fib(28));
console.log("after", performance.now() - before);

before = performance.now();
console.log("before", before);
console.log(dpFib(28));
console.log("after", performance.now() - before);
