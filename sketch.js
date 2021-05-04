var score = 0
var life = 3
var badRobot, goodRobot, badGroup;
var gameState = 0
var start = true
var timer = 10
var playButton

function preload(){
goodImage = loadImage("Images/Good.png")
badImage = loadImage("Images/Bad.png")
restartImage = loadImage("Images/restart.png")
powerImage = loadImage("Images/Power.png")
}

function setup() {
  createCanvas(600,600);
  goodRobot = createSprite(300,500,30,30)
  goodRobot.addImage(goodImage)
  goodRobot.scale = 0.15
  badGroup = createGroup()
  restart = createButton("RESTART")
  restart.position(260, 320)
  edges = createEdgeSprites()
  powerGroup = createGroup()
  playButton = createButton("Click here to play")
  playButton.position(245, 340)
}

function draw() {
  background("black"); 
  
  fill("white")
  text("Score : " + Math.round(score), 20, 25)
  text("Lives : " + life, 20, 45)
  if(gameState === 0){
    text("1) Help the robot to fight the aliens by moving it out of their way using the arrow keys.", 80, 280)
    text("2) Each time you touch an alien, you lose a life and if all your lives are lost, then you lose.", 70, 300)
    text("3) Touch the green alien to get a superpower for some time.", 150, 320)
    restart.hide()
    goodRobot.visible = false
    playButton.mousePressed(()=>{
      gameState = 1
      goodRobot.x = 300
    })
  }
  if(gameState === 1){
  goodRobot.visible = true
  restart.hide()
  score+=0.3
  playButton.hide()
  goodRobot.collide(edges)
  goodRobot.velocityX = 0
  if(keyDown(LEFT_ARROW)){
    goodRobot.velocityX = -5
  }
  if(keyDown(RIGHT_ARROW)){
    goodRobot.velocityX = 5
  }
  
 
  for(var i = 0; i<powerGroup.length; i++){
    if(powerGroup.get(i).isTouching(goodRobot)){
      powerGroup.get(i).destroy()
      life = 3
      start = false
      frameCount = 1
      if(start === false){
        goodRobot.debug = true
      }
    }
  }
  for(var i = 0; i<powerGroup.length; i++){
    if(powerGroup.get(i).isTouching(badGroup)){
      powerGroup.get(i).x = powerGroup.get(i).x+15
    }
  }
  if(frameCount >= 150){
    start =  true
  }
  if(start === true){
    badTouchGood()
    goodRobot.debug = false
  } 
  badGuys()
  power()
  if(life <= 0){
    gameState = 2
  }
}
console.log(frameCount)
if(gameState === 2){
  badGroup.destroyEach()
  powerGroup.destroyEach()
  goodRobot.visible = false
  text("FINAL SCORE = " + Math.round(score), 250, 300)
  restart.show()
  restart.mousePressed(()=>{
    gameState = 0
    life = 3
    score = 0
    playButton.show()
  })
    
  
}
  drawSprites();
 
}

function badGuys() {
  if(frameCount%20 === 0){
    badRobot = createSprite(random(0,600), 0, 20, 20)
    badRobot.addImage(badImage)
    badRobot.scale = random(0.01, 0.04)
    badRobot.velocityY = 4 + score/20
    badRobot.lifetime = 150
    //console.log(badRobot.velocityY)
    badGroup.add(badRobot)
  }
}

function power(){
  if(frameCount%350 === 0){
    powerRobot = createSprite(random(0,600), 0, 20, 20)
    powerRobot.addImage(powerImage)
    powerRobot.scale = 0.07
    powerRobot.velocityY = 4 
    powerRobot.lifetime = 150
    powerGroup.add(powerRobot)
  }
}

function badTouchGood(){
  for(var i = 0; i<badGroup.length; i++){
    if(badGroup.get(i).isTouching(goodRobot)){
      badGroup.get(i).destroy()
      life = life-1
    }
  }
}
