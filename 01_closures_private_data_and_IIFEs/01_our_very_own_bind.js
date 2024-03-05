/**
 * Darren Churchill
 *
 * Launch School Exercises
 * JS120 - JavaScript Exercises
 * Closures, Private Data, and IIFEs
 *
 * Our very own `bind()`
 *
 * https://launchschool.com/exercises/10433f9f
 */
"use strict";

function myBind(func, context) {
  return function() {
    return func.call(context);
  };
}

let obj = {
  a: "the a property",
};

function getA() {
  return this.a;
}

let boundFunc = myBind(getA, obj);

console.log(boundFunc());           // regular invocation
console.log(boundFunc.call(null));  // `this` has been permanently bound
