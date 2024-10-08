function sketch15(p) {

    let x, y;

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);   
        
        p.background(0);
        x = p.windowWidth / 2;
        y = p.windowHeight / 2;
        r = p.random(0,254);
        g = p.random(0,254);
        b = p.random(0,254);
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);  // Resize canvas on window resize
    };

    p.draw = function() {
      x = x + p.random(-10, 10);
      y = y + p.random(-10, 10);
      r = r + p.random(-20, 20);
      g = g + p.random(-20, 20);
      b = b + p.random(-20, 20);
      if(x<0){x=0};
      if(x>p.windowWidth){x=p.windowWidth};
      if(y<0){y=0};
      if(y>p.windowHeight){y=p.windowHeight};
      if(r<0){r=0};
      if(r>254){r=254};
        if(g<0){g=0};
      if(g>254){g=254};
        if(b<0){b=0};
      if(b>254){b=254}
      p.strokeWeight(10);
      p.stroke(r, g, b,150);
      p.point(x, y);
      p.point(p.windowWidth - x, y);
      p.point(x, p.windowHeight - y);
      p.point(p.windowWidth - x, p.windowHeight - y);
    };
}

// Create and return a new p5 instance
currentP5Instance = new p5(sketch15);
















