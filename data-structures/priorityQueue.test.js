const { log } = require("../libs/util");
const PriorityQueue = require("./priorityQueue");

const priorityQueue = new PriorityQueue();
log("queue", priorityQueue);
priorityQueue.add(4);
priorityQueue.add(300);
priorityQueue.add(300);
priorityQueue.add(10);
priorityQueue.remove(300);
log("peek", priorityQueue.peek());
log("toString", priorityQueue.toString());
log("priorities", priorityQueue.priorities);
