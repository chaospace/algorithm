const { MaxHeap, MinHeap } = require("./heap");
const { log } = require("../libs/util");

const maxHeap = new MaxHeap();
maxHeap.add(5);
maxHeap.add(1);
maxHeap.add(10);
maxHeap.add(8);
log("empty", maxHeap.isEmpty());
log("peek", maxHeap.peek());
log("string", maxHeap.toString());
// 가장 앞에서 제거하며 가져오기
//log("poll", maxHeap.poll());

const minHeap = new MinHeap();

minHeap.add(30);
minHeap.add(3);
minHeap.add(1);
minHeap.add(10);
minHeap.add(0);
log("minHeap", minHeap.toString());
log("peek", minHeap.peek());
log("list", Math.floor(0 / 2));
