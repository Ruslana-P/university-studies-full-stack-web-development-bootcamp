function fibonacciGenerator(n) {
  //Do NOT change any of the code above 👆

  //Write your code here:
  var outputArray = [];

  for (var i = 0; i < n; i++) {
    if (i === 0) {
      outputArray.push(0);
    } else if (i === 1) {
      outputArray.push(1);
    } else {
      outputArray.push(outputArray[i - 1] + outputArray[i - 2]);
    }
  }

  return outputArray;

  //Return an array of fibonacci numbers starting from 0.

  //Do NOT change any of the code below 👇
}
