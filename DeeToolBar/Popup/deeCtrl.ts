///<reference path="../typings/chrome.d.ts"/>

chrome.storage.local.get('colour', (res) => {
    document.getElementById("popupBody").setAttribute("style", "background-color:" + res["colour"] + ";")
});

document.addEventListener("click", function (e: MouseEvent) {
    var id = e.target['id'];
    switch (id) {
        case 'Shortcuts':
            chrome.runtime.sendMessage({ action: id }, (result: boolean) => showShortcutsStatus(result));
            break;
        case 'Like':
            chrome.runtime.sendMessage({ action: id }, (result: boolean) => showLikeStatus(result));
            break;
        default:
            chrome.runtime.sendMessage({ action: id });
            break;
    }
});

chrome.runtime.sendMessage({ action: 'ShortcutsStatus' }, (result: boolean) => showShortcutsStatus(result));
chrome.runtime.sendMessage({ action: 'LikeStatus' }, (result: boolean) => showLikeStatus(result));

function showShortcutsStatus(status: boolean) {
    var src = "../Content/";
    src += status ? "on.png" : "off.png";
    document.getElementById("Shortcuts").setAttribute("src", src);
}

function showLikeStatus(status: boolean) {
    var src = "../Content/";
    src += status ? "liked.png" : "notLiked.png";
    document.getElementById("Like").setAttribute("src", src);
}
