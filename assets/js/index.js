var audioPath = 'assets/sounds/';
var effects = ['fx1.mp3', 'fx2.mp3'];
var player = document.createElement('audio');
var playerEffect = document.createElement('audio');

function init() {
	
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function playSound(soundId) {
	var imgUrl = document.getElementById('image'+soundId).src;
	var imageName = imgUrl.split('/').pop().split('.')[0];
	console.log(imageName);
	playAudio(imageName+'.m4a');
}

function playAudio(audioFile) {
	player.stop();
	player.src = audioPath + audioFile;
	player.preload = 'auto';
	player.play();
	player.onended = playEffect;
}

function playEffect() {
  playerEffect.stop();
  playerEffect.src = audioPath + effects[getRand(effects.length)];
  playerEffect.preload = 'auto';
  playerEffect.play();
}