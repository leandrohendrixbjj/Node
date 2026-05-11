"use strict";

/**
 * WRITABLE => Usada para escrita 
 */

const fs = require('fs')

const writable = fs.createWriteStream('./saida.txt')

writable.write('Olá\n')
writable.write('Mundo\n')

writable.end()