/**
 * linkedList 객체
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

ListNode.prototype.toString = function () {
  const arr = isNaN(this.val) ? [] : [this.val];
  let n = this.next;
  while (n) {
    arr.push(n.val);
    n = n.next;
  }
  return arr;
};

/**
 * input배열을 ListNode로 반환
 * @param {*} input
 * @returns
 */
function makeListNode(input) {
  let head = new ListNode();
  let o = head;
  while (input.length) {
    const item = input.shift();
    //console.log("item", item, Array.isArray(item));
    if (Array.isArray(item)) {
      o.next = makeListNode(item);
    } else {
      o.next = new ListNode(item);
    }

    o = o.next;
  }
  return head.next;
}

function log(...args) {
  let r = "";
  for (let item of args) {
    r += `[${item.toString()}] `;
  }
  console.log(r);
}

const linkedList = {
  ListNode,
  makeListNode,
  log
};

module.exports = linkedList;
