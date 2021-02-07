

//$(".searchBtn").click(function() {

    $.ajax({
        url: 'https://api.rawg.io/api/games',
        type: "GET",
        dataType: "json",
        success: function (data) {
          console.log(data.results)
          data.results.forEach(function (elem, index) {
      
            console.log(elem.name);
            $("#result-content").append("<p>" + elem.name + "</p>");

            console.log(elem.short_screenshots[0].image);
            $("#result-img").append("<a href=" + elem.short_screenshots[0].image + "style='width:100px;height:200px;'</a>");
          })
      
        }
      });
//})