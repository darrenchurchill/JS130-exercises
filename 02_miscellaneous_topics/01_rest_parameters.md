# Launch School Exercises: JS130 - JavaScript Exercises

## Miscellaneous Topics: Rest Parameters

<https://launchschool.com/exercises/e85206bd>

How can we refactor the function definition below (without changing the function
invocation) so that we don't need to use the `arguments` object?

```js
function sum() {
  values = Array.prototype.slice.call(arguments);

  return values.reduce(function(a, b) {
    return a + b;
  });
}

sum(1, 4, 5, 6);  // => 16
```

### Solution

```js
function sum(...args) {
  return args.reduce(function(a, b) {
    return a + b;
  });
}

sum(1, 4, 5, 6);  // => 16
```

The rest parameter syntax lets you define a function taking an indefinite number
of arguments when invoked. The parameter defined with this syntax is an array
whose elements are the arguments passed to the invocation. In the example
solution above, `args` is assigned to a 4-element array with the values
`[1, 4, 5, 6]` when invoked with the arguments `1`, `4`, `5`, and `6`.
