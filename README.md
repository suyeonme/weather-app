# Weather app
It is simple weather web app based on your location.

## Prototype  
<img width="1440" alt="Screen Shot 2020-06-24 at 3 01 48 PM" src="https://user-images.githubusercontent.com/55128990/85509524-22b28900-b631-11ea-90cd-055cdcc9a3bb.png">
<img width="1440" alt="Screen Shot 2020-06-24 at 3 01 59 PM" src="https://user-images.githubusercontent.com/55128990/85509566-31993b80-b631-11ea-81b6-0139baa4939f.png">

## :dizzy: Features
  - You can get current weather information.
  - It supports dark mode.
  
## APIs
* Weather data is retrieved from https://openweathermap.org/api.

## Getting started
* Get weather API key from openweathermap.
* Replace API key in app.js
```sh
$ const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=YOUR_API_KEY`;
$ let res = await (await fetch(api)).json();
```

### License
Suyeon Kang

#### Feedback
Feedback is always welcome. I am currently practicing javascript. If you notice something that can makes it better, I'd love to know. Thank you guys :)
