/**
 * 난수 생성 객체
 */

const RNG = {
  create(seed, a = 0, b = 0, m = 1) {
    let sd = seed;
    const next = () => {
      const temp = sd;
      sd = (temp * a + b) % m;
      return temp;
    };
    return {
      next
    };
  }
};

module.exports = RNG;
