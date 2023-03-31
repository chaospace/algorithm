/**
 * 트리 순회
 *
 * 이진트리 모든 노드에 왼쪽, 오른쪽 두 개의 자손이 있는 트리.
 *
 * 유명한 이진트리의 순회순서
 *  - 전위순위( preorder-traverse)
 *  - 중위순위( inorder-traverse )
 *  - 후위순위( postorder-traverse )
 * 모두 왼쪽트리를 먼저 방문한다는 점은 동일하지만 트리의 루트를 언제 방문하는지 다름.
 *
 * 전위순위
 *  - 맨 처음 트리의 루트를 방문 후 왼쪽과 오른쪽을 순서대로 방문.
 * 중위순위
 *  - 왼쪽하위 트리 방문 후 루트를 방문 -> 오른쪽 하위 트리 방문( 이때도 왼쪽 하위 트리부터 시작 )
 *
 * 후위순위
 *  - 왼쪽과 오른쪽 서브트리를 모두 방문한 후 루트를 방문
 *
 * ex)
 *      27
 *     /  \
 *    16   54
 *   /     / \
 *  9     36 72
 *   \
 *    12
 *
 * 전위순회 : 27 -> 16 -> 9 -> 12 -> 54 -> 36 -> 72
 * 중위순회 : 9  -> 12 -> 16 -> 27 -> 36 -> 54 -> 72
 * 후위순회 : 12 -> 9 -> 16 -> 36 -> 72 -> 54 -> 27
 */

/**
 * 실제 트리 구현을 통한 순위구성이 아닌 배열에 순서를 비교해 리턴해야 할 배턴 순서를 조합해 리턴하는 문제.
 * 입력되는 전위순위에 시작 인덱스는 루트에 값이고
 * 이를 통해 후위순위에 정보에서 루트값 인덱스를 기준으로 좌,우 트리 정보를 구분할 수 있다.
 * 전위 순위에 정보를 통해 우측 트리에 시작값을 알 수 있다.
 * 전위 순위는 루트에서 시작해 좌측트리부터 구성하니까 1번째 인덱스보다 큰 값이 나오는 첫 인덱스 값이 우측트리에 시작임을 알 수 있음.
 * @param {*} n  : 트리에 포함된 노드에 수
 * @param {*} orders : 전위순회, 중위순회 했을 때의 노드 방문순서가 n개의 정수로 주어집니다.
 * @returns {*} arr : 해당 트리의 후위순회 시 노드의 방문순서를 리턴
 */
function solution(n, orders) {}

solution(7, [
  [27, 16, 9, 12, 54, 36, 72],
  [9, 12, 16, 27, 36, 54, 72]
]);

/**
 * 이진트리 구성 원리
 * 시작 원소를 루트로 설정한다.
 * 왼쪽에는 루트보다 작을 값을 설정
 * 우측에는 루트보다 큰 값을 설정
 * 문제에서 설명한 세 가지 방식에 따라 트리를 구성해 보자.
 */

function Tree(val) {
  let current = val;
  let left = null;
  let right = null;
  const setValue = val => (current = val);
  const setLeft = node => (left = node);
  const setRight = node => (right = node);
  const getRight = () => right;
  const getLeft = () => left;
  return {
    current,
    getLeft,
    getRight,
    setValue,
    setLeft,
    setRight
  };
}

/**
 * 재귀를 통한 전위순위 로그
 * @param {*} node
 * @returns
 */
const preOrder = node => {
  if (!node) {
    return;
  }
  console.log(node.current); // 루트 노드 출력
  preOrder(node.getLeft()); // 좌측 노드 출력( 재귀호출에 의해 좌측노드 모두를 먼저 순회한다 )
  preOrder(node.getRight()); // 우측 노드 출력( 재귀순서에 따라 우측은 좌측이 모두 출력된 후 노출된다 )
};

const inOrder = node => {
  if (!node) {
    return;
  }

  inOrder(node.getLeft()); // 좌측 노드 출력
  console.log(node.current); // 루트 노드 출력
  inOrder(node.getRight()); // 우측 노드 출력
};

const postOrder = node => {
  if (!node) {
    return;
  }
  postOrder(node.getLeft()); // 좌측 노드 출력
  postOrder(node.getRight()); // 우측 노드 출력
  console.log(node.current); // 루트 노드 출력
};

/**
 * 전위순회
 * ex)
 *      27
 *     /  \
 *    16   54
 *   /     / \
 *  9     36 72
 *   \
 *    12
 *
 * 전위순회 : 27 -> 16 -> 9 -> 12 -> 54 -> 36 -> 72
 * @param {*} node
 */
const preOrderIterative = node => {
  let cNode = node;
  const stack = [];
  while (true) {
    if (cNode != null) {
      console.log(cNode.current);
      //우측노드가 있을 경우 stack에 추가
      if (cNode.getRight()) {
        stack.push(cNode);
      }
      cNode = cNode.getLeft();
    } else if (stack.length) {
      //
      const peakNode = stack.pop(); // 우측노드가 있는 가장 가까운 노드 참조
      cNode = peakNode.getRight();
    } else {
      break;
    }
  }
};

