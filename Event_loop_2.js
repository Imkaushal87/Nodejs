/*

Promise
a = 100
This is file last line
Process nextTick
Promise
Time expired
File read call back
Set Immediate

*/
const fs = require("fs");

var a  = 100;
setImmediate(()=>{
    console.log("Set Immediate");
});


Promise.resolve("Promise").then(console.log);

/*

console.log("Promise") is executed IMMEDIATELY

Its return value (undefined) is passed to .then()

So this line behaves like:

console.log("Promise"); // runs immediately
Promise.resolve("Promise").then(undefined);

*/

Promise.resolve("Promise").then(console.log("Promise"));


fs.readFile("./file.txt","utf8",()=>{
    console.log("File read call back");
});


setTimeout(()=>{
    console.log("Time expired");
});

process.nextTick(()=>{
    console.log("Process nextTick");
});

function print(){
    console.log("a = ",a);
}

print();
console.log("This is file last line");