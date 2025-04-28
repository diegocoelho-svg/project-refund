// Select the form elements
const amount = document.getElementById("amount")

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
