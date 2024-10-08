function sketch11(p) {

    let r = p.windowHeight*0.45; 
    let waves = []; let num = p.int(p.random(4,12)); 
    let step = p.random(30, 50);

    let randomR = p.random(255);
    let randomG = p.random(255);
    let randomB = p.random(255);

    let modeAmplitude = p.random(1);
    let sizeEllipse = p.random(1,20)

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);    
        
        p.angleMode(p.DEGREES);
        for (let i=0; i<num; i++) {
            waves[i] = new Wave(i*step);
        }
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);  // Resize canvas on window resize
    };

    p.draw = function() {
        p.background(0);
        p.translate(p.windowWidth/2, p.windowHeight/2);
        p.noFill();
        // ellipse(0, 0, r*2, r*2);
        
        for (let i=0; i<num; i++) {
          waves[i].display();
          waves[i].move();
        }
    };

    class Wave {
        constructor(shift) {
            this.shift = shift;
            this.angle = 0;
            this.movement = 0;
            this.period = 1;
        }
        
        display() {


            p.fill(randomR, randomG, randomB);
            for (let i=0; i<=360; i++) {
                
                if(modeAmplitude > 0.5 ){ //ellipse
                    let x = p.map(i, 0, 360, -r*2, r*2);
                    let amplitude = r * p.sqrt(1- p.pow((x/r/1.8), 2));
                    let y = amplitude*p.sin((i + this.angle + this.shift*this.movement)*this.period);
                    p.ellipse(x, y, sizeEllipse, sizeEllipse);
                    p.noStroke();
                }else{ //circle
                    let x = p.map(i, 0, 360, -r*2, r);
                    let amplitude = r * p.sqrt(1- p.pow((x/r), 2));
                    let y = amplitude*p.sin((i + this.angle + this.shift*this.movement)*this.period);
                    p.ellipse(x, y, sizeEllipse, sizeEllipse);
                    p.noStroke();
                }
            }
          
        }
        
        move() {
            this.angle += 1;
            this.movement = p.cos(this.angle);
        }
      }
}

// Create and return a new p5 instance
currentP5Instance = new p5(sketch11);
