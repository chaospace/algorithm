class Comparator {
  constructor(compareFunc) {
    this.compare = compareFunc || Comparator.defaultCompareFunction;
  }

  static defaultCompareFunction(a, b) {
    if (a === b) {
      return 0;
    }
    return a < b ? -1 : 1;
  }

  equal(a, b) {
    return this.compare(a, b) === 0;
  }

  lessThan(a, b) {
    return this.compare(a, b) < 0;
  }

  greaterThan(a, b) {
    return this.compare(a, b) > 0;
  }

  lessThanOrEqual(a, b) {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  greaterThanOrEqual(a, b) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  reverse() {
    const original = this.compare;
    this.compare = (a, b) => original(b, a);
  }
}

//
class Heap {
  constructor(comparatorFunction) {
    if (new.target === Heap) {
      throw new TypeError("Cannot construct Heap instance directly");
    }
    this.heapContainer = [];
    this.compare = new Comparator(comparatorFunction);
  }

  getLeftChildrenIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  getRightChildrenIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }

  hasLeftChild(parentIndex) {
    return this.getLeftChildrenIndex(parentIndex) < this.heapContainer.length;
  }

  hasRightChild(parentIndex) {
    return this.getRightChildrenIndex(parentIndex) < this.heapContainer.length;
  }

  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildrenIndex(parentIndex)];
  }

  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildrenIndex(parentIndex)];
  }

  parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  swap(indexWon, indexTwo) {
    const temp = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = this.heapContainer[indexWon];
    this.heapContainer[indexWon] = temp;
  }

  peek() {
    if (this.heapContainer.length === 0) {
      return null;
    }
    return this.heapContainer[0];
  }

  poll() {
    if (this.heapContainer.length === 0) {
      return null;
    }
    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop();
    }
    const item = this.heapContainer[0];
    this.heapContainer[0] = this.heapContainer.pop();
    this.heapifyDown();
    return item;
  }

  add(item) {
    this.heapContainer.push(item);
    this.heapifyUp();
    return this;
  }

  remove(item, comparator = this.compare) {
    const numberOfItemsRemove = this.find(item, comparator).length;

    for (let iteration = 0; iteration < numberOfItemsRemove; iteration += 1) {
      const indexToRemove = this.find(item, comparator).pop();
      if (indexToRemove === this.heapContainer.length - 1) {
        this.heapContainer.pop();
      } else {
        this.heapContainer[indexToRemove] = this.heapContainer.pop();
        const parentItem = this.parent(indexToRemove);
        if (
          this.hasLeftChild(indexToRemove) &&
          (!parentItem ||
            this.pairIsInCorrectOrder(
              parentItem,
              this.heapContainer[indexToRemove]
            ))
        ) {
          this.heapifyDown(indexToRemove);
        } else {
          this.heapifyUp(indexToRemove);
        }
      }
    }
    return this;
  }

  find(item, comparator = this.compare) {
    const foundItemIndices = [];
    for (
      let itemIndex = 0;
      itemIndex < this.heapContainer.length;
      itemIndex += 1
    ) {
      if (comparator.equal(item, this.heapContainer[itemIndex])) {
        foundItemIndices.push(itemIndex);
      }
    }
    return foundItemIndices;
  }

  isEmpty() {
    return !this.heapContainer.length;
  }

  toString() {
    return this.heapContainer.toString();
  }

  heapifyUp(customStartIndex) {
    let currentIndex = customStartIndex || this.heapContainer.length - 1;
    while (
      this.hasParent(currentIndex) &&
      !this.pairIsInCorrectOrder(
        this.parent(currentIndex),
        this.heapContainer[currentIndex]
      )
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex)); // 현재와 부모인덱스를 swap
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  heapifyDown(customStartIndex = 0) {
    let currentIndex = customStartIndex;
    let nextIndex = null;

    while (this.hasLeftChild(currentIndex)) {
      // 순서가 올바르면 다음은 우측노드
      if (
        this.hasRightChild(currentIndex) &&
        this.pairIsInCorrectOrder(
          this.rightChild(currentIndex),
          this.leftChild(currentIndex)
        )
      ) {
        nextIndex = this.getRightChildrenIndex(currentIndex);
      } else {
        // 그렇지 않으면 좌측노드
        nextIndex = this.getLeftChildrenIndex(currentIndex);
      }

      if (
        this.pairIsInCorrectOrder(
          this.heapContainer[currentIndex],
          this.heapContainer[nextIndex]
        )
      ) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  pairIsInCorrectOrder(firstElement, secondElement) {
    throw new Error(
      `you have to implement heap pair comparision method for ${firstElement} and ${secondElement} values`
    );
  }
}

class MinHeap extends Heap {
  pairIsInCorrectOrder(firstElement, secondElement) {
    return this.compare.lessThanOrEqual(firstElement, secondElement);
  }
}

class MaxHeap extends Heap {
  pairIsInCorrectOrder(firstElement, secondElement) {
    return this.compare.greaterThanOrEqual(firstElement, secondElement);
  }
}

module.exports = {
  MaxHeap,
  MinHeap,
  Comparator,
};
