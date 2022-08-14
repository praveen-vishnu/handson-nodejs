const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const { urlencoded } = require('express');
const app = express();

app.use(bodyParser(urlencoded({ extended: true })));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.post('/', function (req, res) {
    var cityName = req.body.cityName;
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=310a05b1c650ae3f61214d46c904fab2&units=metric';
    https.get(url, (resp) => {
        console.log(resp.statusCode);

        resp.on('data', (data) => {
            var weatherData = JSON.parse(data);
            var temp = weatherData.main.temp;
            var weatherDescription = weatherData.weather[0].description;
            var icon = weatherData.weather[0].icon;
            var imageURL = "https://openweathermap.org/img/wn/" + icon + "@4x.png";
            res.write("<p>The Weather in " + cityName + " is Currently " + weatherDescription + "</p>");
            res.write("<h1>The temprature in " + cityName + " is " + temp + " degree Celcius</h1>");
            res.write("<img src='" + imageURL + "'></img>");
            res.send();
        })
    });
})
app.listen(3000, function () {
    console.log("Server is running on port 3000");
})
