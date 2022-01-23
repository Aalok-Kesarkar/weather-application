const weatherData = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

weatherData.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = searchInput.value
    messageOne.innerHTML = 'Loading...'
    messageTwo.innerHTML = ''
    messageThree.innerHTML = ''
    messageFour.innerHTML = ''
    fetch('http://localhost:3000/weather?loc=' + location).then((response) => {
        response.json().then((dataReceived) => {
            if (dataReceived.error) {
                messageOne.innerHTML = 'Error! ' + dataReceived.error
            } else {
                messageOne.innerHTML = 'Location: ' + dataReceived.placeName
                messageTwo.innerHTML = 'Temperature: ' + dataReceived.temp + ' degree celcius'
                messageThree.innerHTML = 'Feels like: ' + dataReceived.feel + ' degree celcius'
                messageFour.innerHTML = 'Precipitation chances: ' + dataReceived.precip + '%'
            }
        })
    })
})