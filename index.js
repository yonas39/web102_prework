/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // ➡️➡️➡️ Step 1:
  for (let game of games) {
    // ➡️➡️➡️ Step 2:
    let gameCard = document.createElement("div");
    gameCard.className = "game-card";

    // ➡️➡️➡️ Step 3:
    gameCard.innerHTML = `img src="${game.img}" class = "game-img"
                        <h2> ${game.name} </h2>
                        <p>${game.description}</p>
                `;
    // ➡️➡️➡️ step 4:
    gamesContainer.appendChild(gameCard);
  }
  // loop over each item in the data
  // create a new div element, which will become the game card
  // add the class game-card to the list
  // set the inner HTML using a template literal to display some info
  // about each game
  // TIP: if your images are not displaying, make sure there is space
  // between the end of the src attribute and the end of the tag ("/>")
  // append the game to the games-container
}
addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

//  const totalContributions = GAMES_JSON.reduce((sum, game) => sum + game.backers, 0);
//  const contributionsCard = document.getElementById("contributions-card");
//  contributionsCard.textContent = totalContributions;

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
// use reduce() to count the number of total contributions by summing the backers
// contributionsCard = GAMES_JSON.reduce((out, game) => {
//   return out + game.backers;
// }, 0);
const totalContributions = GAMES_JSON.reduce(
  (sum, game) => sum + game.backers,
  0
);
contributionsCard.textContent = totalContributions.toLocaleString("en-US");

// set the inner HTML using a template literal and toLocaleString to get a number with commas
const totalraisedCard = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);
// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
raisedCard.textContent = "$" + totalraisedCard.toLocaleString("en-US");

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.textContent = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  //   return GAMES_JSON.filter((game) => {
  //     return game.pledged < game.goal;
  //   });
  return GAMES_JSON.filter((game) => game.pledged < game.goal);

  // use the function we previously created to add the unfunded games to the DOM
}
// console.log(filterUnfundedOnly().length);
// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  return GAMES_JSON.filter((game) => game.pledged >= game.goal);

  // use the function we previously created to add unfunded games to the DOM
}
// console.log(filterFundedOnly().length);
// show all games
function showAllGames() {
  //   deleteChildElements(gamesContainer);
  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}
// console.log(showAllGames());
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
// unfunded only
unfundedBtn.addEventListener("click", function () {
  deleteChildElements(document.getElementById("button-container"));
  addGamesToPage(filterUnfundedOnly());
});
// funded only
fundedBtn.addEventListener("click", function () {
  deleteChildElements(document.getElementById("button-container"));
  addGamesToPage(filterFundedOnly());
});

// display all funded and unfunded
allBtn.addEventListener("click", function () {
  deleteChildElements(document.getElementById("button-container"));
  showAllGames();
});
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
const numberOfUnfundedGames = unfundedGames.length;

// create a string that explains the number of unfunded games using the ternary operator
const totalPledged = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);

const displayStr = `A total of $${totalPledged.toLocaleString()} has been raised for ${
  GAMES_JSON.length
} games. Currently ${numberOfUnfundedGames} ${
  numberOfUnfundedGames === 1 ? "game remains" : "games remain"
} unfunded. We need your help to fund these amazing games`;

// create a new DOM element containing the template string and append it to the description container
const pElement = document.createElement("p");
pElement.textContent = displayStr;
// const descriptionContainer = document.getElementById('descriptionContainer');
descriptionContainer.appendChild(pElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topFundedGame, secondTopFundedGame, ...restOfTheGames] = sortedGames;
console.log(topFundedGame.name.split(" ")[0]);
console.log(secondTopFundedGame.name.split(" ")[0]);

// create a new element to hold the name of the top pledge game, then append it to the correct element
const game1Element = document.createElement("p");
game1Element.textContent = topFundedGame.name;
// const firstGameContainer = document.getElementById('firstGameContainer');
firstGameContainer.appendChild(game1Element);

const game2Element = document.createElement("p");
game2Element.textContent = secondTopFundedGame.name;
// const secondGameContainer = document.getElementById('secondGameContainer');
secondGameContainer.appendChild(game2Element);

// do the same for the runner up item
