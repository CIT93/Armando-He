console.log('Hello from app2-2.js! Your JavaScript is connected and running!');

// --- Part 1: Select HTML Elements ----
const messageDisplayElement = document.getElementById('output-message');
const updateButtonElement = document.getElementById('update-button');

// Variables that will change
let userName = 'Armando';
let clickCount = 0;

// --- Part 2: Define and call handleButtonClick Function ---
const handleButtonClick = function() {
    // Increase clickCount
    clickCount += 1;

    // Create message using template literals
    let message = `Hello, ${userName}! You have clicked the button ${clickCount} time(s).`;

    // Update the paragraph text
    messageDisplayElement.textContent = message;

    // Log to console
    if(clickcount >= 5){
      // We can even change the style of an HTML element directly with JavaScript!
      // Change text color
       messege += ` wow, you are a super clicker!`;
       messegeDisplayElement.style.color = `purple`;

    } else {
        messegeDisplayElement.style.color = `green`;
    }
    // Update the text content of our paragraph element on the page.
    // This is how JavaScript makes changes visible on the web page!
messagedisplayelement.textcontent = message;

    console.log(`Button clicked! Current click count: ${clickCount}`);
};


   document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed, App is ready for interaction');

    // Coinciden con los IDs del HTML
    const messageDisplayElement = document.getElementById('output-message');
    const updateButtonElement = document.getElementById('update-button');

    updateButtonElement.addEventListener('click', () => {
        messageDisplayElement.textContent = `Welcome, Armando! Click the button again to keep counting.`;
    });
});

