// Select the form elements
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

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

  // call the function that will add the item on the list
  expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
  try {
    throw new Error("Erro de teste")
  } catch (error) {
    alert("Unable to update expense list.")
    console.log(error)
  }
}

