// This module handles rendering the carbon footprint entries table.
// Simplified to only render Date, HH Size, Home Size, Diet, Food Pkg, and Total Points.

// --- State variables for delete confirmation ---
let pendingActionCell = null;      // <td> where confirmation is active
let pendingTimerId = null;         // timeout ID
let latestCallbacks = {};          // stores callbacks from app.js

// --- DOM references ---
const table = document.getElementById("footprintTable");
const tableBody = table.querySelector("tbody");
const noEntriesMessage = document.getElementById("noEntriesMessage");
const clearAllDataButton = document.getElementById("clearAllDataButton");

// Attach event listener ONCE
tableBody.addEventListener("click", handleTableClick);


// --- Main render function ---
export function renderTable(entries, callbacks = {}) {
    latestCallbacks = callbacks;

    tableBody.innerHTML = "";

    if (entries.length === 0) {
        table.style.display = "none";
        noEntriesMessage.style.display = "block";
        clearAllDataButton.style.display = "none"; // correct display toggle
        return;
    }

    table.style.display = "table";
    noEntriesMessage.style.display = "none";
    clearAllDataButton.style.display = "inline-block"; // show when entries exist

    const sortedEntries = [...entries].sort((a, b) => b.timestamp - a.timestamp);

    for (const entry of sortedEntries) {
        const row = createTableRow(entry);
        tableBody.appendChild(row);
    }
}


// --- Create table row ---
 function createTableRow(entry) {
    const row = document.createElement("tr");
    row.dataset.id = entry.id;

    row.innerHTML = `
        <td>${formatDate(entry.timestamp)}</td>
        <td>${entry.householdMembers}</td>
        <td>${formatHomeSize(entry.homeSquareFootage, entry.isApartment)}</td>
        <td>${formatRadioValue(entry.dietType)}</td>
        <td>${formatRadioValue(entry.foodPackaging)}</td>
        <td>${entry.totalPoints}</td>
        <td class="action-cell">
            <button class="action-button edit" data-id="${entry.id}">Edit</button>
            <button class="action-button delete" data-id="${entry.id}">Delete</button>
        </td>
    `;

    return row;
}




// --- Handle table clicks (event delegation) ---
function handleTableClick(event) {
    const target = event.target;

     // EDIT clicked
    if (target.classList.contains("edit")) {
        // Clear any pending delete confirmation before editing
        hideDeleteConfirmationButtons();

        // Call the edit callback provided by app.js
        latestCallbacks.onEdit(target.dataset.id);
        return;
    }

    // DELETE clicked
    if (target.classList.contains("delete")) {
        const id = target.dataset.id;
        const actionCell = target.closest("td");

        showDeleteConfirmationButtons(actionCell, id, latestCallbacks.onDelete);
        return;
    }

    // CONFIRM DELETE clicked
    if (target.classList.contains("confirm")) {
        event.stopPropagation();
        const id = target.dataset.id;

        latestCallbacks.onDelete(id);
        hideDeleteConfirmationButtons();
        return;
    }

    // CANCEL DELETE clicked
    if (target.classList.contains("cancel")) {
        event.stopPropagation();
        hideDeleteConfirmationButtons();
        return;
    }
}


// --- Show confirmation buttons ---
function showDeleteConfirmationButtons(actionCell, id, onDeleteCallback) {
    // Hide original buttons
    const originalButtons = actionCell.querySelectorAll(".action-button");
    originalButtons.forEach(btn => btn.style.display = "none");

    // Create confirmation buttons with correct class names
    const confirmBtn = document.createElement("button");
    confirmBtn.textContent = "Confirm";
    confirmBtn.classList.add("action-button", "confirm");
    confirmBtn.dataset.id = id;

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.classList.add("action-button", "cancel");

    actionCell.appendChild(confirmBtn);
    actionCell.appendChild(cancelBtn);

    actionCell.classList.add("confirm-mode");
    pendingActionCell = actionCell;

    // Auto revert after 3 seconds
    pendingTimerId = setTimeout(() => {
        hideDeleteConfirmationButtons();
    }, 3000);
}


// --- Hide confirmation buttons and restore original ---
function hideDeleteConfirmationButtons() {
    if (!pendingActionCell) return;

    pendingActionCell.classList.remove("confirm-mode");

    const confirmBtn = pendingActionCell.querySelector(".confirm");
    const cancelBtn = pendingActionCell.querySelector(".cancel");

    if (confirmBtn) confirmBtn.remove();
    if (cancelBtn) cancelBtn.remove();

    const originalButtons = pendingActionCell.querySelectorAll(".action-button");
    originalButtons.forEach(btn => btn.style.display = "inline-block");

    pendingActionCell = null;

    if (pendingTimerId) {
        clearTimeout(pendingTimerId);
        pendingTimerId = null;
    }
}


// --- Reset function (used by app.js if needed) ---
export function resetRowConfirmationState() {
    hideDeleteConfirmationButtons();
}


// --- Helper formatting functions ---
function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString();
}

function formatHomeSize(homeSquareFootage, isApartment) {
    return isApartment ? "Apt." : `${homeSquareFootage} sqft`;
}

function formatRadioValue(value) {
    if (!value) return "";
    return value
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (c) => c.toUpperCase());
}
