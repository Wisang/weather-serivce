const express = require("express");
const https = require("https");
const app = express();

app.get("/", function(req, res) {
  url = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=721fc8c69acd980dfc86a5bad72edf6f&units=metric";

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const jsonData = JSON.parse(data);
      console.log(jsonData);
      console.log(jsonData.weather[0].description);
      const weatherIcon = jsonData.weather[0].icon;
      const weatherUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
      res.write("<div><h3>The weather is " + jsonData.weather[0].description + "</h3></div>");
      res.write("<h1>The temperature now in here is " + jsonData.main.temp + " in celsius</h1>");
      res.write("<img src=" + weatherUrl + ">");
      res.send();
    });
  });
});

app.listen(3000);
