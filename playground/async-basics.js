console.log("Starting app");

setTimeout(() => {
    console.log("Inside callback");
}, 2000);

setTimeout(() => {
    console.log("Inside 2nd callback");
}, 0);

for(let i=0; i<10000; i++){
    console.log(i);
}

console.log("Finishing up");