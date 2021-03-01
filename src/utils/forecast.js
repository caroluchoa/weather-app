const request = require('request')

const baseURL = 'http://api.weatherstack.com/current?access_key='
const access_key = 'd9c6aae843423f27aa4644c8430472cb'

const forecast = (latitude, longitude, callback) => {
  const url = baseURL + access_key + '&query=' + latitude + ',' + longitude
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('unable to connect to weather service', undefined)
    } else if (body.error) {
      callback('unable to find location', undefined)
    } else {
      const data = {
        temperature: body.current.temperature,
        feelsLike: body.current.feelslike,
        weatherDescriptions: body.current.weather_descriptions[0],
        humidity: body.current.humidity
      }
      const {temperature, feelsLike, weatherDescriptions: weather, humidity} = data

      callback(undefined, weather + '. It is currently ' + temperature + ' degrees outside. It feels like ' + feelsLike + ' degrees outside. Humidity is ' + humidity + '%.')
  }})
}

module.exports = forecast
