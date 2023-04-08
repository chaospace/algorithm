let S = "XXXX";
let count = 0;
for (let i = 0; i < S.length; i += 3) {
  if (S.substring(i, i + 3).includes("X")) {
    count++;
  }
}

console.log("count", count);

const obj = {
  aa: "v",
  bb: "aa",
  cc: "EEE"
};

const bbb = Object.keys(obj).sort(() => (Math.random() > 0.4 ? 1 : -1));
// console.log(bbb);
// Object.entries(obj).map(([key, value]) => {
//   console.log(key, value);
// });

console.log(Object.entries(obj).sort(() => (Math.random() > 0.4 ? -1 : 1)));
console.log(obj);
