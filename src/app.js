const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { brotliDecompressSync } = require('zlib')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Caroline Uchôa'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Caroline Uchôa'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text',
    title: 'Help',
    name: 'Caroline Uchôa'
  })
})

// req (request) is an object containing information about the incoming request to the server
// res (response) contains a bunch of methods allowing us to customize what we'll send back to the requester

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  } else {
      geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
          return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error })          
          }
          res.send({
            location: location,
            address: req.query.address,
            forecastData: forecastData
          })
        })
      })
    } 

})


app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Caroline Uchôa',
    error: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Caroline Uchôa',
    error: 'Page not found'
  })
})

// Starts the server -> port 3000
app.listen(3000, () => {
  console.log('Server is up on port 3000')
})