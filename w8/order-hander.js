// Select the Quantity input
const qtyInput = document.querySelector("#qty");

// Select the Gift Wrap checkbox
const giftWrapInput = document.querySelector("#gift-wrap");

// Select all Size radio buttons
const sizeRadioButtons = document.querySelectorAll('input[name="size"]');

// Helper function to get the selected radio button value
const getSelectedRadioValue = (radioButtons) => {
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      return radioButton.value;
    }
  }

  return "";
};

// Export the main function that gets the order inputs
export const getOrderInputs = () => {
  const qty = parseInt(qtyInput.value);
  const size = getSelectedRadioValue(sizeRadioButtons);
  const giftWrap = giftWrapInput.checked;

  return {
    qty,
    size,
    giftWrap,
  };
};

