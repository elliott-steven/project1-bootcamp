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
    var rc = $("#result-content")
    gameData.results.forEach(function (elem) {
      //console.log(elem.name);
      
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
}
searchFormEl.addEventListener('submit', handleSearchFormSubmit);