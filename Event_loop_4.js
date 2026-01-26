/*
This is file last line
nextTick
Promise
inner nextTick
Time expired
Set Immediate
File read call back
*/
const fs = require("fs");


setImmediate(()=>{
    console.log("Set Immediate");
});

setTimeout(()=>{
    console.log("Time expired");
});

Promise.resolve("Promise").then(console.log);


fs.readFile("./file.txt","utf8",()=>{
    console.log("File read call back");
});


process.nextTick(()=>{
    process.nextTick(()=>{
        console.log("inner nextTick");
    });
    console.log(" nextTick");
});

console.log("This is file last line");