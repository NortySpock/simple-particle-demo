"use strict";
const debugMode = false;
const frameDebug = false;
const targetFrameRate = 60;

let points_string = '';
let points_string_location;
var FPS_string  = '';
var FPS_string_location;


let Global = {};
Global.canvasWidth = 700;
Global.canvasHeight = 700;
Global.points = 0;
Global.particleColor
Global.particleSpamRate = 10

function reset() {
    let canvas = createCanvas(Global.canvasWidth, Global.canvasHeight);
    canvas.parent('sketch-holder');
    canvas.drawingContext.imageSmoothingEnabled = false;

    frameRate(targetFrameRate);

    Global.textColor = color(255);
    Global.backgroundColor = color(0);
    background(Global.backgroundColor);

    // textSize(14);
    // textStyle(NORMAL);
    // textFont('Courier New');
    // stroke(color(255));
    // fill(color(255));

    Global.points = 0;

    Global.particleColor = color(0,255,0);
    Global.ParticleSystem = new ParticleSystem();

    points_string_location = createVector(Global.canvasWidth*(19/24),20);
    FPS_string_location = createVector(10,20);
}

function preload()
{

}

function setup() {
  reset();
  setInterval(halfSecondUpdateLoop,500);
}

function draw() {

    handleUserInput();

    //BACKGROUND
    background(Global.backgroundColor); //black color

    Global.ParticleSystem.run();

    renderBackgroundUI()
}


function mousePressed()
{
    let newPos = createVector(mouseX,mouseY);
    Global.ParticleSystem.addParticleSpray(newPos,Global.particleColor,3,600,Global.particleSpamRate)
}

//handles continuous presses
var handleUserInput = function()
{

};

function keyPressed() {
  if(keyCode == ENTER || keyCode == RETURN)
  {
    reset();
    return;
  }

  //resumeSoundIfContextBlocked();

  if(key == 'A' )
  {
      Global.particleSpamRate = 10;
  }

  if(key == 'S')
  {
    Global.particleSpamRate = 100;
  }

  if(key == 'D')
  {
    Global.particleSpamRate = 1000;
  }

};

function randomFromInterval(min,max){
    return Math.random()*(max-min+1)+min;
}

//true-false coin-flip
function coinFlip()
{
  return (int(Math.random() * 2) == 0);
}

function updateUIstuff()
{
  var fps = frameRate();
  FPS_string = "FPS:" + fps.toFixed(0);

  points_string = "Particles: " + Global.ParticleSystem.particleCount;
}

function renderBackgroundUI()
{
    textSize(16);
    textStyle(NORMAL);
    textFont('Courier New');
    stroke(Global.backgroundColor);
    fill(Global.textColor);
    text(FPS_string, FPS_string_location.x,FPS_string_location.y);
    text(points_string,points_string_location.x,points_string_location.y);
}

function halfSecondUpdateLoop(){
  updateUIstuff();
}

function onCanvas(x,y)
{
  if(x<0 || x > Global.canvasWidth)
  {
    return false;
  }
  if(y<0 || y > Global.canvasHeight)
  {
    return false;
  }
  return true;
}


function isABrightColor(color)
{
  let minColor = 100;
  return (red(color)+green(color)+blue(color))>minColor;
}





function midpoint(x1,y1,x2,y2)
{
    return pointOnLine(x1,y1,x2,y2,0.5);
}

function pointOnLine(x1,y1,x2,y2,fraction)
{
    let newpoint = {x:(x1+x2)*fraction,y:(y1+y2)*fraction}
    return newpoint;
}




function resumeSoundIfContextBlocked()
{
  if (getAudioContext().state !== 'running')
  {
        getAudioContext().resume();
  }
}