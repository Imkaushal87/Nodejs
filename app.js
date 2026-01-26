//require("./xyz.js");

//require("./calculate/sum.js");
//const obj = require("./sum.js");
//const {calculateSum} = require("./calculate/sum.js");

const {calculateSum,calculateMultipluy} = require("./calculate")
//import {calculateSum} from "./sum.js"


var a = 16;
var b = 20;
 
//obj.calculateSum(a, b);
//x = 10;
calculateSum(a, b);
calculateMultipluy(a,b);
//console.log(x);




/*
    🔑 IMPORTANT NOTES (Very Useful for Interviews)

    1️⃣ require() does NOT share variables or functions
       ⭐ It only executes the module
       ⭐ It returns module.exports

    2️⃣ Each file in Node.js is treated as a separate module
       ⭐ Variables and functions are private by default
       ⭐ This prevents global scope pollution
*/

/*
    ⭐ Importing another module executes that file immediately.
    ⭐ This is commonly used when we only need side effects
    ⭐ such as logging, configuration setup, or DB connections.
*/
//require("./xyz.js");

/*
    ⭐ Importing sum.js executes its top-level code.
    ⭐ However, its variables or functions are NOT accessible here
    ⭐ unless they are explicitly exported using module.exports.
*/

// require("./sum.js");  // Only executes the module (no access to functions)

//const obj = require("./sum.js"); // Importing exported function
//import {x,calculateSum} from "./sum.js"

// Local variables inside this module
//var a = 16;
//var b = 20;

/*
    ⭐ Calling calculateSum works because:
    ⭐ - It is exported from sum.js
    ⭐ - It is imported using require()
    ⭐ - Node.js does NOT leak module scope by default
*/
//obj.calculateSum(a, b);

//calculateSum(a, b);

// Node.js global object check
// In Node.js, globalThis and global refer to the same object
//console.log(globalThis === global); // true
//console.log(obj.x);

// console.log(x);
