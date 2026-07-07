/* 
    Tipo Any (Qualquer tipo)

    Embora útil em algumas situações, o uso excessivo de any elimina boa parte dos benefícios do TypeScript. 
    Sempre que possível, prefira tipos específicos ou unknown, que oferece mais segurança.
*/

console.clear();

let valor_1: any;

valor_1 = "Hello World";
valor_1 = 10;
valor_1 = true;
valor_1 = null;
valor_1 = undefined;
valor_1 = {};
valor_1 = [];
valor_1 = new Date();



