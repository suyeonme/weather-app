'use strict'

/* DOM STRINGS */
const DOMstring = {
    tempDescription: document.querySelector('.temperature__description'),
    tempDegree: document.querySelector('.temperature__degree'),
    timezone: document.querySelector('.location__timezone'),
    icon: document.querySelector('.icon'),
    wind: document.querySelector('.weather-info__wind'),
    sunrise: document.querySelector('.weather-info__sunrise'),
    sunset: document.querySelector('.weather-info__sunset'),
    humidity: document.querySelector('.weather-info__humidity'),
    widget: document.querySelector('.widget'),
    loader: document.querySelector('.preloader'),
    checkbox: document.querySelector('.dark-mode__checkbox')
};

class Weather {
    getLocalTime(timestamp) {
        let sec = timestamp;
        let date = new Date(sec * 1000);
        let timestr = date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        return timestr;
    }

    async getData(lat, lon) {
        try {
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=941bf83d26c6b4087d00fe58d945f23e`;
            let res = await (await fetch(api)).json();

            this.location = `${res.name}, ${res.sys.country}`;
            this.description = res.weather[0].description;
            this.icon = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
            this.degree = res.main.temp;
            this.wind = res.wind.speed;
            this.humidity = res.main.humidity;
            this.sunrise = this.getLocalTime(res.sys.sunrise);
            this.sunset = this.getLocalTime(res.sys.sunset);
        } catch (error) {
            console.log(error);
        }
    }

    renderData() {
        DOMstring.tempDegree.textContent = this.degree;
        DOMstring.tempDescription.textContent = this.description;
        DOMstring.timezone.textContent = this.location;
        DOMstring.icon.src = this.icon;
        DOMstring.wind.textContent = `${this.wind} m/s`;
        DOMstring.sunrise.textContent = this.sunrise;
        DOMstring.sunset.textContent = this.sunset;
        DOMstring.humidity.textContent = `${this.humidity}%`;
    }
};


/* Event Handler */
window.addEventListener('load', () => {
    if (navigator.geolocation) {
        const weather = new Weather();

        navigator.geolocation.getCurrentPosition(async (position) => {
            const lon = position.coords.longitude;
            const lat = position.coords.latitude;

            try {
                // GET DATA FROM API
                await weather.getData(lat, lon);

                // INSERT WEATHER DATA
                weather.renderData();

                // Remove Loader
                DOMstring.loader.style.visibility = 'hidden';

                // Display UI
                DOMstring.widget.style.visibility = 'visible';

            } catch (error) {
                console.log(error)
            }
        });
    };
});

DOMstring.checkbox.addEventListener('change', () => {

    // Change the body to dark mode
    document.body.classList.toggle('dark');
});