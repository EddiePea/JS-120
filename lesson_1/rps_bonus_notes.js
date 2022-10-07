function createPlayer() {
  return {
    choices: ['rock', 'paper', 'scissors', 'lizard', 'spock'],
    shortHandChoices: ['r', 'p', 'sc', 'l', 'sp'],
    move: null,
    roundsWon: 0,
    moveHistory: [],
    winnerHistory: [],
  };
}

function createComputer() {

  let playerObject = createPlayer();

  let computerObject = {

    computerLosingMoves: [],
    weightedChoices: [],
    roundsToStartWeighting: 2,

    calculateMoveStrength() {
    
      this.winnerHistory.forEach((winner, indx) => {
        if (winner === 'human') {
          this.computerLosingMoves.push(this.moveHistory[indx]);  
        }
      });

      this.choices.forEach(choice => {
        let weighting = 100 - (((computerLosingMoves.filter(move => move === choice).length) / computerLosingMoves.length) * 100);
        console.log(`weighting is ${weighting}`);
        let occurences = computerLosingMoves.length * weighting;
        console.log(`occurences are ${occurences}`);

        while (occurences > 0) {
          this.weightedChoices.push(choice);
          occurences -= 1;
        }
      });
    },

    choose() {
      let choices; 

      if (this.winnerHistory.length <= this.roundsToStartWeighting) {
        choices = this.choices;
        console.log(`These are the basic choices: ${choices}`);

      } else {
        choices = this.weightedChoices;
        console.log(`These are the weightedChoices: ${choices}`);
      }

      let randomIndx = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndx];
    },
  };

  return Object.assign(playerObject, computerObject);
}

let computer = createComputer();
console.log(computer);


function calculateMoveStrength() {

  let winnerHistory = ['computer', 'human', 'computer', 'computer', 'human', 'human', 'human'];
  let choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
  let computerLosingMoves = [];
  let weightedChoices = [];
  let moveHistory = ['rock', 'paper', 'rock', 'spock', 'lizard', 'paper', 'paper', 'spock'];
    
  winnerHistory.forEach((winner, indx) => {
    if (winner === 'human') {
      computerLosingMoves.push(moveHistory[indx]);  
    }
  });
  console.log(`computerLosingMove are ${computerLosingMoves}`);
  choices.forEach(choice => {
    let timesLost = (computerLosingMoves.filter(move => move === choice).length);
    console.log(`times lost are ${timesLost}`);
    let occurences = computerLosingMoves.length - timesLost;
    console.log(`occurences are ${occurences}`);
  
    while (occurences > 0) {
      weightedChoices.push(choice);
      occurences -= 1;
    }
  });
  return weightedChoices;
}

console.log(calculateMoveStrength());

/*
this.choices.forEach(choice => {
  let weighting = 100 - (((computerLosingMoves.filter(move => move === choice).length) / computerLosingMoves.length) * 100);
  console.log(`weighting is ${weighting}`);
  let occurences = computerLosingMoves.length * weighting;
  console.log(`occurences are ${occurences}`);

  while (occurences > 0) {
    this.weightedChoices.push(choice);
    occurences -= 1;
  }
});
*/

/*
      shortHandChoices: this.choices.map((choice, indx) => {
      let otherChoices = this.choices.slice(indx + 1);
      let sameStart = otherChoices.some(word => word[0] === choice[0]);

      if (sameStart) {
        return choice.slice(0, 2);
      } else {
        return choice.slice(0, 1);
      }
    });

*/