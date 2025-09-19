// given array, write a function that sorts the products by price 
// in ascending order and returns the sorted array.

const products = [
    { name: "Hammer", price: 25 },
    { name: "Drill", price: 100 },
    { name: "Screwdriver", price: 10 },
    { name: "Saw", price: 50 }
  ];

function sortDataByNumericalValue(array) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sorthttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    return array.sort((a, b) => a.price - b.price)
}

console.log(sortDataByNumericalValue(products))