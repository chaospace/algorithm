/**
 * 방향성을 가진 그래프를 통해
 * 교착상태 여부를 판단하는 프로그램 작성
 *
 * linkedList
 */

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertAtHead(data) {
    let temp = new Node(data);
    temp.next = this.head;
    this.head = temp;
    return this;
  }

  getHead() {
    return this.head;
  }
}

class Graph {
  constructor(vertices) {
    this.vertices = vertices;
    this.list = [];
    for (let i = 0; i < vertices; i++) {
      this.list.push(new LinkedList());
    }
  }
  addEdge(source, destination) {
    if (source < this.vertices && destination < this.vertices) {
      this.list[source].insertAtHead(destination);
    }
    return this;
  }
}

const COLORS = {
  WHITE: "white",
  GRAY: "gray",
  BLACK: "black"
};

function isDeadlocked(g) {
  let colors = [];
  for (let i = 0; i < g.vertices; i++) {
    colors[i] = COLORS.WHITE;
  }
  for (let i = 0; i < g.vertices; i++) {
    //console.log("g.list[i]", i, g.list[i].getHead()?.data);
    if (colors[i] == COLORS.WHITE) {
      if (detectCycle(g, i, colors)) {
        return true;
      }
    }
  }
  return false;
}

function detectCycle(g, currentVertex, colors) {
  //해당 노드를 진행중 상태로 변경
  colors[currentVertex] = COLORS.GRAY;
  console.log("colors-v", currentVertex, colors);
  let neighbor;
  let nextNode = g.list[currentVertex].getHead();
  //console.log("next", nextNode, "data", nextNode?.data);
  if (nextNode !== null) {
    neighbor = nextNode.data;
    console.log("neighor", neighbor);
    if (colors[neighbor === COLORS.GRAY]) {
      return true;
    }
    if (colors[neighbor] === COLORS.WHITE && detectCycle(g, neighbor, colors)) {
      return true;
    }
  }
  colors[currentVertex] = COLORS.BLACK;
  return false;
}

const graph = new Graph(3);

graph.addEdge(0, 1);
graph.addEdge(0, 2);

console.log(isDeadlocked(graph));
