'use strict';

import Component from 'js/Component.js';

import ToolBar from './ToolBar.js';

export default class DownloadsPage extends Component {

    html() {
        if (!this.state) {
            return '';
        }

        let list = '';
        // for () {}

        return `
            <header data-component="ToolBar"></header>
            <div class="downloads-page-content">
            <h1 class="title">Downloads</h1>
            <ul class="installtypes">${list}</ul>
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

            .downloads-page-content {
                flex: 1 1 auto;
                width: 100%;
                height: 100%;

                display: flex;
                flex-flow: column nowrap;
                align-items: center;
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
