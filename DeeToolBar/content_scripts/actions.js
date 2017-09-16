chrome.runtime.onMessage.addListener(execute);


function execute(request, sender, callback) {
    switch (request.execute) {
        case 'Play':
            document.getElementsByClassName('control control-play')[0].click();
            break;
        case 'Pause':
            document.getElementsByClassName('control control-pause')[0].click();
            break;
        case 'Playlist':
            document.getElementsByClassName('control control-qlist')[0].click();
            break;
        case 'Next':
            document.getElementsByClassName('control control-next')[0].click();
            break;
        case 'Previous':
            document.getElementsByClassName('control control-prev')[0].click();
            break;
        case 'Volume Down':
            volumeControl(-5);
            break;
        case 'Volume Up':
            volumeControl(5);
            break;
        case 'Ban Song':
            document.getElementsByClassName('icon icon-unlove')[0].parentElement.parentElement.click();
            break;
        case 'Love Song':
            document.getElementsByClassName('icon icon-love')[0].parentElement.parentElement.click();
            break;
        case 'getCaptureMediaKey':
            var _cmk;
            var span = document.getElementById("captureMediaKey");
            if (span == null) {
                _cmk = true;
                span = document.createElement('span');
                span.setAttribute('id', 'captureMediaKey');
                span.setAttribute('hidden', 'hidden');
                span.innerText = _cmk;
                document.body.appendChild(span);
            }
            _cmk = span.innerText == 'true' ? true : false;
            _cmk = request.changeState ? !_cmk : _cmk;
            span.innerText = _cmk;
            callback(_cmk);
            break;
    }
}

function volumeControl(value) {
    var volume = $('.control.control-volume');
    volume.simulate('mouseover');
    var handler = $('.volume-handler');
    handler.simulate('drag', { dx: value });
    SendResponse({ message: value + ' sended.' });
}

