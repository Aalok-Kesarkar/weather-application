const request = require('request')
const geocode = (location, callbackFnc) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=' + process.env.MAPBOX_API_KEY + '&limit=1'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callbackFnc('Unable to fetch weather data, Please report at aalok.public@gmail.com Error code: MB-Er-6', undefined)
        } else if (body.features.length === 0) {
            callbackFnc('Location not found...', undefined)
        } else {
            callbackFnc(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                placeName: body.features[0].place_name
            })
        }
    })
}


module.exports = {
    geocode: geocode
}