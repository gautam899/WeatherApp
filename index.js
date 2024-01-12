const apiKey  = "5e206e879176767e821ff21c20eaed39";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        const searchBox = document.querySelector(".search input");//This will select the input field
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon");
        const weatherGradients = {
            "Clouds": "linear-gradient(to right, #bdc3c7, #2c3e50)",
            "Rain": "linear-gradient(to right, #74ebd5, #acb6e5)",
            "Drizzle": "linear-gradient(to right, #89f7fe, #66a6ff)",
            "Mist": "linear-gradient(to right, #bdc3c7, #2c3e50)",
            "Snow": "linear-gradient(to right, #e6dada, #274046)",
            "Clear": "linear-gradient(to right, #56ccf2, #2f80ed)",
            "Windy": "linear-gradient(to right, #acb6e5, #74ebd5)" // Add more as needed
        };
        const cards = document.querySelectorAll(".card");
        async function checkWeather(city)
        {
            const res = await fetch(apiUrl + city + `&appid=${apiKey}`);
            var data  = await res.json();

            console.log(data);
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
            document.querySelector(".wind").innerHTML = data.wind.speed+" km/hr";
            //Now we need to update the image
            // if(data.weather[0].main == "Clouds"){
            //     weatherIcon.src = "images/clouds.png";
            // }
            // else if(data.weather[0].main == "Rain"){
            //     weatherIcon.src = "images/rain.png";
            // }
            // else if(data.weather[0].main == "Drizzle"){
            //     weatherIcon.src = "images/drizzle.png";
            // }
            // else if(data.weather[0].main == "Mist"){
            //     weatherIcon.src = "images/mist.png";
            // }
            // else if(data.weather[0].main == "Snow"){
            //     weatherIcon.src = "images/snow.png";
            // }
            // else if(data.weather[0].main == "Clear"){
            //     weatherIcon.src = "images/clear.png";            
            // }
            if(data.weather[0].main in weatherGradients){
                weatherIcon.src = `images/${data.weather[0].main.toLowerCase()}.png`;
                cards.forEach(card => {
                    card.style.background = weatherGradients[data.weather[0].main];
                });
            }            
        }
        searchBtn.addEventListener("click",()=>{
            checkWeather(searchBox.value);
        })