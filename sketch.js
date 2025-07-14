let bg; // Image to use as the background of the effect

const noiseScale = 0.01;

// Colours to use when generating the background image

// // ask for user input with sliders on the rbg for the arr3ay of colours !!!!!!!!!########
// const colours = [
//   "#ff5500",
//   "#55ff00",
//   "#ffdd00",
//   "#55ddff",
// ];

//*********************************************
let rSlider, gSlider, bSlider;
let userColor;
let isVoting = false; //flags to check if user has voted for, or interacted with the sliders
//*********************************************

let y = 0;
let dir = 1;


function setup() {
  createCanvas(600, 600);
  
//***********************************************
 rSlider = createSlider(0,255,0);
 gSlider = createSlider(0,255,0);
 bSlider = createSlider(0,255,0);
  
 let rgbColors= getItem("rgbColors");
 if(rgbColors !== null) //user is interacting with the sliders and hence voting
 {
   isVoting = true;
   rSlider.value(storeData); //store data is storing data in Local Storage so if the Same user is rerunning     this p5sketch they see what they voted for 
   gSlider.value(storeData);
   bSlider.value(storeData); 
    // bg = createGraphics(width, height);
    // createBG();
 }
  
 rSlider.changed(storeData);
 gSlider.changed(storeData);
 bSlider.changed(storeData);
 background(0);
//some code for untouched sliders what it should look like ? The Perlin Noise in Greyscale 
  
//***********************************************

  //bg = createGraphics(width, height);
  //createBG(); #########
}


//**********************************************
function storeData()
{
  let rgbColors={
    r: rSlider.value(),
    g: gSlider.value(),
    b: bSlider.value()
  };
  storeItem("rgbColors", rgbColors)
  //var listOfRank = [rgbToHex(r, 0, 0), rgbToHex(0, g, 0), rgbToHex(0, 0, b)]; //array of colours 
}
//***********************************************


function draw() {
  bg = createGraphics(width, height);
    createBG();
  image(bg, 0, 0, width, height);
  
//*****************************************
//   let r = rSlider.value();
//   let g = gSlider.value();
//   let b = bSlider.value();
  
//   let listOfRank = [rgbToHex(r, 0, 0), rgbToHex(0, g, 0), rgbToHex(0, 0, b)]; //array of colours 
//******************************************
  
  strokeWeight(2);
  // Scan the current row of pixels
  for(let x = 0; x < width; x ++) {
    // Get the colour of the current pixel
    const c = get(x, y);
    // Draw a line in that colour to the bottom of the screen
    stroke(c);
    line(x, y, x, height);
  }
  
  // Move the y position
  y += dir;
  
  // Flip the direction when we get to the top/bottom
  if(y <= 0 || y > height) {
    dir *= -1;
  }
}

function createBG() {
  let r = rSlider.value();
  let g = gSlider.value();
  let b = bSlider.value();
  
  
  const numBands = 16; //band number = int(noise value x number of bands) ASK for user input and locally store it ####!!!!!
  
  let colours;
  if (isVoting) {
    colours = [
      rgbToHex(rSlider.value(), 0, 0),
      rgbToHex(0, gSlider.value(), 0),
      rgbToHex(0, 0, bSlider.value())
    ];
  } else {
    colours = ["#000000", "#555555", "#AAAAAA", "#FFFFFF"];}
  
  for(let i = 0; i < bg.width; i ++) //iterating through the screen pixels 
  {
    for(let j = 0; j < bg.height; j ++) {
      
      // Get the noise at the current pixel
      const n = noise(i * noiseScale, j * noiseScale);
      
      // Turn the noise into a colour
      const band = int(n * numBands);
      const colour = band % colours.length; 
      //const colour =band % listOfRank.length;
      
      // Draw a point at the current location
      bg.stroke(colours[colour]); 
      //bg.stroke(listOfRank[color]);
      bg.point(i, j);
    }
  }
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
