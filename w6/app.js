import * as orderForm from "./order-handler.js";
import * as priceCalculator from "./price-calculator.js";
// import * as resultsDisplay from "./results-display.js"; // ya no se usa
import * as orderStorage from './order-storage.js';
import * as orderList from './order-list.js';

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

  // guardar todas las órdenes
  orderStorage.saveOrders(orders);

  // ⭐ mostrar TODAS las órdenes en la tabla
  orderList.renderOrders(orders);
}

// Initializes the application
const init = () => {

  const loadedOrders = orderStorage.loadOrders();

  if (loadedOrders.length > 0) {
    orders.push(...loadedOrders);

    // ⭐ dibujar la tabla al iniciar
    orderList.renderOrders(orders);

    console.log("Orders loaded");
  }

  form.addEventListener("submit", handleOrderSubmit);

  console.log("App Initialized");
};

// Start the application when the DOM is ready
document.addEventListener("DOMContentLoaded", init);
