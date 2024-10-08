function sketch1(p) {

    let x = 25;
    let y = 50;

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);    
 

        p.textSize(20);
        p.colorMode(p.HSB);
        p.loop();
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);  // Resize canvas on window resize
    };

    p.draw = function() {
        // Clear the background
        p.background(0);

        // Draw a circle, with hue determined by frameCount
        p.fill(x / 3, 90, 90);
        p.circle(x, p.windowHeight / 2, y);

        // Increase the x variable by 5
        x += 5;
        y += 1;

        // Reset the circle position after it moves off the right side
        if (x > p.windowWidth + y) {
            y = 50;
            x = -y;
        }

    };
}

// Create and return a new p5 instance
currentP5Instance = new p5(sketch1);
