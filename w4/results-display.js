// Get references to the order summary elements
const orderSummary = document.querySelector("#order-summary");
const displayTotal = document.querySelector("#display-total");
const displayQty = document.querySelector("#display-qty");
const displaySize = document.querySelector("#display-size");
const displayGift = document.querySelector("#display-gift");

// Display the order results
export const displayOrder = (orderData) => {
  displayTotal.textContent = orderData.totalPrice;
  displayQty.textContent = orderData.qty;
  displaySize.textContent = orderData.size;
  displayGift.textContent = orderData.giftWrap ? "Yes" : "No";

  orderSummary.style.display = "block";
};
