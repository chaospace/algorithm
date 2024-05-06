const { log } = require("../libs/util");
const buckets = Array(3)
  .fill(null)
  .map(() => []);

const hash = (key) => {
  const h = Array.from(key).reduce((acc, keySymbol) => {
    console.log("acc", acc, "keysymbol", keySymbol);
    return acc + keySymbol.charCodeAt(0);
  }, 0);
  console.log("h", h, key);
  return h % buckets.length;
};

log("c", hash("chaos"));
