/*

a = 100
This is file last line
Process nextTick
Promise
Time expired
Set Immediate
this file is readed
2nd Process nextTick
2nd Set Immediate
2nd Time expired

*/
const fs = require("fs");

var a  = 100;
setImmediate(()=>{
    console.log("Set Immediate");
});


Promise.resolve("Promise").then(console.log);


fs.readFile("./file.txt","utf8",()=>{
    setTimeout(()=>{
        console.log("2nd Time expired");
    });

    process.nextTick(()=>{
       console.log("2nd Process nextTick");
    });

    setImmediate(()=>{
        console.log("2nd Set Immediate");
    });

    console.log("this file is readed");

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