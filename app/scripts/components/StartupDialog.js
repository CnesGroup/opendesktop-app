'use strict';

import Component from 'js/Component.js';

export default class StartupDialog extends Component {

    html() {
        return `
            <div class="startup-dialog-content">
            <div class="banner icon-opendesktop-app"></div>
            <h1 class="title">Welcome to Opendesktop.org</h1>
            <span class="indicator icon-loading">Starting</span>
            </div>
        `;
    }

    style() {
        this.element.style.zIndex = '999';
        this.element.style.position = 'absolute';
        this.element.style.left = '0';
        this.element.style.top = '0';
        this.element.style.display = 'flex';
        this.element.style.flexFlow = 'column nowrap';
        this.element.style.justifyContent = 'center';
        this.element.style.alignItems = 'center';
        this.element.style.width = '100%';
        this.element.style.height = '100%';
        this.element.style.overflow = 'hidden';

        return `
            .startup-dialog-content {
                display: flex;
                flex-flow: column nowrap;
                justify-content: center;
                align-items: center;
                width: 460px;
                height: 300px;
                padding: 2em;
                border-radius: 0.6em;
                background-color: #eeeeee;
                box-shadow: 0 0 2em 0.6em rgba(0,0,0,0.2);
            }

            .startup-dialog-content .banner {
                width: 128px;
                height: 128px;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
            }

            .startup-dialog-content .title {
                margin: 2em 0;
                font-size: 100%;
            }

            .startup-dialog-content .indicator {
                display: inline-block;
                padding-left: 24px;
                background-position: left center;
                background-repeat: no-repeat;
                background-size: 16px 16px;
            }
        `;
    }

    script() {
        this.hide();
    }

    show() {
        this.element.style.display = 'flex';
    }

    hide() {
        this.element.style.display = 'none';
    }

}
