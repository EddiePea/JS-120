const Speed = {
  goFast() {
    console.log(`I'm a ${this.constructor.name} and going super fast!`);
  }
};

class Car {
  goSlow() {
    console.log(`I'm safe and driving slow.`);
  }
}

Object.assign(Car.prototype, Speed);

class Truck {
  goVerySlow() {
    console.log(`I'm a heavy truck and like going very slow.`);
  }
}

Object.assign(Truck.prototype, Speed);

//Use the `Speed` object as a mix-in to make `Car` and `Truck` class goFast
//How can you check whether `Car` and `Truck` can now go fast?

let smallCar = new Car();
smallCar.goFast();

let bigTruck = new Truck();
bigTruck.goFast();

//NB you have to create an instance of each type first, before you can call
//the `goFast` method

console.log('goFast' in smallCar);
console.log('goFast' in bigTruck);

//You can use the `in` operator to check whether an object responds to a
//specific method


//PROBLEM 3

/*
class WheeledVehicle {
  constructor(tirePressure, kmTravelledPerLiter, fuelCapInLiter) {
    this.tires = tirePressure;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }

  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  }

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }

  range() {
    return this.fuelCap *  this.fuelEfficiency;
  }
}

class Auto extends WheeledVehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super([30,30,32,32], 50, 25.0);
  }
}

class Motorcycle extends WheeledVehicle {
  constructor() {
    // array represents tire pressure for two tires
    super([20,20], 80, 8.0);
  }
}

class Catamaran {
  constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
    // catamaran specific logic

    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
  }
}

*/

//We want to share the code for tracking fuel efficiency and range
//Modify the class definitions and move code into a mix-in 
//to share code between Catamaran and wheeled vehicle classes 

const Moveable = {
  range() {
    return this.fuelCap * this.fuelEfficiency;
  }
};

//We move the code shared by `Catamaran` and `WheeledV` into the
//`Moveable` mix-in
//Definitions of Auto and Motorcycle remain unchanged -> both inherit
//from WheeledV


class WheeledVehicle {
  constructor(tirePressure, kmTravelledPerLiter, fuelCapInLiter) {
    this.tires = tirePressure;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }

  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  }

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }
}

Object.assign(WheeledVehicle.prototype, Moveable);

class Auto extends WheeledVehicle {
  constructor() {
    super([30, 30, 32, 32], 50, 25.0);
  }
}

class Motorcycle extends WheeledVehicle {
  constructor() {
    super([20, 20], 80, 8.0);
  }
}

class Catamaran {
  constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
    // catamaran specific logic

    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }
}

Object.assign(Catamaran.prototype, Moveable);
