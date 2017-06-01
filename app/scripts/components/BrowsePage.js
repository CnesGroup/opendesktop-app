'use strict';

import Component from 'js/Component.js';

export default class BrowsePage extends Component {

    html() {
        return `
            <webview data-webview="browse"></webview>
        `;
    }

    style() {
        this.element.style.display = 'flex';
        this.element.style.flexFlow = 'column nowrap';
        this.element.style.width = '100%';
        this.element.style.height = '100%';

        return `
            [data-webview="browse"] {
                flex: 1 1 auto;
                width: 100%;
                height: 100%;
            }
        `;
    }

}
