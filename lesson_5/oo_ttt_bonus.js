let readline = require("readline-sync");

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  getMarker() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }
}

class Board {
  static CENTRAL_SQUARE = "5";

  constructor() {
    this.reset();
  }

  reset() {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[String(counter)] = new Square();
    }
  }

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

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  isUnusedSquare(key) {
    return this.squares[key].isUnused();
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.isUnusedSquare(key));
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
    this.score = 0;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {

  static MARKERS_TO_WIN = 3;
  static GAMES_TO_WIN = 3;

  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],
    [ "4", "5", "6" ],
    [ "7", "8", "9" ],
    [ "1", "4", "7" ],
    [ "2", "5", "8" ],
    [ "3", "6", "9" ],
    [ "1", "5", "9" ],
    [ "3", "5", "7" ],
  ];

  static joinOr(choices, separator = ", ", conjunction = " or ") {
    let remainingChoices = choices.length;

    if (remainingChoices < 3) {
      return choices.join(conjunction);

    } else {
      let firstPart = choices.slice(0, remainingChoices - 1).join(separator);
      let secondPart = conjunction.concat(choices[remainingChoices - 1]);
      return firstPart + secondPart;
    }
  }

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.firstPlayer = this.human;
  }

  play() {
    this.displayWelcomeMessage();

    do {
      this.playOneGame();

      if (this.isMatchWinner()) {
        this.displayMatchResult();
        break;
      }

      this.firstPlayer = this.togglePlayer(this.firstPlayer);

    } while (this.playAgain());

    this.displayGoodbyeMessage();
  }

  playOneGame() {
    let currentPlayer = this.firstPlayer;

    this.board.reset();
    this.board.display();

    while (true) {
      this.playerMoves(currentPlayer);
      if (this.gameOver()) break;

      this.board.displayWithClear();
      currentPlayer = this.togglePlayer(currentPlayer);
    }

    this.board.displayWithClear();
    this.displayGameResult();
    this.incrementScores();
    this.displayScores();
  }

  playAgain() {
    let validAnswers = ["y", "n", "Y", "N"];
    let answer;

    while (true) {
      answer = readline.question("\nDo you want to play again? Enter 'y' or 'n':\n");
      if (validAnswers.includes(answer)) break;

      answer = readline.question("\nInvalid response. Please enter 'y' or 'n':\n");
    }
    console.clear();
    return answer.toLowerCase() === "y";
  }

  playerMoves(currentPlayer) {
    if (currentPlayer === this.human) {
      this.humanMoves();
    } else {
      this.computerMoves();
    }
  }

  togglePlayer(player) {
    return player === this.human ? this.computer : this.human;
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      choice = readline.question(`Choose a square (${TTTGame.joinOr(validChoices)}): `);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let choice;

    if (this.isComputerThreat()) {
      choice = this.threatenedSquare(this.computer);

    } else if (this.isHumanThreat()) {
      choice = this.threatenedSquare(this.human);

    } else if (this.isCentralSquareFree()) {
      choice = Board.CENTRAL_SQUARE;

    } else {
      choice = this.randomChoice();
    }
    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  isHumanThreat() {
    return this.threatenedRow(this.human) && this.threatenedSquare(this.human);
  }

  isComputerThreat() {
    return this.threatenedRow(this.computer)
      && this.threatenedSquare(this.computer);
  }

  threatenedRow(player) {
    let threatenedRow = TTTGame.POSSIBLE_WINNING_ROWS.filter(row => {
      return this.board.countMarkersFor(player, row) ===
        (TTTGame.MARKERS_TO_WIN - 1) &&
        row.some(square => this.board.isUnusedSquare(square));
    });

    return threatenedRow[0] || null;
  }

  threatenedSquare(player) {
    let threatenedRow = this.threatenedRow(player);
    return threatenedRow.
      filter(square => this.board.isUnusedSquare(square))[0].toString();
  }

  isCentralSquareFree() {
    return this.board.isUnusedSquare(Board.CENTRAL_SQUARE);
  }

  randomChoice() {
    let validChoices = this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));

    return choice;
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isGameWinner(this.human) || this.isGameWinner(this.computer);
  }

  isGameWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === TTTGame.MARKERS_TO_WIN;
    });
  }

  getGameResult() {
    switch (true) {
      case this.isGameWinner(this.human): return "human";
      case this.isGameWinner(this.computer): return "computer";
      default: return "tie";
    }
  }

  displayGameResult() {
    let result = this.getGameResult();

    switch (result) {
      case "human":
        console.log("You won! Congratulations!");
        break;
      case "computer":
        console.log("I won! I won! Take that, human!");
        break;
      default:
        console.log("A tie game. How boring.");
    }
  }

  incrementScores() {
    let result = this.getGameResult();

    if (result === "human") {
      this.human.score += 1;

    } else if (result === "computer") {
      this.computer.score += 1;
    }
  }

  displayScores() {
    console.log(`YOU: ${this.human.score} || COMPUTER: ${this.computer.score}`);
  }

  isMatchWinner() {
    return this.human.score === TTTGame.GAMES_TO_WIN ||
      this.computer.score === TTTGame.GAMES_TO_WIN;
  }

  //I can see that there's an eslint error here because
  //it expects a value to be returned at the end of the method
  //What, if anything, should I do about this?
  getMatchWinner() {
    if (this.human.score === TTTGame.GAMES_TO_WIN) {
      return "YOU";

    } else if (this.computer.score === TTTGame.GAMES_TO_WIN) {
      return "COMPUTER";
    }
  }

  displayMatchResult() {
    let matchWinner = this.getMatchWinner();
    let verb;

    switch (matchWinner) {
      case "YOU":
        verb = "have";
        break;
      case "COMPUTER":
        verb = "has";
    }

    console.log(`\n|| ${matchWinner} ${verb} won the match! ||\n`);
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("The first player to win 3 games wins the match. Good luck!");
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!\n");
  }
}

let game = new TTTGame();
game.play();

