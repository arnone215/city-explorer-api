'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const superagent = require('superagent');
const weatherData = require('./data/weather.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/weather', (request, response) => {
  try {
    const url = 'http://api.weatherbit.io/v2.0/forecast/daily';
    const query = {
      key: process.env.WEATHER_API_KEY,
      lat: request.query.lat,
      lon: request.query.lon,
    };
    superagent.get(url).query(query).then(forecast => {
      console.log(forecast);
      response.send(forecast.body.data.map(day => new DailyForecast(day)));
    });
  } catch (error) {
    handleErrors(error, response);
  }
});

app.get('/movies', (request, response) => {
  try {
    const url = 'http://api.themoviedb.org/3/movie/550';
    const query = {
      key: process.env.MOVIE_API_KEY,
      title: '',
      overview: ''
    };
    superagent.get(url).query(query).then(movie => {
      console.log(movie);
      response.send(movie.body.data.map(movie => new Movie(movie)));
    });
  } catch (error) {
    handleErrors(error, response);
  }
});

// Access the query parameters from the web client request object, to identify the exact location for which the web client is requesting weather info.



function DailyForecast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

function handleErrors(error, response) {
  response.status(500).send('internal error');
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));








