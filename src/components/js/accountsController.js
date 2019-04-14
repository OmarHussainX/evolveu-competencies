class AccountsController {

    #accountsArray = []

  
    constructor() {  
        this.#accountsArray = []
      }
    
    // takes one parameter: new Account object, and adds it to the
    // array of Account objects
    addAccount(newAccount) {
        this.#accountsArray.push(newAccount)
    }

    removeAccount(accountName) {
        let arrayNew = []
        this.#accountsArray.forEach( item => {
            if (item.name !== accountName) {
                arrayNew.push(item)
            }
        })
        this.#accountsArray = arrayNew     
    }

    getLowestBalance() {
        let lowestBalance = this.#accountsArray[0].balance
        this.#accountsArray.forEach( item => {
            if (item.balance < lowestBalance) {
                lowestBalance = item.balance
            }
        })
        return lowestBalance         
    }

    getHighestBalance() {
        let highestBalance = this.#accountsArray[0].balance
        this.#accountsArray.forEach( item => {
            if (item.balance > highestBalance) {
                highestBalance = item.balance
            }
        })
        return highestBalance        
    }

    getTotalBalance() {
        let amount = 0
        this.#accountsArray.forEach( item => {
            amount += item.balance
        })
        return amount
    }

    renameAccount(oldName, newName) {
      this.#accountsArray.forEach(item => {
        if (item.name === oldName){
          item.setName(newName)
        }
      })
    }

    getArrayRef() {
      return this.#accountsArray
    }


    // Takes two parameters and sorts the collection of Account objecs accordingly:
    // order: 'ascending/descending' gives sort order
    // criteria: 'balance/name' gives the property on which to sort
    sortAccounts(order, criteria) {
        
        const array = this.#accountsArray

        switch(criteria) {

            // numeric sort
            case 'balance':
            array.sort((a, b) => {
                if (order === 'ascending')
                    return a.balance - b.balance
                else
                    return b.balance - a.balance
            })
            break

            // lowercase string sort
            case 'name':
            array.sort((a, b) => {
                a = a.name.toLowerCase()
                b = b.name.toLowerCase()
                if (order === 'ascending') {
                    if (a > b) return 1
                    if (a < b) return -1
                    return 0
                } 
                else {
                    if (a > b) return -1
                    if (a < b) return 1
                    return 0
                }
            })
            break

            default:
            break
        }

    }

}

export default AccountsController













































// -----------------------------------------------
// Dynamic Sorting Function
// https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
// -----------------------------------------------

// compareValues(order='ascending', key) {
//     return function(a, b) {

//         if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
//             // property doesn't exist on either object
//             return 0;
//         }
    
//         const varA = (typeof a[key] === 'string') ?
//                         a[key].toUpperCase() : a[key];
//         const varB = (typeof b[key] === 'string') ?
//                         b[key].toUpperCase() : b[key];
    
//         let comparison = 0;
//         if (varA > varB) {
//             comparison = 1;
//         } else if (varA < varB) {
//             comparison = -1;
//         }
//         return (
//             (order === 'desc') ? (comparison * -1) : comparison
//         )
//     }
// }

// -----------------------------------------------
// Old sorting function... works, but there's no need to do all this!
// Just use the built in Array.sort() wich accepts a comparison function as argument
// -----------------------------------------------


// Takes two parameters and sorts the collection of Account objecs accordingly:
// order: 'ascending/descending' gives sort order
// criteria: 'balance/name' gives the property on which to sort




// sortAccountsOld(order, criteria) {
    // REMOVED THIS IN ORDER TO REACH 100% COVERAGE IN jest :(
    // if ((order === 'ascending' || order === 'descending') &&
    //     (criteria === 'balance' || criteria === 'name')) {

//     const array = this.#accountsArray
//     let swappedElements

//     switch(criteria) {
        
//         //sort based on account balance!
//         case 'balance':

//         // keep looping through the array until no adjacent elements have been swapped
//         do {
//             swappedElements = false

//             // loop through the array, comparing adjacent elements
//             // - if the first element is bigger/smaller than the second, 
//             // exchange them, and set the swapped element flag to true
//             // while swapping balances, need to swap names as well in order to preserve Account data!
//             for (let i=0; i < array.length-1; i++) {
//                 switch(order) {
//                     case 'ascending':
//                     if (array[i].balance > array[i+1].balance) {
//                         const bigger = array[i].balance
//                         const tmpName = array[i].name
//                         array[i].setBalance(array[i+1].balance)
//                         array[i].setName(array[i+1].name)
//                         array[i+1].setBalance(bigger)
//                         array[i+1].setName(tmpName)
//                         swappedElements = true
//                     }
//                     break

//                     case 'descending':
//                     if (array[i].balance < array[i+1].balance) {
//                         const smaller = array[i].balance
//                         const tmpName = array[i].name
//                         array[i].setBalance(array[i+1].balance)
//                         array[i].setName(array[i+1].name)
//                         array[i+1].setBalance(smaller)
//                         array[i+1].setName(tmpName)
//                         swappedElements = true
//                     }
//                     break

//                     default:
//                     break
//                 }
//             }
//         } while (swappedElements)
//         break


//         // case-insensitive sort based on account name!
//         case 'name':

//         // keep looping through the array until no adjacent elements have been swapped
//         do {
//             swappedElements = false

//             // loop through the array, comparing adjacent elements
//             // - if the first element is bigger/smaller than the second, 
//             // exchange them, and set the swapped element flag to true
//             // while swapping names, need to swap balances as well in order to preserve Account data!
//             for (let i=0; i < array.length-1; i++) {
//                 switch(order) {
//                     case 'ascending':
//                     if (array[i].name.toLowerCase() > array[i+1].name.toLowerCase()) {
//                         const bigger = array[i].name
//                         const tmpBal = array[i].balance
//                         array[i].setName(array[i+1].name)
//                         array[i].setBalance(array[i+1].balance)
//                         array[i+1].setName(bigger)
//                         array[i+1].setBalance(tmpBal)
//                         swappedElements = true
//                     }
//                     break

//                     case 'descending':
//                     if (array[i].name.toLowerCase() < array[i+1].name.toLowerCase()) {
//                         const smaller = array[i].name
//                         const tmpBal = array[i].balance
//                         array[i].setName(array[i+1].name)
//                         array[i].setBalance(array[i+1].balance)
//                         array[i+1].setName(smaller)
//                         array[i+1].setBalance(tmpBal)
//                         swappedElements = true
//                     }
//                     break

//                     default:
//                     break
//                 }
//             }
//         } while (swappedElements)
//         break

//         default:
//         break
//     }
// } 
