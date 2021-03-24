//Create variables here
var  dog, happyDog, database, foodS=20, foodStock;

function preload()
{
	//load images here
  dogi = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");

}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage(dogi);
  dog.scale = 0.1;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
 // foodStock.set(20)
}


function draw() {  
  background(46,139,87);
  fill("white");
  stroke(10);
  textSize(15);
  text("Note : PRESS UP_ARROW key to feed Drago Milk", 80, 20);
  

  if (keyWentDown(UP_ARROW)) {
   // writeStock(foodS);
    dog.addImage(happyDog);
    
  }

  if (keyWentUp(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(dogi);
    foodS = foodS-1;
  }

  
  drawSprites();
  //add styles here
 // strokeWeight()
  //stroke("red");
  textSize(10)
  text("Food Remaining:" +foodS , 100,480);
}

function readStock(data){
  foods=data.val();
}

function writeStock(x){
  if (x<=0) {
    x=0;
  } else {
    x=x-1;
  }
  database.ref('/').update({Food:x});
}

function showError(){
  console.log("Error in writing to the database");

}



