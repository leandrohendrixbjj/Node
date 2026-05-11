console.clear()


//  Permitem que você incorpore expressões JavaScript diretamente dentro da string

const song = "Bohemian Rhapsody";
const score = 9.5;
const highestScore = 10;
const output = `One of my favorite songs is "${song}". I rated it ${
  (score / highestScore) * 100
}%.`;

console.log(output); 