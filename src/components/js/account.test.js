/*
Testing class 'Account' - expect this class to have the following:

- constructor(startingBalance, accountName)
- deposit(amount)   [value to be added]
- withdraw(amount)  [value to be withdrawn]
- name()            [return account name]
- balance()         [return current balance]

● using TDD what order are we going to develop this in?

1. Write 'Account' class tests (account.test.js) first
2. Create 'Account' class (account.js), containing only stub methods
3. Run tests, which *will* fail
4. Update 'Account' one method/one step at a time, just so *one* test passes
5. Repeat step 4 until all tests pass
6. Check for opportunities to refactor or optimise 'Account' code
7. If any changes are made to 'Account', re-run tests - if any fail, resolve
   them one by one until all tests pass

*/

import Account from './account'

let checkingAccount = null

test('Checking Account constructor (object instantiation)', () => {
    checkingAccount = new Account(0, 'life savings')
    expect(checkingAccount).not.toBeNull()
})

test('Checking constructor (name assignment)', () => {
    expect(checkingAccount.name).toMatch(/life savings/)
})

test('Checking constructor (balance assignment)', () => {
    expect(checkingAccount.balance).toBe(0)
})

test('Making a deposit(), expect balance to be 42', () => {
    checkingAccount.deposit(42)
    expect(checkingAccount.balance).toBe(42)
})

test('Making a withdraw()-al, expect balance to be 10', () => {
    checkingAccount.withdraw(32)
    expect(checkingAccount.balance).toBe(10)
})


test('Checking account name assignment', () => {
    checkingAccount.setName('life savings')
    expect(checkingAccount.name).toMatch(/life savings/)
})

// test('Checking account name assignment', () => {
//     checkingAccount = new Account(0, 'life savings')
//     checkingAccount.renameAccount('life savings', 'emergency')
//     expect(checkingAccount.name).toMatch(/emergency/)
// })


test('Checking account balance assignment', () => {
    checkingAccount.setBalance(42)
    expect(checkingAccount.balance).toBe(42)
})
