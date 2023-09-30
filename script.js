// Reference to the button and the message element
const showMessageButton = document.getElementById('showMessageButton');
const messageElement = document.getElementById('message');

const apiUrl = 'http://api.football-data.org/v4/competitions/';
const corsProxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(apiUrl);

// Function to show the message when the button is clicked
showMessageButton.addEventListener('click', function() {
  // Set the text of the message element
    fetch(corsProxyUrl, {
        method: 'GET',
    })
    .then(response => {
        return response.json()}
        )
    .then(data => {
        console.log(data.competitions[0].name);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});
