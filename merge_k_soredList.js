/**
 * 정렬된 k개의 리스트 배열을 하나의 정렬된 리스트로 머지해서 리턴
 *
 * input
 *  [[1,4,5],[1,3,4],[2,6]]
 *
 * output
 *  [1,1,2,3,4,4,5,6]
 *
 * 중첩된 리스트를 하나의 정렬된 리스트로 만들어 반환
 * plattenMap의 list버전?
 */

const listNode = require("./libs/ListNode");
const { ListNode, makeListNode } = listNode;
function solution(input) {
  const soredList = [];
  const len = input.length;
  let totalLen = 0;
  for (let i = 0; i < len; i++) {
    totalLen += input[i].length;
  }

  // 전체 배열의 길이가 같을 때 가지 반복.
  while (true) {
    let idx = { v: 9999, stack: [] };
    for (let i = 0; i < input.length; i++) {
      let value = input[i][0];
      //console.log("value", value);
      if (!isNaN(value) && idx.v >= value) {
        idx.stack.push(i);
        idx.v = value;
      }
    }

    if (idx.stack.length) {
      while (idx.stack.length) {
        soredList.push(input[idx.stack.shift()].shift());
      }
    } else {
      break;
    }
  }
  console.log("sored", soredList);
  console.log("input", input.length);
  //console.log(input[0].toString(), input[1].toString());
}

function solutionList(lists) {
  function loop(input) {
    const stack = [];
    let value = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < input.length; i++) {
      //console.log(input[i].val);
      if (input[i] && value >= input[i].val) {
        value = input[i].val;
        stack.push(value);
        input[i] = input[i].next;
      }
    }
    return stack;
  }
  const o = new ListNode();
  let p = o;
  while (true) {
    let stack = loop(lists);
    if (stack.length) {
      while (stack.length) {
        const value = stack.shift();
        p.next = new ListNode(value);
        p = p.next;
      }
    } else {
      break;
    }
  }
  console.log("o.next", o.next.toString());
  return o.next;
}

/**
 * 배열을 이용한 정렬
 * 마지막 요소의 값과 비교하며 배열에 순서대로 정렬 후
 * 리스트를 만들어 반환
 */
// function solutionListRecursive(lists) {
//   const mergeList = stack => {
//     let hasNode = false;
//     for (let i = 0; i < lists.length; i++) {
//       let node = lists[i];
//       if (node) {
//         hasNode = true;
//         // 추가 값이 마지막 보다 같거나 클경우
//         if (node.val >= stack[stack.length - 1].val) {
//           stack.push(node);
//           lists[i] = node.next;
//         } else {
//           let j = stack.length - 2;
//           while (j > -1) {
//             if (stack[j].val < node.val) {
//               stack.splice(j + 1, 0, node);
//               lists[i] = node.next;
//               j = -1;
//             }
//             j--;
//           }
//         }
//       }
//     }

//     if (!hasNode) {
//       return stack;
//     }
//     return mergeList(stack);
//   };
//   const o = mergeList([new ListNode()]);
//   const head = o.shift();
//   let temp = head;
//   while (o.length) {
//     const a = o.shift();
//     temp.next = o.shift();
//     temp = temp.next;
//   }
//   return head.next.toString();
// }

// console.log(
//   "o",
//   solutionListRecursive([
//     makeListNode([1, 4, 5]),
//     makeListNode([1, 3, 4]),
//     makeListNode([2, 6])
//   ])
// );

// console.log(
//   "o",
//   solutionList([
//     makeListNode([1, 2, 3]),
//     makeListNode([3, 6]),
//     makeListNode([9, 19, 30])
//   ])
// );
// solution([
//   [1, 2, 3],
//   [3, 6],
//   [1, 3, 5]
// ]);

function solutionPriorityQueue(lists) {
  const queue = [];

  function appendQueue(item) {
    while (item) {
      queue.push({
        val: item.val,
        node: item
      });
      item = item.next;
    }
  }

  lists.forEach(list => {
    appendQueue(list);
  });

  queue.sort((a, b) => a.val - b.val);
  // console.log("arr", queue);
}
/*
makeListNode([1, 2, 3]),
  makeListNode([3, 6]),
  makeListNode([1, 3, 5])
*/
// solutionPriorityQueue([makeListNode([])]);

function merge(left, right) {
  if (!left) {
    return right;
  } else if (!right) {
    return left;
  } else if (left.val < right.val) {
    // 현재는 우측이 크지만 다음과 현재는 어떤지 비교.
    left.next = merge(left.next, right);
    return left;
  } else {
    right.next = merge(left, right.next);
    return right;
  }
}

function helper(lists, start, end) {
  if (start === end) {
    return lists[start];
  } else if (start < end) {
    const mid = parseInt((start + end) / 2);
    const left = helper(lists, start, mid);
    const right = helper(lists, mid + 1, end);
    console.log("start", start, "mid", mid, "end", end);
    console.log("left", left.toString(), "right", right.toString());
    return merge(left, right);
  } else {
    return null;
  }
}

var mergeKLists = function (lists) {
  const o = helper(lists, 0, lists.length - 1);
  return o.toString();
};

console.log(
  "merge",
  merge(makeListNode([1, 2, 3]), makeListNode([3, 6])).toString()
);
