import AccountsController from '../js/accountsController'
import Account from '../js/account';


test('Checking AccountsController constructor (object instantiation)', () => {
    let checkAC = null
    checkAC = new AccountsController()
    expect(checkAC).not.toBeNull()
})

test ('Addition of new account', () => {
    const checkAC = new AccountsController()
    const newAccount = new Account(20, "savings")
    checkAC.addAccount(newAccount)
    expect(checkAC.getTotalBalance()).toBe(20)
})

test ('Removal of account', () => {
    const checkAC = new AccountsController()
    const newAccount = new Account(30, "emergency")
    const newAccount2 = new Account(42, "hitchhiker")
    checkAC.addAccount(newAccount)
    checkAC.addAccount(newAccount2)
    checkAC.removeAccount("emergency")
    expect(checkAC.getTotalBalance()).toBe(42)
})

test ('Lowest balance', () => {
    const checkAC = new AccountsController()
    const newAccount1 = new Account(50, "savings1")
    const newAccount2 = new Account(10, "savings2")
    checkAC.addAccount(newAccount1)
    checkAC.addAccount(newAccount2)
    expect(checkAC.getLowestBalance()).toBe(10)
})

test ('Highest balance', () => {
    const checkAC = new AccountsController()
    const newAccount1 = new Account(60, "savings3")
    const newAccount2 = new Account(20, "savings4")
    const newAccount3 = new Account(85, "savings5")
    checkAC.addAccount(newAccount1)
    checkAC.addAccount(newAccount2)
    checkAC.addAccount(newAccount3)
    expect(checkAC.getHighestBalance()).toBe(85)
})

test ('Total balance', () => {
    const checkAC = new AccountsController()
    const newAccount1 = new Account(80, "savings")
    const newAccount2 = new Account(10, "savings2")
    checkAC.addAccount(newAccount1)
    checkAC.addAccount(newAccount2)
    expect(checkAC.getTotalBalance()).toBe(90)
})

test('Checking account name assignment', () => {
    const checkAC = new AccountsController()
    const checkingAccount = new Account(0, 'life savings')
    checkAC.addAccount(checkingAccount)
    checkAC.renameAccount('savings','emergency')
    checkAC.renameAccount('life savings','emergency')
    const arrayRef = checkAC.getArrayRef()

    let nameMatch = false
    arrayRef.forEach(item => {
      if (item.name === 'emergency') {
        nameMatch = true;
      }
    })
    expect(nameMatch).toBe(true)
})

test('Testing sorting: ascending sort on balance', () => {
    const checkAC = new AccountsController()

    let checkingAccount = new Account(120, 'tango')
    checkAC.addAccount(checkingAccount)
    checkingAccount = new Account(13.4, 'charlie')
    checkAC.addAccount(checkingAccount)
    checkingAccount = new Account(0.09, 'zulu')
    checkAC.addAccount(checkingAccount)
    checkingAccount = new Account(68, 'bravo')
    checkAC.addAccount(checkingAccount)
    checkingAccount = new Account(11, 'omega')
    checkAC.addAccount(checkingAccount)

    const array = checkAC.getArrayRef()
    let sorted = false

    console.log('array before sorting ------------')
    array.forEach(item => {
        console.log(`${item.name}, ${item.balance}`)
    })

    checkAC.sortAccounts('ascending', 'balance')
  
    if (array[0].balance === 0.09 && 
        array[1].balance === 11 &&    
        array[2].balance === 13.4 &&   
        array[3].balance === 68 &&   
        array[4].balance === 120   
        ) {
        sorted = true;
    }

    console.log('array after sorting ------------')
    array.forEach(item => {
        console.log(`${item.name}, ${item.balance}`)
    })

    expect(sorted).toBe(true)
})

