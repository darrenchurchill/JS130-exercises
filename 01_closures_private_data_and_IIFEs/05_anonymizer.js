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
  // A plain object or Map would work too, but WeakMap is optimized for garbage
  // collection.
  let userAccounts = new WeakMap();

  function AccountInfo(email, password, firstName, lastName, displayName) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.displayName = displayName;
  }

  function doOnValidPassword(
    callback,
    inputPassword,
    thisArg,
    errMsg = "Invalid Password"
  ) {
    if (inputPassword === userAccounts.get(thisArg).password) {
      return callback.call(thisArg);
    }
    return errMsg;
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
      this.displayName = anonymize();
      userAccounts.set(
        this,
        new AccountInfo(email, password, firstName, lastName, this.displayName)
      );
      return this;
    },

    reanonymize(inputPassword) {
      return doOnValidPassword(() => {
        this.displayName = anonymize();
        userAccounts.get(this).displayName = this.displayName;
        return true;
      }, inputPassword, this);
    },

    resetPassword(oldPassword, newPassword) {
      return doOnValidPassword(() => {
        userAccounts.get(this).password = newPassword;
        return true;
      }, oldPassword, this);
    },

    firstName(inputPassword) {
      return doOnValidPassword(() => {
        return userAccounts.get(this).firstName;
      }, inputPassword, this);
    },

    lastName(inputPassword) {
      return doOnValidPassword(() => {
        return userAccounts.get(this).lastName;
      }, inputPassword, this);
    },

    email(inputPassword) {
      return doOnValidPassword(() => {
        return userAccounts.get(this).email;
      }, inputPassword, this);
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


let baz = Object.create(Account).init("baz@baz.com", "abcdef", "baz", "bazbaz");
console.log(baz.firstName);                          // returns the firstName function
console.log(baz.email);                              // returns the email function
console.log(baz.firstName("abcdef"));                // => "foo"
console.log(baz.firstName("abc"));                   // => "Invalid Password"
console.log(baz.displayName);                        // => 16 character sequence
console.log(baz.resetPassword("123", "abc"));        // => "Invalid Password"
console.log(baz.resetPassword("abcdef", "abc"));     // => true

displayName = baz.displayName;
console.log(baz.reanonymize("abc"));                 // => true
console.log(displayName === baz.displayName);        // => false

// Creating baz didn't overwrite fooBar's info
console.log(fooBar.firstName("abc"));                // => "foo"