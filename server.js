'use strict';
// const { response } = require('express');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const weatherData = require('./data/weather.json');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;



  app.get('/weather',(request, response)=> {
    try{
    const dailyForecasts = weatherData.data.map(day => new Forecast(day));
    response.json(dailyForecasts);
  } catch (error) {
    errorHandling(error, response);
  }
  });

function Forecast(day){
  this.date = day.datetime;
  this.description = day.weather.description;
}

function errorHandling(error, response){
  response.status(500).send('internal server error');
}

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));

