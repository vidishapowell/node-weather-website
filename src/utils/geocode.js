const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmlkaXNoYXBvd2VsbCIsImEiOiJja2I5c2E0aGowaDRiMzJtZXg1bzJqcWk3In0.JczWK3IPdKpqaF74jRb5GQ&limit=1'
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to location services.')
    } else if (body.features === undefined) {
      callback('Unable to find location. Please try again with a different query term.')
    } else {
      const latitude = body.features[0].center[1]
      const longitude = body.features[0].center[0]
      callback(undefined, {
        latitude,
        longitude,
        location: body.features[0].place_name
      })
    }

  })
}

module.exports = geocode
