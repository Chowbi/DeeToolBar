"use strict";
function saveOptions(e) {
    browser.storage.local.set({
        colour: document.querySelector("#colour")["value"]
    });
}
function restoreOptions() {
    browser.storage.local.get('colour', function (res) {
        if (res["colour"] == null)
            res["colour"] = "white";
        document.querySelector('#colour')["value"] = res["colour"];
    });
}
function addListener() {
    document.querySelector("form").addEventListener("submit", saveOptions);
}
document.addEventListener('DOMContentLoaded', function () {
    restoreOptions();
    addListener();
});
