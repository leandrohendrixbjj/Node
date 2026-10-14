'use strict'

/**
 * ╔════════════════════════════════════════════════════════════════════════════════╗
 * ║                                  S Y M B O L                                ║
 * ╠════════════════════════════════════════════════════════════════════════════════╣
 * ║ • Symbol é um tipo primitivo do JavaScript (assim como string, number,       ║
 * ║   boolean, bigint, undefined e null).                                        ║
 * ║ • Introduzido no ES6 (2015), usados para criar identificadores únicos        ║
 * ║   e imutáveis.                                                               ║
 * ║                                                                              ║
 * ║ Exemplos de uso:                                                             ║
 * ║   - Proteger propriedades em objetos e evitar conflitos.                     ║
 * ║   - Identificadores privados ou especiais em objetos.                        ║
 * ╚════════════════════════════════════════════════════════════════════════════════╝
 */

console.clear();

// Criando dois symbols com a mesma descrição
const a = Symbol('id');
const b = Symbol('id');

console.log('a === b:', a === b); // false (são diferentes)

// -------------------------------------------------------------

/*
 * Problema resolvido pelo Symbol:
 * Imagine que dois módulos diferentes precisam adicionar uma propriedade
 * ao mesmo objeto. Sem Symbol, pode haver colisão de nomes:
 */

const usuarios = {};

usuarios.id = 10;

// Outro módulo sobrescreve a mesma propriedade
usuarios.id = 20;

console.log('Sem Symbol:', usuarios.id); // 20 (valor sobrescrito)

// -------------------------------------------------------------

// Com Symbol, criamos identificadores únicos para cada módulo:
const idModuloA = Symbol('id');
const idModuloB = Symbol('id');

const usuario = {};

usuario[idModuloA] = 10;
usuario[idModuloB] = 20;

console.log('Modulo A:', usuario[idModuloA]); // 10
console.log('Modulo B:', usuario[idModuloB]); // 20

// As propriedades criadas com Symbol são únicas e não conflitam, 
// mesmo usando a mesma "descrição" no símbolo.