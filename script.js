// Reference to the button and the message element
const showMessageButton = document.getElementById('showMessageButton');
const messageElement = document.getElementById('message');

// Function to show the message when the button is clicked
showMessageButton.addEventListener('click', function() {
  // Set the text of the message element
  messageElement.textContent = 'Hello, this is a simple web app!';
});
