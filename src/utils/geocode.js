const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2Jjam9lIiwiYSI6ImNsZ2F1NDRtajA3cHMzZ256NGE2YTJ6Nm4ifQ.0rBws8UVpNzG0SmGXOnYJg&limit=1'

    request({ url, json: true }, (error, response) => {
        const { features } = response.body

        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (features.length === 0 ) {
            callback('Unable to find location.  Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode