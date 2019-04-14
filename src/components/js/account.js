class Account {

    #name = ''
    #balance = 0
    constructor(startingBalance, accountName) {
        this.#balance = +(parseFloat(startingBalance).toFixed(2))
        this.#name = accountName
    }

    get name() { return this.#name }
    get balance() { return this.#balance }

    setBalance(amount) { this.#balance = +amount.toFixed(2) }
    setName(accountName) { this.#name = accountName}

    deposit(amount) { 
        this.#balance += parseFloat(amount)
        this.#balance = +this.#balance.toFixed(2)
    }

    withdraw(amount) { 
        this.#balance -= parseFloat(amount)
        this.#balance = +this.#balance.toFixed(2)
    }
}

export default Account


// Conversion of input to a floating point number with two decimal places:
// parse 'amount' to a float _number_, toFixed returns a _string_ equivalent
// with 2 decimal places, which is converted to a number via the + unary operator
//
// +(parseFloat(amount).toFixed(2))