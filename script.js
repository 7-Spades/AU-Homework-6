console.log($);
$(document).ready(function(){
    var apikey= "38b878c8ec008be7efd106fd4221e555"
    var localarea= $("#local").val()
    var Hweather= "https://api.openweathermap.org/data/2.5/weather?q=Houston&units=imperial&appid=" + apikey;
    var Hforcast= "https://api.openweathermap.org/data/2.5/forecast?q=Houston&units=imperial&appid=" + apikey;
    var Dweather= "https://api.openweathermap.org/data/2.5/weather?q=" + localarea + "&units=imperial&appid=" + apikey;
    var Dforcast= "https://api.openweathermap.org/data/2.5/forecast?q=" + localarea + "&units=imperial&appid=" + apikey;
    

    $.ajax({
        url: Hweather,
        method: "GET"
    }).then(function(response){
        console.log(response);
        $("#city").text(response.name);
        $("#temp").text("Temperature: " + response.main.temp.toFixed() + "F");
        $("#humid").text("Humidity: " + response.main.humidity + "%");
        $("#wind").text("Wind Speed: " + response.wind.speed.toFixed() + " m/h");
    })

    $.ajax({
        url: Hforcast,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var result= response.list;
        for(var i=0; i<5; i++){
            $("#date0"+i).text(result[8*i].dt_txt);
            $("#temp0"+i).text("Temp: " + result[8*i].main.temp.toFixed() + "F");
            $("#humid0"+i).text("Humid: " + result[8*i].main.humidity + "%");
        };
    })

    
});