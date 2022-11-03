//Write a constructor function for each factory function 
//Move initialisation code from FF to constructor
//Move all other methods from FF into the constructor's prototype
//Replace FF invocations with constructor calls

let readline = require('readline-sync');

function Player() {
  this.move = null;
}
//Note the name change here
//We're creating a Player, not creating players...
//It's a constructor now, not a factory function

function Computer() {
  Player.call(this);
}

//We only need to invoke it
//We don't need Computer or Human to inherit from Player
//Because Player doesn't have any methods

Computer.prototype.choose = function() {
  const choices = ['rock', 'paper', 'scissors'];
  let randomIndex = Math.floor(Math.random() * choices.length);
  this.move = choices[randomIndex];
};

function Human() {
  Player.call(this);
}

Human.prototype.choose = function() {
    let choice;

    while (true) {
      console.log('Please choose rock, paper, or scissors:');
      choice = readline.question();
      if (['rock', 'paper', 'scissors'].includes(choice)) break;
      console.log('Sorry, invalid choice.');
   }
    this.move = choice;
};

function RPSGame() {
  this.human = new Human();
  this.computer = new Computer();
}

RPSGame.prototype = {

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  displayWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
        (humanMove === 'paper' && computerMove === 'rock') ||
        (humanMove === 'scissors' && computerMove === 'paper')) {
      console.log('You win!');
    } else if ((humanMove === 'rock' && computerMove === 'paper') ||
               (humanMove === 'paper' && computerMove === 'scissors') ||
               (humanMove === 'scissors' && computerMove === 'rock')) {
      console.log('Computer wins!');
    } else {
      console.log("It's a tie");
    }
  },

  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  },
};

RPSGame.prototype.constructor = RPSGame;
//If we don't do this, then the constructor property will point
//back to object...
//I think it's because we've just initialised the prototype
//property with an object literal value
//And so the constructor of that object literal is Object

let game = new RPSGame();
game.play();
