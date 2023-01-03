// function searchCity =>

// asnyc () =>

var buttonSearchEl = document.getElementById("search-btn");
var city = document.getElementById("search-input").value;
var url = `http://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=Philadelphia`;

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
    });


// 1. grab search button in a var and input in another var

// 2. make fetch function

// 3. 