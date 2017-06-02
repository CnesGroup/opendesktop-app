'use strict';

import Component from 'js/Component.js';

import appConfig from '../../configs/application.json';

import packageJson from '../../../package.json';

export default class AboutPage extends Component {

    html() {
        return `
            <div class="about-page-content">
            <div class="banner icon-opendesktop-app"></div>
            <h1 class="title">${appConfig.title}</h1>
            <h3 class="version">Version ${packageJson.version}</h3>
            <p class="description">${packageJson.description}</p>
            <p>Author: ${packageJson.author}</p>
            <p>License: ${packageJson.license}</p>
            <p>Website: <a href="${packageJson.homepage}" target="_blank">${packageJson.homepage}</a></p>
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
