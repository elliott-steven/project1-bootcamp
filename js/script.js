var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();
  var searchInputVal = document.querySelector('#search-input').value;
  var formatInputVal = document.querySelector('#format-input').value;
  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }
  var queryString = 'https://api.rawg.io/api/' + formatInputVal + '?api=2282edd787924a8f993a140a00dcd964' + '&search=' + searchInputVal;
  $.ajax({
    url: queryString,
    method: 'GET',
  }).then(function (gameData) {
    $('#result-content').empty();
    console.log(gameData);
    var rc = $("#result-content")
    gameData.results.forEach(function (elem) {
      var resultDiv = $("<div>")
      resultDiv.addClass("card mb-4 cardStyle")
      resultDiv.text(`${elem.name}`)
      var resultDiv1 = $("<div>")
      resultDiv1.addClass("card-content")
      var resultImg = $("<img>")
      resultImg.attr("src", `${elem.background_image}`)
      resultDiv1.append(resultImg)
      resultDiv.append(resultDiv1)
      rc.append(resultDiv)
      //$('#result-content').append(`<div class="card">${elem.name}</div>`);
      //$('#result-content').append(`<div class="card-content"><img src=${elem.background_image}></div>`);
    })
  })
  //localstorage for Game History
  //Not entirely functional. Values in localstorage are not unique
  /*   gameName = searchInputVal
  
    var gameHistory = document.getElementById("game-history");
    console.log(gameHistory)
    gameHistory.textContent = "";
  
    var searchedGames = localStorage.getItem("searchedGames");
    console.log(searchedGames)
    if (searchedGames === null) {
      searchedGames = [];
    } else {
      searchedGames = JSON.parse(searchedGames);
    }
    searchedGames.push(gameName);
  
    var searchedGamesList = JSON.stringify(searchedGames);
    console.log(searchedGamesList)
    localStorage.setItem("searchedGames", searchedGamesList);
  
    for (let i = 0; i < searchedGames.length; i++) {
      var list = document.createElement("button");
      list.setAttribute("class", "button is-fullwidth m-2");
      list.setAttribute("id", "game-link");
      list.textContent = searchedGames[i];
      gameHistory.prepend(list);
    } */
};
//using localstorage to remember selected drop down option
window.onload = function () {
  var setDropdown = localStorage.getItem("selectedOption");
  $('#format-input').val(setDropdown);
}
$('#format-input').change(function () {
  var setValue = $(this).val();
  localStorage.setItem("selectedOption", setValue);
});

searchFormEl.addEventListener('submit', handleSearchFormSubmit)
