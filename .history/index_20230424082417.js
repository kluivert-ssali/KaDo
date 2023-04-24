import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-cef48-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputField()
    
})

onValue(shoppingListInDB, function(snapshot) {
    let itemsArray = Object.entries(snapshot.val())


    clearShoppingListEl()
    

    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]

        apendItemToshoppingListEl(currentItemValue)
    }


})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputField() {
    inputFieldEl.value = ""
}

function apendItemToshoppingListEl(itemValue) {
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`

    let newEl = document.createElement("li")

    newEl.textContent = "Something"

    shoppingListEl.append(newEl)
}