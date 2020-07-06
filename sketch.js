//Global Variables
var monkey, ground, bannanas, obstacles, monkey_img, bannana_img, stone_img, bgi, bg ,score;


function preload(){
  monkey_img = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bannana_img = loadImage("Banana.png");
  stone_img = loadImage("stone.png");
  bgi = loadImage("jungle.jpg");
}


function setup() {
  createCanvas(600,300);
  monkey = createSprite(200,200,20,50);
  monkey.addAnimation("monkey",monkey_img);
  
  bg = createSprite(300,150,20,20);
  bg.addImage("jungle",bgi);
  bg.scale = 0.7; 

  monkey.depth = bg.depth + 1;
  monkey.scale = 0.1;
  monkey.x = 50;
  ground = createSprite(200,295,800,20);
  ground.x = ground.width/2;
  ground.visible = false;
  bannanas = createGroup();
  obstacles = createGroup();
  
  score = 0;
  textSize(18);
}


function draw(){
  background("white");
  
  text("Score: " + score, 10, 20);
  score = Math.round(World.frameCount/4);
  ground.velocityX = -6;
  
  if (ground.x < 0){
    ground.x = ground.width/2; 
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  if(keyDown("space") && monkey.y > 180){
    monkey.velocityY = -12;
  }
  
  if(bannanas.isTouching(monkey)){
    bannanas.destroyEach();
    score += 50; 
  }
  
  if(obstacles.isTouching(monkey)){
    obstacles.destroyEach();
    score = 0;  
  }
  
  rocks();
  spawn_bannana();
  
  drawSprites();
}

function rocks() {
  if(World.frameCount % 150 === 0){
    var obstacle = createSprite(600,280,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage("stone", stone_img);
    obstacle.scale = 0.2;
    obstacle.lifetime = 100;
    obstacle.depth = monkey.depth -1;
    obstacles.add(obstacle);
  }
}

function spawn_bannana(){
  if(World.frameCount % 60 === 0) {
    var bannana = createSprite(600,random(20,150),10,40);
    bannana.velocityX = -6;
    bannana.addImage("bannana",bannana_img);
    bannana.scale = 0.05;
    bannana.lifetime = 100;
    bannana.y = random(120,200);
    
    bannanas.add(bannana);
  }
  
  
  
}
