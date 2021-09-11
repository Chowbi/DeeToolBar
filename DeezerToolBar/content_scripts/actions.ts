"use strict";

browser.runtime.onMessage.addListener(execute);


function execute(request, sender, callback) {
    switch (request.execute) {
        case 'Play':
        case "PlayPause":
            let pp = document.querySelector('.player-controls').childNodes[0];
            pp = pp.childNodes[2].childNodes[0];
            (<HTMLElement>pp).click();
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
            n = n.childNodes[4].childNodes[0].childNodes[0];
            (<HTMLElement>n).click();
            break;
        case 'Prev':
        case "PrevTrack":
            let p = document.querySelector('.player-controls').childNodes[0];
            p = p.childNodes[0].childNodes[0].childNodes[0];
            (<HTMLElement>p).click();
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
    let like = <HTMLElement>document.querySelector('.track-actions').childNodes[0].childNodes[2].childNodes[0];
    var status = like.children[0].classList.value.indexOf('eGhZom') !== -1;
    if (request.execute === "Like") {
        like.click();
        status = !status;
    }

    let elt = document.querySelector('.marquee-content');

    if (callback !== null)
        callback({ status, playing: elt.textContent });
    else
        console.debug("Callback is null");
}


