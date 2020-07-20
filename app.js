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
//---------------------------------------------------//


app.listen(3000, function(){
    console.log("started");
});