test('Testing sorting: descending sort on balance', () => {
    const checkAC = new AccountsController()

    let checkingAccount = new Account(120, 'tango')
    checkAC.addAccount(checkingAccount)
    checkingAccount = new Account(13.4, 'charlie')
    checkAC.addAccount(checkingAccount)
    checkingAccount = new Account(0.09, 'zulu')
    checkAC.addAccount(checkingAccount)
    checkingAccount = new Account(68, 'bravo')
    checkAC.addAccount(checkingAccount)
    checkingAccount = new Account(11, 'omega')
    checkAC.addAccount(checkingAccount)

    const array = checkAC.getArrayRef()
    let sorted = false

    console.log('array before sorting ------------')
    array.forEach(item => {
        console.log(`${item.name}, ${item.balance}`)
    })

    checkAC.sortAccounts('descending', 'balance')
  
    if (
        array[0].balance === 120  && 
        array[1].balance === 68 &&   
        array[2].balance === 13.4 &&   
        array[3].balance === 11 &&    
        array[4].balance === 0.09 
        ) {
        sorted = true;
    }

    console.log('array after sorting ------------')
    array.forEach(item => {
        console.log(`${item.name}, ${item.balance}`)
    })

    expect(sorted).toBe(true)
})

test('Testing sorting: ascending sort on name', () => {
    const checkAC = new AccountsController()

    let checkingAccount = new Account(120, 'tango')
    checkAC.addAccount(checkingAccount)
    checkingAccount = new Account(13.4, 'charlie')
    checkAC.addAccount(checkingAccount)
    checkingAccount = new Account(0.09, 'zulu')
    checkAC.addAccount(checkingAccount)
    checkingAccount = new Account(68, 'bravo')
    checkAC.addAccount(checkingAccount)
    checkingAccount = new Account(11, 'omega')
    checkAC.addAccount(checkingAccount)
    checkingAccount = new Account(68, 'zulu')
    checkAC.addAccount(checkingAccount)

    const array = checkAC.getArrayRef()
    let sorted = false

    console.log('array before sorting ------------')
    array.forEach(item => {
        console.log(`${item.name}, ${item.balance}`)
    })

    checkAC.sortAccounts('ascending', 'name')
  
    if (
        array[0].name === 'bravo'  && 
        array[1].name === 'charlie' &&   
        array[2].name === 'omega' &&   
        array[3].name === 'tango' &&    
        array[4].name === 'zulu' &&
        array[5].name === 'zulu' 
        ) {
        sorted = true;
    }

    console.log('array after sorting ------------')
    array.forEach(item => {
        console.log(`${item.name}, ${item.balance}`)
    })

    expect(sorted).toBe(true)
})

test('Testing sorting: descending sort on name', () => {
    const checkAC = new AccountsController()

    let checkingAccount = new Account(120, 'tango')
    checkAC.addAccount(checkingAccount)
    checkingAccount = new Account(13.4, 'charlie')
    checkAC.addAccount(checkingAccount)
    checkingAccount = new Account(0.09, 'zulu')
    checkAC.addAccount(checkingAccount)
    checkingAccount = new Account(68, 'bravo')
    checkAC.addAccount(checkingAccount)
    checkingAccount = new Account(11, 'omega')
    checkAC.addAccount(checkingAccount)
    checkingAccount = new Account(68, 'zulu')
    checkAC.addAccount(checkingAccount)

    const array = checkAC.getArrayRef()
    let sorted = false

    console.log('array before sorting ------------')
    array.forEach(item => {
        console.log(`${item.name}, ${item.balance}`)
    })

    //making bad calls to cover some untesteed branches of code
    checkAC.sortAccounts('sdf', 'dgd')
    checkAC.sortAccounts('fgh', 'balance')
    checkAC.sortAccounts('866', 'name')
    checkAC.sortAccounts('ascending', 'sfsf')

    checkAC.sortAccounts('descending', 'name')
    
    if (
        array[0].name === 'zulu' &&
        array[0].balance === 68 &&
        array[1].name === 'zulu' &&
        array[1].balance === 0.09 &&
        array[2].name === 'tango' &&    
        array[2].balance === 120 &&
        array[3].name === 'omega' &&   
        array[3].balance === 11 &&
        array[4].name === 'charlie' &&   
        array[4].balance === 13.4 &&
        array[5].name === 'bravo' &&
        array[5].balance === 68
        ) {
        sorted = true;
    }

    console.log('array after sorting ------------')
    array.forEach(item => {
        console.log(`${item.name}, ${item.balance}`)
    })

    expect(sorted).toBe(true)
})
