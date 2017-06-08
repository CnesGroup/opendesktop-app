'use strict';

import Component from 'js/Component.js';

export default class InstalledItemsPage extends Component {

    html() {
        if (!this.state) {
            return '';
        }

        const type = this.state.installType;
        let totalFiles = 0;

        let list = '';
        for (const itemKey of Object.keys(this.state.installedItems)) {
            const installedItem = this.state.installedItems[itemKey];
            if (installedItem.install_type === type) {
                let previewPic = '';
                if (installedItem.provider && installedItem.content_id) {
                    previewPic = `${installedItem.provider}content/previewpic/${installedItem.content_id}`;
                }
                for (const file of installedItem.files) {
                    totalFiles++;
                    const path = `${this.state.installTypes[type].destination}/${file}`;
                    const openFileParams = JSON.stringify({path: path});
                    const applyFileParams = JSON.stringify({path: path, installType: type});
                    const removeFileParams = JSON.stringify({itemKey: itemKey});
                    let applyCell = '';
                    if (this.state.isApplicableType) {
                        applyCell = `
                            <td class="apply-file-cell">
                            <button data-dispatch="apply-file" data-params='${applyFileParams}'>Apply</button>
                            </td>
                        `;
                    }
                    list += `
                        <tr>
                        <td class="open-file-cell">
                        <a href="#" data-dispatch="open-file" data-params='${openFileParams}'>
                        <img src="${previewPic}" width="48" height="48" class="previewpic">
                        ${file}
                        </a>
                        </td>
                        ${applyCell}
                        <td class="remove-file-cell">
                        <button data-dispatch="remove-file" data-params='${removeFileParams}'>Remove</button>
                        </td>
                        </tr>
                    `;
                }
            }
        }

        return `
            <div class="installeditems-page-content">
            <h1 class="title">${this.state.installTypes[type].name} <span class="badge">${totalFiles}</span></h1>
            <table class="installeditems">${list}</table>
            </div>
        `;
    }

    style() {
        this.element.style.width = '100%';
        this.element.style.height = '100%';
        this.element.style.overflow = 'auto';

        return `
            .installeditems-page-content {
                width: 640px;
                margin: 2em auto;
            }

            .installeditems-page-content .title {
                margin-bottom: 1em;
                text-align: center;
            }

            .installeditems-page-content .installeditems {
                width: 100%;
                border-top: 1px solid rgba(0,0,0,0.1);
                border-bottom: 1px solid rgba(0,0,0,0.1);
                border-collapse: collapse;
            }

            .installeditems-page-content .installeditems tr {
                border-top: 1px solid rgba(0,0,0,0.1);
            }

            .installeditems-page-content .installeditems .open-file-cell {
                width: 100%;
            }

            .installeditems-page-content .installeditems .previewpic {
                width: 48px;
                height: 48px;
                margin-right: 0.2em;
                border: 0;
                vertical-align: middle;
            }

            .installeditems-page-content .installeditems a {
                display: block;
                padding: 0.6em;
                background-color: transparent;
                color: #222222;
                text-decoration: none;
                transition: background-color 0.3s ease-out;
            }
            .installeditems-page-content .installeditems a:hover,
            .installeditems-page-content .installeditems a:active {
                background-color: #e0e0e0;
            }

            .installeditems-page-content .installeditems button {
                margin: 0 0.2em;
                padding: 0.3em 0.5em;
            }

            .installeditems-page-content .badge {
                padding: 0.2em 0.6em;
                border-radius: 0.6em;
                background-color: #cccccc;
                color: #ffffff;
                font-size: 80%;
            }
        `;
    }

}
