'use strict';

import Component from 'js/Component.js';

import ToolBar from './ToolBar.js';
import StatusBar from './StatusBar.js';
import MainArea from './MainArea.js';
import MenuArea from './MenuArea.js';

export default class Root extends Component {

    init() {
        console.log('Component building started');
    }

    complete() {
        console.log('Component building completed');
    }

    html() {
        return `
            <div class="main-view">
            <nav data-component="ToolBar"></nav>
            <main data-component="MainArea" role="main"></main>
            <nav data-component="StatusBar"></nav>
            </div>

            <aside data-component="MenuArea"></aside>
        `;
    }

    style() {
        this.element.style.display = 'flex';
        this.element.style.flexFlow = 'row nowrap';
        this.element.style.width = '100%';
        this.element.style.height = '100%';

        return `
            .main-view {
                display: flex;
                flex-flow: column nowrap;

                flex: 1 1 auto;
                width: auto;
                height: 100%;
            }
        `;
    }

    script() {
        this.toolBar = new ToolBar('[data-component="ToolBar"]');
        this.statusBar = new StatusBar('[data-component="StatusBar"]');
        this.mainArea = new MainArea('[data-component="MainArea"]');
        this.menuArea = new MenuArea('[data-component="MenuArea"]');
    }

}
