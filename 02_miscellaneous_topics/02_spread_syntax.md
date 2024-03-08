# Launch School Exercises: JS130 - JavaScript Exercises

## Miscellaneous Topics: Spread Syntax

<https://launchschool.com/exercises/7f5b520f>

How can we refactor the invocation of the function `formatName` (without
changing the function definition) so that we don't need to grab each element of
the array `fullName` by index?

```js
function formatName(firstName, middleName, lastName) {
  return `${lastName}, ${firstName}, ${middleName[0]}.`;
}

fullname = ["James", "Tiberious", "Kirk"];

console.log(formatName(fullname[0], fullname[1], fullname[2]));
// => Kirk, James T.
```

### Solution

```js
function formatName(firstName, middleName, lastName) {
  return `${lastName}, ${firstName}, ${middleName[0]}.`;
}

fullname = ["James", "Tiberious", "Kirk"];

console.log(formatName(...fullname));
// => Kirk, James T.
```

The spread syntax expands an iterable, like an array, into its individual
elements. We can use this syntax to invoke the `formatName` function with the
`fullname` array's elements for each of the function's 3 parameters.
