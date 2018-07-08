const request = require('request');
const urlPrefix = "https://maps.googleapis.com/maps/api/geocode/json?address=";

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        request({
            url: urlPrefix+encodeURIComponent(address),
            json: true
        }, (error, response, body) => {
            if(error){
                reject("Unable to call Google servers.");
            }
            else if(body.status === 'ZERO_RESULTS'){
                reject("Unable to find that address.")
            }
            else if(body.status==='OK'){
                resolve( {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });

    });
}   



geocodeAddress('zsderdesr').then((address) => {
    console.log(JSON.stringify(address, undefined, 2));
}).catch((errorMessage) => {
    console.log(errorMessage);
});