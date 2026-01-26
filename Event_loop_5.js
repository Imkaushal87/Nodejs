/*
This is file last line
 nextTick
inner nextTick
Promise
nextTick Promise
inner nextTick Promise
Time expired
setTimeout nextTick
setTimeout Promise
setTimeout nextTick Promise
Set Immediate
Set Immediate inner nextTick
Set Immediate Promise
Set Immediate nextTick Promise
setTimeout Set Immediate
setTimeout setImmediate nextTick
setTimeout Set Immediate Promise
setTimeout setImmediate nextTick Promise
File read call back
readFile  nextTick
readFile Promise
readFile  nextTick Promise
readFile Set Immediate
readFile setImmediate nextTick
readFile setImmediate Promise
readFile setImmediate nextTick Promise

*/
const fs = require("fs");


setImmediate(()=>{
    console.log("Set Immediate");
    process.nextTick(()=>{
        console.log("Set Immediate inner nextTick");
        Promise.resolve("Set Immediate nextTick Promise").then(console.log);
    });
    Promise.resolve("Set Immediate Promise").then(console.log);
});

setTimeout(()=>{
    console.log("Time expired");
    process.nextTick(()=>{
        console.log("setTimeout nextTick");
        Promise.resolve("setTimeout nextTick Promise").then(console.log);
    });

    Promise.resolve("setTimeout Promise").then(console.log);

    setImmediate(()=>{
        console.log("setTimeout Set Immediate");
        process.nextTick(()=>{
          console.log("setTimeout setImmediate nextTick");
         Promise.resolve("setTimeout setImmediate nextTick Promise").then(console.log);
        });

       Promise.resolve("setTimeout Set Immediate Promise").then(console.log);
    });
    
});

Promise.resolve("Promise").then(console.log);


fs.readFile("./file.txt","utf8",()=>{
    setImmediate(()=>{
       console.log("readFile Set Immediate");
       process.nextTick(()=>{
          console.log("readFile setImmediate nextTick");
          Promise.resolve("readFile setImmediate nextTick Promise").then(console.log);
        });
      Promise.resolve("readFile setImmediate Promise").then(console.log);
    });

    console.log("File read call back");

    process.nextTick(()=>{
        console.log("readFile  nextTick");
        Promise.resolve("readFile  nextTick Promise").then(console.log);
    });

    Promise.resolve("readFile Promise").then(console.log);
    
});


process.nextTick(()=>{
    process.nextTick(()=>{
        console.log("inner nextTick");
        Promise.resolve("inner nextTick Promise").then(console.log);
    });

    Promise.resolve("nextTick Promise").then(console.log);
    console.log(" nextTick");
});

console.log("This is file last line");