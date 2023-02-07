
var buttonSearchEl = document.getElementById("search-btn");
var city = "";


function searchCity(city) {
    
    if (!city) return;
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    // var url =`http://api.openweathermap.org/data/2.5/weather?q=` + city + `&appid=` + apiKey + `&units=imperial`
    fetch (url, {
        method: 'GET', 
        credentials: 'same-origin', 
        redirect: 'follow',
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        
            var latitude = data.coord.lat
            var longitude = data.coord.lon
            
            coordinateUrl(latitude, longitude);
        });
    
    console.log("Hello");
};

function coordinateUrl(latitude, longitude) {
    var coordUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    fetch (coordUrl, {
        method: 'GET', 
        credentials: 'same-origin', 
        redirect: 'follow',
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        
        displayCurrent(data.list[0]);
        displayForecast(data.list);
        });
}
// I used 2 different ways to displayCurrent() and displayForecast(), displayCurrent already had html to target while displayForecast creates them through JS
function displayCurrent(current) {
    let highTemp = document.getElementById("high-temp");
    let lowTemp = document.getElementById("low-temp");
    let humidity = document.getElementById("humidity");
    let windSpeed = document.getElementById("wind-speed");
    let airPressure = document.getElementById("air-pressure");
    highTemp.textContent = current.main.temp_max + " F";
    lowTemp.textContent = current.main.temp_min + " F";
    humidity.textContent = current.main.humidity + " %";
    windSpeed.textContent = current.wind.speed + " mph";
    airPressure.textContent = current.main.pressure + " millibars";
};


function displayForecast(forecast) {
    
    console.log(forecast);
    var cardCount= 0
    for (let i = 7; i < forecast.length; i+=8) {
        cardCount ++
        var iconcode = forecast[i].weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        let weatherIcon = document.getElementById("weather");
        weatherIcon.setAttribute("src", iconurl);
        let forecastCard = document.querySelector(`.forecast-container-` + cardCount);
        forecastCard.innerHTML = "";
        console.log(forecastCard);
        let forecastImage = document.createElement("img");
        forecastImage.setAttribute("src", iconurl);               
        forecastCard.appendChild(forecastImage);
        let forecastMin = document.createElement("p");
        forecastMin.textContent = "Low " + forecast[i].main.temp_min + " F";
        forecastCard.appendChild(forecastMin);
        let forecastMax = document.createElement("p");
        forecastMax.textContent = "High " + forecast[i].main.temp_max + " F";
        forecastCard.appendChild(forecastMax);
        let forecastWind = document.createElement("p");
        forecastWind.textContent = "Wind " + forecast[i].wind.speed + " mph";
        forecastCard.appendChild(forecastWind);
        let forecastHumidity = document.createElement("P");
        forecastHumidity.textContent = "Humid " + forecast[i].main.humidity + " %";
        forecastCard.appendChild(forecastHumidity);
    };
};


buttonSearchEl.addEventListener("click", function(event) {
    event.preventDefault();
    city = document.getElementById("search-input").value;
    searchCity(city);
    saveCity(city);
})


// didn't use, found a better loop usage in function displayForecast()
// ($(new Date(dt+1000).toDateString()))


function saveCity (city) {
    var storedCities = JSON.parse(localStorage.getItem("key cities")) || [];
    if (!storedCities.includes(city)){

        storedCities.push(city);
        localStorage.setItem("key cities", JSON.stringify(storedCities));
    }
    
    // *********attempt at function saveCity() that ultimately had some bugs************
    // if (previousCities !== null) {
    //     // add a temporary ARRAY to push into
    //     var parsedCities = [];
    //     parsedCities.push(previousCities);
    //     if (previousCities.includes(lowerCaseCity)) {
    //         return;
    //     };
    //     parsedCities.push(lowerCaseCity);
    //     storedCities = parsedCities;
    // } else {
    //     storedCities.push(lowerCaseCity);
    // };

    
    displayHistory(storedCities); 
};

// **********another attempt that function saveCity(************)
// function saveCity (city) {
//     var storedCities = [];
//     let lowerCaseCity = city.toLowerCase();
//     previousCities = localStorage.getItem("key cities");
//     if (previousCities !== null) {
//         // add a temporary ARRAY to push into
//         var parsedCities = [];
//         parsedCities.push(previousCities);
//         storedCities = parsedCities;
//         if (parsedCities.includes(lowerCaseCity)) {

//             return;
//         }
//         // if (!parsedCities.includes(lowerCaseCity)) {
//         //     parsedCities.push(lowerCaseCity);
//         // };
//     } else {
//         storedCities.push(lowerCaseCity);
//     };
//     localStorage.setItem("key cities", storedCities);

//     displayHistory(storedCities);
//     };


    // function saveCity (city) {
    //     var storedCities = [];
    //     let lowerCaseCity = city.toLowerCase();
    //     previousCities = localStorage.getItem("key cities")
    //     if (previousCities !== null) {
    //         // add a temporary ARRAY to push into
    //         var parsedCities = [];
    //         parsedCities.push(previousCities);
    //         for (var i = 0; i < parsedCities.length; i++) {
    //             if (parsedCities == lowerCaseCity) {
    //                 // probably has to be return false
    //                 break
    //             } else {
    //             parsedCities.push(lowerCaseCity);
    //         storedCities = parsedCities;
    //     };     
    //         }
    //     } else {
    //     storedCities.push(lowerCaseCity);
    //     }
    //     localStorage.setItem("key cities", storedCities);
    
    //     displayHistory(storedCities);
    //     };
    

// 4. grab array from local storage and put it up on the screen
// 5. make cities clickable to regrab weather api
//          click event that runs the api fetch

var searchHistory = document.getElementById("history");
// searchHistoryEl = $("#history");

function displayHistory(storedCities) {
    for (var i = 0; i < storedCities.length; i++) {
        var historyCity = document.createElement("button");
        historyCity.textContent = storedCities[i];
        searchHistory.appendChild(historyCity);
        historyCity.addEventListener("click", function() {
            searchCity(historyCity.textContent)
        })
    }
}

displayHistory(JSON.parse(localStorage.getItem("key cities")));

// **********attempt at displayHistory() that kinda worked with previous code**************
// function displayHistory(storedCities) {
//     for (var i = 0; i < storedCities.length; i++) {
//         var searchCity = $("<p>", {
//             // class: "nav-item"
//         })
//         searchHistoryEl.append(searchCity);
//         var cityLink = $("<a>", {
//             href: "#",
//             // class:  ,
//             text: storedCities[i]
//         })
//         searchCity.append(cityLink);
//         cityLink.addEventListener("click", function(event) {
            
//             searchCity(city)
//         });
//     };
// };



// *******some notes***************
//  localStorage.clear("key cities");
// also empty the storedCities [];







