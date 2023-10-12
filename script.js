// Reference to the button and the message element
const fetchPlayersButton = document.getElementById('fetchPlayersButton');
const messageElement = document.getElementById('message');

const introView = document.getElementById('intro-view');
const playerListView = document.getElementById('player-list-view');
const playerView = document.getElementById('player-view');
const waitingView = document.getElementById('waiting-view');


const apiUrl = 'https://www.balldontlie.io/api/v1/players';

let currentPage = 1;

// Function to show the message when the button is clicked
fetchPlayersButton.addEventListener('click', function() {
  fetchPlayers(currentPage);
});

const fetchPlayers = (page) => {
  showWaitingView();

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
    liElement.textContent = player.first_name + ' ' + player.last_name;

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
  showWaitingView();
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
  showPlayerDetails();

  var playerName = document.getElementById("playerName");
  var playerPosition = document.getElementById("playerPosition");
  // var playerHeight = document.getElementById("playerHeight");
  var playerTeam = document.getElementById("playerTeam");
  // var playerTeamAbbreviation = document.getElementById("playerTeamAbbreviation");
  var playerCity = document.getElementById("playerCity");
  var playerDivision = document.getElementById("playerDivision");
  var playerConference = document.getElementById("playerConference");


  playerName.textContent = playerData.first_name + ' ' + playerData.last_name;
  playerPosition.textContent = playerData.position;
  // playerHeight.textContent = playerData.height_feet + ' feet ' + playerData.height_inches + ' inches';
  playerTeam.textContent = playerData.team.full_name;
  // playerTeamAbbreviation = playerData.team.abbreviation;
  playerCity.textContent = playerData.team.city;
  playerDivision.textContent = playerData.team.division;
  playerConference.textContent = playerData.team.conference;
}

const showIntroView = () => {
  introView.style.display = 'block';
  playerListView.style.display = 'none';
  playerView.style.display = 'none';
  waitingView.style.display = 'none';
}

const showPlayerList = () => {
  introView.style.display = 'none';
  playerListView.style.display = 'block';
  playerView.style.display = 'none';
  waitingView.style.display = 'none';
}

const showPlayerDetails = () => {
  introView.style.display = 'none';
  playerListView.style.display = 'none';
  playerView.style.display = 'block';
  waitingView.style.display = 'none';
}

const showWaitingView = () => {
  introView.style.display = 'none';
  playerListView.style.display = 'none';
  playerView.style.display = 'none';
  waitingView.style.display = 'block';
}
