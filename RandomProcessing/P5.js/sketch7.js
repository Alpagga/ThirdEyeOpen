function sketch7(p) {

    let x = 25;
    let y = 50;

    //symetrical if randomR1 and randomR2 are both straight
    let randomR1 = p.int(p.random(4, 10));
    let randomR2 = p.int(p.random(6, 20));
    let randomR3 = p.int(p.random(10, 40));

    //RGB
    let randomR = p.int(p.random(0,255));
    let randomG = p.int(p.random(0,255));
    let randomB = p.int(p.random(0,255));

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);    
        p.angleMode(p.DEGREES)

        p.print(randomR1);
        p.print(randomR2);

        //check if randomR1 and randomR2 are straigt
        if(randomR1 % 2 == 1){
            randomR1 = randomR1+1;
        }

        if(randomR2 % 2 == 1){
            randomR2 = randomR2+1;
        }

        p.print(randomR1);
        p.print(randomR2);
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);  // Resize canvas on window resize
    };

    p.draw = function() {
        p.background(0)
        p.strokeWeight(4)
        p.noFill()
      
        p.translate(p.windowWidth / 2, p.windowHeight / 2)
      
        for (var t = 0; t < 5; t++) {
      
            //Color
            //p.stroke(100 - t * 20, 150 - t * 30, 220 - t * 30)
            p.stroke(randomR, randomG, randomB);
      
            p.beginShape()
            for (var i = 0; i < 359; i++) {
            

                var r1Min = p.map(p.sin(p.frameCount), -1, 1, 50, p.windowHeight/3)
                var r1Max = p.map(p.sin(p.frameCount * 2), -1, 1, 100, p.windowHeight/3)
                //var r1Min = p.map(p.sin(p.frameCount), -1, 1, 50, 120)
                //var r1Max = p.map(p.sin(p.frameCount * 2), -1, 1, 100, 20)
            
                var r2Min = p.map(p.sin(p.frameCount / 2), -1, 1, 120, 50)
                var r2Max = p.map(p.sin(p.frameCount), -1, 1, 20, 100)
            
                //OG "3"
                var r1 = p.map(p.sin(i * randomR1), -1, 1, r1Min, r1Max)
                //OG "6"
                var r2 = p.map(p.sin(i * randomR2 + 90), -1, 1, r2Min, r2Max)
                //OG "10"
                var r = r1 + r2 - t * randomR3
                
                var x = r * p.cos(i)
                var y = r * p.sin(i)
                p.vertex(x, y)
            }
            p.endShape(p.CLOSE)
            }
    };
}

// Create and return a new p5 instance
currentP5Instance = new p5(sketch7);
