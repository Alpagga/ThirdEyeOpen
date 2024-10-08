function sketch4(p) {

    let gif;
    let gifFiles = [
        './Assets/Gifs/1.gif', 
        './Assets/Gifs/2.gif',
    ];

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);   
        p.noLoop(); 
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);  // Resize canvas on window resize
    };

    p.preload = function() {
        let randomGif = p.random(gifFiles)
        gif = p.createImg(randomGif, "gif");
        gif.position(0,0);
        gif.size(p.windowWidth,p.windowHeight);
      }

    p.draw = function() {
        p.background(255);
        p.scale(2);
    }
}
// Create and return a new p5 instance
currentP5Instance = new p5(sketch4);






