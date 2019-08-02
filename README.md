<p align="center">
<img src="src/logo.svg" alt="EvolveU Projects" width="400" />
</p>

#  React SPA
A single page app (SPA) built with [React](https://reactjs.org/), showcasing solutions for the [JavaScript &amp; React competencies](src/assignments) assigned in EvolveU's [Full Stack Developer Program](https://www.evolveu.ca/program).




## [&rarr; Live demo](https://evolveu.netlify.com/)




## Installation

You'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) and [npm](http://npmjs.com) installed ([Node.js](https://nodejs.org/en/download/) includes [npm](http://npmjs.com))

```bash
# Clone repository
$ git clone https://github.com/OmarHussainX/evolveu-competencies

# Enter project folder
$ cd evolveu-competencies

# Install dependencies
$ npm install

# Run (should launch in browser, typically at http://localhost:3000/)
$ npm start
```




## Usage
<p align="center"><img src="src/home.png"/></p>

Use the icons at the top to navigate to different areas of the app. From left to right, these are:

* [Home](#home)
* [Calculator](#calculator)
* [Manage a single bank account](#one-bank-account)
* [Manage multiple bank accounts (belonging to one user)](#bank-accounts-manager)
* View/manage a collection of cities, with filtering by hemisphere
* View/manage box office gross data in three different data structures



### Home
_[Solution for Comp 120 - ReactJS](src/assignments/Comp%20120%20-%20ReactJS.pdf)_

Displays the React logo.



### Calculator
_[Solution for Comp 130 - JavaScript TDD](src/assignments/Comp%20130%20-%20JavaScript%20TDD.pdf)_
<p align="center"><img src="src/calculator.png" /></p>

__An exercise in test driven development (TDD) using jest.__
1. Write tests for basic mathematical functions (addition, subtraction, multiplication, division)
2. Write stubs for the mathematical functions
3. Run tests, which _will_ fail
4. Select _one_ function stub and write its code
5. Run tests
   * If tests for the updated function pass, go to step 4
   * Otherwise, revise the code for the function under development and go step 5
6. Repeat steps 4-5 until all code has been written and all tests pass
7. Check for opportunities to refactor/optimise code
8. If a change is made to code, re-run tests - if any fail, resolve them one by one until all tests pass

_NOTE: View test coverage report at 'coverage/lcov-report/src/components/js/index.html' after cloning the repo)_

The tested &amp; verified math functions were then used to build a simple calculator in React.



### One bank account
_[Solution for Comp 140 - JavaScript Objects and State](src/assignments/Comp%20140%20-%20JavaScript%20Objects%20and%20State.pdf)_
<p align="center"><img src="src/account.png" /></p>

Test driven development of a simple bank `Account` class in JS, to handle management of a single bank account: creation, renaming, deposit/withdraw, etc.

Although JS classes do not officially have private members, I _was_ able to use private members in my `Account` class by taking advantage of an [experimental private field declaration feature](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Field_declarations). (Note that this is only possible since Babel takes care of transpiling the code into common JS suitable for all browsers.)

_NOTE: View test coverage report at 'coverage/lcov-report/src/components/js/index.html' after cloning the repo._

The tested &amp; verified bank `Account` class was used to build a solitary account manager in React. _(NOTE: The UI does not allow for the account to be renamed, and the starting balance is pre-determined. These features - and more - will be exposed in the UI of the next section of this SPA.)_



### Bank accounts manager
_[Solution for Comp 140 - JavaScript Objects and State](src/assignments/Comp%20140%20-%20JavaScript%20Objects%20and%20State.pdf)_
<p align="center"><img src="src/accounts.png" /></p>

Test driven development of an `AccountsController` class, allowing for the management of a collection of bank `Account` objects. The `AccountsController` class stores bank `Account` objects in a [private array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Field_declarations), and provides several methods for managing the collection of bank `Account` objects, e.g.
* adding, deleting, renaming accounts
* getting the account with highest/lowest balance
* getting the total balance of all accounts
* sorting all accounts in ascending/descending order by name or balance

_NOTE: View test coverage report at 'coverage/lcov-report/src/components/js/index.html' after cloning the repo._

The tested &amp; verified `AccountsController` class was used to build a sophisticated bank account manager in React.

&nbsp;

__Creating the first account:__

Until the first bank account is created, the user is presented with a very prominent 'New Account' button, seen above and here, during creation of the initial account.
<p align="center"><img src="src/accounts1.png" /></p>

&nbsp;

__Initial account created:__

Now that one account has been created, the 'New Account' button becomes less prominent, but remains easily accessible and highly visible.
<p align="center"><img src="src/accounts2.png" /></p>

&nbsp;

__Adding a second account:__
<p align="center"><img src="src/accounts3.png" /></p>

&nbsp;

__After adding several accounts:__

From left to right, the four icons next to the right of each account allow for: deposit/withdrawal, transfer between accounts, account renaming, and account deletion.
<p align="center"><img src="src/accounts4.png" /></p>

&nbsp;

__Attempting to overdraw an account:__
<p align="center"><img src="src/accounts5.png" /></p>

&nbsp;

__An error message is displayed:__

The following operations are not allowed, and cause descriptive error messages to be displayed:
* creating an account with a name that already exists
* making a transfer when only one account exists
* overdrawing an account when withdrawing funds
* overdrawing an account when transferring funds between accounts
<p align="center"><img src="src/accounts6.png" /></p>

&nbsp;

__Transferring funds between accounts:__

The account selected in the 'From' dropdown is not available in the 'To' dropdown, and vice versa. Whenever the account selected in one dropdown is changed, the other dropdown is updated appropriately. 
<p align="center"><img src="src/accounts7.png" /></p>

&nbsp;

__Renaming an account:__
<p align="center"><img src="src/accounts8.png" /></p>

&nbsp;

__Attempting to delete an account:__
<p align="center"><img src="src/accounts9.png" /></p>

&nbsp;

__Accounts can be sorted by balance, in ascending/descending order:__
<p align="center"><img src="src/accounts10.png" /></p>

&nbsp;

__Accounts can be sorted by name, in ascending/descending order:__
<p align="center"><img src="src/accounts11.png" /></p>

&nbsp;

__After deleting an account:__
<p align="center"><img src="src/accounts12.png" /></p>



---

> LinkedIn [omar.codes](http://omar.codes/) &nbsp;&middot;&nbsp;
> GitHub [OmarHussainX](https://github.com/OmarHussainX/) &nbsp;&middot;&nbsp;
> Twitter [@OmarHussainX](https://twitter.com/OmarHussainX)