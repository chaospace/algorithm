/**
 * 정렬된 리스트 합치기
 * list1 = [1,2,4]
 * list2 = [1,3,4]
 * output= [1,1,2,3,4,4];
 *
 * 정렬된 리스트라면 길이는 달라도 상관없음.
 */
const linkedList = require("./libs/ListNode");
const makeListNode = linkedList.makeListNode;
const ListNode = linkedList.ListNode;

/**
 * 리스트 머지 시 신경써야 할 점.
 *  - 둘 중 값이 더 작은 것을 판단해야 함.
 *  - 루프 중에는 하나의 리스트만 감소함.
 * @param {*} list1
 * @param {*} list2
 * @returns
 */
function solution(list1, list2) {
  const merged = new ListNode();
  let temp = merged;

  // 리스트의 값이 유효할 때 까지 반복
  while (list1 || list2) {
    const value1 = list1 && list1.val;
    const value2 = list2 && list2.val;
    const v =
      value1 != null && value2 != null
        ? Math.min(value1, value2)
        : value1 ?? value2;
    temp.next = new ListNode(v);
    if (v === value1) {
      list1 = list1 && list1.next;
    } else {
      list2 = list2 && list2.next;
    }

    temp = temp.next;
  }
  return (merged.next && merged.next.toString()) || merged.toString();
}

function mergeList(list1, list2, merged) {
  if (list1 === null && list2 === null) {
    return null;
  }

  const v1 = list1 && list1.val;
  const v2 = list2 && list2.val;
  const v = v1 != null && v2 != null ? Math.min(v1, v2) : v1 ?? v2;
  merged.next = new ListNode(v);
  merged = merged.next;
  if (v === v1) {
    list1 = list1 && list1.next;
  } else {
    list2 = list2 && list2.next;
  }
  return mergeList(list1, list2, merged);
}

function solutionLoop(list1, list2) {
  const o = new ListNode();
  let temp = o;
  const out = mergeList(list1, list2, temp);
  console.log(o.next.toString(), out);
  return o.next.toString();
}

// const list1 = makeListNode([1, 2, 3, 4]);
// const list2 = makeListNode([-19, 1, 3, 4, 5, 10]);
// console.log("output", solution(list1, list2));

// console.log("o :", solution(makeListNode([1, 2, 4]), makeListNode([1, 3, 4])));

// console.log(
//   "o :",
//   solution(makeListNode([-10, -6, -6, -6, -3, 5]), makeListNode([]))
// );

// console.log("o :", solution(makeListNode([0]), makeListNode([0, 0, 0])));
//console.log("output", solution(makeListNode([]), makeListNode([0])));

//console.log("loop", solutionLoop(makeListNode([0]), makeListNode([0, 0, 0])));
console.log(
  "loop",
  solutionLoop(makeListNode([-10, -6, -6, -6, -3, 5]), makeListNode([]))
);
