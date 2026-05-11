console.clear()

/*
  Strings são UTF-16 (Unicode)
  JavaScript armazena strings como UTF-16.
  Isso cria alguns comportamentos estranhos: 
  Porque emojis ocupam 2 code units.
*/

console.log("😄".length) // 2