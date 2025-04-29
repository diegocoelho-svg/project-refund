// Select the form elements
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Select the list elements
const expenseList = document.querySelector("ul")
const expensesTotal = document.querySelector("aside header h2")
const expensesQuantity = document.querySelector("aside header p span")

// Validation Only Numbers
amount.oninput = () => {
  let value = amount.value.replace(/\D/g, "")

  // transform the value in cents (Ex: 150/100 = 1.5 -> R$ 1,50)
  value = Number(value) / 100

  // Updating the input value, using the function
  amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  return value
}

// Catch submit event of the form to get the values
form.onsubmit = (event) => {
  event.preventDefault() // reload page off

  // Create a new object with de detaild on the new expense
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }

  // call the function that will add the item to the list
  expenseAdd(newExpense)
}

// Add new item to the list
function expenseAdd(newExpense) {
  try {
    // creates the element to add the item to the list
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // create the category icon
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // create the expense info
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    // create expanse name
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    // create expense category
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // Add name and category in the div of expense informations
    expenseInfo.append(expenseName, expenseCategory)

    // Create the value of expense
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

    // Create remove icon
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alt", "remover")

    // add the informations of the item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    // add the item to the list
    expenseList.append(expenseItem)

    // Updating Totals
    updateTotals()
  } catch (error) {
    alert("Unable to update expense list.")
    console.log(error)
  }
}

// Updating totals
function updateTotals() {
  try {
    // Retrieves all items (li) from the list (ul)
    const items = expenseList.children
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "Despesas" : "Despesa"}`

    // variable to increment the total
    let total = 0

    // Iterate through each item in the list
    for(let item = 0; item < items.length; item++) {
      const itemAmount =  items[item].querySelector(".expense-amount")

      // Remove non-numeric characters and replace comma with period
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

      // Convert the value to float
      value = parseFloat(value)

      // Verified if is a valid number
      if(isNaN(value)) {
        return alert("Unable to calculate total. Value does not appear to be a number")
      }

      // Increment the total value
      total += Number(value)
    }
    
    // Create span to add formatting "R$"
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"
    
    // Format the value and remove R$ that will be displayed for the small one with custom style
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")
    // Clear the element content
    expensesTotal.innerHTML = ""
    
    // Add Symbol currency and the formatting value
    expensesTotal.append(symbolBRL, total)

  } catch (error) {
    console.log(error)
    alert("Unable to update totals.")
  }
}

// Event that captures clicks on the list
expenseList.addEventListener("click", function (event) {
  // verified if the clicked element is the remove icon
  if(event.target.classList.contains("remove-icon")) {
    // Get the li father of the element clicked.
    const item = event.target.closest(".expense")

    // Remove item list
    item.remove()
  }

  // Updating after removals
  updateTotals()
})

