'use strict'

const DOMstring = {
    tempDescription: document.querySelector('.temperature__description'),
    tempDegree:  document.querySelector('.temperature__degree'),
    timezone: document.querySelector('.location__timezone')
};

class Weather {
    async getData(lat, lon) {
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=941bf83d26c6b4087d00fe58d945f23e`;
            try {
                let res = await (await fetch(api)).json();
                this.location = `${res.name}/${res.sys.country }`;
                this.description = res.weather[0].description;
                this.icon = res.weather[0].icon;
                this.degree = res.main.temp;
                console.log(res);
            } catch (error) {
                console.log(error);
            }
    }
};


/* Event Handler */
window.addEventListener('load', () => {

    if (navigator.geolocation) {
        const weather = new Weather();

        navigator.geolocation.getCurrentPosition(position =>{
            const lon = position.coords.longitude;
            const lat = position.coords.latitude;

            // Get data from API
            weather.getData(lat,lon);

            // Render current weather
            // DOMstring.tempDegree.textContent = weather.description
        });
    }
});

