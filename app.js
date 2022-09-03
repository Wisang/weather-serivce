const express = require("express");
const https = require("https");
const app = express();

app.get("/", function(req, res) {
  url = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=721fc8c69acd980dfc86a5bad72edf6f&units=metric";

  https.get(url, function(response) {
    console.log(response);
  });
  res.send("<h1>Current Weather in console</h1>");
});

app.listen(3000);
