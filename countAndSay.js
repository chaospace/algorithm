/**
 * count & say
 * n이 주어지면 이를 숫자로 변경해 반환
 *
 * countAndSay(n)은 countAndSay(n-1)을 통해 다른 숫자로 변환하는 방법.
 *
 * n을 숫자로 변경하는 방법
 *
 * n = 4
 * output = 1211
 * countAndSay(1) = "1"
 * countAndSay(2) = "1" = one 1 = "11"
 * countAndSay(3) = "11" = two 1's = "21"
 * countAndSay(4) = "21" = one 2 + one 1 = "1211"
 * countAndSay(5) = "1211" = one 1 + one 2 + two 1 = "111221"
 * countAndSay(6) = "111221" = three 1 + two 2 + one 1 = "312211"
 * countAndSay(7) = "312211" = one 3 + one 1 + two 2 + two 1 = "13112221"
 * 13112221
 */
const map = {};
function parse(s, value, max) {
  if (max === value) {
    return s;
  } else {
    let str = "";

    let count = 0;
    let i = 0;
    let prev = s[0];
    while (i <= s.length) {
      const v = s[i];
      if (v === prev) {
        count++;
      } else {
        str += `${count}${prev}`;
        count = 1;
      }
      prev = v;
      i++;
    }

    return parse(str, value + 1, max);
  }
}

function solution(n) {
  console.log(parse("1", 1, n));
}

solution(7);
solution(6);
// solution(5);
// solution(4);
// solution(3);
solution(1);
solution(2);
