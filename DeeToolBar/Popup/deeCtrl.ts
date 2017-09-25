///<reference path="../typings/chrome.d.ts"/>

chrome.storage.local.get('colour', (res) => {
    document.getElementById("popupBody").setAttribute("style", "background-color:" + res["colour"] + ";")
});

function actOnTab(action: string) {
    if (action == 'Shortcuts')
        chrome.runtime.sendMessage({ action: 'toogleMediaKey' }, (result: boolean) => {
            showMediaKeyStatus(result);
        });
    else
        chrome.runtime.sendMessage({ action: action });
}

document.addEventListener('click', eventHandler);

function eventHandler(event: MouseEvent) {
    console.log(JSON.stringify(event));
    //let divs: string[] = ["VolUp", "VolDown", "Play", "Playlist", "Prev", "Next", "Love", "Ban", "Shortcuts"];
    //for (let d of divs) {
    //    console.log(d);
    //    document.getElementById("#" + d).addEventListener("click", () => actOnTab(d));
    //}
}

chrome.runtime.sendMessage({ action: 'getMediaKey' }, (result: boolean) => {
    showMediaKeyStatus(result);
});

function showMediaKeyStatus(status: boolean) {
    var src = "../Content/";
    src += status ? "on.png" : "off.png";
    document.getElementById("Shortcuts").setAttribute("src", src);
}
