function sketch3(p) {

  let snake;

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.background(200);
    
    p.angleMode(p.DEGREES);
    p.buildSnake();
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);  // Resize canvas on window resize
  };

  p.draw = function() {
    p.background(0);
    p.noStroke();
    p.scale(1.5);
  
    // Slowly orbit around the plane of snakes
    p.rotateX(-45);
    p.rotateY(p.frameCount * 0.25);
  
    // Set up the material and shininess
    p.lights();
    p.specularMaterial('white');
    p.shininess(100);
  
    // Tile the snake model a number of times along the ground
    for (let x = -7; x <= 7; x += 1) {
      for (let z = -7; z <= 7; z += 1) {
        p.push();
        p.translate(x * 200, -200, z * 200);
        p.model(snake);
        p.pop();
      }
    }
  };

  p.buildSnake = function() {
    // If there was a previous snake, we're going to replace it
    // so we can free its resources to save memory
    if (snake) {
      p.freeGeometry(snake);
    }
  
    snake = p.buildGeometry(() => {
      p.colorMode(p.HSB, 100);
      p.fill(p.random(100), 50, 100);
  
      // Draw the head
      p.push();
      p.scale(1, 0.5, 1.4);
      p.sphere(50);
      p.pop();
  
      // Draw eyes
      for (let mirrorX of [-1, 1]) {
        p.push();
        p.scale(mirrorX, 1, 1);
        p.fill('black');
        p.translate(20, -20, 10);
        p.sphere(10);
        p.pop();
      }
      p.translate(0, 0, 50);
  
      // Draw body
      let numSegments = p.ceil(p.random(10, 30));
      for (let segment = 0; segment < numSegments; segment++) {
        p.rotateY(p.random(-60, 60));
        p.translate(0, 0, 50);
        p.push();
        p.rotateX(90);
        p.scale(1, 1, 0.5);
        let radius = p.map(segment, numSegments - 5, numSegments, 50, 0, true);
        p.cylinder(radius, 100);
        p.pop();
        p.translate(0, 15, 50);
      }
    });
  
    // Recenter the model and scale it to a common size
    snake.normalize();
  }

}

// Create and return a new p5 instance
currentP5Instance = new p5(sketch3);