console.log('Hello from app2-2.js! Your JavaScript is connected and running!');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed, App is ready for interaction');

  // Step 2.1: Updated selectors
  const totalDisplayElement = document.getElementById("total-display");
  const addItemButtonElement = document.getElementById("add-item-btn");

   // Step 2.2: Variable Cleanup
  let totalCost = 0;     // replaces clickCount
  const itemPrice = 15;  // new constant


  // Step 2.3: Update Function Logic
  const handleAddItem = function () {
    // Add item price to total
    totalCost += itemPrice;

    // Build message
    let message = `Current Total: $${totalCost}`;

    // Budget logic
    if (totalCost >= 60) {
      message += " (Over Budget!)";
      totalDisplayElement.style.color = "red";
    } else {
      totalDisplayElement.style.color = "green";
    }

    // Update display
    totalDisplayElement.textContent = message;
  };

});
