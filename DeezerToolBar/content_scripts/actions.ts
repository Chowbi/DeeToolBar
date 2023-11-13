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
            let n = document.querySelector("button[data-testid=next_track_button]");
            (<HTMLElement>n)?.click();
            break;
        case 'Prev':
        case "PrevTrack":
            let p = document.querySelector("button[data-testid=previous_track_button]");
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
    let like = <HTMLElement>document.querySelector("button[data-testid=add_to_favorite_button_off]");
    let unLike = <HTMLElement>document.querySelector("button[data-testid=add_to_favorite_button_on]");
    let liked:Boolean = like === null;
    
    if (request.execute === "Like") {
        (like ?? unLike).click();
        liked = !liked;
    }

    let elt = document.querySelector('.css-dsap3z');

    if (callback !== null)
        callback({ liked, playing: (<HTMLElement>elt).innerText.split("\r").join("").split("\n").join("") });
    else
        console.debug("Callback is null");
}


