import { Settings } from '../settings';
import { getBrowser, isChrome } from '../utils/browser';

import './index.css';

const browser = getBrowser();

document.addEventListener('DOMContentLoaded', () => {
    function onLoad(data: any) {
        new Settings(data.settings);
    }

    function onError() {
        new Settings({});
    }

    if (isChrome) {
        browser.storage.local.get('settings', onLoad);
    } else {
        browser.storage.local.get('settings').then(onLoad, onError);
    }
}, false);
