chrome.runtime.onMessage.addListener(execute);

function execute(request, sender, sendResponse) {
    chrome.runtime.onMessage.removeListener(execute);
    switch (request.execute) {
        case 'play':
            document.getElementsByClassName('control control-play')[0].click();
            break;
        case 'pause':
            document.getElementsByClassName('control control-pause')[0].click();
            break;
        case 'playlist':
            document.getElementsByClassName('control control-qlist')[0].click();
            break;
        case 'next':
            document.getElementsByClassName('control control-next')[0].click();
            break;
        case 'previous':
            document.getElementsByClassName('control control-prev')[0].click();
            break;
        case 'volDown':
            volumeControl(-5);
            break;
        case 'volUp':
            volumeControl(5);
            break;
    }
    SendResponse({ message: execute + ' sended.' });
}

function volumeControl(value) {
    var volume = $('.control.control-volume');
    volume.simulate('mouseover');
    var handler = $('.volume-handler');
    handler.simulate('drag', {dx: value});
}