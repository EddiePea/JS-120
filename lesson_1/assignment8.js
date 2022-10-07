//Create three objects that represent the three books

let bookA = {
    title: 'Mythos',
    author: 'Stephen Fry',

    getDescription() {
        console.log(`${this.title} was written by ${this.author}`);
    }
}

let bookB = {
    title: 'Me Talk Pretty One Day',
    author: 'David Sedaris',

    getDescription() {
        console.log(`${this.title} was written by ${this.author}`);
    }
}

let bookC = {
    title: "Aunts aren't Gentlement",
    author: 'PG Wodehouse',

    getDescription() {
        console.log(`${this.title} was written by ${this.author}`);
    }
}

/*
Observations: 
- Unnecessary code, e.g. duplication of getDescription() function
- Each object must hold unique values for title and author properties
*/

//Create factory function for books 
//Aim to use with code provided below

function createBook(title, author, read = false) {
    return {
        title,
        author,
        read,

        readBook() {
            this.read = true;
        },

        getDescription() {
            return `${this.title} was written by ${this.author}. ` + 
                  `I ${this.read ? 'have' : "haven't"} read it.`;
        }, 
    };
}


let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris', false);
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse', true);

book2.readBook();

console.log(book1.getDescription());  // "Mythos was written by Stephen Fry."
console.log(book2.getDescription());  // "Me Talk Pretty One Day was written by David Sedaris."
console.log(book3.getDescription());  // "Aunts aren't Gentlemen was written by PG Wodehouse"

//console.log(book1.read);
//console.log(book2.read);
//console.log(book3.read);

//So here initially the value of the book1.read property is false
//Then we invoke the readBook() method in the book1 function
//That reassigns the value of the book1.read property to true
//Then when we log the book1.read property to the console, it returns true

/*
NOTES
- No return statements needed in the methods if changing property
- Otherwise, return statement needed
- You can use ternary conditional operators in template literals
*/