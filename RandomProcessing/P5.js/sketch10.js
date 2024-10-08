function sketch10(p) {
    let cols, rows;
    let size = 50;
    let arrows = [];
    let r = size / 2;

    let xoff = 0, yoff = 0, zoff = 0;
    let increment = p.random(100,500);

    let particles = [];
    let num = p.random(100,1000);

    let randomR = p.random(255);
    let randomG = p.random(255);
    let randomB = p.random(255);

    let ellipse1 = p.random(0.1, 3);
    let ellipse2 = p.random(0.1, 40);

    let mode = p.int(p.random(1,4));


    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);

        // Round cols and rows to avoid fractional indices
        cols = p.floor(p.windowWidth / size);
        rows = p.floor(p.windowHeight / size);
        p.angleMode(p.DEGREES);

        // Create particles
        for (let i = 0; i < num; i++) {
            particles[i] = new Particle(p.random(0, p.windowWidth), p.random(0, p.windowHeight));
        }
        p.background(0);
    };

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);  // Resize canvas on window resize
        cols = p.floor(p.windowWidth / size);
        rows = p.floor(p.windowHeight / size);
        p.angleMode(p.DEGREES);

        // Create particles
        for (let i = 0; i < num; i++) {
            particles[i] = new Particle(p.random(0, p.windowWidth), p.random(0, p.windowHeight));
        }
        p.background(0);
    };

    p.draw = function () {
        
        if(mode==2 || mode == 3){
            p.background(0);
        }

        p.fill(255);
        p.stroke(0);
        xoff = 0;

        // Generate flow field and store in arrows array
        for (let i = 0; i < cols; i++) {
            arrows[i] = [];
            yoff = 0;
            for (let j = 0; j < rows; j++) {
                let angle = p.map(p.noise(xoff, yoff, zoff), 0, 1, 0, 360);
                arrows[i][j] = p.createVector(p.cos(angle), p.sin(angle));
                yoff += increment;
            }
            xoff += increment;
        }
        zoff += 0.001;

        // Update and display particles
        for (let i = 0; i < num; i++) {
            particles[i].checkEdges();
            particles[i].direction(arrows);  // Pass flow field to particle
            particles[i].update();
            particles[i].display();
        }
    };

    class Particle {
        constructor(x, y) {
            this.position = p.createVector(x, y);
            this.velocity = p.createVector(0, 0);
            this.acceleration = p.createVector(0, 0);
        }

        update() {
            this.velocity.add(this.acceleration);
            this.velocity.limit(2);
            this.position.add(this.velocity);
            this.acceleration.mult(0);
        }

        applyForce(force) {
            this.acceleration.add(force);
        }

        direction(flowfield) {
            let i = p.floor(this.position.x / size);
            let j = p.floor(this.position.y / size);

            // Constrain indices to ensure they are within bounds of the arrows array
            i = p.constrain(i, 0, cols - 1);
            j = p.constrain(j, 0, rows - 1);

            let force = p.createVector(flowfield[i][j].x, flowfield[i][j].y);
            this.applyForce(force);
        }

        display() {
            p.noStroke();
            p.fill(randomR, randomG, randomB);

            if(mode == 1){
                p.ellipse(this.position.x, this.position.y, ellipse1);
            }
            if(mode == 2){
                p.ellipse(this.position.x, this.position.y, ellipse2);
            }
            if(mode == 3){
                p.triangle(this.position.x, this.position.y , 10, 0, 0, 0);
            }
        
        }

        checkEdges() {
            if (this.position.x > p.windowWidth) {
                this.position.x = 0;
            } else if (this.position.x < 0) {
                this.position.x = p.windowWidth;
            }
            if (this.position.y > p.windowHeight) {
                this.position.y = 0;
            } else if (this.position.y < 0) {
                this.position.y = p.windowHeight;
            }
        }
    }
}

// Create and return a new p5 instance
currentP5Instance = new p5(sketch10);