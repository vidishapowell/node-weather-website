const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

console.log(partialsPath)

app.use(express.static(publicDirectoryPath))

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Vidisha'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Vidisha'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'Help is coming soon!!',
    title: 'Help',
    name: 'Vidisha'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address

  if (!address) {
    return res.send({
      error: 'You must provide an address.'
    })
  }

  geocode(address, (error, {longitude, latitude, location}={}) => {
    if (error) {
      res.send({
        error
      })
    }
    forecast(longitude, latitude, (forecastError, forecastData) => {
      if (forecastError) {
        res.send({
          error: forecastError
        })
      }
      res.send({
        address,
        location,
        forecast: forecastData
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term.'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'Error',
    errorMessage:'help article not found',
    name: 'Vidisha'
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    title: 'Error',
    errorMessage: 'my 404 page',
    name: 'Vidisha'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})
