if ('browser' in this) {
    this.isChrome = false;
} else {
    this.browser = chrome;
    this.isChrome = true;
}

this._ = function(id) {
    id = (id || '').replace(/-/g, '_'); // For Chrome

    return browser.i18n.getMessage(id);
};
