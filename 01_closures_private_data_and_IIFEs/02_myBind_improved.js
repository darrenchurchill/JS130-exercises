/**
 * Darren Churchill
 *
 * Launch School Exercises
 * JS120 - JavaScript Exercises
 * Closures, Private Data, and IIFEs
 *
 * `myBind()` Improved
 *
 * https://launchschool.com/exercises/65ab4825
 */
"use strict";

function myBind(func, context, ...initialArgs) {
  return function(...args) {
    return func.apply(context, [...initialArgs, ...args]);
  };
}

let obj = {
  a: "the a property",
};

function get(prop) {
  return this[prop];
}

let boundGetA = myBind(get, obj, "a");

console.log(boundGetA());           // regular invocation
console.log(boundGetA.call(null));  // `this` has been permanently bound

function getConcat(prop, txt) {
  return `${this[prop]} ${txt}`;
}

let boundGetAConcat = myBind(getConcat, obj, "a");

console.log(boundGetAConcat("message"));             // regular invocation
console.log(boundGetAConcat.call(null, "message"));  // `this` has been permanently bound
