'use strict';

import Component from 'js/Component.js';

export default class StatusBar extends Component {

    html() {
        if (!this.state) {
            return '';
        }

        return `
            <p class="statusbar-message">${this.state.message}</p>
        `;
    }

    style() {
        this.element.style.display = 'flex';
        this.element.style.flexFlow = 'row nowrap';
        this.element.style.alignItems = 'center';
        this.element.style.flex = '0 0 auto';
        this.element.style.width = '100%';
        this.element.style.height = '24px';
        this.element.style.borderTop = '1px solid #cccccc';
        this.element.style.background = '#e0e0e0';

        return `
            .statusbar-message {
                margin: 0 0.2em;
                font-size: 90%;
            }
        `;
    }

}
