'use strict';

import Component from 'js/Component.js';

export default class BrowsePage extends Component {

    html() {
        return `
            <webview data-webview="browse"></webview>
        `;
    }

    style() {
        this.element.style.width = '100%';
        this.element.style.height = '100%';
        this.element.style.overflow = 'hidden';

        return `
            [data-webview="browse"] {
                width: 100%;
                height: 100%;
            }
        `;
    }

}
