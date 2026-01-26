
console.log("sum module execute");

function calculateSum(a, b) {
   
    const sum = a + b;
    console.log(sum);
}

//module.exports = calculateSum;
module.exports = { calculateSum}
