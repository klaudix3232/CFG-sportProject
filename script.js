// Reference to the button and the message element
const showMessageButton = document.getElementById('showMessageButton');
const messageElement = document.getElementById('message');

const apiUrl = 'https://www.balldontlie.io/api/v1/players';

// Function to show the message when the button is clicked
showMessageButton.addEventListener('click', function() {
  // Set the text of the message element
    fetch(apiUrl, {
        method: 'GET',
    })
    .then(response => {
        return response.json()}
        )
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});
