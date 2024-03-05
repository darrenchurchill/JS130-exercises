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
  return function(...args) {
    return func.apply(context, args);
  };
}

let obj = {
  a: "the a property",
};

function getA() {
  return this.a;
}

let boundGetA = myBind(getA, obj);

console.log(boundGetA());           // regular invocation
console.log(boundGetA.call(null));  // `this` has been permanently bound

function getAConcat(txt) {
  return `${this.a} ${txt}`;
}

let boundGetAConcat = myBind(getAConcat, obj);

console.log(boundGetAConcat("message"));             // regular invocation
console.log(boundGetAConcat.call(null, "message"));  // `this` has been permanently bound
