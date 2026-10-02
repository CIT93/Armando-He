import * as orderForm from "./order-hander.js";
import * as priceCalculator from "./price.calculator.js";
import * as orderStorage from "./order-storage.js";
import * as orderList from "./order-list.js";


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

  const clearBtn = document.getElementById("clear-btn");

clearBtn.addEventListener("click", () => {
    
    orders.length = 0;

    orderStorage.saveOrders(orders);

   
    orderList.renderOrders(orders);

    console.log("Order history cleared");
});


  console.log("App Initialized");
};

// Start the application when the DOM is ready
document.addEventListener("DOMContentLoaded", init);
