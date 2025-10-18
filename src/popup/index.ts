import { Settings, TypografParams } from '../settings';
import { getBrowser, isChrome } from '../utils/browser';

import './index.css';

const browser = getBrowser();

document.addEventListener('DOMContentLoaded', () => {
    function onLoad(data: { settings: Partial<TypografParams> }) {
        new Settings(data.settings || {});
    }

    function onError() {
        new Settings({});
    }

    if (isChrome) {
        browser.storage.local.get('settings', onLoad);
    } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        browser.storage.local.get('settings').then(onLoad, onError);
    }
}, false);
