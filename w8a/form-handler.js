// --- Week 8.2 Form Handler ---

// Existing references
const entryIdInput = document.getElementById("entryId");
const submitButton = document.getElementById("submitButton");

// NEW: Water Consumption references
const dishwasherRunsInput = document.getElementById("dishwasherWashingMachineRuns");
const hasDishwasherInput = document.getElementById("hasDishwasher");
const hasWashingMachineInput = document.getElementById("hasWashingMachine");


// -------------------------------------------------------------
// CLEAR FORM (UPDATED FOR WATER CONSUMPTION)
// -------------------------------------------------------------
export function clearForm(form) {
  form.reset();

  // Reset household default
  form.querySelector("#householdMembers").value = 1;

  // Reset hidden ID
  entryIdInput.value = "";

  // Reset Water Consumption fields
  dishwasherRunsInput.value = 0;
  hasDishwasherInput.checked = false;
  hasWashingMachineInput.checked = false;

  // Reset button text
  submitButton.textContent = "Submit Entry";
}


// -------------------------------------------------------------
// GET FORM INPUTS (UPDATED FOR WATER CONSUMPTION)
// -------------------------------------------------------------
export function getFormInput(form) {
  const householdMembers = parseInt(form.querySelector("#householdMembers").value) || 1;

  const homeSizeInput = form.querySelector("#homeSquareFootage");
  const apartmentCheckbox = form.querySelector("#isApartment");

  const homeSize = parseInt(homeSizeInput.value) || 0;
  const isApartment = apartmentCheckbox.checked;

  const dietTypeRadioButtons = form.querySelectorAll('input[name="dietType"]');
  const dietType = getSelectedRadioValue(dietTypeRadioButtons);

  const foodPackagingRadioButtons = form.querySelectorAll('input[name="foodPackaging"]');
  const foodPackaging = getSelectedRadioValue(foodPackagingRadioButtons);

  // NEW: Water Consumption values
  const dishwasherWashingMachineRuns = parseInt(dishwasherRunsInput.value) || 0;
  const hasDishwasher = hasDishwasherInput.checked;
  const hasWashingMachine = hasWashingMachineInput.checked;

  return {
    id: entryIdInput.value || null,
    householdMembers,
    homeSquareFootage: homeSize,
    isApartment,
    dietType,
    foodPackaging,

    // NEW fields
    dishwasherWashingMachineRuns,
    hasDishwasher,
    hasWashingMachine,
  };
}


// -------------------------------------------------------------
// HELPER FOR RADIO BUTTONS
// -------------------------------------------------------------
export function getSelectedRadioValue(radioButtons) {
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      return radioButton.value;
    }
  }
  return "";
}


// -------------------------------------------------------------
// POPULATE FORM WHEN EDITING (UPDATED FOR WATER CONSUMPTION)
// -------------------------------------------------------------
export function populateFormForEdit(entry) {
  entryIdInput.value = entry.id;

  document.querySelector("#householdMembers").value = entry.householdMembers;
  document.querySelector("#homeSquareFootage").value = entry.homeSquareFootage;
  document.querySelector("#isApartment").checked = entry.isApartment;

  document.querySelectorAll('input[name="dietType"]').forEach(radio => {
    radio.checked = radio.value === entry.dietType;
  });

  document.querySelectorAll('input[name="foodPackaging"]').forEach(radio => {
    radio.checked = radio.value === entry.foodPackaging;
  });

  // NEW: Water Consumption fields
  dishwasherRunsInput.value = entry.dishwasherWashingMachineRuns;
  hasDishwasherInput.checked = entry.hasDishwasher;
  hasWashingMachineInput.checked = entry.hasWashingMachine;

  submitButton.textContent = "Update Entry";
}
