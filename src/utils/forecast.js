const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=52ef17af8fe2701dd753317961759f91&query=' + lat + ',' + long + '&units=f'
    

    request({ url, json: true }, (error, response) => {
        const { error: responseError, current, } = response.body
        const { weather_descriptions, temperature, feelslike} = current

        if (error) {
            callback('Unable to connect to weather services!')
        } else if (responseError) {
            callback('Unable to find location.  Try another search')
        } else {
            callback(undefined, weather_descriptions[0] + '. It is currently ' + temperature + ' degrees out.  It feels like ' + feelslike + ' degrees out.')
        }
    })


    
}

module.exports = forecast