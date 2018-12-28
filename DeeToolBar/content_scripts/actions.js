browser.runtime.onMessage.addListener(execute);


function execute(request, sender, callback) {
    switch (request.execute) {
        case 'Play':
        case "MediaPlayPause":
            document.querySelector(
                '.player-controls .svg-icon-play, .player-controls .svg-icon-pause'
            ).parentElement.click();
            break;
        case 'Playlist':
            const openPlaylist = document.querySelector(
                '.player-options .queuelist:not(.is-active)'
            );
            if (openPlaylist) {
                openPlaylist.click()
            }
            break;
        case 'Next':
        case "MediaNextTrack":
            document.querySelector(
                '.player-controls .svg-icon-next'
            ).parentElement.click();
            break;
        case 'Prev':
        case "MediaPrevTrack":
            document.querySelector(
                '.player-controls .svg-icon-prev'
            ).parentElement.click();
            break;
        case 'Ban':
            document.querySelector(
                '.track-actions .svg-icon-block, .queuelist-cover-actions .svg-icon-block'
            ).parentElement.click();
            break;
        case 'Like':
        case 'LikeStatus':
            var like = document.querySelector(
                '.track-actions .svg-icon-love-outline, .queuelist-cover-actions .svg-icon-love-outline'
            );
            var status = like.classList.value.indexOf('is-active') !== -1;
            if (request.execute === "Like") {
                like.parentElement.click();
                status = !status;
            }
            callback(status);
    }
}


