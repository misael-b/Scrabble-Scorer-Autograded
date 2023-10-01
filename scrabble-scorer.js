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
   let userWord = input.question('Please enter a word to score: ');
   // console.log(oldScrabbleScorer(userWord))
   return userWord
}; 


let simpleScorer = function (word) {
   let totalPoints = word.length;
   return totalPoints
};

let vowelBonusScorer = function (word) {
   let wordLowercase = word.toUpperCase(); 
   let vowels = ['A', 'E', 'I', 'O', 'U']; 
   let wordArray = wordLowercase.split(''); 
   let totalPointsVowels = 0
   for (i = 0; i < wordArray.length; i++) {
      if (vowels.includes(wordArray[i])) {
         totalPointsVowels += 3
      } else {
         totalPointsVowels += 1
      }
   } return totalPointsVowels
};

let scrabbleScorer = function (word) {
   
};

let scoringAlgoSimple = {
   name: 'Simple Score',
   Description: 'Each letter is worth 1 point.', 
   scoringFunction: simpleScorer
};

let scoringAlgoBonus = {
   name: 'Bonus Vowels',
   Description: 'Vowels are 3 pts, consonants are 1 pt.',
   scoringFunction: vowelBonusScorer
};

let scoringAlgoScrabble = {
   name: 'Scrabble',
   Description: 'The traditional scoring algorithm.',
   scoringFunction: scrabbleScorer
};

const scoringAlgorithms = [scoringAlgoSimple, scoringAlgoBonus, scoringAlgoScrabble];

function scorerPrompt() {
   console.log("0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system")
   let userChoise = Number(input.question('Please enter the scoring algorithm you would like to use (0,1,2): '))
   if (userChoise === 0) {
      return scoringAlgoSimple
   } else if (userChoise === 1) {
      return scoringAlgoBonus
   } else {
      return scoringAlgoScrabble
   }
}



function transform() {};

let newPointStructure;

function runProgram() {
   let userWord = initialPrompt();
   let algo = scorerPrompt();
   let score = algo.scoringFunction(userWord);
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
