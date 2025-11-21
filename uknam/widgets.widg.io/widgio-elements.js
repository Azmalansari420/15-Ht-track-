/*
Widget Embed Script
(c) Agendas Group Ltd
Add to page using the defer in the script tag
*/
if (typeof widgioElements === 'undefined') {
    var _supportsLocalStorage = !!window.localStorage && typeof localStorage.getItem === 'function' && typeof localStorage.setItem === 'function' && typeof localStorage.removeItem === 'function';
    if(_supportsLocalStorage) {
        const trackingNow = new Date();
        var trackingParams = JSON.parse(localStorage.getItem('tgtrackingparams') || '{}');
        if (typeof trackingParams['expiry'] != 'undefined' && trackingNow.getTime() > trackingParams['expiry']) {
            localStorage.removeItem('tgtrackingparams');
        }
        var urlHashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < urlHashes.length; i++)
        {
            var hash = urlHashes[i].split('=');
            if (hash[0].indexOf('tgtrk/') == 0) {
                hash[0] = hash[0].split('/')[1];
                trackingParams[hash[0]] = hash[1];
                trackingParams['expiry'] = trackingNow.getTime() + 604800000; // 7 day expiry
            }
        }
        localStorage.setItem('tgtrackingparams', JSON.stringify(trackingParams));
    }

    var widgioElements = document.getElementsByClassName('widgio-widget');
    var widgioWIDs = [];
    for (var widgioElm = 0; widgioElm < widgioElements.length; widgioElm++) {
        if (widgioElements[widgioElm].hasAttribute('widgetid')) {
            var wid = widgioElements[widgioElm].getAttribute('widgetid');
            if (widgioWIDs.indexOf(wid) == -1) {
                widgioWIDs.push(wid);
            }
        }
    }
    if (widgioWIDs.length > 0) {
        widgioGetElements().then(data => {
            if (data && data.success) {
                if (data.styles && data.styles.length > 0) {
                    for (var s = 0; s < data.styles.length; s++) {
                        var link = document.createElement('link');
                        link.rel = 'stylesheet';
                        link.href = data.styles[s];
                        document.head.appendChild(link);
                    }
                }
                if (data.scripts && data.scripts.length > 0) {
                    for (var s = 0; s < data.scripts.length; s++) {
                        var script = document.createElement('script');
                        script.src = data.scripts[s];
                        document.head.appendChild(script);
                    }
                }
            }
        });
    }
    async function widgioGetElements() {
        var resp = await fetch('https://api.widg.io/elements?wids=' + widgioWIDs.join());
        var data = await resp.json();
        return data;
    }
}
