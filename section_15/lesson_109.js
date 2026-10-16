var numberOfBottles = 99;

function beerCountLine(n, end) {
  // end: "," or " on the wall" or " on the wall."
  if (n === 0) {
    return "No more bottles of beer" + end;
  }
  if (n === 1) {
    return "1 bottle of beer" + end;
  }
  return n + " bottles of beer" + end;
}

while (numberOfBottles >= 0) {
  console.log(beerCountLine(numberOfBottles, " on the wall"));
  console.log(beerCountLine(numberOfBottles, ","));
  console.log("Take one down, pass it around,");
  numberOfBottles--;
  console.log(beerCountLine(numberOfBottles, " on the wall."));
}
