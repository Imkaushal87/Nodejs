# 📘 Node.js Internals — Modules, Globals, Event Loop & Thread Pool

This README consolidates practical **Node.js fundamentals** with **real execution behavior**, **interview notes**, and **code-driven explanations**.

---

## ⭐ 1. Modules & `require()`

```js
require("./xyz.js");
```

### Key Points

* `require()` **executes the file immediately**
* Returns `module.exports`
* Variables/functions are **NOT shared** unless exported

### Used for

* Config files
* DB connections
* Logging / side effects

---

## ⭐ 2. Global Objects (Node vs Browser)

| Object       | Node.js | Browser |
| ------------ | ------- | ------- |
| `global`     | ✅       | ❌       |
| `window`     | ❌       | ✅       |
| `self`       | ❌       | ✅       |
| `frames`     | ❌       | ✅       |
| `globalThis` | ✅       | ✅       |

```js
globalThis === global // true (Node.js)
```

---

## ⭐ 3. Object Destructuring

### Without Destructuring

```js
const name = user.name;
```

### With Destructuring

```js
const { name, age, role } = user;
```

### Benefits

* Cleaner syntax
* Less code
* Better readability

---

## ⭐ 4. Module Scope (VERY IMPORTANT)

* Each file is a **separate module**
* Variables are **private by default**
* Prevents global pollution

### Behind the Scenes (Interview Gold ⭐)

```js
(function (exports, require, module, __filename, __dirname) {
  // module code
})
```

---

## ⭐ 5. Synchronous Execution

```js
var c = multiply(a, b);
```

* Blocks execution
* Runs on **call stack**
* Next line waits until completion

### Call Stack

```
console.log
multiply()
console.log
```

---

## ⭐ 6. Asynchronous Execution & Event Loop

Node.js Components:

* Call Stack
* libuv (Web APIs)
* Event Loop
* Callback Queues

### Async APIs

* `setTimeout`
* `fs.readFile`
* `https.get`

These **do NOT block** the main thread.

---

## ⭐ 7. Event Loop Priority Order (CRITICAL)

```
Synchronous Code
→ process.nextTick
→ Promise.then (Microtasks)
→ Timers (setTimeout)
→ Poll (fs / network)
→ Check (setImmediate)
```

### Rules

* `process.nextTick` > `Promise.then`
* Microtasks drain fully before phase change
* `setImmediate` inside I/O runs before timers

---

## ⭐ 8. Timers Explained

```js
setTimeout(fn, 0);
```

* `0` does **NOT** mean immediate
* Executes only after call stack is empty

---

## ⭐ 9. Crypto: Blocking vs Non‑Blocking

### ❌ Blocking (DON’T USE)

```js
crypto.pbkdf2Sync(...);
```

* Blocks event loop
* Freezes entire server

### ✅ Non‑Blocking

```js
crypto.pbkdf2(...);
```

* Runs in **libuv thread pool**
* Main thread stays free

---

## ⭐ 10. libuv Thread Pool

* Default size: **4 threads**
* Used by:

  * `crypto`
  * `fs`
  * `zlib`
  * `dns.lookup`

### Example

```js
process.env.UV_THREADPOOL_SIZE = 2;
```

* Only **2 tasks** run in parallel
* Remaining tasks wait in queue

---

## ⭐ 11. API Requests & Thread Pool (Interview Favorite)

❌ API request itself does NOT use thread pool

✅ Thread pool is used **only if** API handler calls:

* `crypto.pbkdf2`
* `fs.readFile`

🌐 Network calls (`http`, DB queries) use **OS async I/O**, not threads

---

## ⭐ 12. process.nextTick vs Promise

* `process.nextTick` runs **before** Promises
* Can starve event loop if abused

---

## ⭐ 13. setImmediate vs setTimeout

* `setImmediate` → Check phase
* `setTimeout` → Timers phase
* Inside I/O: `setImmediate` runs first

---

## ⭐ 14. Interview One‑Liners 🎯

* Node.js is **single‑threaded** at JS level
* Uses **multi‑threaded** architecture internally
* Thread pool handles **CPU‑heavy async tasks**
* Network I/O is **non‑blocking without threads**
* `process.nextTick` has highest priority

---

## ✅ Final Takeaways

✔ JS execution is single‑threaded
✔ Async does NOT mean multi‑threaded
✔ Thread pool is limited & precious
✔ Avoid sync crypto & CPU loops
✔ Event loop order matters in production

---

📌 This README reflects **real Node.js internals**, not just theory.

---

## ⭐ 15. Node.js High-Level Architecture

```
┌──────────────┐
│  JavaScript  │  (Your Code)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   V8 Engine  │  (JS Execution)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   libuv      │  (Async I/O, Event Loop)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ OS / Kernel  │  (Threads, Network, FS)
└──────────────┘
```

Node.js = **V8 + libuv + C++ bindings**

---

## ⭐ 16. V8 Engine (JavaScript Engine)

### What is V8?

* Open-source JavaScript engine by Google
* Written in **C++**
* Used by **Node.js** and **Chrome**

### Responsibilities

* Parses JavaScript
* Compiles JS → Machine Code
* Manages **Call Stack**
* Handles **Garbage Collection**

---

## ⭐ 17. V8 Engine Architecture (Interview Gold ⭐)

### Key Components

```
Source Code
   ↓
Parser
   ↓
Ignition (Interpreter)
   ↓
TurboFan (JIT Compiler)
   ↓
Optimized Machine Code
```

### Details

* **Ignition**: Interprets bytecode
* **TurboFan**: Optimizes hot code paths
* **Inline Caching** improves performance

---

## ⭐ 18. Call Stack (V8)

* Stores function execution frames
* LIFO (Last In, First Out)
* Only **one call stack** per process

❌ Blocking code blocks entire stack

---

## ⭐ 19. libuv (The Backbone of Node.js)

### What is libuv?

* C library that provides:

  * Event Loop
  * Thread Pool
  * Async I/O

* Abstracts OS-specific APIs

---

## ⭐ 20. libuv Responsibilities

* File System operations
* DNS resolution
* Timers
* Thread pool management
* Network polling

---

## ⭐ 21. Event Loop (Inside libuv)

### Phases

```
┌ Timers
├ Pending Callbacks
├ Idle / Prepare
├ Poll (I/O)
├ Check (setImmediate)
└ Close Callbacks
```

Microtasks run **between phases**

---

## ⭐ 22. Thread Pool (libuv)

### Key Facts

* Default size = **4 threads**
* Shared across entire process
* Used for blocking operations

### Used By

* crypto
* fs
* zlib
* dns.lookup

---

## ⭐ 23. Thread Pool vs Event Loop

| Feature      | Event Loop     | Thread Pool       |
| ------------ | -------------- | ----------------- |
| Threads      | Single         | Multiple          |
| Purpose      | Schedule tasks | Run blocking work |
| JS Execution | ✅              | ❌                 |
| CPU Tasks    | ❌              | ✅                 |

---

## ⭐ 24. Complete Execution Flow

```
JS Code
 ↓
Call Stack (V8)
 ↓ async
libuv Event Loop
 ↓ heavy work
Thread Pool / OS
 ↓ callback
Event Loop
 ↓
Call Stack
```

---

## ⭐ 25. Architecture One-Liners (Interview 🎯)

* V8 executes JavaScript
* libuv handles async behavior
* Event loop schedules callbacks
* Thread pool executes blocking tasks
* Node.js is **JS single-threaded, system multi-threaded**
