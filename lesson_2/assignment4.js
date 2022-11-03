let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

/*
function assignProperty1(obj, prop, val) {
  if (obj[prop]) {
    obj[prop] = val;
  }
}
*/

/*
- FIRST search up the chain for the property
- When found, then assign

So we want the function to start with the object at the bottom 
of the prototype chain and then reach up to the top of the prototype
chain, changing its property value all the way down.

If, however, there is no such property in the object at the top of the
prototype chain, we want it to do nothing

- getPrototypeOf
- setPrototypeOf

*/
//ITERATIVE SOLUTION 
function assignProperty(obj, prop, val) {
  while (obj !== null) {
    if (obj.hasOwnProperty(prop)) {
      obj[prop] = val;
      break;
    }
    obj = Object.getPrototypeOf(obj);
  }
}

//While loop -> runs while the object is not NULL
//So it continues up the chain to Object.prototype but no further
//If the obj has PROP as its own property, then its value is reassigned
//to val
//Otherwise, outside the `if` clause, the value of obj
//is reassigned to the return value of looking for its prototype
//THIS is confusing... surely the retun value is the actual value, not the
//prototype object name...

//RECURSIVE SOLUTION
function assignProperty3(obj, prop, val) {
  if (obj === null) {
    return; 
  } else if (obj.hasOwnProperty(prop)) {
    obj[prop] = val;
  } else {
    assignProperty(Object.getPrototypeOf(obj), prop, val);
  }
}

/*
First clause of if statement: if the object reached is null, i.e. you 
get to the top of the prototype chain and can't find prop, then just return ->
nothing happens.

Second, if the object has the prop as its own object, then you reassign 
its value to val.

Otherwse, you call the function again but here the object val is now the return 
value of looking for the prototype of obj
*/

assignProperty(fooA, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false


let bar = { car: 1, boot: 2 };
let foo = Object.create(bar);
foo.seat = 3;

for (let prop in foo) {
  console.log(`The properties when you use for in are ${prop}: ${foo[prop]}`);
}

Object.keys(foo).forEach(prop => {
  console.log(`The properties when you use keys are ${prop}: ${foo[prop]}`);
});

/*
You create an object with no prototype by setting its prototype to null
You can determine whether an object has a prototype by using Object.getPrototypeOf()
*/