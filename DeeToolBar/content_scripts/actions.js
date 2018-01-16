browser.runtime.onMessage.addListener(execute);


function execute(request, sender, callback) {
    switch (request.execute) {
        case 'Play':
        case "MediaPlayPause":
            document.getElementsByClassName('control control-play')[0].click();
            break;
        case 'Playlist':
            document.getElementsByClassName('control control-qlist')[0].click();
            break;
        case 'Next':
        case "MediaNextTrack":
            document.getElementsByClassName('control control-next')[0].click();
            break;
        case 'Prev':
        case "MediaPrevTrack":
            document.getElementsByClassName('control control-prev')[0].click();
            break;
        case 'Ban':
            document.getElementsByClassName('svg-icon-cancel')[0].parentElement.click();
            break;
        case 'Like':
    	case 'LikeStatus':
    		var like = document.getElementsByClassName('svg-icon-love-outline')[0];
    		var status = like.classList.value.indexOf('is-active') !== -1;
    		if (request.execute === "Like") {
    			like.parentElement.click();
    			status = !status;
    		}
    		callback(status);
    		break;
    	case 'Lyrics':
    		var songName = document.getElementsByClassName('player-track-link')[0].innerHTML;
    		var properSongName = songName.split(' ').join('-');
    		var artist = document.getElementsByClassName('player-track-link')[1].innerHTML;
    		var properArtistName = artist.split(' ').join('-');
    		var newTab = window.open("http://www.1songlyrics.com/" + artist[0] + "/" + properArtistName + "/" + properSongName + ".html", '_blank');
    		newTab.focus();
    		break;
    }
}


