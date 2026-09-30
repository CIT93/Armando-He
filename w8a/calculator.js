// This module contains the core logic for calculating carbon footprint points.
// Calculate points for each category using our dedicated helper functions
// This function orchestrates calls to the smaller, specialized calculation functions.
// It exports 'calculateFootprint' so other modules (like app.js) can use it.
// Return the breakdown of points for each category, and the total.

// -------------------------------------------------------------
// Calculates points for Household Size based on WikiHow Method 1.
// -------------------------------------------------------------
function calculateHouseholdPoints(householdMembers) {
    if (householdMembers === 1) return 14;
    if (householdMembers === 2) return 12;
    if (householdMembers === 3) return 10;
    if (householdMembers === 4) return 8;
    if (householdMembers === 5) return 6;
    if (householdMembers >= 6) return 4;
    return 0;
}

// -------------------------------------------------------------
// Calculates points for Home Size based on WikiHow Method 1
// -------------------------------------------------------------
function calculateHomeSizePoints(homeSquareFootage, isApartment) {
    if (isApartment) return 4;
    if (homeSquareFootage < 500) return 7;
    if (homeSquareFootage < 1000) return 10;
    if (homeSquareFootage < 2000) return 13;
    return 20;
}

// -------------------------------------------------------------
// Calculates points for Food Diet Type based on WikiHow Method 1.
// -------------------------------------------------------------
function calculateDietPoints(dietType) {
    switch (dietType) {
        case "meatHeavy":
            return 10;
        case "average":
            return 8;
        case "vegetarian":
            return 4;
        case "vegan":
            return 2;
        default:
            return 0;
    }
}

// -------------------------------------------------------------
// Calculates points for Food Packaging based on WikiHow Method 1.
// -------------------------------------------------------------
function calculateFoodPackagingPoints(foodPackaging) {
    switch (foodPackaging) {
        case "prepackaged":
            return 10;
        case "balanced":
            return 6;
        case "fresh":
            return 2;
        default:
            return 0;
    }
}

// -------------------------------------------------------------
// Week 8.2 — Helper function for Water Consumption
// Calculates points for Water Consumption based on WikiHow Method 1.
// @param {number} dishwasherWashingMachineRuns - Total runs per week.
// @param {boolean} hasDishwasher - True if user has a dishwasher.
// @param {boolean} hasWashingMachine - True if user has a washing machine.
// @returns {number} Points for water consumption.
//
// "If you have a dishwasher and a washing machine, then perform the calculation twice."
// If neither, and runs > 0, still calculate once for general water use.
// -------------------------------------------------------------
function calculateWaterConsumption(
    dishwasherWashingMachineRuns,
    hasDishwasher,
    hasWashingMachine
) {
    let points = 0;

    if (hasDishwasher && hasWashingMachine) {
        points = dishwasherWashingMachineRuns * 2;
    } else if (hasDishwasher || hasWashingMachine) {
        points = dishwasherWashingMachineRuns;
    } else if (dishwasherWashingMachineRuns > 0) {
        points = dishwasherWashingMachineRuns;
    }

    return points;
}

// -------------------------------------------------------------
// Main calculateFootprint function (UPDATED FOR WATER)
// -------------------------------------------------------------
function calculateFootprint(data) {
    const householdPoints = calculateHouseholdPoints(data.householdMembers);
    const homeSizePoints = calculateHomeSizePoints(data.homeSquareFootage, data.isApartment);
    const dietPoints = calculateDietPoints(data.dietType);
    const foodPackagingPoints = calculateFoodPackagingPoints(data.foodPackaging);

    // NEW: Water Consumption
    const waterConsumptionPoints = calculateWaterConsumption(
        data.dishwasherWashingMachineRuns,
        data.hasDishwasher,
        data.hasWashingMachine
    );

    // NEW: Updated total
    const totalPoints =
        householdPoints +
        homeSizePoints +
        dietPoints +
        foodPackagingPoints +
        waterConsumptionPoints;

    return {
        householdPoints,
        homeSizePoints,
        dietPoints,
        foodPackagingPoints,
        waterConsumptionPoints, // NEW
        totalPoints
    };
}

export { calculateFootprint };
