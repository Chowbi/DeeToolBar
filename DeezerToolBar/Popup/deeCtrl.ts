"use strict"
declare var browser;

let background;
let foreground;

function setColors() {
    document.getElementById("popupBody").setAttribute("style", "background-color:" + background + ";color:" + foreground + ";")
}

browser.storage.local.get('background', (res) => { background = res["background"]; setColors(); });
browser.storage.local.get('foreground', (res) => { foreground = res["foreground"]; setColors(); });


document.addEventListener("click", function (e: MouseEvent) {
    var id = e.target['id'];
    switch (id) {
        case 'Shortcuts':
            browser.runtime.sendMessage({ action: id }).then(UpdateShortcutsStatus);
            break;
        case 'Like':
            browser.runtime.sendMessage({ action: id });
            break;
        default:
            browser.runtime.sendMessage({ action: id }).then(
                () => {
                    setTimeout(() => browser.runtime.sendMessage({ action: 'Statuses' })
                        , 500);
                });
            break;
    }
});

browser.runtime.onMessage.addListener(UpdateStatuses);
browser.runtime.sendMessage({ action: 'ShortcutsStatus' }).then(UpdateShortcutsStatus);
browser.runtime.sendMessage({ action: 'Statuses' });

function UpdateShortcutsStatus(status) {
    var src = "../Content/";
    src += status ? "on.png" : "off.png";
    document.getElementById("Shortcuts").setAttribute("src", src);
}

function UpdateStatuses(statuses) {
    var src = "../Content/";
    src += statuses.status ? "liked.png" : "notLiked.png";
    document.getElementById("Like").setAttribute("src", src);

    document.getElementById("playing").innerText = statuses.playing;
}


