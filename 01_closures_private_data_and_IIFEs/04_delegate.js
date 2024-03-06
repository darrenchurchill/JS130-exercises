/**
 * Darren Churchill
 *
 * Launch School Exercises
 * JS120 - JavaScript Exercises
 * Closures, Private Data, and IIFEs
 *
 * Delegate
 *
 * https://launchschool.com/exercises/c0f47c70
 */
"use strict";

function delegate(obj, method, ...args) {
  return function() {
    obj[method](...args);
  };
}

let foo = {
  name: "test",
  bar: function(greeting) {
    console.log(greeting + " " + this.name);
  },
};

let baz = {
  qux: delegate(foo, "bar", "hello"),
};

baz.qux(); // logs "hello test"

foo.bar = function() {
  console.log("changed");
};

baz.qux(); // logs "changed"
