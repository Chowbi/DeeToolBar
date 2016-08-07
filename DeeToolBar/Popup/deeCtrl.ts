///<reference path="../typings/chrome.d.ts"/>

document.addEventListener("click", function (e: MouseEvent) {
    var id = e.target['id'];
    var alt = e.target['alt'];
    if (id == 'captureKeys')
        captureMediaKeys(true);
    else
        actOnDeezerTab(alt == 'playlist', alt);
});



captureMediaKeys(false);

chrome.commands.getAll(function (commands) {
    commands.forEach(function (command) {
        console.log(command);
    });
});

function captureMediaKeys(changeState: boolean) {
    chrome.tabs.query({ url: "*://*.deezer.com/*" }, function (tabs) {
        if (tabs.length == 0)
            chrome.tabs.create({ url: "http://www.deezer.com/login", active: true });
        else {
            let id: number = tabs[0].id;
            chrome.tabs.sendMessage(id, { execute: 'getCaptureMediaKey', changeState: changeState }, (result: boolean) => {
                let _captureMediaKeys: boolean = result;
                var src = "../Content/";
                src += _captureMediaKeys ? "on.png" : "off.png";
                document.getElementById("captureKeys").setAttribute("src", src);
                if (_captureMediaKeys) {
                    chrome.commands.onCommand.addListener(function (command) {
                        switch (command) {
                            case "MediaPrevTrack":
                                actOnDeezerTab(true, "Previous");
                                break;
                            case "MediaNextTrack":
                                actOnDeezerTab(true, "Next");
                                break;
                            case "MediaPlayPause":
                                actOnDeezerTab(true, "Play");
                                break;
                            case "MediaStop":
                                actOnDeezerTab(true, "Pause");
                                break;

                        }
                    });
                }
                else {
                    chrome.commands.onCommand.removeListener(function (command) { alert(command); });
                }
            });
        }
    });
}



function actOnDeezerTab(focusTab: boolean, action: string) {
    chrome.tabs.query({ url: "*://*.deezer.com/*" }, function (tabs) {
        if (tabs.length == 0)
            chrome.tabs.create({ url: "http://www.deezer.com/login", active: true });
        else {
            let id: number = tabs[0].id;
            if (focusTab)
                chrome.tabs.update(id, { active: true });
            chrome.tabs.sendMessage(id, { execute: action });
        }
    });
}