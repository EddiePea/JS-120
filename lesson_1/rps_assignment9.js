const READLINE = require('readline-sync');
/*

**Original implementation:**

function createPlayer(playerType) {
    return {

        playerType,
        move: null,
        //Choose method chooses a move for the player
        //depending on type of player represented by playerType
        //Can use isHuman method to determine if playerType is human (boolean return)
        choose() {
            //This method returns a string that represents the player's move
            //written as this.human.choose() in the RPSGame object, this value is ignored
            //So choose should change the state in one of the objects
            //So add 'move' property to player object and adjust choose method accordingly
            //i.e. choose stores the player's move as a piece of state in the move property
            if (this.isHuman()) {
                let choice;

                while (true) {
                    console.log('\nPlease choose rock, paper or scissors:\n');
                    choice = READLINE.question();
                    if (['rock', 'paper', 'scissors'].includes(choice)) break;
                    console.log('Sorry - invalid choice.');
                }
                this.move = choice;
            
            } else {
                const choices = ['rock', 'paper', 'scissors'];
                let randomIndx = Math.floor(Math.random() * choices.length);
                this.move = choices[randomIndx];
            }
        },

        isHuman() {
            return this.playerType === 'human';
        },
    };
}
*/
//factory function to create generic player
function createPlayer() {
  return {
    move: null,
        //We initialise the move property to null 
        //Strictly unnecessary: choose will set property to 1/3 choices
        //BUT good practice to initialise object properties explicity
        //Makes it easy to see what the initial state of the obj is at a glance
        //Shows state of all properties in one place
  };
}

//factory function to create computer players
//Initial implementation
function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
            const choices = ['rock', 'paper', 'scissors'];
            let randomIndx = Math.floor(Math.random() * choices.length);
            this.move = choices[randomIndx];
        },
    };
    return Object.assign(playerObject, computerObject);
}

//factory function to create human players
function createHuman() {
    let playerObject = createPlayer();

    let humanObject = {
        choose() {
            let choice;

            while (true) {
                choice = READLINE.question('Please choose rock, paper or scissors');
                if (['rock', 'paper', 'scissors'].includes(choice)) break;
                console.log('Sorry, invalid choice.');
            }
            
            this.move = choice;
        },
    };
    return Object.assign(playerObject, humanObject);
    //Create player object using createPlayer function
    //Then create human object
    //Then merge two objects using Object.assign
    //Return the result
}

function createMove() {
    return {
        //possible state: type of move (RPS)
    };
}

function createRule() {
    return {
        //possible state? not clear whether rules need state...
    };
}

function compare(move1, move2) {

}

const RPSGame = {
    //We are providing the playertype as an arg to createPlayer
    //when we call it here

    //The player objects (human and comp) are properties of the RPSGame object 
    //They collaborate with the RPSGame Object 
    //They are collaborators of RPSGame
    //So we can refer to the player objects with the `this` keyword in methods
    //that execute in the RPSGame context
    human: createHuman(),
    computer: createComputer(),

    //Need to include this function as a method attached to an object
    //As welcome message is of overall concern to the game -> makes sense
    //to place it in the RPSGame object

    displayWelcomeMessage() {
        console.log(`\nWelcome to rock, paper, scissors!`);
    },

    displayGoodbyeMessage() {
        console.log('\nThanks for playing rock, paper, scissors.\nGoodbye!\n');
    },

    displayWinner() {
        let humanMove = this.human.move;
        let computerMove = this.computer.move;

        console.clear();
        console.log(`\nYou chose: ${this.human.move}`);
        console.log(`The computer chose: ${this.computer.move}`);

        if ((humanMove === 'rock' && computerMove === 'scissors') ||
            (humanMove === 'paper' && computerMove === 'rock') ||
            (humanMove === 'scissors' && computerMove === 'paper')) {
                console.log('\nYou win!');
            } else if ((humanMove === 'rock' && computerMove === 'paper') ||
            (humanMove === 'paper' && computerMove === 'scissors') ||
            (humanMove === 'scissors' && computerMove === 'rock')) {
                console.log('\nComputer wins!');
            } else {
                console.log("\nIt's a tie!");
            }
    },

    playAgain() {
        console.log('\nWould you like to play again?');
        let answer = READLINE.question();
        return answer.toLowerCase()[0] === 'y';
    },

    play() {
        this.displayWelcomeMessage();
        //As the displayWM is a method in the same object as play
        //we must use 'this' to call it
        while (true) {
            this.human.choose();
            this.computer.choose();
            this.displayWinner();
            if (!this.playAgain()) break;
        }
        this.displayGoodbyeMessage();
    },
};

//The function invocation below should trigger the other functions inside
//the RPSGame.play function to be invoked

//So the game starts when we call the `play` method on the RPSGame object
//That method contains our procedural code

RPSGame.play();

