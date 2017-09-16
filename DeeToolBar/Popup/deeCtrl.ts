///<reference path="../typings/chrome.d.ts"/>

chrome.storage.local.get('colour', (res) => {
    document.getElementById("popupBody").setAttribute("style", "background-color:" + res["colour"] + ";")
});

document.addEventListener("click", function (e: MouseEvent) {
    var id = e.target['id'];
    var alt = e.target['alt'];
    if (id == 'captureKeys')
        chrome.runtime.sendMessage({ action: 'toogleMediaKey' }, (result: boolean) => {
            showMediaKeyStatus(result);
        });
    else
        chrome.runtime.sendMessage({ action: alt });
});

chrome.runtime.sendMessage({ action: 'getMediaKey' }, (result: boolean) => {
    showMediaKeyStatus(result);
});

function showMediaKeyStatus(status: boolean) {
    var src = "../Content/";
    src += status ? "on.png" : "off.png";
    document.getElementById("captureKeys").setAttribute("src", src);
}

//chrome.commands.getAll(function (commands) {
//    commands.forEach(function (command) {
//        if (command.description == "MediaPlayPause")
//            command.shortcut = "Ctrl+Shift+U";
//    });
//});
