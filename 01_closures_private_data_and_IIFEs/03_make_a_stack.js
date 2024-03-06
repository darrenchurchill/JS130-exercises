/**
 * Darren Churchill
 *
 * Launch School Exercises
 * JS120 - JavaScript Exercises
 * Closures, Private Data, and IIFEs
 *
 * Make a Stack
 *
 * https://launchschool.com/exercises/ae22b618
 */
"use strict";

function newStack() {
  let stack = [];

  return {
    push(item) {
      stack.push(item);
    },

    pop() {
      return stack.pop();
    },

    printStack() {
      stack.forEach((item) => console.log(item));
    },
  };
}

let stack = newStack();
stack.push(1);
stack.push(2);
console.log(`Current stack:`);
stack.printStack();
console.log(`Popping: ${stack.pop()}`);
stack.push(3);
console.log(`Current stack:`);
stack.printStack();
console.log(`Popping: ${stack.pop()}`);
console.log(`Popping: ${stack.pop()}`);
console.log(`Current stack:`);
stack.printStack();
