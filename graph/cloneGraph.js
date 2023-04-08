/**
 * graph클론
 */

class GraphVertex {
  constructor(value) {
    this.value = value;
    this.edges = [];
  }
}

function cloneGraph(g) {
  if (g == null) {
    return null;
  }

  let vertexMap = {};
  let queue = [g];

  vertexMap[g] = new GraphVertex(g.value);
  while (queue.length) {
    let current = queue.shift();
    current.edges.forEach(v => {
      if (!vertexMap[v]) {
        vertexMap[v] = new GraphVertex(v.value);
        queue.push(v);
      }
      vertexMap[current].edges.push(vertexMap[v]);
    });
  }
  return vertexMap[g];
}

let n1 = new GraphVertex(1);
let n2 = new GraphVertex(2);
let n3 = new GraphVertex(3);
let n4 = new GraphVertex(4);

n1.edges.push(n2, n4);
n2.edges.push(n1, n3);
n3.edges.push(n2, n4);
n4.edges.push(n1, n3);
const cloneN1 = cloneGraph(n1);
console.log(cloneN1);
