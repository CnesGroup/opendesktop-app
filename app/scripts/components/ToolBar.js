'use strict';

import Component from 'js/Component.js';

export default class ToolBar extends Component {

    init() {
        if (!this.state) {
            this.state = {
                backAction: '',
                forwardAction: '',
                homeAction: '',
                collectionAction: ''
            };
        }
    }

    html() {
        let navigation = '';

        if (this.state.backAction) {
            navigation += `<button class="tool-button icon-chevron-left" data-dispatch="${this.state.backAction}"></button>`;
        }
        else {
            navigation += `<button class="tool-button icon-chevron-left" disabled></button>`;
        }

        if (this.state.forwardAction) {
            navigation += `<button class="tool-button icon-chevron-right" data-dispatch="${this.state.forwardAction}"></button>`;
        }
        else {
            navigation += `<button class="tool-button icon-chevron-right" disabled></button>`;
        }

        if (this.state.homeAction) {
            navigation += `<button class="tool-button icon-home" data-dispatch="${this.state.homeAction}"></button>`;
        }
        else {
            navigation += `<button class="tool-button icon-home" disabled></button>`;
        }

        if (this.state.collectionAction) {
            navigation += `<button class="tool-button icon-folder" data-dispatch="${this.state.collectionAction}"></button>`;
        }
        else {
            navigation += `<button class="tool-button icon-folder" disabled></button>`;
        }

        return `
            <nav class="tool-bar">
            ${navigation}
            <span class="indicator icon-loading"></span>
            <span class="spacer"></span>
            <button class="tool-button icon-info" data-dispatch="upgrade"></button>
            <button class="tool-button icon-menu" data-dispatch="menu"></button>
            </nav>
        `;
    }

    style() {
        this.element.style.borderBottom = '1px solid #cccccc';
        this.element.style.background = '#e0e0e0';

        return `
            .tool-bar {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                height: 100%;
            }

            .tool-bar .spacer {
                display: inline-block;
                flex: 1 1 auto;
            }

            .tool-bar .indicator {
                flex: 0 0 auto;
                display: inline-block;
                width: 24px;
                height: 24px;
                margin: 0 0.4em;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
            }

            .tool-button {
                flex: 0 0 auto;
                display: inline-block;
                width: 32px;
                height: 32px;
                margin: 0 0.2em;
                border: 1px solid rgba(0,0,0,0.1);
                border-radius: 0.6em;
                outline: none;
                background-color: transparent;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
                transition: background-color 0.3s ease-out;
            }
            .tool-button:hover,
            .tool-button:active {
                background-color: #c7c7c7;
            }

            .tool-button[disabled] {
                opacity: 0.5;
            }

            .tool-button[data-dispatch="upgrade"] {
                background-color: #ec407a;
            }
            .tool-button[data-dispatch="upgrade"]:hover,
            .tool-button[data-dispatch="upgrade"]:active {
                background-color: #d81b60;
            }
        `;
    }

    script() {
        this.hideIndicator();
        this.hideUpgradeButton();
    }

    showIndicator() {
        this.element.querySelector('.indicator').style.display = 'inline-block';
    }

    hideIndicator() {
        this.element.querySelector('.indicator').style.display = 'none';
    }

    showUpgradeButton() {
        this.element.querySelector('[data-dispatch="upgrade"]').style.display = 'inline-block';
    }

    hideUpgradeButton() {
        this.element.querySelector('[data-dispatch="upgrade"]').style.display = 'none';
    }

}
