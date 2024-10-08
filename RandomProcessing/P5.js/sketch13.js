function sketch13(p) {

    
    var start = p.random(100);

    let randomR = p.int(p.random(30, 255));
    let randomG = p.int(p.random(30, 255));
    let randomB = p.int(p.random(30, 255));

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);    

        p.angleMode(p.DEGREES)

        p.noiseDetail(2, 1)
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);  // Resize canvas on window resize
    };

    p.draw = function() {
        p.background(0)
        p.noStroke()
      
        p.translate(p.windowWidth / 2, p.windowHeight / 2)
      
        var space = 0.1
      
        for (var i = 0; i < 360; i += space) {
      
          var xoff = p.map(p.cos(i), -1, 1, 0, 3)
          var yoff = p.map(p.sin(i), -1, 1, 0, 3)
      
          var n = p.noise(xoff + start, yoff + start)
      
          var h = p.map(n, 0, 1, -200, 300)
      
          var r = p.map(p.sin(i), -1, 1, 0, 255)

          p.rotate(space)
      
          p.fill(r, randomG, randomG)
      
          p.rect(200, 0, h, 1)
        }
      
        start += 0.0035
    };
}

// Create and return a new p5 instance
currentP5Instance = new p5(sketch13);