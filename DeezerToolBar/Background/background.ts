"use strict";
declare var browser;

let _isShorcutsActive: boolean = false;

browser.runtime.onMessage.addListener(controller);
browser.storage.local.get('useShortcut', (res) => {
    _isShorcutsActive = res["useShortcut"];
});


function controller(request, sender, callback) {
    switch (request.action) {
        case "Shortcuts":
            switchShortcutActive(callback);
            break;
        case "ShortcutsStatus":
            callback(_isShorcutsActive);
            break;
        default:
            return actOnDeezerTab(request.action);
    }
}

function switchShortcutActive(callback) {
    _isShorcutsActive = !_isShorcutsActive;
    if (_isShorcutsActive)
        browser.commands.onCommand.addListener(reactOnKeyboard);
    else
        browser.commands.onCommand.removeListener(reactOnKeyboard);
    callback(_isShorcutsActive);
}

function reactOnKeyboard(command) {
    actOnDeezerTab(command);
}

function actOnDeezerTab(action: string) {
    browser.tabs.query({ url: "*://*.deezer.com/*" }, function (tabs) {
        let id: number;
        if (tabs.length == 0)
            browser.tabs.create({ url: "http://www.deezer.com/login", active: true });
        else {
            id = tabs[0].id;
            if (action == 'Playlist')
                browser.tabs.update(id, { active: true });
            browser.tabs.sendMessage(id, { execute: action }).then((result, error) => sendMessage(action, result, error));
        }
    });
}

function sendMessage(action: string, result, error) {
    if (action == 'Like' || action == 'LikeStatus')
        browser.runtime.sendMessage(result);
}
