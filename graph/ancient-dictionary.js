/**
 * 고대어 사전
 * abcdefghijklmnopqrstuvwxyz
 * 고대언어 a는 알파벳들의 순서가 영어와 서로 다를 뿐, 사전의 단어들은 사전순서대로 배치되어 있다.
 * 예를 들어 다섯 단어, gg, kia, lotte, lg, hanwa가 사전 순대로 적혀 있다고 합시다.
 * kia보다 gg가 앞에 오려면 g가 k보다 앞에 와야 함.
 * 같은 원리로 k는 l과, h보다 앞에 온다.
 * 이들을 조합해보면 o, g, k, l, h의 상대적 순서를 알 수 있다.
 * 사전에 포함된 단어들의 목록이 순서대로 주어질 때 이 언어에서 알파벳순서를 계산하는 프로그램을 작성.
 */

/**
 * 6, 10
 * 10, 6, 9, 8, 7, 1, 2, 3, 4, 5
 */
const topologicalSortFoo = () => {
  const adj = [[], [2], [3], [4], [5], [], [7, 8, 9], [1], [2], [4], [3]];
  let stack = [];
  const visited = Array(adj.length).fill(false);
  const dfs = index => {
    visited[index] = true;
    for (let i = 0; i < adj[index].length; i++) {
      const there = adj[index][i];
      if (!visited[there]) {
        dfs(there);
      }
    }
    stack.push(index);
  };

  for (let i = 0; i < adj.length; i++) {
    //stack = [];
    if (!visited[i]) {
      dfs(i);
    }
  }
  console.log("stack", stack, "reverse", [...stack].reverse());
};

const alphabet = "abcdefghijklmnopqrstuvwxyz";
let fixed = [];
const makeGraph = words => {
  const adj = Array(alphabet.length)
    .fill(1)
    .map(() => Array(alphabet.length).fill(0));
  const base = "a".charCodeAt(0);
  for (let i = 1; i < words.length; i++) {
    const j = i - 1;
    const len = Math.min(words[j].length, words[i].length);
    for (let k = 0; k < len; k++) {
      if (words[j][k] !== words[i][k]) {
        const a = words[j].charCodeAt(k) - base;
        const b = words[i].charCodeAt(k) - base;
        adj[a][b] = 1;
        const hasA = fixed.includes(a);
        const hasB = fixed.includes(b);
        //경우의 수 둘다 없는 경우
        if (!hasA && !hasB) {
          fixed = [...fixed, a, b];
          // hasA !hasB
        } else if (hasA && !hasB) {
          fixed = [...fixed, b];
          // a는 없고 b만 있는 경우
        } else if (!hasA && hasB) {
          const idx = fixed.indexOf(b);
          fixed = [...fixed.slice(0, idx), a, ...fixed.slice(idx)];
        }
        break;
      }
    }
  }
  return adj;
};
function solution(words) {
  const graph = makeGraph(words);
  let stack = [];
  const visited = Array(alphabet.length).fill(0);
  const dfs = index => {
    visited[index] = 1;
    for (let i = 0; i < graph.length; i++) {
      const hasEdge = graph[index][i];
      if (hasEdge && !visited[i]) {
        dfs(i);
      }
    }
    stack.push(index);
  };

  for (let i = 0; i < graph.length; i++) {
    if (!visited[i]) {
      dfs(i);
    }
  }

  let order = [...stack.reverse()];
  const a = [...fixed, ...stack.filter(v => !fixed.includes(v))];

  // 주어진 단어의 유효성체크 단어의 사전순 여부 체크
  loop1: for (let i = 0; i < stack.length; i++) {
    for (let j = i + 1; j < stack.length; j++) {
      if (graph[order[j]][order[i]]) {
        order = [];
        break loop1;
      }
    }
  }

  let msg = "";
  if (order.length) {
    for (let v of a) {
      msg += alphabet[v];
    }
  }

  console.log("msg", msg);
}
// topologicalSortFoo();
solution(["ba", "aa", "ab"]);
solution(["gg", "kia", "lotte", "lg", "hanwa"]);
//console.log("graph", graph);
