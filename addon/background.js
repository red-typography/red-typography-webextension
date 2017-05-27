'use strict';

var App = {
    init: function() {
        this.initSettings();

        this.initStorage();
        this.initMenus();
    },

    getDefaultLocale: function(rawLocale) {
        let locale = rawLocale || browser.i18n.getUILanguage();
        if (!Typograf.hasLocale(locale)) {
            locale = 'en-US';
        }

        return locale;
    },

    initSettings: function() {
        this._settings = {
            locale: this.getDefaultLocale(''),
            type: '',
            enableRule: {},
            disableRule: {}
        };
    },
    initStorage: function() {
        var onLoad = data => {
                if (data.settings) {
                    this._settings = data.settings;
                } else {
                    this.initSettings();
                }

                this.update();
            },
            onError = () => {
                this.initSettings();

                this.update();
            };

        browser.storage.onChanged.addListener(changes => {
            this._settings = changes.settings.newValue;
            this.update();
        });

        if (isChrome) {
            browser.storage.local.get('settings', onLoad);
        } else {
            browser.storage.local.get('settings').then(onLoad, onError);
        }
    },

    update: function() {
        this.updateActionButton();
        this.updateTypograf();
    },

    initMenus: function() {
        const menus = browser.contextMenus;

        menus.create({
            id: 'typograf-do',
            title: _('typograf_execute'),
            contexts: ['editable']
        });

        menus.onClicked.addListener(function(info, tab) {
            if (info.menuItemId === 'typograf-do') {
                browser.tabs.sendMessage(tab.id, {
                    command: 'get-text'
                });
            }
        });

        browser.commands.onCommand.addListener(function(command) {
            function getActiveTab(tabs) {
                for (var tab of tabs) {
                    browser.tabs.sendMessage(tab.id, {
                        command: 'get-text'
                    });
                }
            }

            if (command === 'typograf-key') {
                var querying = browser.tabs.query({currentWindow: true, active: true});
                querying.then(getActiveTab, function(){});
            }
        });

        browser.runtime.onMessage.addListener((message, data) => {
            if (message && message.command === 'get-text') {
                var text = message.text;
                if (message.selectionStart !== message.selectionEnd) {
                    text = message.text.substring(message.selectionStart, message.selectionEnd);
                }

                browser.tabs.sendMessage(data.tab.id, {
                    command: 'set-text',
                    oldText: message.text,
                    text: this.typografExecute(text),
                    selectionStart: message.selectionStart,
                    selectionEnd: message.selectionEnd
                });
            }
        });
    },

    updateActionButton: function() {
        const action = browser.browserAction;

        action.setBadgeBackgroundColor({color: '#A00'});
        action.setBadgeText({text: this.getDefaultLocale(this._settings.locale).toUpperCase()});
    },

    updateTypograf: function() {
        const settings = this._settings;
        this._typograf = new Typograf({
            locale: [settings.locale, 'en-US'],
            htmlEntity: this.getHtmlEntitySettings(settings.mode),
            enableRule: Object.keys(settings.enableRule || {}),
            disableRule: Object.keys(settings.disableRule || {})
        });
    },

    getHtmlEntitySettings: function(mode) {
        mode = mode || '';

        return {
            type: mode.replace(/-invisible/, ''),
            onlyInvisible: mode.search('-invisible') !== -1
        };
    },

    typografExecute: function(text) {
        return this._typograf ? this._typograf.execute(text) : text;
    }
};

App.init();
