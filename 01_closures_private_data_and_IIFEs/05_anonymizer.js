/**
 * Darren Churchill
 *
 * Launch School Exercises
 * JS120 - JavaScript Exercises
 * Closures, Private Data, and IIFEs
 *
 * Anonymizer
 *
 * https://launchschool.com/exercises/0a5ea936
 */
"use strict";

const Account = (function() {
  // FIXME: there will only be one version of each of these variables across all
  // Account instances. This isn't probably what you'd want.
  let userEmail;
  let userPassword;
  let userFirstName;
  let userLastName;

  function isValidPassword(inputPassword) {
    return inputPassword === userPassword;
  }

  function anonymize() {
    const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";
    const LENGTH = 16;
    let result = "";

    for (let count = 0; count < LENGTH; count += 1) {
      result += CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    return result;
  }

  return {
    init(email, password, firstName, lastName) {
      userEmail = email;
      userPassword = password;
      userFirstName = firstName;
      userLastName = lastName;

      this.displayName = anonymize();

      return this;
    },

    reanonymize(inputPassword) {
      if (!isValidPassword(inputPassword)) return "Invalid Password";
      this.displayName = anonymize();
      return true;
    },

    resetPassword(oldPassword, newPassword) {
      if (!isValidPassword(oldPassword)) return "Invalid Password";
      userPassword = newPassword;
      return true;
    },

    firstName(inputPassword) {
      if (!isValidPassword(inputPassword)) return "Invalid Password";
      return userFirstName;
    },

    lastName(inputPassword) {
      if (!isValidPassword(inputPassword)) return "Invalid Password";
      return userLastName;
    },

    email(inputPassword) {
      if (!isValidPassword(inputPassword)) return "Invalid Password";
      return userEmail;
    },
  };
})();


let fooBar = Object.create(Account).init("foo@bar.com", "123456", "foo", "bar");
console.log(fooBar.firstName);                       // returns the firstName function
console.log(fooBar.email);                           // returns the email function
console.log(fooBar.firstName("123456"));             // => "foo"
console.log(fooBar.firstName("abc"));                // => "Invalid Password"
console.log(fooBar.displayName);                     // => 16 character sequence
console.log(fooBar.resetPassword("123", "abc"));     // => "Invalid Password"
console.log(fooBar.resetPassword("123456", "abc"));  // => true

let displayName = fooBar.displayName;
console.log(fooBar.reanonymize("abc"));              // => true
console.log(displayName === fooBar.displayName);     // => false
