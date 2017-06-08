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

                // Parse page URL
                // https://www.opendesktop.org/p/123456789/?key=val#hash
                // Then make provider key and content id
                // providerKey = https://www.opendesktop.org/ocs/v1/
                // contentId = 123456789
                const pageUrlParts = document.URL.split('?')[0].split('#')[0].split('/p/');
                let providerKey = '';
                let contentId = '';
                if (pageUrlParts[1]) {
                    providerKey = `${pageUrlParts[0]}/ocs/v1/`;
                    contentId = pageUrlParts[1].split('/')[0];
                }

                if (parsedUrl.protocol === 'ocs:' || parsedUrl.protocol === 'ocss:') {
                    event.preventDefault();
                    event.stopPropagation();
                    ipcRenderer.sendToHost('ocs-url', parsedUrl.href, providerKey, contentId);
                }
                else if (parsedUrl.hostname === 'dl.opendesktop.org' && parsedUrl.pathname) {
                    event.preventDefault();
                    event.stopPropagation();
                    const ocsUrl = `ocs://download?url=${encodeURIComponent(parsedUrl.href)}&type=downloads`;
                    ipcRenderer.sendToHost('ocs-url', ocsUrl, providerKey, contentId);
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
