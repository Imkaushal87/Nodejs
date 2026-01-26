//const crypto = require("crypto")
const crypto = require("node:crypto");

console.log("hello world");

var a = 1078698;
var b = 20986;
//Password-Based Key Derivation Function 2 ---(pbkdf2)
//sync method never use becaus main thred is blok
crypto.pbkdf2Sync("password","salt",5000000,50,"sha512");

setTimeout(()=>{
    console.log("setTimeout call right now");
},0);

console.log("first Key generated");

//Async function
crypto.pbkdf2("password","sait",500000,50,"sha512",(err,Key)=>{
    console.log("Second Key generated");
})


function multiply(x,y){
    const result = a*b;
    return result;
}

var c = multiply(a,b);

console.log("multiplication result is : ",c);
