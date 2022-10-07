**TEXTUAL DESCRIPTION OF PROBLEM**
- RPS is a game
- Each player chooses one of 3 possible moves: rock, paper or scissors
- Winner chosen by comparing players' moves with the rules:
    - rock beats scissors
    - paper beats rock
    - scissors beats paper
    - if both players choose the same move => draw

**SIGNIFICANT VERBS AND NOUNS**
Verbs: 
- choose
- compare
- beats

Nouns: 
- move (note that RPS are variations of move, i.e. moves that have different states)
- player
- rules
- draw

**ORGANISE AND ASSOCIATE VERBS WITH NOUNS**

Choose: 
- player
- move

Compare/Beats:
- rules
- draw

**MOVE WEIGHTING**
1. Work out whether human wins more than 60% of the time with any given move by the computer after round 1:

    - Is any given computer move more likely to lead to human success?

    - Work out the link between (i) computer's historic moves and (ii) user winning
        - comp history: ['rock', 'paper' etc.]
        - create another array of wins that corresponds with comp history:
            ['human', 'computer' etc.]

        - Loop through winsArr:
            - for eachWinsArr element -> get the indx -> then return the corresponding element in comp history 
            - add it to another array (compLosingMoves)= ['rock', 'paper', 'scissors', 'scissors'] etc.
            - work out percentage strength of winning move by looping through basic choices -> 
                - filter compLosingMoves for current choice, e.g. all 'rocks'
                - get length, i.e. number of tiems rocks appears, e.g. 3
                - get total number of moves in compLosingMoves, e.g. 12 
                - add num ov moves to object: -> turn to percentage 
                    {rock: 5/12 = c.45%,
                    paper: 6/12 = 50%, 
                    spock: 1/12 = c.8%,
                    scissors: 0 = 0%, 
                    lizard: 0} 

                    flips to 
                    {rock: 65%,
                    paper: 50% ,
                    spock: 92%, 
                    scissors: 100%,
                    lizard: 100%}
    
    - Make it correspondingly less likely that comp will choose a given move on the next go:
        - So if playing 'rock' was the move that made comp make 30% of its losses -> 
        - Generate new choices array = loop through choices Arr and add each one [compLosingMoves.length * flipped percentage] times
            ['lizard', 'lizard', `lizard', etc. 12x, sc x12, spock x 10, paper x 6, rock x ]

***********************************************************************************************************************>>>>

2. If yes, decrease liklihood of computer choosing that move:
    
    - DO THIS AFTER weights have been increased or decreased by findMostSuccessfulMove...
    - Assign weight of 1 to each choice
    - Create choices arr by looping through object and repeating each choice weight times

    - If findMostSuccessfulMove() is truthy -> 
    - let mostSuccessfulMove = findMostSuccessfulMove();

    - let choices = this.choices();
    - then reassign choices so that effectively 1 more of each move is added to the choices array 
        e.g. if mostSuccessfulMove = 'rock'
             choices = ['rock', 'paper', 'paper', 'scissors', 'scissors', etc.]

    - 

3. After round 1, assess on a per move basis 
    - each time, weighting returns to one each, i.e. ['rock', 'paper', 'sc', 'l', 'sp']


//TO DO
- Get move weighting done 
- Check through top 3 LS choices and compare
- Review again -> check it's readable
- Submit by the 3.30 and do quiz and assessment


