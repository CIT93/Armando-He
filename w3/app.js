import * as orderForm from "./order-handler.js";

// Get a reference to the order form
const form = document.querySelector("#order-form");

// Get a reference to the order summary
const orderSummary = document.querySelector("#order-summary");

// Handles the order form submission
const handleOrderSubmit = (event) => {
  event.preventDefault();

  const formData = orderForm.getOrderInputs();

  let summary = `Ordered ${formData.qty} ${formData.size} T-Shirts`;

  if (formData.giftWrap) {
    summary += " - gift wrapped";
  }

  orderSummary.textContent = summary;
};
// Initializes the application
const init = () => {
  form.addEventListener("submit", handleOrderSubmit);

  console.log("App Initialized");
};

// Start the application when the DOM is ready
document.addEventListener("DOMContentLoaded", init);