/**
 * 중위순회 while로 처리해 보기
 * @param {*} node
 * [27, 16, 9, 12, 54, 36, 72]
 * [9, 12, 16, 27, 36, 54, 72]
 * 정위순회를 중위순회로 출력하는 순서.
 * 루트를 좌측트리와 우측트리에 중간으로 옮겨야 한다.
 * 루트를 추출 후 stack에 저장([27])
 * 루트에 좌측트리를 따라 이동하며 stack에 저장( 27, 16, 9)
 * 스택은 좌측 최하단 트리값인 9까지 저장하며 노드참조는 null을 가리킴.
 * stack에 마지막 노드를 꺼내며 log호출 후 우측노드를 stack에 저장 ( 27, 16, 12 ) 좌측 최하단 트리까지 탐색 종료
 * stack에 저장된 노드 정보를 확인하며 루트노드까지 올라감.
 * 루트 노드에 도착하면 우측트리 정보를 따라가며 stack에 저장(54, 36 )
 *
 */
const inOrderIterative = node => {
  let cNode = node;
  const stack = [];
  //노드가 유효할 때 까지 반복
  while (true) {
    if (cNode != null) {
      stack.push(cNode); // 시작은 루트노드를 스택에 추가.
      // output =[9, 12, 16, 27, 36, 54, 72]
      cNode = cNode.getLeft(); // 좌측노드 먼저 스택에 저장처리
    } else if (stack.length > 0) {
      cNode = stack.pop();
      console.log(cNode.current);
      cNode = cNode.getRight(); // 우측노드 참조 갱신
    } else {
      // 반복종료
      break;
    }
  }
};

/**
 * while을 이용한 후위순회 처리
 * 좌측 하단 노드에서 시작 우측 하단 노드로 이동하며 루트로 이동
 *
 *      27
 *     /  \
 *    16   54
 *   /     / \
 *  9     36 72
 * / \
 *    12
 *
 * 전위순회 : 27 -> 16 -> 9 -> 12 -> 54 -> 36 -> 72
 * 후위순회 : 12 -> 9 -> 16 -> 36 -> 72 -> 54 -> 27
 * 좌우 노드를 아래부터 순회 후 루트노드를 가장 마지막에 출력되야 함.
 * 1. 루트노드를 시작으로 좌측노드에 끝까지 이동하며 stack에 저장
 * 2. 좌측노드가 더 이상 없으면 스택에 마지막부터 우측노드를 체크
 *  - 우측노드가 있고 이전노드랑 같지 않으면 다음노드로 설정해 stack에 추가
 *  - stack에 추가된 우측노드는 1번을 반복하며 중첩노드 여부를 확인.
 *    - 중첩되지 않은 우측노드는 다시 2번에 도달하고 이때 더 이상 확인할 노드가 없다는 것을 판단 후 vNode에 참조 후 stack에서 제거
 *    - 유효한 노드( 루트노드에 우측노드를 만날 때 까지 )가 나올 때 까지 2번 반복
 *
 * @param {*} node
 */
const postOrderIterative = node => {
  let cNode = node;
  let vNode = null; // 이전 노드
  const stack = []; //stack
  while (true) {
    if (cNode != null) {
      stack.push(cNode);
      cNode = cNode.getLeft();
    } else if (stack.length) {
      const peakNode = stack[stack.length - 1];
      const lNode = peakNode.getRight();
      // 이전노드와 우측노드가 같지 않으면 다음노드로 설정
      if (lNode != null && vNode != lNode) {
        cNode = lNode;
      } else {
        console.log(peakNode.current);
        vNode = stack.pop(); //직전값 기억
      }
    } else {
      break;
    }
  }
};

//
const root = new Tree(27);
root.setLeft(new Tree(16));
root.setRight(new Tree(54));
root.getLeft().setLeft(new Tree(9));
//root.getLeft().getLeft().setLeft(new Tree(1));
root.getLeft().getLeft().setRight(new Tree(12));
root.getRight().setLeft(new Tree(36));
root.getRight().setRight(new Tree(72));
console.log("===== pre-order =====");
//preOrder(root);
preOrderIterative(root);
//console.log("===== in-order =====");
//inOrder(root);
//inOrderIterative(root);
//console.log("===== post-order =====");
//postOrder(root);
//postOrderIterative(root);

class TreeNode {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
  setValue(val) {
    this.value = val;
  }
  setLeft(val) {
    this.left = new TreeNode(val);
  }
  setRight(val) {
    this.right = new TreeNode(val);
  }
}

/**
 * 후위순위
 *  - 왼쪽과 오른쪽 서브트리를 모두 방문한 후 루트를 방문
 *
 * ex)
 *      27
 *     /  \
 *    16   54
 *   /     / \
 *  9     36 72
 *   \
 *    12
 *
 * 후위순회 : 12 -> 9 -> 16 -> 36 -> 72 -> 54 -> 27
 *
 * [27, 16, 9, 12, 54, 36, 72],
 * [9, 12, 16, 27, 36, 54, 72]
 *
 * [12, 9, 16, 36, 72, 54, 27]
 * 전위,후위순회 정보에서 루트를 이용해 좌,우 구분( 27 );
 * L = 3;
 * R = 7 -  1 - L
 */
console.log([27, 16, 9, 12, 54, 36, 72].slice(1, 4));
console.log([9, 12, 16, 27, 36, 54, 72].slice(0, 3));
console.log([27, 16, 9, 12, 54, 36, 72].slice(3 + 1, 7));
console.log([9, 12, 16, 27, 36, 54, 72].slice(3 + 1, 7));
