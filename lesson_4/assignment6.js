class Greeting {
  greet(message) {
    console.log(message);
  }
}

class Hello extends Greeting {
  hi() {
    this.greet('Hello');
  }
}

class Goodbye extends Greeting {
  bye() {
    this.greet('Goodbye');
  }
}

let hello = new Hello();
hello.hi();

let goodbye = new Goodbye();
goodbye.bye();