let searchInput=document.getElementById("search");
// Today variables 
let todayName = document.querySelector(".todayDay");
let todayDatee=document.querySelector(".date");
let todayLocation =document.querySelector(".location");
let todayTemp = document.querySelector(".today_temp");
let todayConditionImg = document.getElementById("today_condition_img");
let todayConditionText = document.querySelector(".today_condition_text");
let humidity = document.getElementById("humidity");
let wind= document.getElementById("wind");
let windDirection = document.getElementById("wind_direction")

// next data 
let nextDay=document.querySelectorAll(".nextday");
let nextMaxTemp = document.querySelectorAll(".next_max_temp");
let nextminTemp= document.querySelectorAll(".next_min_temp");
let nextConditionImg = document.querySelectorAll(".next_condition_img")
let nextConditionText = document.querySelectorAll(".next_condition_text")

async function getWeatherData(cityName="london")
{
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=41a24c7a165f4a52988202355240506&q=${cityName}&days=3`)
    if (weatherResponse.ok &&  weatherResponse.status !=400) {
       let weatherData = await weatherResponse.json();
       console.log(weatherData.current.condition.icon);
        // console.log(weatherData);
        displayTodayData(weatherData);
        displayNextData(weatherData) ;
    }
   
}
getWeatherData();

searchInput.addEventListener("input",function (e) {
    getWeatherData(e.target.value);
 
});


function displayTodayData(data) {
    let todayDate= new Date();
    todayName.innerHTML=todayDate.toLocaleDateString("en-US",{weekday:"long"});
    todayDatee.innerHTML=` ${todayDate.getDate() }${todayDate.toLocaleDateString("en-US",{month:"long"})}`
    todayLocation.innerHTML=data.location.name;
    todayTemp.innerHTML=data.current.temp_c
    todayConditionImg.setAttribute("src", data.current.condition.icon);
    todayConditionText.innerHTML = data.current.condition.text;
    humidity.innerHTML=data.current.humidity+"%";
    wind.innerHTML=data.current.wind_kph+"km/h";
    windDirection.innerHTML = data.current.wind_dir
}



function displayNextData(data) {
    let forecastData = data.forecast.forecastday;
    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(forecastData[i+1].date);
        nextDay[i].innerHTML= nextDate.toLocaleDateString("en-US",{weekday:"long"});
        nextMaxTemp[i].innerHTML=forecastData[i+1].day.maxtemp_c;
        nextminTemp[i].innerHTML=forecastData[i+1].day.mintemp_c;
        nextConditionImg[i].setAttribute("src",forecastData[i+1].day.condition.icon)
        nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text
    }
}




// let todayate= new Date();

// console.log(todayate.toLocaleDateString());
// console.log(todayate.toLocaleDateString("en-US",{weekday:"long"}));
// console.log(todayate.getDate());