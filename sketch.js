var path,person;

var pathImg,person_image;

var apple_image;
var banana_image;
var grapes_image;
var gameOverImg,cycleBell;

var apple, banana, grapes; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var fruits=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  apple_image = loadImage("apple.png");

  banana_image = loadImage("banana.jpg");
  
  grapes_image = loadImage("grapes.png");
  
  gameOverImg = loadImage("gameOver.png");

  person_image = loadImage("person.webp");
}

function setup(){
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
person  = createSprite(70,150);
person.addAnimation("running",person);
person.scale=0.07;
person.setCollider("rectangle",0,0,40,40);  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
appleG = new Group();
bananaG = new Group();
grapesG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Fruits: "+ fruits,900,30);
  
  if(gameState===PLAY){
    
   fruits = fruits + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*fruits/150);
  
   person.y = World.mouseY;
  
   edges= createEdgeSprites();
   person .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
  //creating continous opponent players
  var createFruits = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (createFruits == 1) {
      appleG();
    } else if (createFruits == 2) {
      bananaG();
    } else {
      grapesg();
    }
  }
  
   if(apple.isTouching(person)){
     gameState = END;
     apple.velocityY = 0;
     apple.addAnimation("apple",apple_image);
    }
    
    if(banana.isTouching(person)){
      gameState = END;
      banana.velocityY = 0;
      banana.addAnimation("banana",banana_image);
    }
    
    if(grapes.isTouching(person)){
      gameState = END;
      grapes.velocityY = 0;
      grapes.addAnimation("grapes",grapes_image);
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    path.velocityX = 0;
    person.velocityY = 0;
    person.addAnimation("running",person_image);
  
    apple.setVelocityXEach(0);
    apple.setLifetimeEach(-1);
  
    banana.setVelocityXEach(0);
    banana.setLifetimeEach(-1);
  
    grapes.setVelocityXEach(0);
    grapes.setLifetimeEach(-1);
    if(keyDown("UP_ARROW")) {
   reset();
      }
}
}

function appleG(){
        apple =createSprite(1100,Math.round(random(50, 250)));
        apple.scale =0.06;
        apple.velocityX = -(6 + 2*fruits/150);
        apple.addAnimation("apple",apple_image);
        apple.setLifetime=170;
        apple.add(apple);
}

function bananaG(){
        banana =createSprite(1100,Math.round(random(50, 250)));
        banana.scale =0.06;
        banana.velocityX = -(6 + 2*fruits/150);
        banana.addAnimation("banana",banana_image);
        banana.setLifetime=170;
        banana.add(banana);
}

function Grapes(){
        grapes =createSprite(1100,Math.round(random(50, 250)));
        grapes.scale =0.06;
        grapes.velocityX = -(6 + 2*fruits/150);
        grapes.addAnimation("grapes",grapes_image);
        grapes.setLifetime=170;
        grapes.add(grapes);
}
function reset(){
gameState = PLAY;
gameOver.visible = false;
person.addImage("running",person);
apple.destroyEach();
banana.destroyEach();
grapes.destroyEach(); 
fruits = 0;
}