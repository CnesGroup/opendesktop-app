'use strict';

import Component from 'js/Component.js';

export default class StatusBar extends Component {

    html() {
        if (!this.state) {
            return '';
        }

        return `
            <p class="status-bar">${this.state.message}</p>
        `;
    }

    style() {
        this.element.style.borderTop = '1px solid #cccccc';
        this.element.style.background = '#e0e0e0';

        return `
            .status-bar {
                font-size: 90%;
            }
        `;
    }

}
