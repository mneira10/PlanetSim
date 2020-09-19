function setup() {
    createCanvas(400, 400);
    b1 = new Body(1,33,20,40,20,20);
    b2 = new Body(1,40,40,40,20,20);
}

function draw() {
    background(0);
    background(0);

    b1.display();
    b2.display();
}