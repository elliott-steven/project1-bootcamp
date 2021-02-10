var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();
  //adds search input to api url
  var searchInputVal = document.querySelector('#search-input').value;
  //adds dropdown selection to the api url
  var formatInputVal = document.querySelector('#format-input').value;
  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }
  //queries based on search selections
  var queryString = 'https://api.rawg.io/api/' + formatInputVal + '?api=2282edd787924a8f993a140a00dcd964' + '&search=' + searchInputVal + '&page_size=50' + '&search_precise=true';
  $.ajax({
    url: queryString,
    method: 'GET',
    //create custom cards for each game returned from RAWG query
  }).then(function (gameData) {
    $('#result-content').empty();
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
    })

    //create custom cards for each game returned from Giant Bomb query
    $.ajax({
      url: "https://www.giantbomb.com/api/search/?api_key=7bcc8a1b2a8841352d1a19e8e26b794d45964b7f&format=jsonp&query=" + searchInputVal + "&resources=video",
      method: "GET",
      dataType: "jsonp",
      jsonp: "json_callback",
      crossDomain: "true",
      headers: {
        "accept": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }).then(function (response) {
      $('#result-content-videos').empty();
      var resultContent = $("#result-content-videos")
      response.results.forEach(function (elem) {
        var results = $("<div>")
        results.addClass("card mb-4 cardStyle")
        results.text(`${elem.name}`)
        var results1 = $("<div>")
        results1.addClass("card-content")
        var resultVid = $("<iframe>")
        resultVid.attr("src", `${elem.embed_player}`)
        results1.append(resultVid)
        results.append(results1)
        resultContent.append(results)

      })
    })

      // queries for videos based on game slected
      $.ajax({
        url: "https://www.giantbomb.com/api/search/?api_key=7bcc8a1b2a8841352d1a19e8e26b794d45964b7f&format=jsonp&query=" + searchInputVal+ "&resources=video",
        method: "GET",
        dataType: "jsonp",
        jsonp: "json_callback",
        crossDomain: "true",
        headers: {
          "accept": "application/json",
          "Access-Control-Allow-Origin":"*"
      }
        //Create cards for each video displayed      
        }).then(function(response){        
        var resultContent = $("#result-content-videos")
        response.results.forEach(function (elem){
          var results = $("<div>")
          results.addClass("card mb-4 cardStyle")
          results.text(`${elem.name}`)
          var results1 = $("<div>")
          results1.addClass("card-content")
          var resultVid = $("<iframe>")
          resultVid.attr("src", `${elem.embed_player}`)
          results1.append(resultVid)
          results.append(results1)
          resultContent.append(results)
          
        })      
        })

  })
  //localstorage for Game History
  //Not entirely functional. Values in localstorage are not unique.
  //search history ends up too long
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
//remember selected drop down option using localstorage
window.onload = function () {
  var setDropdown = localStorage.getItem("selectedOption");
  $('#format-input').val(setDropdown);
}
$('#format-input').change(function () {
  var setValue = $(this).val();
  localStorage.setItem("selectedOption", setValue);
});

//function for image and video tabs





function openTab(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("content-tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" is-active", " not-active");
    // tablinks[i].children[0].children[1].className.replace(" has-text-white", " has-text-link");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className = "tab link-tab is-active";
  // evt.currentTarget.children[0].children[1].className.replace(" has-text-link", " has-text-white");
}

//runs search form function after submit
searchFormEl.addEventListener('submit', handleSearchFormSubmit)
