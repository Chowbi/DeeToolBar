"use strict";

browser.runtime.onMessage.addListener(execute);


function execute(request, sender, callback) {
    switch (request.execute) {
        case 'Play':
        case "PlayPause":
            let pp = document.querySelector('.player-controls').childNodes[0];
            pp.childNodes[2].childNodes[0].click();
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
            let n = document.querySelector('.player-controls').childNodes[0];
            n.childNodes[4].childNodes[0].click();
            break;
        case 'Prev':
        case "PrevTrack":
            let p = document.querySelector('.player-controls').childNodes[0];
            p.childNodes[0].childNodes[0].click();
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
    let like = document.querySelectorAll('.track-actions').childNodes[0];
    var status = like.classList.value.indexOf('is-active') !== -1;
    if (request.execute === "Like") {
        like.childNodes[2].click();
        status = !status;
    }

    let elt = document.querySelector('.marquee-content');

    if (callback !== null)
        callback({ status, playing: elt.textContent });
    else
        console.debug("Callback is null");
}


