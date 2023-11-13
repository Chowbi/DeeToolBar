"use strict";

browser.runtime.onMessage.addListener(execute);

function execute(request, sender, callback) {
    switch (request.execute) {
        case 'Play':
        case "PlayPause":
            let pp = document.querySelector("button[data-testid=play_button_play]")
                ?? document.querySelector("button[data-testid=play_button_pause]");
            (<HTMLElement>pp)?.click();
            break;
        case 'Playlist':
            let openPlaylist = <HTMLElement>document.querySelector("button[data-testid=queue_list_button]");
            openPlaylist?.click();
            break;
        case 'Next':
        case "NextTrack":
            let n = document.querySelector("button[data-testid=SkipNextFilledIcon]");
            (<HTMLElement>n)?.click();
            break;
        case 'Prev':
        case "PrevTrack":
            let p = document.querySelector("button[data-testid=SkipBackFilledIcon]")
            (<HTMLElement>p)?.click();
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
    let like = <HTMLElement>document.querySelector("button[data-testid=HeartOutlinedIcon]");
    let unLike = <HTMLElement>document.querySelector("button[data-testid=HeartFilledIcon]");
    let liked:bool = unLike !== null;
    
    if (request.execute === "Like") {
        (notLiked ?? like).click();
        status = !status;
    }

    let elt = document.querySelector('.css-dsap3z');

    if (callback !== null)
        callback({ liked, playing: elt.textContent });
    else
        console.debug("Callback is null");
}


