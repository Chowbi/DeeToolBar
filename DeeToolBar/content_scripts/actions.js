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
    }
}


