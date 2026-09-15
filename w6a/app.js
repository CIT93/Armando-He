import * as orderForm from "./order-handler.js";
import * as priceCalculator from "./price-calculator.js";
import * as resultsDisplay from "./results-display.js";
import * as orderStorage from './order-storage.js';

const orders = [];

// Get a reference to the order form
const form = document.querySelector("#order-form");

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

  // PASO 5 (se hace después del paso 4)
  orderStorage.saveOrders(orders);

  resultsDisplay.displayOrder(newOrder);
}

// Initializes the application
const init = () => {

  // ⭐⭐⭐ PASO 4 — Cargar órdenes guardadas al iniciar ⭐⭐⭐
  const loadedOrders = orderStorage.loadOrders();

  if (loadedOrders.length > 0) {
    orders.push(...loadedOrders);
    console.log("Orders loaded");
  }

  // Event listener
  form.addEventListener("submit", handleOrderSubmit);

  console.log("App Initialized");
};

// Start the application when the DOM is ready
document.addEventListener("DOMContentLoaded", init);
