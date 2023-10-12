// Reference to the button and the message element
const showMessageButton = document.getElementById('showMessageButton');
const messageElement = document.getElementById('message');

const introView = document.getElementById('intro-view');
const playerListView = document.getElementById('player-list-view');
const playerView = document.getElementById('player-view');


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
    showPlayerList();

    const pageNumber = document.getElementById('pageNumber');
    pageNumber.textContent = currentPage;

    var backButton = document.createElement("div");
    backButton.textContent = 'Back';
    backButton.onclick = () => {
      showIntroView();
    }
    playerListView.appendChild(backButton);

    clearPlayerList();
    data.data.forEach(player => {
      addPlayer(player);
    });

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

    // Make player selectable
    liElement.onclick = () => {
      selectPlayer(player.id);
    }

    // Append the <li> element to the <ul> element
    ulElement.appendChild(liElement);
}

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

const selectPlayer = (playerId) => {
  console.log(playerId);
  fetchPlayerStats(playerId);
}

const fetchPlayerStats = (playerId) => {
  const url = 'https://www.balldontlie.io/api/v1/players/';
  const playerURL = url + playerId;

  fetch(playerURL, {
    method: 'GET',
  })
  .then(response => {
      return response.json()}
      )
  .then(data => {
    showPlayer(data);

  })
  .catch(error => {
      console.error('Error fetching data:', error);
  });
}

const showPlayer = (playerData) => {
  playerView.innerHTML = '';
  playerView.style.display = 'block';
  playerListView.style.display = 'none';

  var backButton = document.createElement("div");
  backButton.textContent = 'Back';
  backButton.onclick = () => {
    showPlayerDetails();
  }
  playerView.appendChild(backButton);

  var playerName = document.createElement("p");
  playerName.textContent = playerData.first_name + ' ' + playerData.last_name;
  playerView.appendChild(playerName);

  var playerPosition = document.createElement("p");
  playerPosition.textContent = playerData.position;
  playerView.appendChild(playerPosition);
}

const showIntroView = () => {
  introView.style.display = 'block';
  playerListView.style.display = 'none';
  playerView.style.display = 'none';
}

const showPlayerList = () => {
  introView.style.display = 'none';
  playerListView.style.display = 'block';
  playerView.style.display = 'none';
}

const showPlayerDetails = () => {
  introView.style.display = 'none';
  playerListView.style.display = 'none';
  playerView.style.display = 'block';
}
