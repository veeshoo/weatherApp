const request = require('request');

var getWeather = (latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/793200bfecc92ee80eddb2bdccf8b63f/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        debugger;
        if(error){
            callback("Unable to connect to Darksky.net Servers.");
        } else if(response.statusCode === 400) {
            callback("Unable to fetch weather.")
        } else if(response.statusCode === 200){
            callback(undefined, {
                'temperature': body.currently.temperature,
                'feelsLike': body.currently.apparentTemperature
            }
            );
        }
    });
}

module.exports.getWeather = getWeather;
