console.log('Hello from app2-2.js! Your JavaScript is connected and running!');

console.log("Shopping Cart App Running!");

// Step 2.1: DOM Selectors
const totalDisplayElement = document.getElementById("total-display");
const addItemButtonElement = document.getElementById("add-item-btn");

// Step 2.2: Variables
let totalCost = 0;
const itemPrice = 15;

// Step 2.3: Function Logic
function handleAddItem() {
  totalCost += itemPrice;

  let message = `Current Total: $${totalCost}`;

  if (totalCost >= 60) {
    message += " (Over Budget!)";
    totalDisplayElement.style.color = "red";
  } else {
    totalDisplayElement.style.color = "green";
  }

  totalDisplayElement.textContent = message;
}
