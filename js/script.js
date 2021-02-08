
var searchFormEl = document.querySelector('#search-form');
function handleSearchFormSubmit(event) {
    event.preventDefault();
    var searchInputVal = document.querySelector('#search-input').value;
    var formatInputVal = document.querySelector('#format-input').value;
    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }
    var queryString = 'https://api.rawg.io/api/games?api=2282edd787924a8f993a140a00dcd964' + formatInputVal + '&search=' + searchInputVal;
    console.log("inside", queryString);
    $.ajax({
        url: queryString,
        method: 'GET',
    }).then(function (gameData) {
        console.log(gameData);
        gameData.results.forEach(function (elem) {
            console.log(elem.name);
            $('#result-content').append('<div>' + elem.name + '</div>');
            $('#result-content').append(`<img src=${elem.background_image}>`);
        })
    })
}
searchFormEl.addEventListener('submit', handleSearchFormSubmit);
//$(".searchBtn").click(function() {

  //  $.ajax({
    //    url: 'https://api.rawg.io/api/games',
      //  type: "GET",
      //  dataType: "json",
      //  success: function (data) {
      //    console.log(data.results)
      //   data.results.forEach(function (elem, index) {
      
      //      console.log(elem.name);
      //      $("#result-content").append("<p>" + elem.name + "</p>");

      //      console.log(elem.short_screenshots[0].image);
      //      $("#result-img").append("<a href=" + elem.short_screenshots[0].image + "style='width:100px;height:200px;'</a>");
      //    })
      
   //     }
  //    });
//})