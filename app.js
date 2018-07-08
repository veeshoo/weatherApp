const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.a, (error, results) => {
    if(error){
        console.log(error);
    } else {
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, (error, result) => {
            if(error){
                console.log(error);
            } else {
                console.log(`It's currently ${Math.round(((result.temperature - 32)*5)/9)} but feels like ${Math.round(((result.feelsLike - 32)*5)/9)}.`);
            }
        });
    }

});

