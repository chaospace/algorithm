/**
 * 주어진 리스트에 k번째 노드는 모두 reverse 후 리턴, k배에 해당하지 않은 노드는 유지
 * 리스트의 value를 수정할 수 없고 노드 자체를 조작해야 함.

 
 * input :[1, 2, 3, 4 ,5], k = 2 두 개씩 리버스
 * output:[2, 1, 4, 3, 5]
 *
 *
 * input : [1, 2, 3, 4, 5, 6, 7, 8, 9], k = 5;
 * output: [5, 4, 3, 2, 1, 6, 7, 8, 9]
 *
 * input : [1, 2, 3, 4, 5, 6, 7, 8, 9], k = 3;
 * ontput: [3, 2, 1, 6, 5, 4, 9, 8, 7]
 *
 *
 * list의 총 길이가 k에 해당하는지 아닌지는 판단하고 reverse를 적용해야 함.
 * 미리 k번째 까지 루프를 돌며 stack을 구성
 * stack의 길이가 k와 같으면 reverse와 동시에 마지막에 head를 추가
 */

const listNode = require("./libs/ListNode");
const { makeListNode, ListNode } = listNode;

/**
 * k번에 해당하는 만큼 노드를 reverse시킴
 * reverse를 하며 origin참조를 유지하려면?
 * 마지막 리스트와 연결해야 할 group을 같이 리턴해 줘야 한다.
 * @param {*} head
 * @param {*} prev
 * @param {*} k
 */
function reverseNodeKInGroup(head, prev, k = 1) {
  let origin = new ListNode();
  let temp = origin;
  // 시작 노드가 마지막 참조가 됨.
  let reverse = prev.next;
  const headRef = head; // 시작 시 노드를 기억
  while (k >= 1 && head) {
    const ref = head.next;
    temp.next = new ListNode(head.val);
    temp = temp.next;
    head.next = reverse;
    reverse = head;
    head = ref;
    k--;
  }
  // 시작 리스트의 다음값을 조건에 따라 설정
  prev.next = k > 0 ? origin.next : reverse;
  // 마지막 참조를 리턴
  return k > 0 ? temp : headRef;
}

function getGroupHeader(head, k) {
  let temp = head;
  let listID = 0;
  const group = [];
  while (temp) {
    if (listID % k === 0) {
      group.push(temp);
    }
    temp = temp.next;
    listID++;
  }
  return group;
}

/**
 * list를 미리 순회하지 않고 reverse여부를 판단 할 수 있는 방법은?
 *  - 매번 k번 루프를 돌며 다음 요소여부를 판단한다.
 *  - 전체를 미리 파악해서 나머지로 파악한다.
 *  - reverse를 시키면 next에 바로 이어서 붙이기 위해 다시 참조를 마지막으로 돌려야 한다.
 *
 *  - 항상 이전을 기억하는 리스트를 가지고 가며 조건에 해당하지 않는 순간 리버스와 함께 현재 목록을 이어 붙인다.
 *
 *  루프를 돌며 조각을 원본 목록에 추가하고 싶다면?..
 * @param {*} head
 * @param {*} k
 */
function solution(head, k = 1) {
  let group = getGroupHeader(head, k);

  let o = new ListNode();
  let ref = o;
  while (group.length) {
    ref = reverseNodeKInGroup(group.shift(), ref, k);
  }

  console.log("o", o.next.toString());
}

function reverseNode(startNode, endNode) {
  let head = startNode;
  let next = null;
  let prev = null;
  while (head && head !== endNode) {
    next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}

/**
 * 참조를 이용한 재귀
 * @param {*} head
 * @param {*} k
 * @returns
 */
function priorLearnList(head, k) {
  let temp_k = k;

  let current = head;
  while (temp_k > 0 && current) {
    current = current.next;
    temp_k -= 1;
  }
  // k 전에 참조를 잊었으면 초기값 반환
  if (temp_k > 0) {
    return head;
  }

  const lastNode = head;
  const groupHead = reverseNode(head, current);
  if (current) {
    lastNode.next = priorLearnList(current, k);
  }

  return groupHead;
}

/**
 * 배열을 이용한 리스트 구성
 * 코드 상 가장 명확하지만 배열에 push, pop때문인지 속도는 참조를 이용한 구성과 비교해 2배 정도 차이가 발생.
 * @param {*} head
 * @param {*} k
 */
function solutionKGroup(head, k) {
  let stack = [];
  let newNode = new ListNode();
  let temp = newNode;

  while (head) {
    for (let i = 0; i < k && head; i++) {
      stack.push(head);
      head = head.next;
    }
    if (stack.length === k) {
      while (stack.length) {
        temp.next = stack.pop();
        temp = temp.next;
      }
      temp.next = head;
    }
  }

  console.log("o", newNode.next.toString());
}

console.log(
  "result",
  priorLearnList(makeListNode([1, 2, 3, 4, 5, 9]), 9).toString()
);
