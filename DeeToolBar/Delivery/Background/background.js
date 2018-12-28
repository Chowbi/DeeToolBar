"use strict";
browser.runtime.onMessage.addListener(controller);
var _isShorcutsActive = false;
function controller(request, sender, callback) {
    if (request.action == 'LikeStatus')
        callback(true);
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
function actOnDeezerTab(action) {
    browser.tabs.query({ url: "*://*.deezer.com/*" }, function (tabs) {
        var id;
        if (tabs.length == 0)
            browser.tabs.create({ url: "http://www.deezer.com/login", active: true });
        else {
            id = tabs[0].id;
            if (action == 'Playlist')
                browser.tabs.update(id, { active: true });
            browser.tabs.sendMessage(id, { execute: action }).then(function (result, error) { return sendMessage(action, result, error); });
        }
    });
}
function sendMessage(action, result, error) {
    if (action == 'Like' || action == 'LikeStatus')
        browser.runtime.sendMessage(result);
}
