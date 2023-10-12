// Reference to the button and the message element
const showMessageButton = document.getElementById('showMessageButton');
const messageElement = document.getElementById('message');

const apiUrl = 'https://www.balldontlie.io/api/v1/players';

let currentPage = 1;

// Function to show the message when the button is clicked
showMessageButton.addEventListener('click', function() {
  fetchPlayers(currentPage);
});

const fetchPlayers = (page) => {

  apiUrlwithPage = apiUrl + '?page=' + page;
  console.log(apiUrlwithPage);
    // Set the text of the message element
    fetch(apiUrlwithPage, {
      method: 'GET',
  })
  .then(response => {
      return response.json()}
      )
  .then(data => {
    clearPlayerList();
    data.data.forEach(player => {
      addPlayer(player);
    });

    showPreviousNextButtons();
  })
  .catch(error => {
      console.error('Error fetching data:', error);
  });
}

const clearPlayerList = () => {
  var ulElement = document.getElementById("player-list");
  ulElement.innerHTML = '';
}

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

const showPreviousNextButtons = () => {
  const previousButton = document.getElementById('previousButton');
  const nextButton = document.getElementById('nextButton');

  previousButton.style.display = 'block';
  nextButton.style.display = 'block';
};

const nextPage = () => {
  currentPage++;
  fetchPlayers(currentPage);

}

const previousPage = () => {
  if( currentPage === 1) {
    return;
  }
  currentPage--;
  fetchPlayers(currentPage);
}
