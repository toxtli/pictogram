var audioPath = 'assets/sounds/';
var effects = ['fx1.mp3', 'fx2.mp3'];
var player = document.createElement('audio');
var playerEffect = document.createElement('audio');
var isFullscreen = false;
var images = ['sippy', 'cheerios'];

function init() {
	document.addEventListener('contextmenu', event => event.preventDefault());	
	for (var i in images) {
  		set_handlers("spot_" + i);
	}
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
	var soundId = parseInt(this.id.split('_')[1]);
	var imageName = images[soundId];
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

function set_handlers(name) {
	// Install event handlers for the given element
	var el=document.getElementById(name);
	el.ontouchstart = playSound;
	el.onclick = playSound;
	// el.ontouchmove = playSound;
	// el.ontouchcancel = playSound;
	// el.ontouchend = playSound;
}

init();