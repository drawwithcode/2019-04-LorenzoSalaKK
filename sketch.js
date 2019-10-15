// CLICK WHILE IT SAYS LOADING
var myImage;
var mygameboy;
var volume = 0;
var mySong;
var analyzer;
var posx; //text x position
var cposx; // gameboy x position
var cposy; // gameboy y position

function preload() {

  mySong = loadSound("./assets/riki.mp3"); // song loaded
  myImage = loadImage("./assets/bg.jpg"); // background image
  mygameboy = loadImage("./assets/gameboy.png"); // gameboy image
}


function setup() {

  rectMode(CENTER); //rectangle aligned by center
  createCanvas(windowWidth, windowHeight); //create the canvas

  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
  mySong.loop(); // loops the song

  mygameboy.filter("invert")

}


function draw() {

  d = volume;
  cposx = frameCount / 2;
  cposy = volume + windowHeight / 3 * noise(frameCount / 100);
  posx = windowWidth / 2;
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, height);

  background(myImage); //sets image as background

  image(mygameboy, cposx, cposy, width / 10, height / 5 * (volume / 50));

  if (volume > 35) {

    posx = posx + frameCount / 3; // text position varies related to framecount and volume
    noFill();
    stroke('indigo');

  } else if (volume < 20) {

    posx = posx - frameCount / 3;
    noFill();
    stroke('MediumSpringGreen');

  } else {

    noFill()
    stroke(lerpColor(color('midnightblue'), color('deeppink'), frameCount / 2000));
    strokeWeight(0.5);

  }

  textFont('Turret Road');
  textAlign(CENTER);
  textSize(50);
  push();
  tint(noise(frameCount / 500) * 100)
  text("In an isolated system, entropy can only increase", posx, windowHeight * 2 / 3 * (noise(frameCount / 300))); //text moves smoothly up and down
  pop();

}
