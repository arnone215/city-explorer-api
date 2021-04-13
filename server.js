'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const weatherData = require('./data/weather.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/weather', (request, response) => {
  const allDailyForecasts = weatherData.data(day => new DailyForecast(day));
  response.send(allDailyForecasts);
});

function DailyForecast(day){
  this.date = day.datetime;
  this.description = day.weather.description;

}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));