import { Settings } from '../settings';
import { isChrome } from '../utils/browser';

import './index.css';

document.addEventListener('DOMContentLoaded', () => {
    function onLoad(data) {
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
