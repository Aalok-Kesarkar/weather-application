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
            console.log('Forecast: '+body.current.weather_icons[0])
            callbackFnc(undefined, {
                temperature: body.current.temperature,
                precipitation_chance: body.current.precip,
                feels_like: body.current.feelslike,
                localTime: body.location.localtime,
                humidity: body.current.humidity,
                uv: body.current.uv_index,
                overall_weather: body.current.weather_descriptions[0],
                icon: body.current.weather_icons[0]
            })
        }
    })
}

module.exports = {
    weather: forecast
}