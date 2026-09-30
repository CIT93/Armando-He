import { getFormInput, clearForm, populateFormForEdit } from "./form-handler.js";
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
  renderTable(carbonFootprintEntries, { 
  onDelete: handleDelete,
  onEdit: handleEditEntry
});


  // If empty → hide results + clear form
  if (carbonFootprintEntries.length === 0) {
    hideResults();
    clearForm(document.getElementById("carbonFootprintForm"));
  }
};
// Week 8.1 — EDIT FUNCTIONALITY
const handleEditEntry = (id) => {
  const entryToEdit = carbonFootprintEntries.find(entry => entry.id === id);

  if (!entryToEdit) {
    console.warn("Entry not found for editing:", id);
    return;
  }

  populateFormForEdit(entryToEdit);

  window.scroll({ top: 0, behavior: "smooth" });
};



// -------------------------------------------------------------
// INIT APP
// -------------------------------------------------------------
const initApp = () => {

  // Load saved entries
  carbonFootprintEntries.push(...storage.loadEntries());

  // Render table WITH delete callback
  renderTable(carbonFootprintEntries, { 
  onDelete: handleDelete,
  onEdit: handleEditEntry
});


  console.log("App initialized: DOM is ready!");

  const form = document.getElementById("carbonFootprintForm");
  const clearButton = document.getElementById("clearFormButton");
  const clearAllDataButton = document.getElementById("clearAllDataButton");


  // -------------------------------------------------------------
  // FORM SUBMIT
  // -------------------------------------------------------------
// Week 8.1 — CREATE vs UPDATE
const handleFormSubmit = (event) => {
  event.preventDefault();

  const formData = getFormInput(form);
  let timestamp;

  if (formData.id) {
    const existingEntry = carbonFootprintEntries.find(e => e.id === formData.id);

    if (existingEntry) {
      timestamp = existingEntry.timestamp;

      Object.assign(existingEntry, {
        ...formData,
        timestamp,
        totalPoints: calculateFootprint(formData).totalPoints
      });

    } else {
      timestamp = Date.now();
      carbonFootprintEntries.push({
        ...formData,
        id: storage.generateUniqueId(),
        timestamp,
        ...calculateFootprint(formData)
      });
    }

  } else {
    timestamp = Date.now();
    carbonFootprintEntries.push({
      ...formData,
      id: storage.generateUniqueId(),
      timestamp,
      ...calculateFootprint(formData)
    });
  }

  storage.saveEntries(carbonFootprintEntries);

  renderTable(carbonFootprintEntries, { 
    onDelete: handleDelete,
    onEdit: handleEditEntry
  });

  clearForm(form);
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
