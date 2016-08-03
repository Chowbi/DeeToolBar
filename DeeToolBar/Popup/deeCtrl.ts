///<reference path="../typings/chrome.d.ts"/>

document.addEventListener("click", function (e) {
    var id = e.target['id'];
    var alt = e.target['alt'];
    if (id == 'captureKeys')
        captureMediaKeys();
    else
        actOnDeezerTab(alt == 'playlist', alt);
});

var _captureMediaKeys = false;
function captureMediaKeys() {
    _captureMediaKeys = !_captureMediaKeys;
    var src = "../Content/";
    src += _captureMediaKeys ? "on.png" : "off.png";
    document.getElementById("captureKeys").setAttribute("src", src);
    if (_captureMediaKeys) {
        chrome.commands.onCommand.addListener(function (command) {
            switch (command) {
                case "MediaPrevTrack":
                    actOnDeezerTab(true, "previous");
                    break;
                case "MediaNextTrack":
                    actOnDeezerTab(true, "next");
                    break;
                case "MediaPlayPause":
                    actOnDeezerTab(true, "play");
                    break;
                case "MediaStop":
                    actOnDeezerTab(true, "pause");
                    break;

            }
        });
    }
    else {
        alert('captureMediaKeys : ' + _captureMediaKeys);
        chrome.commands.onCommand.removeListener(function (command) { alert(command); });
    }
}

function actOnDeezerTab(focusTab: boolean, action: string) {
    chrome.tabs.query({ url: "*://*.deezer.com/*" }, function (tabs) { actOnTab(tabs, focusTab, action); });
}

function actOnTab(tabs: chrome.tabs.Tab[], focusTab: boolean, action: string) {
    if (tabs.length == 0)
        chrome.tabs.create({ url: "http://www.deezer.com/login", active: true });
    else {
        if (focusTab)
            chrome.tabs.update(tabs[0].id, { active: true });
        chrome.tabs.executeScript(tabs[0].id, { file: "../content_scripts/jquery-2.1.4.min.js" });
        chrome.tabs.executeScript(tabs[0].id, { file: "../content_scripts/jquery-ui.min.js" });
        chrome.tabs.executeScript(tabs[0].id, { file: "../content_scripts/jquery-simulator.js" });
        chrome.tabs.executeScript(tabs[0].id, { file: "../content_scripts/actions.js" });
        chrome.tabs.sendMessage(tabs[0].id, { execute: action }, result);
    }
}

function result(message) {
    console.log(message.message);
}