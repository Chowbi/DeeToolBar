browser.storage.local.get('colour', function (res) {
    document.getElementById("popupBody").setAttribute("style", "background-color:" + res["colour"] + ";");
});
document.addEventListener("click", function (e) {
    var id = e.target['id'];
    switch (id) {
        case 'Shortcuts':
            browser.runtime.sendMessage({ action: id }).then(UpdateShortcutsStatus);
            break;
        case 'Like':
            browser.runtime.sendMessage({ action: id });
            break;
        default:
            browser.runtime.sendMessage({ action: id });
            break;
    }
});
browser.runtime.onMessage.addListener(UpdateLikeStatus);
browser.runtime.sendMessage({ action: 'ShortcutsStatus' }).then(UpdateShortcutsStatus);
browser.runtime.sendMessage({ action: 'LikeStatus' });
function UpdateShortcutsStatus(status) {
    var src = "../Content/";
    src += status ? "on.png" : "off.png";
    document.getElementById("Shortcuts").setAttribute("src", src);
}
function UpdateLikeStatus(status) {
    var src = "../Content/";
    src += status ? "liked.png" : "notLiked.png";
    document.getElementById("Like").setAttribute("src", src);
}
//# sourceMappingURL=deeCtrl.js.map