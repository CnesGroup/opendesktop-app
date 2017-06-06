'use strict';

const electronConfig = require('electron-config');

import Component from 'js/Component.js';

import packageMeta from '../../../package.json';

export default class SidePanel extends Component {

    html() {
        return `
            <header class="menu-items-header">
            <div class="banner icon-opendesktop-app"></div>
            <h1 class="title">${packageMeta.productName}</h1>
            </header>

            <ul class="menu-items-main">
            <li><span class="menu-label">Choose Startpage</span></li>
            <li>
            <select class="menu-item" name="startPage">
            <option value="https://www.opendesktop.org/">opendesktop.org</option>
            <option value="https://www.gnome-look.org/">gnome-look.org</option>
            <option value="https://store.kde.org/">store.kde.org</option>
            <option value="https://www.xfce-look.org/">xfce-look.org</option>
            <option value="https://www.box-look.org/">box-look.org</option>
            <option value="https://www.enlightenment-themes.org/">enlightenment-themes.org</option>
            </select>
            </li>
            <li><button class="menu-item" data-dispatch="collection-page">My Collection</button></li>
            </ul>

            <ul class="menu-items-footer">
            <li><button class="menu-item" data-dispatch="about-page">About This App</button></li>
            </ul>
        `;
    }

    style() {
        this.element.style.display = 'flex';
        this.element.style.flexFlow = 'column nowrap';
        this.element.style.flex = '0 0 auto';
        this.element.style.width = '300px';
        this.element.style.height = '100%';
        this.element.style.borderLeft = '1px solid #cccccc';
        this.element.style.background = '#007ac1';

        return `
            .menu-items-header {
                flex: 0 0 auto;
                width: 100%;
                height: 48px;
                padding: 4px;
                background-color: #006db3;
            }

            .menu-items-main {
                flex: 1 1 auto;
                width: 80%;
                height: 100%;
                margin: 0 auto;
                padding: 0.4em;
                list-style: none;
            }

            .menu-items-footer {
                flex: 1 1 auto;
                width: 80%;
                height: auto;
                margin: 0 auto;
                padding: 0.4em;
                list-style: none;
            }

            .menu-items-header .banner {
                height: 40px;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
            }
            .menu-items-header .title {
                display: none;
            }

            .menu-items-main li,
            .menu-items-footer li {
                padding: 0.4em;
                text-align: center;
            }

            .menu-label {
                color: rgba(255,255,255,0.7);
                font-weight: bold;
            }

            .menu-item {
                display: block;
                width: 100%;
                padding: 0.6em;
                border: 2px solid rgba(255,255,255,0.1);
                border-radius: 0.6em;
                outline: none;
                background-color: transparent;
                color: rgba(255,255,255,0.7);
                font-weight: bold;
                transition: background-color 0.3s ease-out;
            }
            .menu-item:hover,
            .menu-item:active {
                background-color: #03a9f4;
            }

            .menu-item option {
                background-color: #ffffff;
                color: #222222;
            }
        `;
    }

    script() {
        this.toggle();

        const config = new electronConfig({name: 'application'});

        const selectElement = this.element.querySelector('.menu-item[name="startPage"]');
        const targetElement = selectElement.querySelector(`option[value="${config.get('startPage')}"]`);

        if (targetElement) {
            targetElement.setAttribute('selected', 'selected');
        }

        selectElement.addEventListener('change', (event) => {
            event.preventDefault();
            event.stopPropagation();
            document.dispatchEvent(new CustomEvent('start-page', {detail: {startPage: event.target.value}}));
        }, false);
    }

    toggle() {
        this.element.style.display = this.element.style.display === 'flex' ? 'none' : 'flex';
    }

}
