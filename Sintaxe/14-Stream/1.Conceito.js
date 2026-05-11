/**
 * # STREAMS NO NODE.JS — DO BÁSICO AO AVANÇADO
 * ==================================================
 *
 * Streams são um dos conceitos mais importantes do Node.js. Elas permitem processar
 * dados em partes ("chunks"), sem precisar carregar tudo na memória de uma vez.
 *
 * Isso é essencial para:
 * - APIs
 * - Upload/download de arquivos
 * - Processamento de logs
 * - Vídeos
 * - Integrações
 * - Grandes volumes de dados
 * - Alta performance
 *
 * ## 1) O PROBLEMA QUE STREAMS RESOLVEM
 * ------------------------------------
 *
 * Imagine um arquivo de 5GB.
 *
 * **Sem stream**:
 */
const fs = require('fs');
 
const data = fs.readFileSync('./video.mp4');
console.log(data);

/*
* Aqui o Node:
* - Lê o arquivo inteiro
* - Carrega tudo na RAM
* - Depois processa
*
* Problemas:
* - Alto consumo de memória
* - Travamentos
* - Lentidão
* - Risco de crash
*
* **Com stream**:
*/

const fs = require('fs');

const stream = fs.createReadStream('./video.mp4');

stream.on('data', (chunk) => {
  console.log(chunk.length);
});

/*
* ## 2) O QUE É UMA STREAM
* ------------------------
*
* Uma stream é um fluxo contínuo de dados.
*
* Pense como:
* - Água passando em um cano
* - Dados chegando aos poucos
*
* O Node processa:
* - pedaço por pedaço
* - sem esperar tudo terminar
*
* ## 3) TIPOS DE STREAMS
* ----------------------
*
* Node possui 4 tipos principais:
*
* | Tipo      | Função            |
* | --------- | ----------------- |
* | Readable  | Ler dados         |
* | Writable  | Escrever dados    |
* | Duplex    | Ler e escrever    |
* | Transform | Transformar dados |
*/


/*
 * ## 26) ROADMAP DE ESTUDO
 * ------------------------
 *
 * **Nível iniciante**
 * - Readable
 * - Writable
 * - pipe
 * - eventos
 *
 * **Nível intermediário**
 * - backpressure
 * - Transform
 * - pipeline
 * - async iterator
 *
 * **Nível avançado**
 * - streams customizadas
 * - objectMode
 * - performance tuning
 * - internals
 * - stream lifecycle
 * - integração com filas
 * - streams distribuídas
 */