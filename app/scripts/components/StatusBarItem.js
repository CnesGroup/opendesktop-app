'use strict';

import Component from 'js/Component.js';

export default class StatusBarItem extends Component {

    html() {
        if (!this.state) {
            return '';
        }

        return `
            <span class="statusbaritem-indicator icon-loading"></span>
            <span class="statusbaritem-message">
            ${this.state.message}<br>
            ${this.state.metadata.filename}
            </span>
        `;
    }

    style() {
        this.element.style.display = 'flex';
        this.element.style.flexFlow = 'row nowrap';
        this.element.style.alignItems = 'center';
        this.element.style.flex = '0 0 auto';
        this.element.style.width = '150px';
        this.element.style.height = '22px';
        this.element.style.border = '1px solid #cccccc';
        this.element.style.borderRadius = '0.2em';
        this.element.style.background = '#e0e0e0';

        return `
            .statusbaritem-indicator {
                display: inline-block;
                flex: 0 0 auto;
                width: 22px;
                height: 22px;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
            }

            .statusbaritem-message {
                display: inline-block;
                flex: 1 1 auto;
                width: auto;
                height: 22px;
                font-size: 10px;
            }
        `;
    }

}
