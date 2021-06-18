var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score=0
var gameOv

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage= loadImage("banana.png");
  obstacleImage= loadImage("stone.png");
  gameov= loadImage("gameOver.png")

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  bananaGroup= new Group ();
  obstacleGroup= new Group ();

}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -18;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if (bananaGroup.isTouching(player)) {
      score= score+1;
      player.scale+=+0.1
    
    }
   
    switch (score) {
      case 1: player.scale= 0.2;
      break;
      case 2: player.scale= 0.3;
      break;
      case 3: player.scale= 0.4;
      break;
      case 4: player.scale= 0.5;
      break;
      case 5: player.scale= 0.6;
      break;
      default: break;
    }
    if (obstacleGroup.isTouching(player)) {
      gameState=END 
     
      
    }
    spawnBananas();
    spawnObstacles();
  
  }

  drawSprites();

  stroke ("white");
    textSize (15);
    text ("Score: "+score,190,70);  
}

function spawnBananas () {
  if (frameCount%90===0) {
    banana= createSprite (790,120,10,10);  
    banana.addImage ("bananaimage", bananaImage);
    banana.scale= 0.06;
    banana.velocityX= -3;
    
      banana.lifetime= 250;
    
      bananaGroup.add(banana);
  }
}

function spawnObstacles () {
  if (frameCount%120===0) {
    obstacle= createSprite (740,320,10,10);
    obstacle.addImage ("obstacleimage", obstacleImage);
    obstacle.scale= 0.2;
    obstacle.velocityX= -6;
    
      obstacleGroup.add(obstacle);
  }
}
