const geocode = require('./geocode')
const request = require('request')
let forecast = (latitude, longitude, callbackFnc) => {
    const url = 'http://api.weatherstack.com/current?access_key=14661b6924d443dd71911a8476bf97d1&query=' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callbackFnc('Unable to fetch weather data, Please report at aalok.public@gmail.com Error code: WS-Er-7', undefined)
        } else if (body.error) {
            callbackFnc('Unable to fetch weather data, Please report at aalok.public@gmail.com Error code: WS-Er-9', undefined)
        } else {
            callbackFnc(undefined, {
                temperature: body.current.temperature,
                precipitation_chance: body.current.precip,
                feels_like: body.current.feelslike
            })
        }
    })
}

module.exports = {
    weather: forecast
}