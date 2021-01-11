var monkey, monkey_running;
var jungle, jungleimg, ground;
var banana, bananaimg, bananaGroup;
var stone, stoneimg, stoneGroup;
var score;

function preload() {
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png",
    "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  jungleimg = loadImage("jungle.jpg");

  bananaimg = loadImage("banana.png");
  stoneimg = loadImage("stone.png");

}

function setup() {
  createCanvas(600, 250);

  jungle = createSprite(300, 5);
  jungle.addImage("jungle", jungleimg);
  jungle.x = jungle.width / 2;
  jungle.velocityX = -4;

  ground = createSprite(200, 220, 400, 10);
  ground.visible = false;

  monkey = createSprite(50, 200, 20, 50);
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.scale = 0.05;


  bananaGroup = new Group();
  stoneGroup = new Group();

  score = 0;
}

function draw() {

  if (keyDown("space") && monkey.y >= 150) {
    monkey.velocityY = -10;
  }
  monkey.velocityY = monkey.velocityY + 0.8

  if (jungle.x < 100) {
    jungle.x = jungle.width / 2;
  }

  if (bananaGroup.isTouching(monkey)) {
    score = score + 2
    bananaGroup.destroyEach();
    sizeIncrease();
  }

  if (stoneGroup.isTouching(monkey)) {
    monkey.scale = 0.05;
  }

  monkey.collide(ground);

  bananas();
  stones();
  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score : " + score, 500, 50);

}

function bananas() {

  if (World.frameCount % 150 === 0) {
    var banana = createSprite(600, 200, 10, 10);
    banana.y = Math.round(random(100, 150));
    banana.addAnimation("Banana", bananaimg);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 150;

    bananaGroup.add(banana);
  }
}

function stones() {
  if (World.frameCount % 300 === 0) {
    var stone = createSprite(600, 200, 10, 40);
    stone.velocityX = -3;
    stone.addImage("Stone", stoneimg);
    stone.scale = 0.15;
    stone.lifetime = 200;

    stoneGroup.add(stone);
  }
}

function sizeIncrease() {

  switch (score) {
    case 10:
      monkey.scale = 0.12;
      break;
    case 20:
      monkey.scale = 0.14;
      break;
    case 30:
      monkey.scale = 0.16;
      break;
    case 40:
      monkey.scale = 0.18;
      break;
    default:
      break;
  }
}