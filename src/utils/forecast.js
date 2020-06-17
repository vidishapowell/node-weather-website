const request = require('request')

const forecast = (longitude, latitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=1e2e2b1ac83dbaa3c90dd45956872a0d&query='+latitude+','+longitude+'&units=f'

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service.')
    } else if (body.error) {
      callback('Invalid location.')
    } else {
      const temperature = body.current.temperature;
      const feelsLike = body.current.feelslike;
      const description = body.current.weather_descriptions[0]
      const humidity = body.current.humidity
      callback(undefined, description + '. It is ' + temperature + ' degrees out.  It feels like ' + feelsLike + ' degrees.' + ' The humidity is ' + humidity + '%.')
    }
  })
}

module.exports = forecast
