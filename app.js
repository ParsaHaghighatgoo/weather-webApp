const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req , res){
    res.sendFile(__dirname+"/index.html");  
});

app.post("/", function(req ,res){
    const query = req.body.cityName; 
    const unit = "metric";
    //write your appKey(id) then u can run this server
    const appid = "";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + unit;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description; 
            const icon = "https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
            console.log(icon);
            res.write("<h1>the temperature in " + query + " is " + temp + " degrees calcius.</h1>")
            res.write("<p>the weather is currently "+ weatherDescription + ".</p>");
            res.write("<img src="+ icon +">");
            res.send();
        });
    });
});




app.listen(3000,function(){
    console.log('server is running on port 3000');
});

