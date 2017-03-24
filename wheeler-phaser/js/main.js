//This sets the variable for the spacebar.
var spaceKey;

var ground;
var player;
var obstacle;
var music
//This sets the score to start at -1.
var score = -1;


var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var GAME_CONTAINER_ID = 'gameDiv';

//This is the object which runs the game.
function preload(){
game.load.image('player','assets/cat.gif');
game.load.image('ground','assets/wallHorizontal.png');
game.load.image('obstacle','assets/fence.png');
game.load.image('background', 'assets/house.jpg');
game.stage.backgroundColor="#42f4f4"
game.load.audio('backgroundMusic', 'assets/music.mp3')


};

function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	game.add.tileSprite(0, 0,800, 600    ,'background');
	
	
	player = game.add.sprite(game.width/8, game.world.height*(3/8), 'player');
		game.physics.arcade.enable(player);
	platforms = game.add.group();
	platforms.enableBody = true;
	obstacle = game.add.sprite(700,game.world.height, 'obstacle');
	obstacle.scale.setTo(-1,4);
	obstacle.anchor.setTo(0,.75);
	
	game.physics.arcade.enable(obstacle);
	obstacle.body.immovable = true;
	ground = platforms.create(0,600,'ground');
	ground.anchor.setTo(0,1);
	ground.scale.setTo(4, 1);
	game.physics.arcade.enable(ground);
	ground.body.immovable = true;
	player.scale.setTo(0.2, 0.2);
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 600;
	scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
	music = game.add.audio('backgroundMusic');
	music.play();

};

function update(){
	game.physics.arcade.collide(player,ground);
	game.physics.arcade.collide(player,obstacle);
	if (spaceKey.isDown) {
		player.body.velocity.y = -300;
	}
	if (obstacle.x > 600) {
  obstacle.x -= 0.05;
}
if (obstacle.x < 0) {
  obstacle.kill();
  obstacle = game.add.sprite(900, GAME_HEIGHT, 'obstacle');
  obstacle.scale.setTo(-1,4);
  obstacle.anchor.setTo(0,.75);
  game.physics.arcade.enable(obstacle);
  obstacle.body.immovable = true;
}
if (obstacle.x < 5 && player.x > 5){
    score++;
    scoreText.text = 'score: ' + score;
  }
  if (player.x < 0){
    scoreText = game.add.text(350,200, 'You Lose!', {fill: '#0c00ff'});
    obstacle.kill();
    player.kill();
  }
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, update: update, create: create });

game.state.start();
