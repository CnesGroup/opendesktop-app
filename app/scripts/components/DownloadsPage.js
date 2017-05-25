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
            list += `<li><a href="#" data-dispatch="installed-items" data-params='${params}'>${installTypes[type]}</a></li>`;
        }

        return `
            <header data-component="ToolBar"></header>
            <div class="downloads-page-content">
            <h1 class="title">Downloads</h1>
            <ul class="installtypes">${list}</ul>
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
                margin: 2em 0;
            }

            .downloads-page-content .installtypes {
                width: 480px;
                border: 2px solid rgba(0,0,0,0.1);
                /*border-radius: 0.6em;*/
                list-style: none;
            }

            .downloads-page-content .installtypes li {
                border-top: 2px solid rgba(0,0,0,0.1);
            }
            .downloads-page-content .installtypes li:first-child {
                border-top-width: 0;
            }

            .downloads-page-content .installtypes li a {
                display: block;
                padding: 0.6em;
                background-color: transparent;
                color: #222222;
                text-decoration: none;
                transition: background-color 0.3s ease-out;
            }
            .downloads-page-content .installtypes li a:hover,
            .downloads-page-content .installtypes li a:active {
                background-color: #03a9f4;
            }
        `;
    }

    script() {
        this.toolBar = new ToolBar(
            this.element.querySelector('[data-component="ToolBar"]'),
            {navigation: false, menu: true}
        );
        this.statusBar = new StatusBar(this.element.querySelector('[data-component="StatusBar"]'));
    }

}
