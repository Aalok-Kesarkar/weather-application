const weatherData = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const messageSix = document.querySelector('#message-6')
const messageSeven = document.querySelector('#message-7')
const messageEight = document.querySelector('#message-8')

weatherData.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = searchInput.value
    messageOne.innerHTML = 'Loading...'
    messageTwo.innerHTML = messageThree.innerHTML = messageFour.innerHTML = messageFive.innerHTML = messageSix.innerHTML = messageSeven.innerHTML = messageEight.innerHTML = ''
    fetch('/weather?loc=' + location).then((response) => {
        response.json().then((dataReceived) => {
            if (dataReceived.error) {
                messageOne.innerHTML = 'Error! ' + dataReceived.error
            } else {
                messageOne.innerHTML = dataReceived.placeName
                messageTwo.innerHTML = 'Today is a ' + dataReceived.overall_weather + ' day!'
                messageThree.innerHTML = 'Temperature: ' + dataReceived.temp + ' degree celcius'
                messageFour.innerHTML= 'Feels like: ' + dataReceived.feel + ' degree celcius'
                messageFive.innerHTML = 'Current Time: ' + dataReceived.localTime
                messageSix.innerHTML = 'Precipitation chance: ' + dataReceived.precip + '%'
                messageSeven.innerHTML = 'Humidity scale: ' + dataReceived.humidity
                messageEight.innerHTML = 'UV Index: ' + dataReceived.uv_index
            }
        })
    })
})