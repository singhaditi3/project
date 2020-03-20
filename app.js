var express = require("express");
var app = express();
var request = require("request");
app.use(express.static("public"));

app.get("/", function(req,res){
    res.render("homepage.ejs");
});

app.get("/services", function(req,res){
    res.render("services.ejs");
});

//for movies service//
app.get("/movies", function(req,res){
    res.render("search.ejs");
});

app.get("/movieresults", function(req,res){
    var query = req.query.search
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb"
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("movieresults.ejs", {data: data});
        }
    });
});
//............................................................................................//

//for news service//
app.get("/newssearch", function(req,res){
    res.render("newssearch.ejs");
})

app.get("/news", function(req,res){
    var query = req.query.news
    var url = "http://newsapi.org/v2/top-headlines?sources=" + query + "&apiKey=b64b43566b8b4dbd858c5ba7b30414ff"
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("news.ejs", {data: data});
        }
    });
});
//.......................................................................................................................//

//for weather service//
app.get("/weathersearch", function(req,res){
    res.render("weathersearch.ejs");
});

app.get("/weather", function(req,res){
    var query = req.query.weather
    var query1 = req.query.country
    var url = "https://api.weatherbit.io/v2.0/current?city=" + query + "&country=" + query1 + "&key=e0fcf59b0f284e95908929f57513b9d0"
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("weather.ejs", {data: data});
        }
    });
});
//.............................................................................................................................................

app.listen(3000, function(){
    console.log("website started!");
});