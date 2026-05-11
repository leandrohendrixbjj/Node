"use strict";

console.clear();

/*
 *  String "Leandro" e índices do slice(start, end) — o end é exclusivo:
 *
 *         │  L  │  e  │  a  │  n  │  d  │  r  │  o  │
 *         ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
 *  start  │ -7  │ -6  │ -5  │ -4  │ -3  │ -2  │ -1  │
 *  end    │  1  │  2  │  3  │  4  │  5  │  6  │  7  │
 */

const str = "Leandro";
let start = -7;
let end = 4;

console.log(
    str.slice(start)
); // Leandro

start = -1;
console.log(
    str.slice(start)
); // o

start = -5;
console.log(
    str.slice(start, end)
); // and

start = -5;
end = 7;
console.log(
    str.slice(start, end)
); // andro




