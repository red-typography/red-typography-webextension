'use strict';

if ('chrome' in this) {
    this.browser = chrome;
    this.isChrome = true;
} else {
    this.isChrome = false;
}

this._ = function(id) {
    id = (id || '').replace(/-/g, '_'); // For Chrome

    return browser.i18n.getMessage(id);
};
