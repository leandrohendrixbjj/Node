"use strict";

console.clear();

console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

process.nextTick(() => {
  console.log('3');
});

console.log('4'); 

// Saída:
// 1
// 4
// 3
// 2