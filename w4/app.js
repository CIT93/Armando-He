import * as orderForm from "./order-handler.js";
import * as priceCalculator from "./price-calculator.js";
const orders = [];

// Get a reference to the order form
const form = document.querySelector("#order-form");

// Get a reference to the order summary
const orderSummary = document.querySelector("#order-summary");

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

  }

  orderSummary.textContent = summary;
// Initializes the application
const init = () => {
  form.addEventListener("submit", handleOrderSubmit);

  console.log("App Initialized");
};

// Start the application when the DOM is ready
document.addEventListener("DOMContentLoaded", init);


