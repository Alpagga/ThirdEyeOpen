function sketch10(p) {

    let a = 4; // radius of circle not moving
    let b = 1.91; // radius of moving circle
    let c = p.random(3,10); // length of drawing arm from
    //               center of moving circle
    let s = 5.999; // step up rate - sometimes makes a difference
    let type = p.int(p.random(4)); // 1) hypotrochoid
    //               2) epitrochoid
    //               3) Steve's curve
    let size = p.random(3,8); // pixel size - 1 for fine, 4 for bold
    let z = 0.9; // zoom out to give a gap around the edge of the canvass
    let n = 0;
    let x, y, z2;

    let randomR = p.int(p.random(30, 255));
    let randomG = p.int(p.random(30, 255));
    let randomB = p.int(p.random(30, 255));

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight); 
        p.background(0);
        p.print(type);

        if (type == 1) {
            z2 = p.windowHeight / 2 / ((a - b) * p.cos(n) + c * p.cos((a / b - 1) * n));
        } else if (type == 2) {
            z2 = p.windowHeight / 2 / (p.abs(a) + p.abs(b) + p.abs(c));
        } else {
            z2 = p.windowHeight / 2; //z2 figures the maximum height expected for each curve and converts it to the height of the canvass.
        }
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);  // Resize canvas on window resize
        p.background(0);
    };

    p.draw = function() {
        let d = c + p.abs(a - b);
        if (type == 1) {
          x = (a - b) * p.cos(n) + c * p.cos((a / b - 1) * n);
          y = (a - b) * p.sin(n) - c * p.sin((a / b - 1) * n);
        } else if (type == 2) {
          x = (a + b) * p.cos(n) - c * p.cos((a / b + 1) * n);
          y = (a + b) * p.sin(n) - c * p.sin((a / b + 1) * n);
        } else {
          x = ((a - b) * p.cos(n) + c * p.cos((a / b - 1) * n)) / d;
          y = ((a - b) * p.sin(n)) / (a - b);
        }
        n = n + s;
        p.stroke(randomR, randomG, randomB);
        p.strokeWeight(size);
        p.point(p.windowWidth / 2 + x * z2 * z, p.windowHeight / 2 + y * z2 * z);
    };
}

// Create and return a new p5 instance
currentP5Instance = new p5(sketch10);