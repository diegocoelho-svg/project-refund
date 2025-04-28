// Select the form elements
const amount = document.getElementById("amount")

// Validation Only Numbers
amount.oninput = () => {
  let value = amount.value.replace(/\D/g, "")
  amount.value = value
}
