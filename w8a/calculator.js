// This module contains the core logic for calculating carbon footprint points.
// Calculate points for each category using our dedicated helper functions
// This function orchestrates calls to the smaller, specialized calculation functions.
// It exports 'calculateFootprint' so other modules (like app.js) can use it.
// Return the breakdown of points for each category, and the total (for now we will just setup a key and return it's value

// Calculates points for Household Size based on WikiHow Method 1.
// @param {number} householdMembers - Number of people in the household.
// omits block delimiters for single statements
// Include householdMember in return object literal
// 6+ people total
// Default or invalid input
function calculateHouseholdPoints(householdMembers) {
    if (householdMembers === 1) return 14
    if (householdMembers === 2) return 12
    if (householdMembers === 3) return 10
    if (householdMembers === 4) return 8
    if (householdMembers === 5) return 6
    if (householdMembers >= 6) return 4
    return 0
}

// Calculates points for Home Size based on WikiHow Method 1
// @param {number} homeSquareFootage - Square footage of the home.
// @param {boolean} isApartment - True if dwelling is an apartment.
// @returns {number} Points for home size.
function calculateHomeSizePoints(homeSquareFootage, isApartment) {
    if (isApartment) return 4
    if (homeSquareFootage < 500) return 7
    if (homeSquareFootage < 1000) return 10
    if (homeSquareFootage < 2000) return 13
    return 20
}

// Calculates points for Food Diet Type based on WikiHow Method 1.
// @param {string} dietType - Type of diet ('meatHeavy', 'average', 'vegetarian', 'vegan')
// @returns {number} Points for diet type.
function calculateDietPoints(dietType) {
    switch (dietType) {
        case 'meatHeavy':
            return 10
        case 'average':
            return 8
        case 'vegetarian':
            return 4
        case 'vegan':
            return 2
        default:
            return 0
    }
}

// @param {Object} data - An object containing input values for the categories:
// householdMembers (number)
// homeSquareFootage (number)
// isApartment (boolean)
// dietType (string)
// foodPackaging (string)


// --- Part 3: Code Food Packaging and Total Points ---
// Calculates points for Food Packaging based on WikiHow Method 1.
// @param {string} foodPackaging - Type of food packaging ('prepackaged', 'balanced', 'fresh').
// @returns {number} Points for food packaging.
//
// Sum up all category points for the total footprint

function calculateFoodPackagingPoints(foodPackaging) {
    switch (foodPackaging) {
        case 'prepackaged':
            return 10
        case 'balanced':
            return 6
        case 'fresh':
            return 2
        default:
            return 0
    }
}

function calculateFootprint(data) {
    const householdPoints = calculateHouseholdPoints(data.householdMembers)
    const homeSizePoints = calculateHomeSizePoints(data.homeSquareFootage, data.isApartment)
    const dietPoints = calculateDietPoints(data.dietType)
    const foodPackagingPoints = calculateFoodPackagingPoints(data.foodPackaging)

    const totalPoints = householdPoints + homeSizePoints + dietPoints + foodPackagingPoints

    return {
        householdPoints,
        homeSizePoints,
        dietPoints,
        foodPackagingPoints,
        totalPoints
    }
}

export { calculateFootprint };
