'use strict';

import Component from 'js/Component.js';

import ToolBar from './ToolBar.js';
import StatusBar from './StatusBar.js';

export default class DownloadsPage extends Component {

    html() {
        if (!this.state) {
            return '';
        }

        let installTypes = {};
        for (const key of Object.keys(this.state.installedItems)) {
            const type = this.state.installedItems[key].install_type;
            if (!installTypes[type]) {
                installTypes[type] = this.state.installTypes[type].name;
            }
        }

        let list = '';
        for (const type of Object.keys(installTypes)) {
            const params = JSON.stringify({installType: type});
            list += `<tr><td><a href="#" data-dispatch="installed-items" data-params='${params}'>${installTypes[type]}</a></td></tr>`;
        }

        return `
            <header data-component="ToolBar"></header>
            <div class="downloads-page-content">
            <h1 class="title">Downloads</h1>
            <table class="installtypes">${list}</table>
            </div>
            <footer data-component="StatusBar"></footer>
        `;
    }

    style() {
        return `
            [data-component="ToolBar"] {
                flex: 0 0 auto;
                width: 100%;
                height: 48px;
            }

            [data-component="StatusBar"] {
                flex: 0 0 auto;
                width: 100%;
                height: 24px;
            }

            .downloads-page-content {
                flex: 1 1 auto;
                width: 100%;
                height: 100%;

                display: flex;
                flex-flow: column nowrap;
                align-items: center;
                overflow: auto;
            }

            .downloads-page-content .title {
                margin: 1em 0;
            }

            .downloads-page-content .installtypes {
                width: 640px;
                margin: 1em 0;
                border-top: 1px solid rgba(0,0,0,0.1);
                border-bottom: 1px solid rgba(0,0,0,0.1);
                border-collapse: collapse;
            }

            .downloads-page-content .installtypes tr {
                border-top: 1px solid rgba(0,0,0,0.1);
            }

            .downloads-page-content .installtypes a {
                display: block;
                padding: 0.6em;
                background-color: transparent;
                color: #222222;
                text-decoration: none;
                transition: background-color 0.3s ease-out;
            }
            .downloads-page-content .installtypes a:hover,
            .downloads-page-content .installtypes a:active {
                background-color: #03a9f4;
            }
        `;
    }

    script() {
        this.toolBar = new ToolBar(this.element.querySelector('[data-component="ToolBar"]'));
        this.statusBar = new StatusBar(this.element.querySelector('[data-component="StatusBar"]'));
    }

}
