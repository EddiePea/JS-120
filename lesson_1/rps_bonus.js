//Is this the best place to put this or should it be inside an object or factory function?
const READLINE = require('readline-sync');

//Should these factory functions be at the top or bottom of the program?
//i.e. should RPSGame (as the 'main' object) come first?
function createPlayer() {
  return {
    choices: ['rock', 'paper', 'scissors', 'lizard', 'spock'],
    move: null,
    roundsWon: 0,
    moveHistory: [],
  };
}

function createComputer() {

  let playerObject = createPlayer();

  let computerObject = {

    winnerHistory: [],
    computerLosingMoves: [],
    weightedChoices: [],
    humanWinsToStartWeighting: 2,

    calculateMoveStrength() {

      this.weightedChoices = [];
      this.computerLosingMoves = [];
    
      //This creates an array of the moves which the computer made in rounds that it lost
      this.winnerHistory.forEach((winner, indx) => {
        if (winner === 'human') {
          let losingMove = this.moveHistory[indx];
          this.computerLosingMoves.push(losingMove);  
        }
      });

      //This works out how many times the computer lost with each type of move
      //It then creates a 'weightedChoices' array in which the computer's losing moves appear less (in proportion to
      //the number of times they've resulted in a computer loss) so there is a correspondingly reduced chance of
      //certain moves being randomly selected
      this.choices.forEach(choice => {
        let timesLost = this.computerLosingMoves.filter(move => move === choice).length;
        let occurences = this.computerLosingMoves.length - timesLost;

        while (occurences > 0) {
          this.weightedChoices.push(choice);
          occurences -= 1;
        }
      });
    },

    choose() {
      let choices; 
      let humanWins = this.winnerHistory.filter(winner => winner === 'human').length;

      //The weighting only kicks in after 2 wins by the human to provide sufficient data
      humanWins < this.humanWinsToStartWeighting ? choices = this.choices : choices = this.weightedChoices;
      
      let randomIndx = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndx];
    },
  };

  return Object.assign(playerObject, computerObject);
}


function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    shortHandChoices: ['r', 'p', 'sc', 'l', 'sp'],
    //I tried to call the map method on the choices array in order to generate the shortHandChoices array
    //but I kept getting error messages (that the program couldn't read the properties of undefined, reading map). Any ideas why?
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

    choose() {
      let choice;

      while (true) {
        choice = READLINE.question(`\nPlease choose one: ${this.choices.join(', ')}\nOr you can abbreviate those choices to ${this.shortHandChoices.join(', ')}\n`);
        if (this.choices.includes(choice) || this.shortHandChoices.includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }
      if (this.shortHandChoices.includes(choice)) {
        this.move = this.choices[this.shortHandChoices.indexOf(choice)];

      } else this.move = choice;
    },
  };
  return Object.assign(playerObject, humanObject);
}

//Should this be a factory function or inside the RPSGame object?
function createRules() {
  return {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['spock', 'paper'],
    spock: ['scissors', 'rock'],
  };
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  rules: createRules(),
  roundsToWinMatch: 5,
  match: 0,
  totalMoveCount: 0,
  startingMoveCount: 0,
  roundWinner: null,
  matchWinner: null,

  displayWelcomeMessage() {
    console.log(`\nWelcome to ${this.human.choices.join(', ')}!`);
    console.log(`The first payer to win ${this.roundsToWinMatch} rounds wins the match!`);
  },

  displayGoodbyeMessage() {
    console.clear();
    console.log(`\nThanks for playing ${this.human.choices.join(', ')}\nGoodbye!\n`);
  },

  determineRoundWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if (this.rules[humanMove].includes(computerMove)) {
      this.roundWinner = 'human';
    } else if (this.rules[computerMove].includes(humanMove)) {
      this.roundWinner = 'computer';
    } else {
      this.roundWinner = 'tie';
    }
   },

  displayRoundWinner() {
    console.clear();
    console.log(`\nYou chose: ${this.human.move.toUpperCase()}`);
    console.log(`The computer chose: ${this.computer.move.toUpperCase()}`);

    switch (this.roundWinner) {
      case 'human':
        console.log('\nYou win!');
        break;
      case 'computer':
        console.log('\nComputer wins!');
        break;
      case 'tie':
        console.log("\nIt's a tie!");
        break;
    }
  },

  updateMoveHistory() {
    this.totalMoveCount += 1;
    this.human.moveHistory.push(this.human.move);
    this.computer.moveHistory.push(this.computer.move);
  },

  setStartingMoveCount() {
    this.startingMoveCount = this.totalMoveCount;
  },

  displayMoveHistory() {
    console.log(`\nYOUR MOVES THIS MATCH: ${this.human.moveHistory.slice(this.startingMoveCount).join(', ')}`);
    console.log(`COMPUTER MOVES THIS MATCH: ${this.computer.moveHistory.slice(this.startingMoveCount).join(', ')}`);
  },

  updateWinnerHistory() {
    this.computer.winnerHistory.push(this.roundWinner);
  },

  updateScores() {
    switch (this.roundWinner) {
      case 'human':
        this.human.roundsWon += 1;
        break;
      case 'computer':
        this.computer.roundsWon += 1;
    }
  },

  displayRoundScores() {
    console.log(`\nMATCH ${this.match} => YOUR SCORE: ${this.human.roundsWon} || COMPUTER SCORE: ${this.computer.roundsWon}`);
  },

  someoneWinsMatch() {
    return this.human.roundsWon === this.roundsToWinMatch || this.computer.roundsWon === this.roundsToWinMatch;
  },

  determineMatchWinner() {
    this.human.roundsWon === this.roundsToWinMatch ? this.matchWinner = 'human' : this.matchWinner = 'computer';
  },

  displayMatchWinner() {
    let winner;

    if (this.matchWinner === 'human') {
      winner = 'YOU have'
    } else {
      winner = 'COMPUTER has'
    }
    console.log(`\n${winner} won the match!`);
  },

  playAgain() {
    let validResponses; 
    let answer;

    while (true) {
      answer = READLINE.question('\nWould you like to play again?\nPlease enter "y" or "yes" for yes and "n" or "no" for no\n');
      validResponses = ['yes', 'y', 'no', 'n'];

      if (validResponses.includes(answer.toLowerCase())) break;
      console.log('Sorry, invalid choice.');
      }
    return validResponses.slice(0, 2).includes(answer.toLowerCase());
  },

  resetScores() {
    this.human.roundsWon = 0;
    this.computer.roundsWon = 0;
  },

  updateMatchNumber() {
    this.match += 1;
  },

  playRound() {
    this.human.choose();
    this.computer.calculateMoveStrength();
    this.computer.choose();
    this.updateMoveHistory();
    this.determineRoundWinner();
    this.updateWinnerHistory();
    this.updateScores();
    this.displayRoundWinner();
    this.displayRoundScores();
    this.displayMoveHistory();
  },

  //Play game until user quits
  playGame() {
    console.clear();
    this.displayWelcomeMessage();
  
    while (true) {
      this.resetScores();
      this.updateMatchNumber();
      this.setStartingMoveCount();
  
      while (!this.someoneWinsMatch()) {
        this.playRound();
      }
      this.determineMatchWinner();
      this.displayMatchWinner();
    
      if (!this.playAgain()) {
        break;
      } else {
        console.clear();
      }
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.playGame();



