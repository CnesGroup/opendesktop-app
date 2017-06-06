'use strict';

const electron = require('electron');
const url = require('url');

{
    const ipcRenderer = electron.ipcRenderer;

    function modifyDocument() {
    }

    function modifyStyle() {
    }

    function modifyEvent() {
        document.body.addEventListener('click', (event) => {
            if (event.target.closest('[href]')) {
                const targetElement = event.target.closest('[href]');

                let targetUrl = '';
                if (targetElement.getAttribute('data-link-org')) {
                    targetUrl = targetElement.getAttribute('data-link-org');
                }
                else {
                    targetUrl = targetElement.getAttribute('href');
                }

                const parsedUrl = url.parse(targetUrl);

                if (parsedUrl.protocol === 'ocs:' || parsedUrl.protocol === 'ocss:') {
                    event.preventDefault();
                    event.stopPropagation();
                    ipcRenderer.sendToHost('ocs-url', parsedUrl.href);
                }
                else if (parsedUrl.hostname === 'dl.opendesktop.org' && parsedUrl.pathname) {
                    event.preventDefault();
                    event.stopPropagation();
                    ipcRenderer.sendToHost('ocs-url', `ocs://download?url=${encodeURIComponent(parsedUrl.href)}&type=downloads`);
                }
                else if (parsedUrl.hostname && parsedUrl.hostname !== url.parse(document.URL).hostname) {
                    event.preventDefault();
                    event.stopPropagation();
                    ipcRenderer.sendToHost('external-url', parsedUrl.href);
                }
            }
        }, false);
    }

    ipcRenderer.on('dom-modify', () => {
        //modifyDocument();
        //modifyStyle();
        modifyEvent();
    });
}
