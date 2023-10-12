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
      data.data.forEach(player => {
        addPlayer(player);
      });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});

const addPlayer = (player) => {
    // Select the <ul> element using its ID
    var ulElement = document.getElementById("player-list");

    // Create a new <li> element
    var liElement = document.createElement("li");

    // Add text content to the <li> element
    liElement.textContent = player.last_name;

    // Append the <li> element to the <ul> element
    ulElement.appendChild(liElement);
}
