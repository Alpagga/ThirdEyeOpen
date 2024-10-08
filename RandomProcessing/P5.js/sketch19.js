function sketch10(p) {

    let a,b,c,x,y,z,z2,inst,offset,huey;
    let s = 1; // step up rate - sometimes makes a difference
    let size = 0.2 // pixel size - .01 for fine, 4 for bold
    let numb = 2000; // number of spirograph points
    let paused = false;

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
    
        p.angleMode(p.DEGREES); 
        p.colorMode(p.HSB,360,100,100,100);
        p.background(0);
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);  // Resize canvas on window resize
        p.background(0);
    };

    p.draw = function() {
        a = p.random(3,30);
        b = p.random(3,20);
        c = p.random(10,20);
        offset = p.random(p.windowHeight/30,p.windowHeight/3);
        z = offset/p.windowHeight/p.random(1,4) //gap
        //random(width/5,width/3.5); //distance from center
        inst = p.round(p.random(5,10))*2; //number of circles around the circle
            huey = p.random(360);
        
            z2 = p.windowHeight / 2 / (p.abs(a) + p.abs(b) + p.abs(c));
            p.translate(p.windowWidth/2,p.windowHeight/2)
            for(let i=0;i<inst;i++){
                p.translate(offset,0);
                p.beginShape();
        for (let n = 0; n < numb; n += s) {
            x = (a + b) * p.cos(n) - c * p.cos((a / b + 1) * n);
            y = (a + b) * p.sin(n) - c * p.sin((a / b + 1) * n);
            p.fill(huey,100,100,20);
            p.strokeWeight(size);
            p.vertex(x * z2 * z, y * z2 * z);
        }
        p.endShape();
        p.translate(-offset,0);
        p.rotate(360/inst);
        }
    };
}

// Create and return a new p5 instance
currentP5Instance = new p5(sketch10);