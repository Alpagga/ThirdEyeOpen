function sketch8(p) {

    let molds = []; let num = 4000;
    let d; 

    //  random RGB
    let randomR = p.random(1,255);  
    let randomG = p.random(1,255);
    let randomB = p.random(1,255);

    let moldType = p.int(p.random(1,4));

    let randomStrokeWidth1 = p.random(0.1, 8);
    let randomStrokeWidth2 = p.random(0.1, 3);
    let randomStrokeWidth3 = p.random(0.1, 4);

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);    
        p.background(0);
        p.angleMode(p.DEGREES);
        d = p.pixelDensity();
        
        for (let i=0; i<num; i++) {
            molds[i] = new Mold();
        } 

        p.print(moldType);
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);  // Resize canvas on window resize
    };

    p.draw = function() {
        p.background(0, 5);
        p.loadPixels();
        
        for (let i=0; i<num; i++) {        
            molds[i].update();
            molds[i].display();
        }

    };

    class Mold {
        constructor() {
          
        // Mold Type
          if(moldType == 1){
            this.x = p.random(p.windowWidth);
            this.y = p.random(p.windowHeight); 
            this.r = randomStrokeWidth1;
          }
          
          if(moldType == 2){
            this.x = p.random(p.windowWidth/2 - 20, p.windowWidth/2 + 20);
            this.y = p.random(p.windowHeight/2 - 20, p.windowHeight/2 + 20);
            this.r = randomStrokeWidth2; 
          }

          if(moldType == 3){
            this.x = p.random(p.windowWidth*p.random(0.5,0.8));
            this.y = p.random(p.windowHeight); 
            this.r = randomStrokeWidth3;
          }
          
          this.heading = p.random(360);
          this.vx = p.cos(this.heading);
          this.vy = p.sin(this.heading);
          this.rotAngle = 45;
          
          // Sensor variables
          this.rSensorPos = p.createVector(0, 0);
          this.lSensorPos = p.createVector(0, 0);
          this.fSensorPos = p.createVector(0, 0);
          this.sensorAngle = 45;
          this.sensorDist = 10;
        }
        
        update() {   
            this.vx = p.cos(this.heading);
            this.vy = p.sin(this.heading);

            
            // Using % Modulo expression to wrap around the canvas
            this.x = (this.x + this.vx + p.windowWidth) % p.windowWidth;
            this.y = (this.y + this.vy + p.windowHeight) % p.windowHeight;
            
            // Get 3 sensor positions based on current position and heading
            this.getSensorPos(this.rSensorPos, this.heading + this.sensorAngle);
            this.getSensorPos(this.lSensorPos, this.heading - this.sensorAngle);
            this.getSensorPos(this.fSensorPos, this.heading);
            
            // Get indices of the 3 sensor positions and get the color values from those indices
            let index, l, r, f;
            index = 4*(d * p.floor(this.rSensorPos.y)) * (d * p.windowWidth) + 4*(d * p.floor(this.rSensorPos.x));
            r = p.pixels[index];
            
            index = 4*(d * p.floor(this.lSensorPos.y)) * (d * p.windowWidth) + 4*(d * p.floor(this.lSensorPos.x));
            l = p.pixels[index];
            
            index = 4*(d * p.floor(this.fSensorPos.y)) * (d * p.windowWidth) + 4*(d * p.floor(this.fSensorPos.x));
            f = p.pixels[index];
            
            // Compare values of f, l, and r to determine movement 
            if (f > l && f > r) {
                this.heading += 0;
            } else if (f < l && f < r) {
                if (p.random(1) < 0.5) {
                this.heading += this.rotAngle;
                } else {
                this.heading -= this.rotAngle;
                }
            } else if (l > r) {
                this.heading += -this.rotAngle;
            } else if (r > l) {
                this.heading += this.rotAngle;
            }
        }
        
        display() {
            p.noStroke();
            p.fill(randomR, randomG, randomB);
            p.ellipse(this.x, this.y, this.r*2, this.r*2);
        }
        
        getSensorPos(sensor, angle) {
          sensor.x = (this.x + this.sensorDist*p.cos(angle) + p.windowWidth) % p.windowWidth;
          sensor.y = (this.y + this.sensorDist*p.sin(angle) + p.windowHeight) % p.windowHeight;
        }
    } 
}

// Create and return a new p5 instance
currentP5Instance = new p5(sketch8);


