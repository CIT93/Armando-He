// This module handles all interactions with localStorage for our carbon footprint entries.

// A unique key to identify our data in localStorage.
// SCREAMING_SNAKE_CASE - This naming convention is typically reserved for global constants whose value should never change throughout the lifetime of the application.

const STORAGE_KEY = "carbonFootprintEntries";

// Let's learn about localStorage

// Saves the given array of entries to localStorage.
// This is the primary function for persisting the current state of our entries.
// @param {Array} entries - The array of carbon footprint entry objects to save.
//
// localStorage can only store strings. We must convert our JavaScript array of objects
// into a JSON string using JSON.stringify() before saving.
//

const saveEntries = (entries) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error("Error saving entries:", error);
  }
};

// Generates a simple, unique ID for a new entry based on the current timestamp.
// This function is now part of the storage module as it's related to data management.
// @returns {string} A unique ID string.

const generateUniqueId = () => {
  return Date.now().toString();
};
// Loads all carbon footprint entries from localStorage.
// @returns {Array} An array of carbon footprint entry objects. Returns an empty array if no data is found or if parsing fails.

const loadEntries = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    // If no data is found in localStorage, return an empty array.
    if (!data) {
      return [];
    }

    // If data exists, parse the JSON string back into a JavaScript array/object.
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading entries:", error);

    // In case of corrupted data, it's good practice to clear it to prevent continuous errors.
    localStorage.removeItem(STORAGE_KEY);

    return [];
  }
  
};


// Clear all data from localStorage for our app.
// This function removes the specific key used by our app from localStorage.
const clearAllData = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export { saveEntries, generateUniqueId, loadEntries, clearAllData };
