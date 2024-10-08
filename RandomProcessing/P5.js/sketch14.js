function sketch14(p) {
    let points = [];
    const num = 15;
    const startRad = 50;
    const speed = 0.2;
    let done = false;

    let randomStartColorR = p.random(150);
    let randomStartColorG = p.random(150);
    let randomStartColorB = p.random(150);

    let randomEndColorR = p.random(150, 255);
    let randomEndColorG = p.random(150, 255);
    let randomEndColorB = p.random(150, 255);

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);  
        p.background(0);
        p.noStroke();
        p.createBurst();

        // Automatically restart the sketch every 5 seconds (5000 milliseconds)
        setInterval(p.createBurst, 3000);  
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);  // Resize canvas on window resize
    };

    p.draw = function() {
        if(!done) {
            points.forEach(point => {
                point.update();
                point.draw();
                if(point.rad < 0) {
                    done = true;
                }
            });
        }
    };

    p.createBurst = function() {
        p.background(0);
        done = false;
        points = [];
        
        for(let i = 0; i < num; i++) {
            points.push(new Point(p.windowWidth/2, p.windowHeight/2, p.random(p.TAU), startRad));
        }
    };

    class Point {
        constructor(x, y, ang, rad) {
            this.x = x;
            this.y = y;
            this.ang = ang;
            this.rad = rad;
        }
        
        update() {
            this.rad -= 0.5;
            this.ang += p.random(-p.PI/6, p.PI/6);
            
            this.x += p.cos(this.ang) * this.rad * speed;
            this.y += p.sin(this.ang) * this.rad * speed;
        }
        
        draw() {
            const startColor = p.color(randomStartColorR, randomStartColorG, randomStartColorB);
            const endColor = p.color(randomEndColorR, randomEndColorG, randomEndColorB);
            
            const col = p.lerpColor(startColor, endColor, p.map(this.rad, startRad, 0, 0, 1));
            p.fill(col);
            p.circle(this.x, this.y, this.rad * 2);
        }
    }
}

// Create and return a new p5 instance
currentP5Instance = new p5(sketch14);
