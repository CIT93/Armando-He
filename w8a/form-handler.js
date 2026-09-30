// --- Week 8.1 Form Handler ---

const entryIdInput = document.getElementById("entryId");
const submitButton = document.getElementById("submitButton");
const dishwasherRunsInput = document.getElementById("dishwasherWashingMachineRuns");
const hasDishwasherInput = document.getElementById("hasDishwasher");
const hasWashingMachineInput = document.getElementById("hasWashingMachine");


export function clearForm(form) {
  form.reset();
  form.querySelector("#householdMembers").value = 1;
  entryIdInput.value = "";
  submitButton.textContent = "Submit Entry";
}

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

  return {
    id: entryIdInput.value || null,
    householdMembers,
    homeSquareFootage: homeSize,
    isApartment,
    dietType,
    foodPackaging,
  };
}

export function getSelectedRadioValue(radioButtons) {
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      return radioButton.value;
    }
  }
  return "";
}

// Populate form when editing
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

  submitButton.textContent = "Update Entry";
}
