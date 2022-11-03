//**PROBLEM 3**

//Write Circle constructor
//Takes radius as an argument
//Call an area method on any objects created by the Circle constructor

function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function() {
  return Math.PI * Math.pow(this.radius, 2); 
}

let a = new Circle(3);
let b = new Circle(4);

//console.log(a.area().toFixed(2)); // => 28.27
//console.log(b.area().toFixed(2)); // => 50.27
//console.log(a.hasOwnProperty('area')); // => false

//**PROBLEM 6**

/*
function Ninja() {
  this.swung = false;
}

Ninja.prototype.swing = function() {
  this.swung = true;
  return this;
}

// Add a swing method to the Ninja prototype which
// modifies `swung` (i.e. changes it from false to true)
//and returns the calling object (i.e. this)

let ninjaA = new Ninja();
let ninjaB = new Ninja();

console.log(ninjaA.swing().swung);      // logs `true`
console.log(ninjaB.swing().swung);      // logs `true`
*/

//**PROBLEM 7

let ninjaA;

{
  const Ninja = function() {
    this.swung = false;
  };

  ninjaA = new Ninja();
}

// create a `ninjaB` object here; don't change anything else
/*
let ninjaB = {};
ninjaB.constructor = ninjaA.constructor;
*/

//LS solution

let ninjaB = new ninjaA.constructor();


console.log(ninjaA.constructor === ninjaB.constructor); // => true
console.log(ninjaA);
console.log(ninjaB);

//**PROBLEM 8 */

function User(first, last) {
  if (!(this instanceof User)) {
    return new User(first, last);
  }
  this.name = first + ' ' + last;
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe
