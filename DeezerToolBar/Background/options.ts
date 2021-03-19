declare var browser;

function saveOptions(e) {
    browser.storage.local.set({
        colour: document.querySelector("#colour")["value"],
        useShortcut: document.querySelector("#useShortcut")["checked"]
    });
}
function restoreOptions() {
    browser.storage.local.get('colour', (res) => {
        if (res["colour"] == null)
            res["colour"] = "white";
        document.querySelector('#colour')["value"] = res["colour"];
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

