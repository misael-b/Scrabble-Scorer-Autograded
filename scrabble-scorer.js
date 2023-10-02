// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in oldPointStructure) {

         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }

      }
   }
   return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some Scrabble!")
   let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' ']
   let userWordInput = input.question('Please enter a word to score: ');
   let userWordInput2 = userWordInput.toLowerCase();
   for (i = 0; i < userWordInput2.length; i++){
      while (!alphabet.includes(userWordInput2[i])) {
         console.log("Error. Invalid Character")
         userWordInput = input.question('Please enter a word to score: ');
         userWordInput2 = userWordInput.toLowerCase();
      }
   }
   // console.log(oldScrabbleScorer(userWord))
   return userWordInput
};


let simpleScorer = function (word) {
   let totalPoints = 0;
   for (i = 0; i < word.length; i++) {
      if (word[i] === ' ') {
         totalPoints += 0;
      } else {
         totalPoints += 1;
      }
   };
   return totalPoints
}

let vowelBonusScorer = function (word) {
   let wordUpperCase = word.toUpperCase();
   let vowels = ['A', 'E', 'I', 'O', 'U'];
   let wordArray = wordUpperCase.split('');
   let totalPointsVowels = 0
   for (i = 0; i < wordArray.length; i++) {
      if (vowels.includes(wordArray[i])) {
         totalPointsVowels += 3
      } else if (wordArray[i] === ' ') {
         totalPointsVowels += 0;
      }else {
         totalPointsVowels += 1
      }
   }
   return totalPointsVowels
   } 


let scrabbleScorer = function (word) {
   let wordUpperCase = word.toLowerCase();
   let totalPointsScrabble = 0;
   for (i = 0; i < wordUpperCase.length; i++) {
      for (item in newPointStructure) {
         if (item.includes(wordUpperCase[i]))
            totalPointsScrabble += newPointStructure[item]
      };
   };
   return totalPointsScrabble
};

let scoringAlgoSimple = {
   name: 'Simple Score',
   Description: 'Each letter is worth 1 point.',
   scorerFunction: simpleScorer
};

let scoringAlgoBonus = {
   name: 'Bonus Vowels',
   Description: 'Vowels are 3 pts, consonants are 1 pt.',
   scorerFunction: vowelBonusScorer
};

let scoringAlgoScrabble = {
   name: 'Scrabble',
   Description: 'The traditional scoring algorithm.',
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [scoringAlgoSimple, scoringAlgoBonus, scoringAlgoScrabble];

function scorerPrompt() {
   console.log("0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system")
   let userChoise = Number(input.question('Please enter the scoring algorithm you would like to use (0,1,2): '))
   let validAnswers = [0, 1, 2]
   while (!validAnswers.includes(userChoise)) {
      console.log("Error: Select 0, 1, or 2")
      userChoise = Number(input.question('Please enter the scoring algorithm you would like to use (0,1,2): '))
   }
   if (userChoise === 0) {
      return scoringAlgoSimple
   } else if (userChoise === 1) {
      return scoringAlgoBonus
   } else {
      return scoringAlgoScrabble
   }
}



function transform(oldPointObject) {
   let newPointObject = {}
   for (item in oldPointObject) {
      let pointsForLetter = item;
      let letterArray = oldPointObject[item];
      for (i = 0; i < letterArray.length; i++) {
         letter = letterArray[i].toLowerCase()
         newPointObject[letter] = Number(pointsForLetter)
      };
   }
   return newPointObject
};

let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = Number(0)


function runProgram() {
   let userWord = initialPrompt();
   let algo = scorerPrompt();
   let score = algo.scorerFunction(userWord);
   console.log(`Score for ${userWord} is ${score}`)

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};