'use strict';

import Component from 'js/Component.js';

export default class StatusBarItem extends Component {

    html() {
        if (!this.state) {
            return '';
        }

        let indicator = '';
        let openButton = '';
        let removeButton = '';
        let message = this.state.message;

        if (this.state.status === 'success_downloadstart'
            || this.state.status === 'success_savestart'
            || this.state.status === 'success_installstart'
        ) {
            indicator = '<span class="statusbaritem-indicator icon-loading"></span>';
        }
        else if (this.state.status === 'success_download') {
            message = 'Downloaded';
        }
        else if (this.state.status === 'success_save') {
            const openButtonParams = JSON.stringify({installType: this.state.metadata.install_type});
            const removeButtonParams = JSON.stringify(this.state);
            openButton = `<button class="statusbaritem-open-button icon-folder" data-dispatch="open-destination" data-params='${openButtonParams}'></button>`;
            removeButton = `<button class="statusbaritem-remove-button icon-close" data-dispatch="remove-statusbar-item" data-params='${removeButtonParams}'></button>`;
            message = 'Downloaded';
        }
        else if (this.state.status === 'success_install') {
            const openButtonParams = JSON.stringify({installType: this.state.metadata.install_type});
            const removeButtonParams = JSON.stringify(this.state);
            openButton = `<button class="statusbaritem-open-button icon-folder" data-dispatch="installed-items-page" data-params='${openButtonParams}'></button>`;
            removeButton = `<button class="statusbaritem-remove-button icon-close" data-dispatch="remove-statusbar-item" data-params='${removeButtonParams}'></button>`;
            message = 'Installed';
        }
        else {
            const removeButtonParams = JSON.stringify(this.state);
            removeButton = `<button class="statusbaritem-remove-button icon-close" data-dispatch="remove-statusbar-item" data-params='${removeButtonParams}'></button>`;
        }

        return `
            <span class="statusbaritem-message">${message}: ${this.state.metadata.filename}</span>
            ${indicator} ${openButton} ${removeButton}
        `;
    }

    style() {
        this.element.style.display = 'flex';
        this.element.style.flexFlow = 'row nowrap';
        this.element.style.alignItems = 'center';
        this.element.style.flex = '0 0 auto';
        this.element.style.maxWidth = '640px';
        this.element.style.height = '22px';
        this.element.style.border = '1px solid #cccccc';
        this.element.style.borderRadius = '0.2em';
        this.element.style.backgroundColor = '#ffffff';

        return `
            .statusbaritem-message {
                display: inline-block;
                flex: 1 1 auto;
                width: auto;
                font-size: 14px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .statusbaritem-indicator {
                display: inline-block;
                flex: 0 0 auto;
                width: 14px;
                height: 14px;
                margin: 0 0.2em;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
            }

            .statusbaritem-open-button,
            .statusbaritem-remove-button {
                display: inline-block;
                flex: 0 0 auto;
                width: 18px;
                height: 18px;
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
            .statusbaritem-open-button:hover,
            .statusbaritem-remove-button:hover {
                background-color: #c7c7c7;
            }
        `;
    }

}
