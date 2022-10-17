/**
 * 주어진 ListNode에서 이웃한 노드를 서로 swap후 반환
 * 노드의 value를 직접 제어하지 않고 서로 swap을 이용한 해결.
 * input = [1,2,3,4];
 * output= [2,1,4,3];
 *
 * input = []
 * output =[];
 *
 * input  =[1]
 * output =[1]
 */

const { ListNode } = require("./libs/ListNode");
const listNode = require("./libs/ListNode");
const { makeListNode } = listNode;

/*
  swap을 처리를 참조 변경만 통해서는 while로 하기는 쉽지 않음.
  재귀를 이용한 접근이 필요함.

*/

function swapList(head) {
  if (!head || !head.next) return head;

  const n1 = head,
    n2 = n1.next,
    n3 = n2.next;
  n2.next = n1;
  n1.next = swapList(n3);

  return n2;
}

function solutionLoop(head) {
  const o = swapList(head);
  return o.toString();
}

console.log("o", solutionLoop(makeListNode([1, 2, 3, 4])));
