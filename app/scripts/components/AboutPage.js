'use strict';

import Component from 'js/Component.js';

import appConfig from '../../configs/application.json';

import packageMeta from '../../../package.json';

export default class AboutPage extends Component {

    html() {
        return `
            <div class="about-page-content">
            <div class="banner icon-opendesktop-app"></div>
            <h1 class="title">${appConfig.title}</h1>
            <h3 class="version">Version ${packageMeta.version}</h3>
            <p class="description">${packageMeta.description}</p>
            <p>Author: ${packageMeta.author}</p>
            <p>License: ${packageMeta.license}</p>
            <p>Website: <a href="${packageMeta.homepage}" target="_blank">${packageMeta.homepage}</a></p>
            </div>
        `;
    }

    style() {
        this.element.style.width = '100%';
        this.element.style.height = '100%';
        this.element.style.overflow = 'auto';

        return `
            .about-page-content {
                width: 640px;
                margin: 2em auto;
            }

            .about-page-content > h1,
            .about-page-content > h3,
            .about-page-content > p {
                text-align: center;
            }

            .about-page-content .banner {
                height: 128px;
                margin-bottom: 2em;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
            }

            .about-page-content .description {
                margin: 1em 0;
            }
        `;
    }

}
