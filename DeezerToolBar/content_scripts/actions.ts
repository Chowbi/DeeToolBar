"use strict";

browser.runtime.onMessage.addListener(execute);


function execute(request, sender, callback) {
    switch (request.execute) {
        case 'Play':
        case "PlayPause":
            let pp = document.querySelector('.player-controls .svg-icon-play, .player-controls .svg-icon-pause');
            pp.parentElement.click();
            break;
        case 'Playlist':
            let openPlaylist = <HTMLElement>document.querySelector(
                '.player-options .queuelist'
            );
            if (openPlaylist !== null)
                openPlaylist.click();
            break;
        case 'Next':
        case "NextTrack":
            let n = document.querySelector('.player-controls .svg-icon-next');
            n.parentElement.click();
            break;
        case 'Prev':
        case "PrevTrack":
            let p = document.querySelector('.player-controls .svg-icon-prev');
            p.parentElement.click();
            break;
        case 'Like':
        case 'Statuses':
            SetStatuses(request, callback);
            break;
        default:
            document.body.innerText = request.execute;
            break;
    }
}

function SetStatuses(request, callback) {
    let like = document.querySelector(
        '.track-actions .svg-icon-love-outline, .queuelist-cover-actions .svg-icon-love-outline'
    );
    var status = like.classList.value.indexOf('is-active') !== -1;
    if (request.execute === "Like") {
        like.parentElement.click();
        status = !status;
    }

    let elt = document.querySelector('.marquee-content');

    if (callback !== null)
        callback({ status, playing: elt.textContent });
    else
        console.debug("Callback is null");
}


