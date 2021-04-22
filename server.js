'use strict';
// const { response } = require('express');
const express = require('express');
const superagent = require('superagent');

require('dotenv').config();
const cors = require('cors');
const weatherData = require('./data/weather.json');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

// proof of life of super agent

app.get('/weather',(request, response)=> {
  
  superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
  // .query lets up break up the query params using an object instead of a string.
  .query({
    key : process.env.REACT_APP_WEATHER_APP_KEY,
    units : 'I',
    lat : request.query.lat,
    lon : request.query.lon
  })
    .then(weatherData =>{
      response.status(200).json(weatherData.body.data.map(day => (
        new Forecast(day))))

        
        // {date: day.valid_date,
        //  description: day.weather.description})));
        //  response.json(weatherData);
      })
    .catch(err=>{
      console.log(err);
    })

    //   try{
  //   const dailyForecasts = weatherData.data.map(day => new Forecast(day));
  //   response.json(dailyForecasts);
  // } catch (error) {
  //   errorHandling(error, response);
  // }
  });

function Forecast(day){
  this.date = day.datetime;
  this.description = day.weather.description;
}
function Movie(film){
  this.title = film.title;
  this.overview = film.overview;
}
function errorHandling(error, response){
  response.status(500).send('internal server error');
}


app.get('/movies', (request, response)=> {
  superagent.get('https://api.themoviedb.org/3/search/movie')
  .query({
    api_key: process.env.REACT_APP_MOVIE_KEY,
    query: request.query.movie,
  })
  .then(movieData => {
    response.status(200).json(movieData.body.results.map(film => (
      new Movie(film)
    )))
    .catch(err=>{
      console.log(err);
    })
  })
})


app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));

