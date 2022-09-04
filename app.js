const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  console.log(req.body.cityName);
  const key = "721fc8c69acd980dfc86a5bad72edf6f";
  const query = req.body.cityName;
  const unit = "metric"

  url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + key + "&units=" + unit;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const jsonData = JSON.parse(data);
      console.log(jsonData);
      console.log(jsonData.weather[0].description);
      const weatherIcon = jsonData.weather[0].icon;
      const weatherUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
      res.write("<div><h3>The weather in " + query + " is " + jsonData.weather[0].description + "</h3></div>");
      res.write("<h1>The temperature and humidity is " + jsonData.main.temp + " in celsius and " + jsonData.main.humidity + " percent</h1>");
      res.write("<img src=" + weatherUrl + ">");
      res.send();
    });
  });
});



app.listen(3000);
