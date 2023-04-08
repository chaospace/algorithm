function loop(array, startIndex) {
  var minIndex = startIndex;
  var minValue = array[minIndex];

  for (var i = minIndex + 1; i < array.length; i++) {
    console.log("loop", i);
    if (minValue > array[i]) {
      minValue = array[i];
      minIndex = i;
      console.log("change-minIndex", minIndex);
    }
  }

  console.log("minIndex", minIndex, "value", minValue);
}

loop([18, 6, 66, 44, 9, 22, 14], 2);
