/**
 * 포트리스
 * 성벽에 대한 정보가 주어질 때 두 지점간 성벽을 최대 몇 번 통과해야 하는지 출력
 *  - 한번만 이동할 수도 있지만 최대라고 했으니 가장 큰 경우의 수 반환하면 됨.
 * 성벽 정보는 배열로 전달되며 순서대로, x, y, r(반지름)
 * 입력에 처음은 외벽이며 다른 모든 성벽을 포함.
 *
 * 이진트리에 구성
 * 시작값을 루트로 두고
 * 루트보다 작은 값은 좌측에서 이진으로 구성
 * 루트보다 큰 값은 우측에서 이진으로 구성
 * ex)
 * [5, 5, 15],
 * [5, 5, 10],
 * [5, 5, 5]
 *
 *  15
 *  /
 * 10
 * /
 * 5
 *
 * 좌표정보를 분석해 트리구조를 만든 후 트리의 깊이를 분석한다.
 */

function getDistance(dx, dy) {
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * 두 원 a,b의 포함여부를 반환
 * 포함여부는
 *  - 두 원(a,b)의 중점의 거리차 보다 a,b의 반지름의 거리차가 더 크고
 *  - a의 반지름이 b보다 크다면
 * => a는 b를 포함하는 더 큰 원.
 * @param {*} a
 * @param {*} b
 * @returns
 */
function contains(a, b) {
  const [ax, ay, ar] = a;
  const [bx, by, br] = b;
  const dx = ax - bx;
  const dy = ay - by;
  const dr = ar - br;

  return ar > br && getDistance(dx, dy) < getDistance(dr, 0);
}

class TreeNode {
  constructor(val, parent = null) {
    this.parent = parent;
    this.value = val;
    this.children = [];
  }

  toString() {
    let msg = {};
    if (!msg[this.value]) {
      msg[this.value] = [];
    }
    for (let i = 0; i < this.children.length; i++) {
      msg[this.value].push(this.children[i].toString());
    }
    return msg;
  }
}

function isContains(parent, child, walls) {
  // 상위 원과 포함관계가 아니면 제외
  if (!contains(walls[parent], walls[child])) return false;
  for (let i = 0; i < walls.length; i++) {
    // 포함관계가 중첩되는 경우 제외
    if (
      parent != i &&
      child != i &&
      contains(walls[parent], walls[i]) &&
      contains(walls[i], walls[child])
    ) {
      return false;
    }
  }
  return true;
}

/**
 * 재귀를 통한 트리노드 구성
 * @param {*} root
 * @param {*} walls
 * @param {*} parent
 * @returns
 */
function composeTreeInfo(root, walls, parent = null) {
  let node = new TreeNode(root, parent);
  for (let i = 0; i < walls.length; i++) {
    if (isContains(root, i, walls)) {
      node.children.push(composeTreeInfo(i, walls, root));
    }
  }
  return node;
}

/**
 * 주어진 성벽정보를 통해 이동을 위해 넘어야할 최대 성벽의 수를 반환
 *
 * @param {*} walls : 성벽의 정보(x,y,r(반지름))을 나타내는 2중 배열
 * 첫 정보는 모든 성벽을 감싸는 외곽정보.
 *
 */
function solution(walls) {
  // 점의 포함여부를 판단해 맵정보 확보.
  //   const info = {};
  //   for (let i = 0; i < walls.length; i++) {
  //     let fixed = i;
  //     info[i] = [];
  //     for (let j = 0; j < walls.length; j++) {
  //       if (j === fixed) continue;
  //       if (contains(walls[fixed], walls[j])) {
  //         info[i].push(j);
  //       }
  //     }
  //   }
  //console.log("info", info);

  const tree = composeTreeInfo(0, walls);
  console.log("tree", tree.toString());
}

solution([
  [21, 15, 20],
  [15, 15, 10],
  [13, 12, 5],
  [12, 12, 3],
  [19, 19, 2],
  [30, 24, 5],
  [32, 10, 7],
  [32, 9, 4]
]);
