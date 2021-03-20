declare var browser;

function saveOptions(e) {
    browser.storage.local.set({
        background: document.querySelector("#background")["value"],
        foreground: document.querySelector("#foreground")["value"],
        useShortcut: document.querySelector("#useShortcut")["checked"]
    });
}
function restoreOptions() {
    browser.storage.local.get('background', (res) => {
        if (res["background"] == null)
            res["background"] = "white";
        document.querySelector('#background')["value"] = res["background"];
    });
    browser.storage.local.get('foreground', (res) => {
        if (res["foreground"] == null)
            res["foreground"] = "black";
        document.querySelector('#foreground')["value"] = res["foreground"];
    });
    browser.storage.local.get('useShortcut', (res) => {
        document.querySelector('#useShortcut')["checked"] = res["useShortcut"];
    });
}

function addListener() {
    document.querySelector("form").addEventListener("submit", saveOptions);
}

document.addEventListener('DOMContentLoaded', () => {
    restoreOptions();
    addListener();
});

