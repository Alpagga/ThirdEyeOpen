function sketch10(p) {

    let w, h, x1, x2, y1, y2, x1s, x2s, y1s, y2s, x1d, x2d, y1d, y2d;

    let fade = p.int(p.random(2, 20));

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);  
        
        w = p.windowWidth-20;
        h = p.windowHeight-20;

        p.background(0);

        x1 = p.random(w);
        y1 = p.random(h);
        x2 = p.random(w);
        y2 = p.random(h);
        x1s = p.random(2, 5);
        y1s = p.random(2, 5);
        x2s = p.random(2, 5);
        y2s = p.random(2, 5);
        x1d = 1;
        y1d = 1;
        x2d = 1;
        y2d = 1;
        r = p.random(254);
        g = p.random(254);
        b = p.random(254);
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);  // Resize canvas on window resize
    };

    p.draw = function() {
        p.background(0, fade);
        x1 = x1 + x1s * x1d;
        y1 = y1 + y1s * y1d;
        x2 = x2 + x2s * x2d;
        y2 = y2 + y2s * y2d;
        r = r + p.random(-15, 15);
        g = g + p.random(-15, 15);
        b = b + p.random(-15, 15);
        if (x1 < 0){
            x1d = - x1d;
            x1s = p.random(2,5)
        }
        if (x1 > w) {
            x1d = -x1d;
            x1s = p.random(2, 5)
        }
        if (y1 < 0) {
            y1d = -y1d;
            y1s = p.random(2,5)
        }
        if (y1 > h) {
            y1d = -y1d;
            y1s = p.random(2, 5)
        }
        if (x2 < 0){
            x2d = -x2d;
            x2s = p.random(2,5)
        } if(x2 > w) {
            x2d = -x2d;
            x2s = p.random(2, 5)
        }
        if (y2 < 0){
            y2d = -y2d;
            y2s = p.random(2,5)
        } 
        if (y2 > h) {
            y2d = -y2d;
            y2s = p.random(2, 5);
        }
        if (r < 0) {
            r = 0;
        }
        if (r > 254) {
            r = 254;
        }
        if (g < 0) {
            g = 0;
        }
        if (g > 254) {
            g = 254;
        }
        if (b < 0) {
            b = 0;
        }
        if (b > 254) {
            b = 254;
        }

        p.strokeWeight(2);
        p.stroke(r, g, b);
        p.line(x1, y1, x2, y2);
        //print(x1,y1,x2,y2);
    };
}

// Create and return a new p5 instance
currentP5Instance = new p5(sketch10);