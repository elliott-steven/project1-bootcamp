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
  //console.log("API URL", queryString);
  $.ajax({
    url: queryString,
    method: 'GET',
  }).then(function (gameData) {
    $('#result-content').empty();
    //console.log(gameData);
    gameData.results.forEach(function (elem) {
      //console.log(elem.name);
      $('#result-content').append(`<div class="card">${elem.name}</div>`);
      $('#result-content').append(`<div class="card-content"><img src=${elem.background_image}></div>`);
    })
  })
}
searchFormEl.addEventListener('submit', handleSearchFormSubmit);