function sketch1(p) {

    let sizes = [];

    let size = p.random(50,120);
    
    let cols; 
    let rows; 
    
    let xoff = 0; 
    let yoff = 0; 
    let inc = p.random(20,150);
    let zoff = 0;

    let colorMode = p.random(1);
    let randomR = p.random(255);
    let randomG = p.random(255);
    let randomB = p.random(255);

    let rotateX = 40;
    let rotateY = 0;

    p.setup = function() {
        p.createCanvas(p.windowWidth , p.windowHeight, p.WEBGL);    

        p.rectMode(p.CENTER);
        p.angleMode(p.DEGREES);

        cols = p.windowWidth/size;
        rows = cols
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);  // Resize canvas on window resize
    };

    p.draw = function() {
        p.background(0);
  

        p.rotateX(rotateX);
        p.rotateY(rotateY);
        
        xoff = 0;
        for (let i=0; i<cols; i++){
            sizes[i] = [];
            yoff = 0;
                for (let j=0; j<rows; j++){
                sizes[i][j] = p.map(p.noise(xoff, yoff, zoff), 0, 1, 0, 100);
                yoff += inc;
                
                if(colorMode>0.5){
                    let r = p.noise(zoff) * 255;
                    let g = p.noise(zoff+15) * 255;
                    let b = p.noise(zoff+30) * 255;
                    p.fill(r, g, b);
                }else{
                    p.fill(randomR, randomG, randomB);
            }


            p.push();
            p.translate(i*size - p.windowWidth/2 , sizes[i][j]-p.windowHeight, j*size - p.windowWidth*1.3);
            // You can also put the second argument 100 with sizes[i][j] in the box() function instead of the translate function 
            p.box(size, 200, size); 
            p.pop();
            

            }
            xoff += inc;
            zoff += 0.0004;
        }
    }
};

// Create and return a new p5 instance
currentP5Instance = new p5(sketch1);

