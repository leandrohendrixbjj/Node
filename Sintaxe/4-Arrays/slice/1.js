"use strict";

// O slice em JavaScript é um método usado para extrair uma parte de um array ou string sem modificar o original.

console.clear();

/*
 *  String "Ana" e índices do slice(start, end) — o end é exclusivo:
 *
 *         │  A  │  n  │  a  │
 *         ├─────┼─────┼─────┤
 *  start  │  0  │  1  │  2  │
 *  end    │  1  │  2  │  3  │
 */

const str = "Ana";
const start = 2;
const end = 5;

console.log(
    str.slice(1, 3)
); // na

console.log(
    str.slice(0, 1)
); // A

console.log(
    str.slice(0, 2)
); // An

