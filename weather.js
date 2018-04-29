$(document).ready(function() {
    var lat = "";
    var lon = "";

    navigator.geolocation.getCurrentPosition(function(position) {
        lat=position.coords.latitude;
        lon=position.coords.longitude;
      });
      
      $("#tButton").on("click", function() {
      
      $.ajax({
        type: "GET",
        //url:"https://fcc-weather-api.glitch.me/api/",
        url: "https://fcc-weather-api.glitch.me/api/current?lon="+lon+"&lat="+lat,
        dataType: "json",
        success: function(result) {
            console.log(result);
            $(".location").html("Location: " + result.name);
            $(".temperature").html("Temperature: "+ result.main.temp+ " ºC");
            $(".pressure").html("Pressure: "+ result.main.pressure + " bar");
            $(".weather").html(result.weather[0].main);
            $(".icon").html("<img src="+result.weather[0].icon+" alt=\"current weather icon\">");
        }
    });
      });
    });
