import * as orderForm from "./order-handler.js";
import * as priceCalculator from "./price-calculator.js";
import * as resultsDisplay from "./results-display.js";

const orders = [];

// Get a reference to the order form
const form = document.querySelector("#order-form");

// Get a reference to the order summary


// Handles the order form submission
const handleOrderSubmit = (event) => {
  event.preventDefault();

  const formData = orderForm.getOrderInputs();
  const calculatedPrice = priceCalculator.calculateTotal(formData);
  
  const newOrder = {
  ...formData,
  ...calculatedPrice,
  timestamp: new Date().toISOString()
};
  orders.push(newOrder);
  console.log(orders);

  resultsDisplay.displayOrder(newOrder);


  }

  orderSummary.textContent = summary;
// Initializes the application
const init = () => {
  form.addEventListener("submit", handleOrderSubmit);

  console.log("App Initialized");
};

// Start the application when the DOM is ready
document.addEventListener("DOMContentLoaded", init);


