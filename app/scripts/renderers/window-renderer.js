'use strict';

const electron = require('electron');
const electronConfig = require('electron-config');

const appConfig = require('../../configs/application.json');
const releaseMeta = require('../../../release.json');

import StatusManager from 'js/StatusManager.js';
import Root from '../components/Root.js';

{
    const remote = electron.remote;
    const shell = electron.shell;

    const webSocket = new WebSocket(`ws://localhost:${appConfig.ocsManagerPort}`);
    const statusManager = new StatusManager();
    const root = new Root(document.querySelector('[data-component="Root"]'));
    const browseWebview = root.mainArea.browsePage.element.querySelector('[data-webview="browse"]');

    let isStartup = true;

    let installTypes = null;
    let installedItems = null;

    document.title = appConfig.title;

    function setupWebSocket() {
        webSocket.onopen = () => {
            console.log('WebSocket open');
            sendWebSocketMessage('', 'ConfigHandler::getAppConfigInstallTypes', []);
        };

        webSocket.onclose = () => {
            console.log('WebSocket close');
        };

        webSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            console.log(['WebSocket message received', data]);

            if (data.func === 'ConfigHandler::getAppConfigInstallTypes') {
                installTypes = data.data[0];
                sendWebSocketMessage('', 'ConfigHandler::getUsrConfigInstalledItems', []);
            }
            else if (data.func === 'ConfigHandler::getUsrConfigInstalledItems') {
                installedItems = data.data[0];
                root.mainArea.downloadsPage.update({
                    installTypes: installTypes,
                    installedItems: installedItems
                });
            }
            else if (data.func === 'ItemHandler::metadataSetChanged') {
                sendWebSocketMessage('', 'ItemHandler::metadataSet', []);
            }
            else if (data.func === 'ItemHandler::metadataSet') {
                    console.log(data.data);
            }
            else if (data.func === 'ItemHandler::downloadStarted') {
                if (data.data[0].status !== 'success_downloadstart') {
                    console.error(data.data[0].message);
                }
            }
            else if (data.func === 'ItemHandler::downloadFinished') {
                if (data.data[0].status !== 'success_download') {
                    console.error(data.data[0].message);
                }
            }
            else if (data.func === 'ItemHandler::downloadProgress') {
                    console.log(data.data);
            }
            else if (data.func === 'ItemHandler::saveStarted') {
                if (data.data[0].status !== 'success_savestart') {
                    console.error(data.data[0].message);
                }
            }
            else if (data.func === 'ItemHandler::saveFinished') {
                if (data.data[0].status !== 'success_save') {
                    console.error(data.data[0].message);
                }
            }
            else if (data.func === 'ItemHandler::installStarted') {
                if (data.data[0].status !== 'success_installstart') {
                    console.error(data.data[0].message);
                }
            }
            else if (data.func === 'ItemHandler::installFinished') {
                if (data.data[0].status !== 'success_install') {
                    console.error(data.data[0].message);
                    return;
                }
                sendWebSocketMessage('', 'ConfigHandler::getUsrConfigInstalledItems', []);
            }
            else if (data.func === 'ItemHandler::uninstallStarted') {
                if (data.data[0].status !== 'success_uninstallstart') {
                    console.error(data.data[0].message);
                }
            }
            else if (data.func === 'ItemHandler::uninstallFinished') {
                if (data.data[0].status !== 'success_uninstall') {
                    console.error(data.data[0].message);
                    return;
                }
                sendWebSocketMessage('', 'ConfigHandler::getUsrConfigInstalledItems', []);
            }
        };

        webSocket.onerror = (event) => {
            console.error(event.data);
        };
    }

    function setupComponent() {
        root.mainArea.changePage('browsePage');

        if (isStartup) {
            root.mainArea.showStartupPage();
        }
    }

    function setupWebView() {
        const config = new electronConfig({name: 'application'});

        browseWebview.setAttribute('src', config.get('startPage'));
        browseWebview.setAttribute('preload', './scripts/renderers/ipc-renderer.js');
        browseWebview.setAttribute('autosize', 'on');
        browseWebview.setAttribute('allowpopups', 'false');

        browseWebview.addEventListener('did-start-loading', () => {
            console.log('did-start-loading');
            root.mainArea.browsePage.toolBar.showIndicator();
        });

        browseWebview.addEventListener('did-stop-loading', () => {
            console.log('did-stop-loading');
            root.mainArea.browsePage.toolBar.hideIndicator();
        });

        browseWebview.addEventListener('dom-ready', () => {
            console.log('dom-ready');
            browseWebview.send('dom-modify');

            if (isStartup) {
                isStartup = false;
                root.mainArea.hideStartupPage();
            }
        });

        browseWebview.addEventListener('ipc-message', (event) => {
            console.log(['ipc-message', event.channel, event.args]);
            if (event.channel === 'ocs-url') {
                sendWebSocketMessage('', 'ItemHandler::getItemByOcsUrl', [event.args[0]]);
            }
            else if (event.channel === 'external-url') {
                shell.openExternal(event.args[0]);
            }
        });
    }

    function setupStatusManager() {
        statusManager.registerAction('check-update', (resolve, reject) => {
            console.log('Checking for update');
            fetch(releaseMeta.releasemeta)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(new Error('Network response was not ok'));
            })
            .then((data) => {
                if (data.versioncode > releaseMeta.versioncode) {
                    console.log('Found newer version');
                    resolve(data);
                }
            })
            .catch((error) => {
                reject(error);
            });
        });

        statusManager.registerView('check-update', (state) => {
            root.mainArea.upgradePage.update(state);
            root.mainArea.browsePage.toolBar.showUpgradeButton();
            root.mainArea.aboutPage.toolBar.showUpgradeButton();
            root.mainArea.upgradePage.toolBar.showUpgradeButton();
        });

        statusManager.registerAction('ocs-url', (resolve, reject, params) => {
            sendWebSocketMessage('', 'ItemHandler::getItemByOcsUrl', [params.ocsUrl]);
        });

        statusManager.registerAction('menu', () => {
            root.toggleMenuArea();
        });

        statusManager.registerAction('start-page', (resolve, reject, params) => {
            const config = new electronConfig({name: 'application'});
            config.set('startPage', params.startPage);
            browseWebview.setAttribute('src', params.startPage);
        });

        statusManager.registerAction('browse-webview-back', () => {
            if (browseWebview.canGoBack()) {
                browseWebview.goBack();
            }
        });

        statusManager.registerAction('browse-webview-forward', () => {
            if (browseWebview.canGoForward()) {
                browseWebview.goForward();
            }
        });

        statusManager.registerAction('browse', () => {
            root.mainArea.changePage('browsePage');
        });

        statusManager.registerAction('downloads', () => {
            root.mainArea.changePage('downloadsPage');
        });

        statusManager.registerAction('about', () => {
            root.mainArea.changePage('aboutPage');
        });

        statusManager.registerAction('upgrade', () => {
            root.mainArea.changePage('upgradePage');
        });

        statusManager.dispatch('check-update');
    }

    function setupEvent() {
        root.element.addEventListener('click', (event) => {
            if (event.target.closest('button[data-dispatch]')) {
                event.preventDefault();
                event.stopPropagation();
                const targetElement = event.target.closest('button[data-dispatch]');
                const type = targetElement.getAttribute('data-dispatch');
                let params = {};
                if (targetElement.getAttribute('data-params')) {
                    params = JSON.parse(targetElement.getAttribute('data-params'));
                }
                statusManager.dispatch(type, params);
            }
            else if (event.target.closest('a[data-dispatch]')) {
                event.preventDefault();
                event.stopPropagation();
                const targetElement = event.target.closest('a[data-dispatch]');
                const type = targetElement.getAttribute('data-dispatch');
                let params = {};
                if (targetElement.getAttribute('data-params')) {
                    params = JSON.parse(targetElement.getAttribute('data-params'));
                }
                statusManager.dispatch(type, params);
            }
            else if (event.target.closest('a[target]')) {
                event.preventDefault();
                event.stopPropagation();
                shell.openExternal(event.target.closest('a[target]').getAttribute('href'));
            }
        }, false);
    }

    function sendWebSocketMessage(id, func, data) {
        webSocket.send(JSON.stringify({
            id: id,
            func: func,
            data: data
        }));
    }

    setupWebSocket();
    setupComponent();
    setupWebView();
    setupStatusManager();
    setupEvent();
}
