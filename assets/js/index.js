var audioPath = 'assets/sounds/';
var effects = ['fx1.mp3', 'fx2.mp3'];
var player = document.createElement('audio');
var playerEffect = document.createElement('audio');
var isFullscreen = false;

function init() {
	
}

function getRand(max) {
  return Math.floor(Math.random() * max);
}

function playSound(soundId) {
	if (!isFullscreen) {
		var elem = document.documentElement;
	    elem.requestFullscreen();
	    isFullscreen = true;
	}
	var imgUrl = document.getElementById('image'+soundId).src;
	var imageName = imgUrl.split('/').pop().split('.')[0];
	console.log(imageName);
	playAudio(imageName+'.m4a');
}

function playAudio(audioFile) {
	player.pause();
	player.currentTime = 0;
	player.src = audioPath + audioFile;
	player.preload = 'auto';
	player.play();
	player.onended = playEffect;
}

function playEffect() {
	playerEffect.pause();
	playerEffect.currentTime = 0;
	playerEffect.src = audioPath + effects[getRand(effects.length)];
	playerEffect.preload = 'auto';
	playerEffect.play();
}