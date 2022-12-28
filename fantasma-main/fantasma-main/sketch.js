var torreImg, torrer;
var portaImg, porta, portaGrupo;
var gradeImg, grade, gradeGrupo;
var fantasma, fantasmaImg;
var blocoInvisivelGrupo, blocoInvisivel;
var gameState = "play"

function preload(){
  torreImg = loadImage("torre.png");
  portaImg = loadImage("porta.png");
  gradeImg = loadImage("grade.png");
  fantasmaImg = loadImage("-standing.png");
  SomAssustador = loadSound("uuu.wav");
}

function setup(){
  createCanvas(600,600);
  SomAssustador.loop();
  torre = createSprite(300,300);
  torre.addImage("torre",torreImg);
  torre.velocityY = 1;
  
  portaGrupo = new Grupo();
  gradeGrupo = new Grupo();
  blocoInvisivelGrupo = new Grupo();
  
  fantasma = createSprite(200,200,50,50);
  fantasma.scale = 0.3;
  fantasma.addImage("fantasma", fantasmaImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      fantasma.x = fantasma.x - 3;
    }
    
    if(keyDown("right_arrow")){
      fantasma.x = fantasma.x + 3;
    }
    
    if(keyDown("space")){
      fantasma.velocityY = -10;
    }
    
    fanatsma.velocityY = fantasma.velocityY + 0.8
    
    if(torre.y > 400){
      torre.y = 300;
    }
    spawnportas();

    
    //gradesGrupo.collide();
    if(gradesGrupo.isTouching()){
      fantasma.velocityY = 0;
    }
    if(blocoInvisivelGrupo.isTouching() || fantasma.y > 600){
      fantasma.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnports() {
  //escreva o código aqui para gerar portas na torre
  if (frameCount % 240 === 0) {
    var porta = createSprite(200, -50);
    var grade = createSprite(200,10);
    var blocoInvisivel = createSprite(200,15);
    blocoInvisivel.width = grade.width;
    blocoInvisivel.height = 2;
    
    porta.x = Math.round(random(120,400));
    grade.x = porta.x;
    blocoInvisivel.x = porta.x;
    
    porta.addImage(portaImg);
    grade.addImage(gradeImg);
    
    porta.velocityY = 1;
    grade.velocityY = 1;
    blocoInvisivel.velocityY = 1;
    
    fantasma.depth = porta.depth;
    fantasma.depth +=1;
   
    //atribua tempo de vida à variável
    porta.lifetime = 800;
    grade.lifetime = 800;
    blocoInvisivel.lifetime = 800;

    
    //adicione cada porta ao grupo
    portasGrupo.add(porta);
    blocoInvisivel.debug = true;
    gradesGrupo.add(grade);
    blocoInvisivelGrupo.add(blocoInvisivel);
  }
}