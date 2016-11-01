///<reference path="../typings/chrome.d.ts"/>
document.addEventListener("click", function (e) {
    var id = e.target['id'];
    var alt = e.target['alt'];
    if (id == 'captureKeys')
        chrome.runtime.sendMessage({ action: 'toogleMediaKey' }, function (result) {
            showMediaKeyStatus(result);
        });
    else
        chrome.runtime.sendMessage({ action: alt });
});
chrome.runtime.sendMessage({ action: 'getMediaKey' }, function (result) {
    showMediaKeyStatus(result);
});
function showMediaKeyStatus(status) {
    var src = "../Content/";
    src += status ? "on.png" : "off.png";
    document.getElementById("captureKeys").setAttribute("src", src);
}
chrome.commands.getAll(function (commands) {
    commands.forEach(function (command) {
        if (command.description == "MediaPlayPause")
            command.shortcut = "Ctrl+Shift+U";
    });
});
//# sourceMappingURL=deeCtrl.js.map