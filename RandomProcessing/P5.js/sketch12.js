function sketch12(p) {
    let r;
    let bumpSlider, thetaSlider, phySlider;
    let bumpiness, thetaValue, phyValue;
    let autoRotateAngle = 0; // Variable to track automatic rotation

    let randomR = p.int(p.random(30, 255));
    let randomG = p.int(p.random(30, 255));
    let randomB = p.int(p.random(30,255));

    // Variables to control slider automation speed and direction
    let bumpSliderDirection = 0.01;
    let thetaSliderDirection = 0.1;
    let phySliderDirection = 0.1;

    let thetaLimit = p.random(5,10);
        let phyLimit = p.random(5,10);

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
        p.angleMode(p.DEGREES);
        p.colorMode(p.HSB);
    
        p.stroke(randomR, randomG, randomB);
        p.strokeWeight(3);
        p.noFill();

        r = p.windowWidth / 3;

        
        

        // Create sliders with random initial values within their ranges
        bumpiness = p.createDiv();
        bumpiness.class("valueDisplay");
        bumpSlider = p.createSlider(0, 1.5, p.random(0, 1.5), 0.01); // Random initial value between 0 and 1.5
      
        thetaValue = p.createDiv();
        thetaValue.class("valueDisplay");
        thetaSlider = p.createSlider(0, thetaLimit, p.random(0, thetaLimit), 0.01);  // Random initial value between 0 and 10

        phyValue = p.createDiv();
        phyValue.class("valueDisplay");
        phySlider = p.createSlider(0, phyLimit, p.random(0, phyLimit), 0.01);  // Random initial value between 0 and 10

        p.pixelDensity(1);
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight); // Resize canvas on window resize
    };

    p.draw = function() {
        p.clear();
        p.background(0);

        // Slower automatic rotation by 50% (autoRotateAngle increment changed to 0.25)
        autoRotateAngle += 0.0001; // Slows down the rotation
        p.rotateY(autoRotateAngle);
        p.rotateX(autoRotateAngle / 2); // Optional: Rotate around X-axis too

        // Automate bumpSlider
        let bumpValue = bumpSlider.value();
        bumpValue += bumpSliderDirection;
        if (bumpValue > 1.5 || bumpValue < 0) bumpSliderDirection *= -0.5; // Reverse direction if limit reached
        bumpSlider.value(bumpValue);

        // Automate thetaSlider
        let thetaValue = thetaSlider.value();
        thetaValue += thetaSliderDirection;
        if (thetaValue > thetaLimit || thetaValue < 0) thetaSliderDirection *= -0.5; // Reverse direction if limit reached
        thetaSlider.value(thetaValue);

        // Automate phySlider
        let phyValue = phySlider.value();
        phyValue += phySliderDirection;
        if (phyValue > phyLimit || phyValue < 0) phySliderDirection *= -0.5; // Reverse direction if limit reached
        phySlider.value(phyValue);

        p.rotateX(65);
        p.beginShape(p.POINTS);
        for (let theta = 0; theta < 180; theta += 2) {
            for (let phy = 0; phy < 360; phy += 2) {
                let x = r * (1 + bumpSlider.value() * p.sin(thetaSlider.value() * theta) * p.sin(phySlider.value() * phy)) * p.sin(1 * theta) * p.cos(phy);
                let y = r * (1 + bumpSlider.value() * p.sin(thetaSlider.value() * theta) * p.sin(phySlider.value() * phy)) * p.sin(1 * theta) * p.sin(phy);
                let z = r * (1 + bumpSlider.value() * p.sin(thetaSlider.value() * theta) * p.sin(phySlider.value() * phy)) * p.cos(1 * theta);
                
                p.vertex(x / 4, y / 4, z / 4);
            }
        }
        p.endShape();
    };
}

// Create and return a new p5 instance
currentP5Instance = new p5(sketch12);
