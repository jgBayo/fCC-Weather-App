function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  };
  var lat = "";
  var lon = "";
  var celsius = true;
  var T;
  
$(document).ready(function() {


    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function locateMe(position) {
                lat=position.coords.latitude;
                lon=position.coords.longitude;
                //console.log(lat,lon);
                updateData();     
            });
        }else{
            alert("Location could not be gathered.");
            //console.log("Error");
        }    
        
    };
    getLocation();
    
$("#tButton").on("click", function() {
    celsius = !celsius;
    updateT(T);
    if (celsius){
        $("#tButton").html("Switch temperature to Fahrenheit");
    }else{
        $("#tButton").html("Switch temperature to Celsius");
    }
});
});

function updateData(){            
    $.ajax({
        type: "GET",
        //url:"https://fcc-weather-api.glitch.me/api/",
        url: "https://fcc-weather-api.glitch.me/api/current?lon="+lon+"&lat="+lat,
        dataType: "json",
        success: function(result) {
            console.log(result);
            if (result.name !="Shuzenji"){//Weather API has a bug that shows this location sometimes
                $(".location").html("Location: " + result.name);
                T = result.main.temp;
                updateT(result.main.temp);
                $(".pressure").html("Pressure: "+ result.main.pressure + " bar");
                $(".weather").html(result.weather[0].main);
                $(".icon").html("<img src="+result.weather[0].icon+" alt=\"current weather icon\">");
                $("#tButton").show();
            }
        }
     });     
};

function updateT(T){
    if (celsius){
        $(".temperature").html("Temperature: "+ T + " ºC");
    }else{
        $(".temperature").html("Temperature: "+ precisionRound(T*9/5 +32,1)+ " ºF"); //°F = °C⋅(9/5) +32
    }
}