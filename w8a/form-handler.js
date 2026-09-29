//--- Part 1: Code clearForm and getFormInput

// Collects all relevant input values from the form for Household Size, Home Size, and Food Choices.

// Clears all input fields in the form and resets default selections.
export function clearForm(form) {
  form.reset();
  form.querySelector("#householdMembers").value = 1;
}

// Collects all relevant input values from the form.
export function getFormInput(form) {
  const householdMembers =
    parseInt(form.querySelector("#householdMembers").value) || 1;

  // Home Size reference
  const homeSizeInput = form.querySelector("#homeSquareFootage");

  // Apartment Checkbox reference
  const apartmentCheckbox = form.querySelector("#isApartment");

  // Declare a locally scoped value for square footage
  const homeSize = parseInt(homeSizeInput.value) || 0;

  // Read the 'checked' property for checkboxes.
  const isApartment = apartmentCheckbox.checked;

  // Food Choices (radio buttons - we need to query for all with the same 'name')
  const dietTypeRadioButtons = form.querySelectorAll(
    'input[name="dietType"]'
  );

  const dietType = getSelectedRadioValue(dietTypeRadioButtons);

  const foodPackagingRadioButtons = form.querySelectorAll(
    'input[name="foodPackaging"]'
  );

  const foodPackaging = getSelectedRadioValue(foodPackagingRadioButtons);

  // @returns {Object} An object containing all the collected input values.
  return {
    householdMembers,
    homeSize,
    isApartment,
    dietType,
    foodPackaging,
  };
}

// Dry - Don't Repeat Yourself
// Write a function to handle this and return the value
// @param {NodeList} radioButtons - A NodeList (like an array) of radio button elements.
// @returns {string} The 'value' attribute of the selected radio button.
export function getSelectedRadioValue(radioButtons) {
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      return radioButton.value;
    }
  }

  return "";
}
