const fs = require("fs");

var a  = 100;
setImmediate(()=>{
    console.log("Set Immediate");
});

fs.readFile("./file.txt","utf8",()=>{
    console.log("File read call back");
});
setTimeout(()=>{
    console.log("Time expired");
});

function print(){
    console.log("a = ",a);
}

print();
console.log("This is file last line");