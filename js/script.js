var settings = {
	"url": "https://api.rawg.io/api/games?key=2282edd787924a8f993a140a00dcd964",
	"method": "GET",
	"timeout": 0,
	};
  
  $.ajax(settings).done(function (response) {
	console.log(response);

	
  });