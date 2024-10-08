function sketch10(p) {

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);    
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);  // Resize canvas on window resize
    };

    p.draw = function() {
      
    };
}

// Create and return a new p5 instance
currentP5Instance = new p5(sketch10);

