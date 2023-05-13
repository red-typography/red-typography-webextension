// importScripts('popup/typograf.all.js');
// importScripts('popup/browser.js');

class App {
    constructor() {
        this.initSettings();
        this.initStorage();
        this.initMenus();
    }

    getDefaultLocale(rawLocale) {
        let locale = rawLocale || browser.i18n.getUILanguage();

        if (!Typograf.hasLocale(locale)) {
            locale = 'en-US';
        }

        return locale;
    }

    initSettings() {
        this._settings = {
            locale: this.getDefaultLocale(''),
            type: '',
            enableRule: {},
            disableRule: {}
        };
    }

    initStorage() {
        const onLoad = data => {
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
    }

    update() {
        this.updateActionButton();
        this.updateTypograf();
    }

    initMenus() {
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
                for (let tab of tabs) {
                    browser.tabs.sendMessage(tab.id, {
                        command: 'get-text'
                    });
                }
            }

			const params = {currentWindow: true, active: true};
            if (command === 'typograf-key') {
				if (isChrome) {
					browser.tabs.query(params, getActiveTab);
				} else {
					const querying = browser.tabs.query(params);
					querying.then(getActiveTab, function(){});
				}
            }
        });

        browser.runtime.onMessage.addListener((message, data) => {
            if (message && message.command === 'get-text') {
                let text = message.text;
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
    }

    updateActionButton() {
        const action = browser.action || browser.browser_action; // Fix for Firefox

        action.setBadgeBackgroundColor({color: '#A00'});
        action.setBadgeText({
            text: this.getDefaultLocale(this._settings.locale).toUpperCase()
        });
    }

    updateTypograf() {
        const settings = this._settings;
        this._typograf = new Typograf({
            locale: [settings.locale, 'en-US'],
            htmlEntity: {
                type: settings.type,
                onlyInvisible: settings.onlyInvisible
            },
            enableRule: Object.keys(settings.enableRule || {}),
            disableRule: Object.keys(settings.disableRule || {})
        });
    }

    typografExecute(text) {
        return this._typograf ? this._typograf.execute(text) : text;
    }
}

new App();
