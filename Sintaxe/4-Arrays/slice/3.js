"use strict";

console.clear();

const data = ['leandro', 'joao', 'maria', 'pedro', 'ana', 'carlos', 'lucas', 'gabriel', 'matheus', 'roberto'];
let start = 6;
let end = data.length;

console.log(data.slice(start, end)); // ['lucas', 'gabriel', 'matheus', 'roberto']

start = -2;
console.log(data.slice(start)); // ['matheus', 'roberto']