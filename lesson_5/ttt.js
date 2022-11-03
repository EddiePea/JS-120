let readline = require("readline-sync");

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  //The constructor method here takes a single param
  //That has a default value of unused Sq
  //Note that when accessing the static property of a class
  //You have to call the class itself, even inside the class
  //This method assigns the marker arg value to the marker prop
  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  //Static is used to define properties on the class directly
  //(not the object it creates)
  //Static keyword is new
  //Can rewrite this to define properties using Square.PROPERTY = X

  toString() {
    return this.marker;
  }
  //This overrides the default property value of Object.toString()
  //which all objects inherit
  //This should return the value of the marker property

  setMarker(marker) {
    this.marker = marker;
  }
  //This method takes a single param (marker)
  //It assigns that value to the marker property

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }
  //This method returns a boolean
  //If the value of the marker property is an unused square
  //it returns true

  getMarker() {
    return this.marker;
  }
//This method returns the value of the marker property
}

class Board {

  constructor() {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      //Not sure why we use the pre-increment operator
      this.squares[String(counter)] = new Square();
    }
  }
  //Using String isn't necessary here
  //JS always treats object keys as strings

  //This creates an object value for the squares property
  //It's a non-method value that needs to be stored in the
  //constructor method so it can be accessed by sub-classes
  //and is properly set for the object returned when invoking
  //the class

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }

  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  }
  //This clears the console
  //And then displays the current state of the board

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }
  //This is a method which takes 2 args: key (i.e. board num) and
  //marker, i.e. the comp or human marker
  //It accesses the squares property of the object returned by this class
  //Squares here are the object properties created in the constructor above
  //and then modified in the display method
  //Then it calls the setMarker method on that object -> so that it's value
  //is now set to the value of the marker argument

  isFull() {
    return this.unusedSquares().length === 0;
  }
  //This checks whether there are any unused squares
  //It does this by calling the unusedSquares method and asking
  //if the array it outputs has a length of 0

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
    //This method (i) creates a keys variable which is initialised with
    //an array of the keys in the this squares object value of the `squares`
    //property of the object instance of Board
    //Then the method returns a filtered version of that array -> it contains
    //only those keys which, when the `isUnused` method from the Square class
    //is called on them returns true
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });
    return markers.length;
  }
  //This method sets a markers variable
  //The value is the return value of calling 'filter' on the keys
  //array passed to the arg
  //For each key, we're asked if the marker on the square corresonding
  //with that key num is the marker of the player entered as an arg
  //So this has a num return value
}

class Player {
  constructor(marker) {
    this.marker = marker;
  }
  //Here we let each player object define its marker
  //becuase we need to pass the human player's marker and (separately) the
  //computer player's marker to the board object (using markSquareAt)
  
  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
    //Using the super method here and passing it as an arg the value of the
    //human marker defined on the Square class allows the Human class to have
    //access to that value
  }
}
//This extends the Player class -> it inherits from Player
//Calling the `super` method inside the constructor method
//ensures that Human has access to Player's properties

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {

  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ];

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    this.displayWelcomeMessage();

    this.board.display();
    while (true) {

      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      this.board.displayWithClear();
    }

    this.board.displayWithClear();
    this.displayResults();
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      //So we create a validChoices variable and initialise it with an array
      //we get from calling the `unusedSquares` method on the object value of
      //the board property of the TTTGame object
      const prompt = `Choose a square (${validChoices.join(", ")}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
    //So we access the board property of the object returned by invoking
    //the class. Then we call the `markSquareAt` method contained in the Board
    //class on that property and pass it (i) the number selected by the human
    //and the human marker value
    //The latter value is accessed by invoking the `getMarker` method on
    //the value of the huamn property
  }

  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));
    //This leaves us with an infinite loop since cmop has no moves available...
    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }
}

let game = new TTTGame();
game.play();