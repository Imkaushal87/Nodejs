
console.log("hello world");

var a = 1078698;
var b = 20986;

setTimeout(()=>{
    console.log("setTimeout call right now");
},0);


setTimeout(()=>{
    console.log("setTimeout call after 5 second");
},5000);

function multiply(x,y){
    const result = a*b;
    return result;
}

var c = multiply(a,b);

console.log("multiplication result is : ",c);