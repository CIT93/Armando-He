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
    id: Date.now().toString(),
    ...formData,
    ...calculatedPrice,
    timestamp: new Date().toISOString()
  };

  orders.push(newOrder);

  orderStorage.saveOrders(orders);

  // ⭐ PASO 6: CAMBIAR ESTA LLAMADA
  orderList.renderOrders(orders, {
    onDelete: handleDelete,
    onEdit: handleEdit
  });
};

// ⭐⭐⭐ AQUÍ VA — PÉGALO EXACTAMENTE AQUÍ ⭐⭐⭐
// PASO 6: funciones para manejar los botones
const handleDelete = function(id) {
    console.log("App.js: Requesting delete for order", id);
};

const handleEdit = function(id) {
    console.log("App.js: Requesting edit for order", id);
};
// ⭐⭐⭐ FIN DEL BLOQUE QUE DEBES PEGAR ⭐⭐⭐


// Initializes the application
const init = () => {

  const loadedOrders = orderStorage.loadOrders();

  if (loadedOrders.length > 0) {
    orders.push(...loadedOrders);

    // ⭐ PASO 6: CAMBIAR ESTA LLAMADA TAMBIÉN
    orderList.renderOrders(orders, {
        onDelete: handleDelete,
        onEdit: handleEdit
    });

    console.log("Orders loaded");
  }

  form.addEventListener("submit", handleOrderSubmit);

  const clearBtn = document.getElementById("clear-btn");

  clearBtn.addEventListener("click", () => {
    orders.length = 0;
    orderStorage.saveOrders(orders);

    // ⭐ PASO 6: CAMBIAR ESTA LLAMADA TAMBIÉN
    orderList.renderOrders(orders, {
        onDelete: handleDelete,
        onEdit: handleEdit
    });

    console.log("Order history cleared");
  });

  console.log("App Initialized");
};

// Start the application when the DOM is ready
document.addEventListener("DOMContentLoaded", init);
