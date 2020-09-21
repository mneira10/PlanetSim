var bodiesFuture = [];
var bodiesPresent = [];
let cont = 0;

function logBodies(bodies){
    for(let body of bodies){
        body.log()
    }
}

function logAllBodies(){
    console.log('bodiesFuture');
    logBodies(bodiesFuture)
    console.log('bodiesPResent');
    logBodies(bodiesPresent)
}


function setup() {
    console.log(JSON.stringify(bodiesFuture))
    createCanvas(windowWidth, windowHeight);
    console.log(windowHeight, windowWidth)
    let b2 = new Body(1, 1000, 10, windowWidth / 3.0, windowHeight / 2.0, 0, -55);
    // console.log('b2', b2);
    let b1 = new Body(2, 1000, 10, windowWidth / 2.0, windowHeight / 2.0, 0, 55);
    let b3 = new Body(2, 1000, 10, windowWidth / 4.0, windowHeight / 4.0, 0, 0);
    // console.log('b1', b1);
    bodiesFuture.push(b2);
    bodiesFuture.push(b1);
    // bodiesFuture.push(b3);

    bodiesPresent = [...bodiesFuture];
    console.log('in setup')
    logAllBodies();
    

    // noLoop();
}

function draw() {
    background(0);
    // console.log(cont)
    // logAllBodies();
    for (let body of bodiesPresent) {
        body.display();
    }

    for (let body of bodiesFuture) {
        // console.log('originalBodies:', bodiesPresent);
        // body.r = 2
        body.updateR(bodiesPresent);
    }

    for (let body of bodiesFuture) {
        body.updateVelocity(bodiesFuture);
    }

    bodiesPresent = [...bodiesFuture];

    // if(cont<3){
    //     loop();
    // }
    // console.log('before exit')
    // logAllBodies()
    cont = cont + 1;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}