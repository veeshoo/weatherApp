const yargs = require('yargs');
const axios = require('axios');

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

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeURL).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address');
    }
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;

    var weatherURL = `https://api.darksky.net/forecast/793200bfecc92ee80eddb2bdccf8b63f/${latitude},${longitude}`;
    console.log(response.data);
    return axios.get(weatherURL);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${Math.round(((temperature - 32)*5)/9)} but feels like ${Math.round(((apparentTemperature - 32)*5)/9)}.`);
}).catch((e) => {
    if(e.code === "ENOTFOUND"){
        console.log("Unable to connect to API servers.");
    } else{
        console.log(e.message);
    }
});
