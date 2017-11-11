declare var browser;

function saveOptions(e) {
    browser.storage.local.set({
        colour: document.querySelector("#colour")["value"]
    });
}
function restoreOptions() {
    browser.storage.local.get('colour', (res) => {
        if (res["colour"] == null)
            res["colour"] = "white";
        document.querySelector('#colour')["value"] = res["colour"];
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
