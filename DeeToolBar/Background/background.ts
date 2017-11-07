
declare var browser;

browser.runtime.onMessage.addListener(controller);

let _captureMediaKeys: boolean = false;

function controller(request, sender, callback) {
    switch (request.action) {
        case "Shortcuts":
            captureMediaKeys(callback);
            break;
        case "ShortcutsStatus":
            callback(_captureMediaKeys);
            break;
        default:
            actOnDeezerTab(request.action, callback);
            break;
    }
}

function captureMediaKeys(callback) {
    _captureMediaKeys = !_captureMediaKeys;
    if (_captureMediaKeys)
        browser.commands.onCommand.addListener(reactOnKeyboard);
    else
        browser.commands.onCommand.removeListener(reactOnKeyboard);
    callback(_captureMediaKeys);
}

function reactOnKeyboard(command) {
    actOnDeezerTab(command);
}

function actOnDeezerTab(action: string, callback = null) {
    browser.tabs.query({ url: "*://*.deezer.com/*" }, function (tabs) {
        let id: number;
        if (tabs.length == 0)
            browser.tabs.create({ url: "http://www.deezer.com/login", active: true });
        else {
            id = tabs[0].id;
            if (action == 'Playlist')
                browser.tabs.update(id, { active: true });
            browser.tabs.sendMessage(id, { execute: action }, null, callback);
        }
    });

}

function saveOptions(e) {
    browser.storage.local.set({
        colour: document.getElementById("colour")["value"]
    });
}
function restoreOptions() {
    browser.storage.local.get('colour', (res) => {
        if (res["colour"] == null)
            res["colour"] = "white";
        document.querySelector('#colour').textContent = res["colour"];
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.addEventListener('DOMContentLoaded', () =>
    document.querySelector("#form").addEventListener("submit", saveOptions));
