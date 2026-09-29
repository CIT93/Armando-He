import { getFormInput, clearForm } from "./form-handler.js";
import { calculateFootprint } from "./calculator.js";
import { displayResults, hideResults } from "./results-display.js";
import * as storage from "./storage.js";
import { renderTable } from "./table-renderer.js";

// Array in-memory
const carbonFootprintEntries = [];

// Clear All Data button confirmation state
let isClearConfirming = false;
let clearConfirmTimeout = null;


// -------------------------------------------------------------
// Week 7.1 — DELETE FUNCTIONALITY
// -------------------------------------------------------------
const handleDelete = (id) => {
  // 1. Find index
  const index = carbonFootprintEntries.findIndex(entry => entry.id === id);

  // 2. Remove entry
  if (index !== -1) {
    carbonFootprintEntries.splice(index, 1);
  }

  // 3. Save updated array
  storage.saveEntries(carbonFootprintEntries);

  // 4. Re-render table
  renderTable(carbonFootprintEntries, { onDelete: handleDelete });

  // If empty → hide results + clear form
  if (carbonFootprintEntries.length === 0) {
    hideResults();
    clearForm(document.getElementById("carbonFootprintForm"));
  }
};


// -------------------------------------------------------------
// INIT APP
// -------------------------------------------------------------
const initApp = () => {

  // Load saved entries
  carbonFootprintEntries.push(...storage.loadEntries());

  // Render table WITH delete callback
  renderTable(carbonFootprintEntries, { onDelete: handleDelete });

  console.log("App initialized: DOM is ready!");

  const form = document.getElementById("carbonFootprintForm");
  const clearButton = document.getElementById("clearFormButton");
  const clearAllDataButton = document.getElementById("clearAllDataButton");


  // -------------------------------------------------------------
  // FORM SUBMIT
  // -------------------------------------------------------------
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = getFormInput(form);
    const result = calculateFootprint(formData);

    displayResults(result);

    const entry = {
      id: storage.generateUniqueId(),
      ...formData,
      ...result,
      timestamp: Date.now()
    };

    carbonFootprintEntries.push(entry);

    storage.saveEntries(carbonFootprintEntries);

    renderTable(carbonFootprintEntries, { onDelete: handleDelete });
  };


  // -------------------------------------------------------------
  // CLEAR FORM
  // -------------------------------------------------------------
  const handleClearForm = () => {
    clearForm(form);
  };


  // -------------------------------------------------------------
  // CLEAR ALL DATA
  // -------------------------------------------------------------
  const handleClearAllData = () => {
    storage.clearAllData();

    carbonFootprintEntries.length = 0;

    renderTable(carbonFootprintEntries, { onDelete: handleDelete });

    clearForm(form);
    hideResults();
  };


  const resetClearAllButton = () => {
    if (clearConfirmTimeout) clearTimeout(clearConfirmTimeout);

    isClearConfirming = false;
    clearAllDataButton.textContent = "Clear All Data";
    clearAllDataButton.classList.remove("confirm-state");
  };


  // -------------------------------------------------------------
  // EVENT LISTENERS
  // -------------------------------------------------------------
  form.addEventListener("submit", handleFormSubmit);
  clearButton.addEventListener("click", handleClearForm);

  clearAllDataButton.addEventListener("click", (event) => {
    event.stopPropagation();

    if (isClearConfirming) {
      handleClearAllData();
      resetClearAllButton();
    } else {
      isClearConfirming = true;
      clearAllDataButton.textContent = "Click again to confirm";

      clearConfirmTimeout = setTimeout(() => {
        resetClearAllButton();
      }, 3000);

      clearAllDataButton.classList.add("confirm-state");
    }
  });
};


// -------------------------------------------------------------
// DOM READY
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", initApp);


// Debug logs
console.log(calculateFootprint({ householdMembers: 3 }));
console.log(
  calculateFootprint({
    householdMembers: 3,
    homeSquareFootage: 1200,
    isApartment: false,
    dietType: "average",
    foodPackaging: "balanced",
  })
);

export { calculateFootprint };
