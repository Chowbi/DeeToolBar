browser.runtime.onMessage.addListener(controller);
var _captureMediaKeys;
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
        case "MediaStop":
            actOnDeezerTab("Pause");
            break;
    }
}
function actOnDeezerTab(action) {
    browser.tabs.query({ url: "*://*.deezer.com/*" }, function (tabs) {
        if (tabs.length == 0)
            browser.tabs.create({ url: "http://www.deezer.com/login", active: true });
        else {
            var id = tabs[0].id;
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
    browser.storage.local.get('colour', function (res) {
        document.getElementById("colour")["value"] = res["colour"];
    });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
//# sourceMappingURL=background.js.map