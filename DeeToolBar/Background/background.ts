
declare var browser;

browser.runtime.onMessage.addListener(controller);

let _captureMediaKeys: boolean;

function controller(request, sender, callback) {
    if (request.action == "toogleMediaKey")
        captureMediaKeys(callback);
    else if (request.action == "getMediaKey")
        callback(_captureMediaKeys);
    else
        actOnDeezerTab(request.action);
}

function captureMediaKeys(callback) {
    if (_captureMediaKeys == null)
        _captureMediaKeys = false;
    _captureMediaKeys = !_captureMediaKeys;
    if (_captureMediaKeys) {
        browser.commands.onCommand.addListener(reactOnKeyboard);
    }
    else {
        browser.commands.onCommand.removeListener(reactOnKeyboard);
    }
    callback(_captureMediaKeys);
}

function reactOnKeyboard(command) {
    switch (command) {
        case "MediaPrevTrack":
            actOnDeezerTab("Previous");
            break;
        case "MediaNextTrack":
            actOnDeezerTab("Next");
            break;
        case "MediaPlayPause":
            actOnDeezerTab("Play");
            break;
    }
}

function actOnDeezerTab(action: string) {
    browser.tabs.query({ url: "*://*.deezer.com/*" }, function (tabs) {
        if (tabs.length == 0)
            browser.tabs.create({ url: "http://www.deezer.com/login", active: true });
        else {
            let id: number = tabs[0].id;
            if (action == 'Playlist')
                browser.tabs.update(id, { active: true });
            browser.tabs.sendMessage(id, { execute: action });
        }
    });
}

function saveOptions(e) {
    browser.storage.local.set({
        colour: document.getElementById("colour")["value"]
    });
}
function restoreOptions() {
    console.log("Browser : " + JSON.stringify(browser.storage));
    console.log("Chrome : " + JSON.stringify(chrome.storage));
    console.log("Diff : " + (browser == chrome) + "; " + (browser === chrome));
    browser.storage.local.get('colour', (res) => {
        if (res["colour"] == null)
            res["colour"] = "white";
        console.log("restoring color option");
        let colElt = document.getElementById("colour");
        let color = res["colour"];
        console.log(JSON.stringify(colElt));
        console.log(color);
        //["value"] = res["colour"]
        console.log("color option restored");
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.addEventListener('DOMContentLoaded', () =>
    document.querySelector("#form").addEventListener("submit", saveOptions));
