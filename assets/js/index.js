var player = document.createElement('audio');
var playerEffect = document.createElement('audio');
var videoPlayer = null;
var isFullscreen = false;
var plusUrl = "https://www.carlostoxtli.com/pictogram/assets/img/plus.png";
var selected = [0, 1];
var maxSelection = 6;

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
	
	if (data[soundId].hasOwnProperty('video')) {
		playVideo(data[soundId]['video']);
	} else {
		playAudio(data[soundId]['audio']);
	}
}

function afterVideo() {
	$('#videoSource').hide();
	playEffect();
}

function playVideo(videoFile) {
	$('#videoSource').show();
	videoPlayer.pause();
	videoPlayer.currentTime = 0;
	videoPlayer.src = videoFile;
	videoPlayer.preload = 'auto';
	videoPlayer.play();
	videoPlayer.onended = afterVideo;
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
	playerEffect.src = effects[getRand(effects.length)];
	playerEffect.preload = 'auto';
	playerEffect.play();
}

function set_handlers(name) {
	var el=document.getElementById(name);
	if ('ontouchstart' in document.documentElement) {
  	el.ontouchstart = playSound;
	} else {
		el.onclick = playSound;
	}
}

function start() {
	if (selected.length > 0) {
		onFullscreen();
		document.getElementById('setup').style.display = 'none';
		document.getElementById('content').style.display = 'block';
		loadLayout();
		videoPlayer = document.getElementById('videoSource');
		$('#videoSource').hide();
	}
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
	var className = '';
	switch(selected.length) {
		case 1: className = 'one'; break;
		case 2: className = 'two'; break;
		case 3: 
		case 4: className = 'four'; break;
		case 5: 
		case 6: className = 'six'; break;
	}
	for (var i of selected) {
		content += `<div class="spot ${className}" id="spot_${i}" style="background-image:url(${data[i]['image']})"></div>`
	}
	$('#spotContainer').html(content);
	for (var i of selected) {
  		set_handlers("spot_" + i);
	}
}

$(document).on('click' , '.selectable', function (e) {
	if ((selected.length < maxSelection) || $(this).hasClass('selected')) {
    $(this).toggleClass('selected');
    var index = parseInt(this.id.split('_')[1]);
    if ($(this).hasClass('selected')) {
    	addSelected(index);
    } else {
    	deleteSelected(index);
    }
    console.log(selected);
	}
});

init();

