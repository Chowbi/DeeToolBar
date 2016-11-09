chrome.runtime.onMessage.addListener(controller);

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
        chrome.commands.onCommand.addListener(reactOnKeyboard);
    }
    else {
        chrome.commands.onCommand.removeListener(reactOnKeyboard);
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
        case "MediaStop":
            actOnDeezerTab("Pause");
            break;
    }
}

function actOnDeezerTab(action: string) {
    chrome.tabs.query({ url: "*://*.deezer.com/*" }, function (tabs) {
        if (tabs.length == 0)
            chrome.tabs.create({ url: "http://www.deezer.com/login", active: true });
        else {
            let id: number = tabs[0].id;
            if (action == 'Playlist')
                chrome.tabs.update(id, { active: true });
            chrome.tabs.sendMessage(id, { execute: action });
        }
    });
}

function saveOptions(e) {
    chrome.storage.local.set({
        colour: document.getElementById("colour")["value"]
    });
}

function restoreOptions() {
    chrome.storage.local.get('colour', (res) => {
        document.getElementById("colour")["value"] = res["colour"]
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);