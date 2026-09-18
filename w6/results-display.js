const orderSummary = document.getElementById('order-summary');
const displayTotal = document.getElementById('display-total');
const displayQty = document.getElementById('display-qty');
const displaySize = document.getElementById('display-size');
const displayGift = document.getElementById('display-gift');

export function displayOrder(order) {
    displayTotal.textContent = order.totalPrice;
    displayQty.textContent = order.qty;
    displaySize.textContent = order.size;

    if (order.giftWrap === true) {
        displayGift.textContent = "Yes";
    } else {
        displayGift.textContent = "No";
    }

    orderSummary.style.display = "block";
}
