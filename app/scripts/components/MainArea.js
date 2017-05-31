'use strict';

import Component from 'js/Component.js';

import StartupPage from './StartupPage.js';
import BrowsePage from './BrowsePage.js';
import CollectionPage from './CollectionPage.js';
import InstalledItemsPage from './InstalledItemsPage.js';
import AboutPage from './AboutPage.js';
import UpgradePage from './UpgradePage.js';

export default class Root extends Component {

    html() {
        return `
            <article data-component="StartupPage"></article>
            <article data-component="BrowsePage"></article>
            <article data-component="CollectionPage"></article>
            <article data-component="InstalledItemsPage"></article>
            <article data-component="AboutPage"></article>
            <article data-component="UpgradePage"></article>
        `;
    }

    style() {
        this.element.style.flex = '1 1 auto';
        this.element.style.width = '100%';
        this.element.style.height = 'auto';
        this.element.style.background = '#ffffff';

        return `
            [data-component="StartupPage"] {
                z-index: 999;
                position: absolute;
                left: 0;
                top: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-flow: column nowrap;
                width: 100%;
                height: 100%;
            }

            [data-component="BrowsePage"],
            [data-component="CollectionPage"],
            [data-component="InstalledItemsPage"],
            [data-component="AboutPage"],
            [data-component="UpgradePage"] {
                display: flex;
                flex-flow: column nowrap;
                width: 100%;
                height: 100%;
            }
        `;
    }

    script() {
        this.startupPage = new StartupPage('[data-component="StartupPage"]');
        this.browsePage = new BrowsePage('[data-component="BrowsePage"]');
        this.collectionPage = new CollectionPage('[data-component="CollectionPage"]');
        this.installedItemsPage = new InstalledItemsPage('[data-component="InstalledItemsPage"]');
        this.aboutPage = new AboutPage('[data-component="AboutPage"]');
        this.upgradePage = new UpgradePage('[data-component="UpgradePage"]');

        this.hideAllPages();
    }

    hideAllPages() {
        for (const key of Object.keys(this)) {
            if (key.endsWith('Page') && this[key].element) {
                this[key].element.style.display = 'none';
            }
        }
    }

    changePage(key) {
        if (this[key] && this[key].element) {
            this.hideAllPages();
            this[key].element.style.display = 'flex';
        }
    }

    showStartupPage() {
        this.startupPage.element.style.display = 'flex';
    }

    hideStartupPage() {
        this.startupPage.element.style.display = 'none';
    }

}
