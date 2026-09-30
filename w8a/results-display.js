// This module handles displaying and hiding the calculated carbon footprint results on the page.

// Get references to the HTML elements where we will display the results.
const resultsContainer = document.getElementById("results");

// Now, we use resultsContainer.querySelector() to get elements *inside* the resultsContainer.
const totalFootprintDisplay = resultsContainer.querySelector("#totalFootprint");
const householdFootprintDisplay = resultsContainer.querySelector("#householdFootprint");
const homeSizeFootprintDisplay = resultsContainer.querySelector("#homeSizeFootprint");
const foodDietFootprintDisplay = resultsContainer.querySelector("#foodDietFootprint");
const foodPackagingFootprintDisplay = resultsContainer.querySelector("#foodPackagingFootprint");

// NEW: Water Consumption reference
const waterConsumptionFootprintDisplay = resultsContainer.querySelector("#waterConsumptionFootprint");

// Displays the calculated carbon footprint results in the results section.
// @param {Object} results - An object containing the calculated footprint values (points).
export function displayResults(results) {
    totalFootprintDisplay.textContent = `${results.totalPoints} Points`;
    householdFootprintDisplay.textContent = `Household Size: ${results.householdPoints} Points`;
    homeSizeFootprintDisplay.textContent = `Home Size: ${results.homeSizePoints} Points`;
    foodDietFootprintDisplay.textContent = `Food Diet: ${results.dietPoints} Points`;
    foodPackagingFootprintDisplay.textContent = `Food Packaging: ${results.foodPackagingPoints} Points`;

    // NEW: Water Consumption
    waterConsumptionFootprintDisplay.textContent = `Water Consumption: ${results.waterConsumptionPoints} Points`;

    // Make the entire results section visible
    resultsContainer.style.display = "block";
}

// Hides the entire results section.
export function hideResults() {
    resultsContainer.style.display = "none";
}
