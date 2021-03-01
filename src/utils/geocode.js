const request = require('request')

const geoAccessToken = 'pk.eyJ1IjoiY2Fyb2xpbmV1Y2hvYSIsImEiOiJja2wybWQ2ZnIwZzBjMzJxbXY2bHR6cHh3In0.Wks2JLI4nAXC4q5KxqA1ug'
const geoBaseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'

const geocode = (address, callback) => {
  const url = geoBaseURL + encodeURIComponent(address) + '.json?access_token='+ geoAccessToken + '&limit=1'
  request({ url, json: true}, (error, { body }) => {
    if (error) {
        callback('unable to connect to location services', undefined)
    } else if (body.features.length === 0) {
        callback('Unable to find location', undefined)
    } else {
        const data = {
          location: body.features[0].place_name,
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0]
        }
        
        callback(undefined, data)
    }
  })
}

module.exports = geocode

