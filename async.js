const fs = require("fs");
const https = require("https");

console.log("hello  kuvar what are doing");

var a = 1078698;
var b = 20986;

https.get("https://dummyjson.com/products/1",(res)=>{
    console.log("fetched data succefully");
});

setTimeout(()=>{
    console.log("setTimeout call after 5 second");
},5000);

fs.readFile("./Notes/noteVideo4.text","utf8",(err,data)=>{
    console.log("File dat",data);
})


function multiply(x,y){
    const result = a*b;
    return result;
}

var c = multiply(a,b);

console.log("multiplication result is : ",c);

