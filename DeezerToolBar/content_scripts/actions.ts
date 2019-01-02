"use strict";

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
            let openPlaylist = <HTMLElement>document.querySelector(
                '.player-options .queuelist'
            );
            if (openPlaylist !== null)
                openPlaylist.click();
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
        case 'Like':
        case 'LikeStatus':
            SetLikeStatus(request, callback);
            break;
    }
}

function SetLikeStatus(request, callback) {
    let like = document.querySelector(
        '.track-actions .svg-icon-love-outline, .queuelist-cover-actions .svg-icon-love-outline'
    );
    var status = like.classList.value.indexOf('is-active') !== -1;
    if (request.execute === "Like") {
        like.parentElement.click();
        status = !status;
    }
    if (callback !== null)
        callback(status);
    else
        console.debug("Callback is null");
}


