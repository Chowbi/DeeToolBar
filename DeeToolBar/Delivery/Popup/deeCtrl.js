///<reference path="../typings/browser.d.ts"/>
browser.storage.local.get('colour', function (res) {
    document.getElementById("popupBody").setAttribute("style", "background-color:" + res["colour"] + ";");
});
document.addEventListener("click", function (e) {
    var id = e.target['id'];
    var alt = e.target['alt'];
    if (id == 'captureKeys')
        browser.runtime.sendMessage({ action: 'toogleMediaKey' }, function (result) {
            showMediaKeyStatus(result);
        });
    else
        browser.runtime.sendMessage({ action: alt });
});
browser.runtime.sendMessage({ action: 'getMediaKey' }, function (result) {
    showMediaKeyStatus(result);
});
function showMediaKeyStatus(status) {
    var src = "../Content/";
    src += status ? "on.png" : "off.png";
    document.getElementById("captureKeys").setAttribute("src", src);
}
browser.commands.getAll(function (commands) {
    commands.forEach(function (command) {
        if (command.description == "MediaPlayPause")
            command.shortcut = "Ctrl+Shift+U";
    });
});
//# sourceMappingURL=deeCtrl.js.map