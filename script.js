console.log($);
$(document).ready(function(){
    var apikey= "38b878c8ec008be7efd106fd4221e555";
    var localarea= $("#local").val();
    var Hweather= "https://api.openweathermap.org/data/2.5/weather?q=Houston&units=imperial&appid=" + apikey;
    var Hforcast= "https://api.openweathermap.org/data/2.5/forecast?q=Houston&units=imperial&appid=" + apikey;
    var Dweather= "https://api.openweathermap.org/data/2.5/weather?q=";
    var Dforcast= "https://api.openweathermap.org/data/2.5/forecast?q=";
    var City= $("#city");
    var tem= $("#temp");
    var hum= $("#humid");
    var win= $("#wind");

//website startup
    $.ajax({
        url: Hweather,
        method: "GET"
    }).then(function(response){
        console.log(response);
        City.text(response.name);
        tem.text("Temperature: " + response.main.temp.toFixed() + "F");
        hum.text("Humidity: " + response.main.humidity + "%");
        win.text("Wind Speed: " + response.wind.speed.toFixed() + " m/h");
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

//adds user history to list
    function refill(){
        var adder= $("<li>");
        adder.text(localStorage.getItem("Search-history"));
        adder.attr("class", "list-group-item");
        adder.attr("data-city", localStorage.getItem("Search-history"));
        $("#history").append(adder);
    };
refill();

//list highlighter
    $(".list-group-item").on({mouseover: function(){
        $(this).attr("class", "list-group-item active")},
        mouseleave: function(){
            $(this).attr("class", "list-group-item")
        }
    });

//list displayer
    $(".list-group-item").on("click", function(){
        console.log($(this).attr("data-city"));
        var town= $(this).attr("data-city");

    $.ajax({
        url: Dweather + town + "&units=imperial&appid=" + apikey,
        method: "GET"
    }).then(function(response){
        console.log(response);
        City.text(response.name);
        tem.text("Temperature: " + response.main.temp.toFixed() + "F");
        hum.text("Humidity: " + response.main.humidity + "%");
        win.text("Wind Speed: " + response.wind.speed.toFixed() + " m/h");
    });

    $.ajax({
        url: Dforcast + town + "&units=imperial&appid=" + apikey,
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
})

//adds user history and input to the page
    $("button").on("click", function(){
        var user= $("#searcher").val()
        console.log(user);
        localStorage.setItem("Search-history", user);
        var tracker= $("<li>");
        tracker.text(user);
        tracker.attr("class", "list-group-item")
        tracker.attr("data-city", user);
        $("#history").append(tracker);

        $.ajax({
            url: Dweather + user + "&units=imperial&appid=" + apikey,
            method: "GET"
        }).then(function(response){
            console.log(response);
            City.text(response.name);
            tem.text("Temperature: "+ + response.main.temp.toFixed() + "F");
            hum.text("Humidity: " + response.main.humidity + "%");
            win.text("Wind Speed: " + response.wind.speed.toFixed() + " m/h");
        });

        $.ajax({
            url: Dforcast + user + "&units=imperial&appid=" + apikey,
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
    
});