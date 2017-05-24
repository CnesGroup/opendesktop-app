'use strict';

import Component from 'js/Component.js';

import ToolBar from './ToolBar.js';

export default class InstalledItemsPage extends Component {

    html() {
        if (!this.state) {
            return '';
        }

        const type = this.state.installType;

        let list = '';
        for (const itemKey of Object.keys(this.state.installedItems)) {
            if (this.state.installedItems[itemKey].install_type === type) {
                for (const file of this.state.installedItems[itemKey].files) {
                    const path = `${this.state.installTypes[type].destination}/${file}`;
                    const params = JSON.stringify({path: path, installType: type});
                    list += `<li><a href="#" data-dispatch="open-file" data-params='${params}'>${file}</a></li>`;
                }
            }
        }

        return `
            <header data-component="ToolBar"></header>
            <div class="installeditems-page-content">
            <h1 class="title">${this.state.installTypes[type].name}</h1>
            <ul class="installeditems">${list}</ul>
            </div>
        `;
    }

    style() {
        return `
            [data-component="ToolBar"] {
                flex: 0 0 auto;
                width: 100%;
                height: 48px;
            }

            .installeditems-page-content {
                flex: 1 1 auto;
                width: 100%;
                height: 100%;

                display: flex;
                flex-flow: column nowrap;
                align-items: center;
            }

            .installeditems-page-content .title {
                margin: 2em 0;
            }

            .installeditems-page-content .installeditems {
                width: 480px;
                border: 2px solid rgba(0,0,0,0.1);
                /*border-radius: 0.6em;*/
                list-style: none;
            }

            .installeditems-page-content .installeditems li {
                border-top: 2px solid rgba(0,0,0,0.1);
            }
            .installeditems-page-content .installeditems li:first-child {
                border-top-width: 0;
            }

            .installeditems-page-content .installeditems li a {
                display: block;
                padding: 0.6em;
                background-color: transparent;
                color: #222222;
                text-decoration: none;
                transition: background-color 0.3s ease-out;
            }
            .installeditems-page-content .installeditems li a:hover,
            .installeditems-page-content .installeditems li a:active {
                background-color: #03a9f4;
            }
        `;
    }

    script() {
        this.toolBar = new ToolBar(
            this.element.querySelector('[data-component="ToolBar"]'),
            {navigation: false, menu: true}
        );
    }

}
