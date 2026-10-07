"use strict";

console.clear();

console.log("1");

// COnstrutor da Promise:  é executado imediatamente, mas o callback da Promise é executado depois.
const promise = new Promise((resolve) => {
    console.log("2");
    resolve("OK");
    console.log("3");
});

// Esse trecho é enviado para a Microtask Queue e é executado depois.
promise.then((value) => {
    console.log("4", value);
});

console.log("5");


// Sequência de execução:
// 1
// 2
// 3
// 4 OK
// 5