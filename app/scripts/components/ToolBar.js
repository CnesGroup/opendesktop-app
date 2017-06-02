'use strict';

import Component from 'js/Component.js';

export default class ToolBar extends Component {

    init() {
        if (!this.state) {
            this.state = {
                backAction: '',
                forwardAction: '',
                homeAction: '',
                collectionAction: '',
                indicator: false,
                upgrade: false
            };
        }
    }

    html() {
        const backButtonAttr = this.state.backAction ? `data-dispatch="${this.state.backAction}"` : 'disabled';
        const forwardButtonAttr = this.state.forwardAction ? `data-dispatch="${this.state.forwardAction}"` : 'disabled';
        const homeButtonAttr = this.state.homeAction ? `data-dispatch="${this.state.homeAction}"` : 'disabled';
        const collectionButtonAttr = this.state.collectionAction ? `data-dispatch="${this.state.collectionAction}"` : 'disabled';

        return `
            <button class="toolbar-button icon-chevron-left" ${backButtonAttr}></button>
            <button class="toolbar-button icon-chevron-right" ${forwardButtonAttr}></button>
            <button class="toolbar-button icon-home" ${homeButtonAttr}></button>
            <button class="toolbar-button icon-folder" ${collectionButtonAttr}></button>
            <span class="toolbar-indicator icon-loading"></span>
            <span class="toolbar-spacer"></span>
            <button class="toolbar-button icon-info" data-dispatch="upgrade-page"></button>
            <button class="toolbar-button icon-menu" data-dispatch="side-panel"></button>
        `;
    }

    style() {
        this.element.style.display = 'flex';
        this.element.style.flexFlow = 'row nowrap';
        this.element.style.alignItems = 'center';
        this.element.style.flex = '0 0 auto';
        this.element.style.width = '100%';
        this.element.style.height = '48px';
        this.element.style.borderBottom = '1px solid #cccccc';
        this.element.style.background = '#e0e0e0';

        return `
            .toolbar-button {
                display: inline-block;
                flex: 0 0 auto;
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
            .toolbar-button:hover,
            .toolbar-button:active {
                background-color: #c7c7c7;
            }

            .toolbar-button[disabled] {
                opacity: 0.5;
            }

            .toolbar-button[data-dispatch="upgrade-page"] {
                background-color: #ec407a;
            }
            .toolbar-button[data-dispatch="upgrade-page"]:hover,
            .toolbar-button[data-dispatch="upgrade-page"]:active {
                background-color: #d81b60;
            }

            .toolbar-indicator {
                display: inline-block;
                flex: 0 0 auto;
                width: 24px;
                height: 24px;
                margin: 0 0.4em;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
            }

            .toolbar-spacer {
                display: inline-block;
                flex: 1 1 auto;
            }
        `;
    }

    script() {
        this.state.indicator ? this.showIndicator() : this.hideIndicator();
        this.state.upgrade ? this.showUpgradeButton() : this.hideUpgradeButton();
    }

    showIndicator() {
        this.state.indicator = true;
        this.element.querySelector('.toolbar-indicator').style.display = 'inline-block';
    }

    hideIndicator() {
        this.state.indicator = false;
        this.element.querySelector('.toolbar-indicator').style.display = 'none';
    }

    showUpgradeButton() {
        this.state.upgrade = true;
        this.element.querySelector('[data-dispatch="upgrade-page"]').style.display = 'inline-block';
    }

    hideUpgradeButton() {
        this.state.upgrade = false;
        this.element.querySelector('[data-dispatch="upgrade-page"]').style.display = 'none';
    }

}
