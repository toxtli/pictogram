var audioPath = 'assets/sounds/';
var effects = ['fx1.mp3', 'fx2.mp3'];
var player = document.createElement('audio');
var playerEffect = document.createElement('audio');
var isFullscreen = false;
var plusUrl = "https://www.carlostoxtli.com/pictogram/assets/img/plus.png";
var selected = [0, 1];

function init() {
	document.addEventListener('contextmenu', event => event.preventDefault());	
	loadImages();
}

function deleteSelected(element) {
	const index = selected.indexOf(element);
	if (index > -1) {
	  selected.splice(index, 1);
	}
}

function addSelected(element) {
	selected.push(element);
}

function getRand(max) {
  return Math.floor(Math.random() * max);
}

function onFullscreen() {
	if (!isFullscreen) {
		var elem = document.documentElement;
	    elem.requestFullscreen();
	    isFullscreen = true;
	}
}

function playSound(soundId) {
	var soundId = parseInt(this.id.split('_')[1]);
	playAudio(data[soundId]['audio']);
}

function playAudio(audioFile) {
	player.pause();
	player.currentTime = 0;
	player.src = audioFile;
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
	console.log(name);
	var el=document.getElementById(name);
	el.ontouchstart = playSound;
	el.onclick = playSound;
	// el.ontouchmove = playSound;
	// el.ontouchcancel = playSound;
	// el.ontouchend = playSound;
}

function start() {
	onFullscreen();
	document.getElementById('setup').style.display = 'none';
	document.getElementById('content').style.display = 'block';
	loadLayout();
}

function loadImages() {
	var board = "";

	for (var i in data) {
		var record = data[i];
		board += `<img id="image_${i}" class="thumbnail selectable ${i<2?'selected':''}" src="${record['image']}">`;
	}
	board += `<img class="thumbnail" src="${plusUrl}">`;
	$('#imageBoard').html(board);
}

function loadLayout() {
	var content = '';
	for (var i of selected) {
		content += `<div class="spot" id="spot_${i}" style="background-image:url(${data[i]['image']})"></div>`
	}
	$('#content').html(content);
	for (var i of selected) {
  		set_handlers("spot_" + i);
	}
}

$(document).on('click' , '.selectable', function (e) {
    $(this).toggleClass('selected');
    var index = parseInt(this.id.split('_')[1]);
    if ($(this).hasClass('selected')) {
    	addSelected(index);
    } else {
    	deleteSelected(index);
    }
    console.log(selected);
});

init();

