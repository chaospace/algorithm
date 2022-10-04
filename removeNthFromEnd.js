/**
 * 리스트의 마지막에서 n번째에 해당하는 노드 제거 후 반환
 * input => [1, 2, 3, 4, 5]
 * n => 2
 * output => [1, 2, 3, 5]
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;

  this.toString = function () {
    const arr = [];
    let n = this.next;
    arr.push(this.val);
    while (n) {
      arr.push(n.val);
      n = n.next;
    }
    return arr;
  };
}

function getList(input) {
  const l = new ListNode();
  let o = l;
  while (input.length) {
    const a = input.shift();
    o.next = new ListNode(a);
    o = o.next;
  }
  return l.next;
}

/**
 * 배열 뒤집기를 생각해 보자
 * input  = [1,2,3,4];
 * output = [4, 3, 2, 1];
 * @param {*} list
 */
function reverseList(head) {
  let temp = null;
  while (head) {
    // 원본 기억
    let swap = head.next;
    // 다음 값에 temp(이전)값 대입
    head.next = temp;
    // 현재값(이전값 포함)을 다시 temp에 대입
    temp = head;
    // head를 다음 값으로 설정
    head = swap;
  }
  //temp.next = list;
  console.log("temp", temp.toString());
}
/**
 * 순서대로 하면 쉬운데 리스트의 마지막에서 n에 해당하는 것을 지워야 함.
 * list의 길이는 어떻게 파악할 수 있나..
 * @param {*} head
 * @param {*} n
 */
function solution(node, n) {
  console.log(node.toString());
  let dummy = new ListNode(0, node);
  let slow = dummy;
  let fast = node;
  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }
  console.log("before", fast);
  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  console.log("slow", slow.toString());
  console.log("fast", fast);
  console.log("output", dummy.next.toString());
}
// const list = getList([1, 2, 3, 4]);
// console.log(list.toString());
solution(getList([1, 2, 3, 4, 5]), 2);
//reverseList(getList([1, 2, 3, 4]));

// var removeNthFromEnd = function (head, n) {
//   let dummy = new ListNode(0, head);
//   let prev = dummy;
//   let node = head;
//   let count = 1;
//   while (node.next) {
//     if (count === n) {
//       prev = prev.next;
//     } else {
//       count++;
//     }
//     node = node.next;
//   }
//   prev.next = prev.next.next;
//   return dummy.next;
// };
