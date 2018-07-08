var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number'){
                resolve(a + b);
            } else {
                reject('Arguments must be number.');
            }
        }, 3000);
    });
};

asyncAdd(5, 12).then((result) => {
    console.log("Result: ", result);
    return asyncAdd(result, '33');
}).then((result) => {
    console.log("Should be 45: ", result);
}).catch((errorMessage) => {
    console.log(errorMessage);
});

// var somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         //resolve('Hey. It Worked!');
//         reject("Unable to fulfill the promise");
//     }, 3000);
// });

// somePromise.then((message) => {
//     console.log("Success: ", message);
// }, (errorMessage) => {
//     console.log("Error:", errorMessage);
// });