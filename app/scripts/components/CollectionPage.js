'use strict';

import Component from 'js/Component.js';

export default class CollectionPage extends Component {

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
            list += `<tr><td><a href="#" data-dispatch="installed-items-page" data-params='${params}'>${installTypes[type]}</a></td></tr>`;
        }

        return `
            <div class="collection-page-content">
            <h1 class="title">My Collection</h1>
            <table class="installtypes">${list}</table>
            </div>
        `;
    }

    style() {
        this.element.style.width = '100%';
        this.element.style.height = '100%';
        this.element.style.overflow = 'auto';

        return `
            .collection-page-content {
                width: 640px;
                margin: 2em auto;
            }

            .collection-page-content .title {
                margin-bottom: 1em;
                text-align: center;
            }

            .collection-page-content .installtypes {
                width: 100%;
                border-top: 1px solid rgba(0,0,0,0.1);
                border-bottom: 1px solid rgba(0,0,0,0.1);
                border-collapse: collapse;
            }

            .collection-page-content .installtypes tr {
                border-top: 1px solid rgba(0,0,0,0.1);
            }

            .collection-page-content .installtypes a {
                display: block;
                padding: 0.6em;
                background-color: transparent;
                color: #222222;
                text-decoration: none;
                transition: background-color 0.3s ease-out;
            }
            .collection-page-content .installtypes a:hover,
            .collection-page-content .installtypes a:active {
                background-color: #e0e0e0;
            }
        `;
    }

}
