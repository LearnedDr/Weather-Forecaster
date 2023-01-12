
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

function displayCurrent(current) {
    let highTemp = document.getElementById("high-temp");
    let lowTemp = document.getElementById("low-temp");
    let humidity = document.getElementById("humidity");
    let windSpeed = document.getElementById("wind-speed");
    let airPressure = document.getElementById("air-Pressure");
    highTemp.textContent = current.main.temp_max;
    // lowTemp.textContent = current.main.temp_min;
    // humidity.textContent = current.main.humidity;
};



function displayForecast(forecast) {

    console.log(forecast);

    for (let i = 7; i < forecast.length; i+=8) {

        let {dt, main: {temp, humidity}, wind:{speed}, weather:[{icon}] } = forecast[i];

        history.innerHTML += `
        <div class="card">
            <h6>${new Date(dt*1000).toDateString().slice(0,-5)} <h6>
            <img src="http://openweathermap.org/img/wn/${icon}.png">

            <h6>Temp: ${temp} °F</h6>
            <h6>Wind: ${speed} mph</h6>
            <h6>Humidity: ${humidity}%</h6>
        </div>
        `;
    };
};


buttonSearchEl.addEventListener("click", function(event) {
    event.preventDefault();
    city = document.getElementById("search-input").value;
    searchCity(city);
    saveCity(city);
})



// ($(new Date(dt+1000).toDateString()))


// 1. grab input.value
// 2. push input.value into an array
// 3. put array into local storage



function saveCity (city) {
    var storedCities = [];
    let lowerCaseCity = city.toLowerCase();
    previousCities = localStorage.getItem("key cities")
    
    if (previousCities !== null) {
        // add a temporary ARRAY to push into
        var parsedCities = [];
        parsedCities.push(previousCities);
        if (previousCities.includes(lowerCaseCity)) {
            return;
        };
        parsedCities.push(lowerCaseCity);
        storedCities = parsedCities;
    } else {
        storedCities.push(lowerCaseCity);
    };
    localStorage.setItem("key cities", (storedCities));
    
    displayHistory(storedCities); 
};


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

// var searchHistory = document.getElementById("history");
searchHistoryEl = $("#history");

function displayHistory(storedCities) {
    for (var i = 0; i < storedCities.length; i++) {
        var searchCity = $("<p>", {
            // class: "nav-item"
        })
        searchHistoryEl.append(searchCity);
        var cityLink = $("<a>", {
            href: "#",
            // class:  ,
            text: storedCities[i]
        })
        searchCity.append(cityLink);
    }
};



var nothingButton = document.getElementById("nothingness")

nothingButton.addEventListener("click", function(event) {

});

// document.location(./index2.html)
// city

//  localStorage.clear("key cities");
// also empty the storedCities [];







