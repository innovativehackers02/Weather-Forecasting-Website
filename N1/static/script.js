ocument.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var city = document.getElementById('cityInput').value;
    var apikey = "96b8469f471f332787a2e7eda3460a98";

    var url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID='+ apikey;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            var resultElement = document.getElementById('weatherResult');
            resultElement.innerHTML = ''; // Clear previous result
            
            if (data.error) {
                var errorElement = document.createElement('p');
                errorElement.innerText = 'Error: ' + data.error;
                resultElement.appendChild(errorElement);
            } else {
                var descriptionElement = document.createElement('p');
                descriptionElement.innerText = 'Description: ' + data.weather[0].description;
                resultElement.appendChild(descriptionElement);
                
                var temperatureElement = document.createElement('p');
                temperatureElement.innerText = 'Temperature: ' + data.main.temp + '°C';
                resultElement.appendChild(temperatureElement);
                
                var humidityElement = document.createElement('p');
                humidityElement.innerText = 'Humidity: ' + data.main.humidity + '%';
                resultElement.appendChild(humidityElement);
                
                var windSpeedElement = document.createElement('p');
                windSpeedElement.innerText = 'Wind Speed: ' + data.wind.speed + ' m/s';
                resultElement.appendChild(windSpeedElement);
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
});