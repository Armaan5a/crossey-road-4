var carG,logG,pl;
var carAnimation, logAnimation, playerAnimation;     
var gameState="play"

function preload(){
  car1=loadImage("images/car1.png")
  car=loadImage("images/car2.png")
  log=loadImage("images/log2.png")
  pl=loadImage("images/Player-03.png")
  ci=loadImage("images/city1.png")
  to=loadImage("images/city2.png")
}

function setup() {
  createCanvas(1350,700);
  
  carG = createGroup();
  logG = createGroup();
  
  for(var i = 0;i<6;i=i+1){
  var grass = createSprite(675,2600-50-(i*400),1360,130)
  grass.shapeColor="gray"
   if (i%2===0){
     var road = createSprite(675,2600-250-i*400,1360,300)
     road.shapeColor="black"
    }
}  
  for(var i = 0;i<100;i=i+1){
    logs=new Log(-5)
    logG.add(logs.spt) 
  }
 
   for(var i = 0;i<100;i=i+1){
    cars=new Car(5)
    carG.add(cars.spt) 
  
  }
  
  town=createSprite(650,2790)
   town.addImage(to)
   town.scale=1.5
   
   city=createSprite(650,300)
   city.addImage(ci)
   pl = new player(650,2900)
  
  }

function draw() {                        
  background("skyblue");
   
  translate (0,-pl.spt.y+height-150)
  
 if(gameState==="play"){
    
  if(keyDown("left")){
    pl.moveLeft()
     }
  
  if(keyDown("right")){
    pl.moveRight()
  }
   
  if(keyDown("up")){
    pl.moveUp()
  }
  
  if(keyDown("down")){
    pl.moveDown()
  } 
    
  if(city.isTouching(pl.spt)){
      gameState="end"
    }
  }
  
  if(carG.isTouching(pl.spt)){
  pl.spt.x=width/2
  pl.spt.y=height+2200
  }
  
  if(logG.isTouching(pl.spt)){
   pl.spt.x=pl.spt.x-5    
    }
  
  else if((pl.spt.y > height+1100 && pl.spt.y < height+1420) ||
  (pl.spt.y > height+300 && pl.spt.y < height+620)||
  (pl.spt.y>3000)||
  (pl.spt.y<20) ||
  (pl.spt.x<0) ||
  (pl.spt.x>1360) ) {
     
     pl.spt.x=width/2
     pl.spt.y=height+2200 
  }
  
  for(i = 1 ;i<logG.length;i=i+1){
    if(logG[i].x<-100) {
      logG[i].x=1450
    }
   }

   for(i = 1 ;i<carG.length;i=i+1){
    if(carG[i].x<-60) {
      carG[i].x=1430
    }
   }
  
   for(i = 1 ; i<carG.length;i=i+1){
    if(carG[i].x>1430) {
      carG[i].x=-60
    }
   }
     
  drawSprites();
  
         
  if(gameState==="end"){
    fill("green")
    textSize(35)
    text("CONGRATULATIONS! You Have Made It",550,300)
    carG.destroyEach()
    logG.destroyEach() 
    }
}
