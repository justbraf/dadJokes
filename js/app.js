import { config } from './key.js'

document.addEventListener("DOMContentLoaded", () => {
    let jokebox = document.querySelector('#js-joke')
    let weatherBox = document.querySelector(".weatherData")
    getJoke(jokebox)
    getWeather(weatherBox)
    let checkBtn = document.querySelector("#js-auto")
    checkBtn.addEventListener("click", () => {
        let myChild = checkBtn.firstElementChild.classList
        if (myChild.contains("bi-check-square")) {
            clearInterval(myInterval)
            myChild.add("bi-square")
            myChild.remove("bi-check-square")
            console.log("Unchecked the box", myInterval)
        }
        else {
            myInterval = setInterval(() => {
                getJoke(jokebox)
            }, 8000)
            myChild.remove("bi-square")
            myChild.add("bi-check-square")
            console.log("Checked the box", myInterval)
        }
    })
})
var myInterval
let getJoke = (box) => {
    // get joke from API
    let URL = "https://icanhazdadjoke.com/"
    fetch(URL, {
        headers: {
            "Accept": "application/json"
        }
    })
        .then(response => response.json())
        .then(response => {
            updateJoke(box, response)
        })
        .catch(err => console.error(err))
}

let updateJoke = (theBox, theJoke) => {
    theBox.innerHTML = theJoke.joke
    // console.log(theJoke)
}

let getWeather = (box) => {
    // get the weather from API
    let lat = 13.19
    let lon = 59.54
    let APIkey = config.apiKey
    console.warn(APIkey)
    let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
    fetch(URL)
        .then(response => response.json())
        .then(response => {
            updateWeather(box, response)
        })
        .catch(err => console.error(err))
}

let updateWeather = (theBox, theWeather) => {
    theBox.innerHTML = `Todays's forecast for lat: ${theWeather.coord.lat} & lon: ${theWeather.coord.lon} is a ${theWeather.weather[0].description} with wind speeds of ${theWeather.wind.speed} mph and a wind direction of ${compassDirection(theWeather.wind.deg)}`
    // console.log(theWeather)
}

let compassDirection = (deg) => {
    let directDeg = {
        0: 'N',
        45: 'NE',
        90: 'E',
        135: 'SE',
        180: 'S',
        225: 'SW',
        270: 'W',
        315: 'NW',
        360: 'N'
    }
    let midPoint = 22.5
    for (dir in directDeg) {
        if (deg > (parseInt(dir) - midPoint) && deg < (parseInt(dir) + midPoint))
            return directDeg[dir]
    }
    return "error"
}