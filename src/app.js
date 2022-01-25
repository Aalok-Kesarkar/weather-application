const path = require('path')
const express = require('express')
const hbs = require('hbs')
const mapBox = require('./utils/geocode')
const forecast = require('./utils/forecast')
// const chalk = require('chalk')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const staticDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialHeader = path.join(__dirname, '../templates/partials')

// Route to static files
app.use(express.static(staticDirectory))

// Setup handelbar engine and views location
app.set('view engine', 'hbs') // Telling express that from now on "View Engine" will be hbs!
app.set('views', viewsPath) // Telling express that directory you're looking as "views" is in viewsPath location
hbs.registerPartials(partialHeader)

let indexCounter = 1
app.get('', (req, res) => {
    res.render('index', {
        subtitle: 'Enter location name to view weather',
        developer: 'Aalok Kesarkar'
    })
    console.log('#' + indexCounter + ' Client loaded home page')
    indexCounter += 1
})
app.get('/about', (req, res) => {
    res.render('about', {
        dev: 'Aalok Kesarkar',
        profession: 'Bachelor\'s degree',
        email: 'aalok.public@gmail.com'
    })
})
app.get('/contact', (req, res) => {
    res.render('contact', {
        email: 'aalok.public@gmail.com'
    })
})
app.get('/about/*', (req, res) => {
    res.render('404_not_found', {
        errorMsg: 'Blog article not found'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.loc) { // If no location given then generate error======
        return res.send({ error: 'Please enter location' })
    }
    // no error so passing location name to geocode to resolve in lat long==============================
    mapBox.geocode(location = req.query.loc, (error, { latitude, longitude, placeName } = {}) => {
        if (error) {
            res.send({ error: error })
        } else {
            // getting FORECAST data from forecast server====================================================
            forecast.weather(longitude, latitude, (error, { temperature, icon, precipitation_chance, feels_like, localTime, humidity, uv , overall_weather} = {}) => {
                if (error) {
                    return res.send({ error: error })
                }
                // No error found so passing data to weather.hbs file =======================================
                res.send({
                    placeName: placeName,
                    overall_weather: overall_weather,
                    temp: temperature,
                    localTime: localTime,
                    precip: precipitation_chance,
                    feel: feels_like,
                    humidity: humidity,
                    uv_index: uv,
                    icon: icon
                })
                console.log('Server side: '+icon)
                console.log('#' + indexCounter + ' Requested-->' + location)
                console.log('   Displayed-->' + placeName)
                indexCounter += 1
            })
            // FORECAST data process ended===================================================================
        }
    })
})
app.get('*', (req, res) => {
    res.render('404_not_found', {
        errorMsg: 'Page not found'
    })
})
app.listen(port, () => {
    console.log('SERVER IS SUCCESSFULLY STARTED ON PORT ___' + port + '___')
})