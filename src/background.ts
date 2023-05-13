import Typograf from 'typograf';
import { getBrowser, isChrome } from './utils/browser';
import { _ } from './utils/i18n';
import { TypografHtmlEntity } from 'typograf/dist/main';

if (isChrome) {
    importScripts('popup/typograf.all.js');
}

const DEFAULT_LOCALE = 'en-US';

interface AppSettings {
    locale: string;
    type: TypografHtmlEntity['type'];
    onlyInvisible: boolean;
    enableRule: Record<string, true>;
    disableRule: Record<string, true>;
}

const browser = getBrowser();

class App {
    private settings: AppSettings;
    private typograf: Typograf;

    constructor() {
        this.initSettings();
        this.initStorage();
        this.initMenus();
    }

    private getDefaultLocale(rawLocale: string) {
        let locale = rawLocale || browser.i18n.getUILanguage();

        if (!window.Typograf.hasLocale(locale)) {
            locale = DEFAULT_LOCALE;
        }

        return locale;
    }

    private initSettings() {
        this.settings = {
            locale: this.getDefaultLocale(''),
            type: 'default',
            onlyInvisible: true,
            enableRule: {},
            disableRule: {},
        };
    }

    private initStorage() {
        const onLoad = data => {
                if (data.settings) {
                    this.settings = data.settings;
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
            this.settings = changes.settings.newValue;
            this.update();
        });

        if (isChrome) {
            browser.storage.local.get('settings', onLoad);
        } else {
            browser.storage.local.get('settings').then(onLoad, onError);
        }
    }

    private update() {
        this.updateActionButton();
        this.updateTypograf();
    }

    private initMenus() {
        const menus = browser.contextMenus;

        menus.create({
            id: 'typograf-do',
            title: _('typograf_execute'),
            contexts: ['editable']
        });

        menus.onClicked.addListener((info, tab) => {
            if (tab && tab.id && info.menuItemId === 'typograf-do') {
                browser.tabs.sendMessage(tab.id, {
                    command: 'get-text'
                });
            }
        });

        browser.commands.onCommand.addListener((command) => {
            function getActiveTab(tabs) {
                for (let tab of tabs) {
                    browser.tabs.sendMessage(tab.id, {
                        command: 'get-text'
                    });
                }
            }

			const params = { currentWindow: true, active: true };
            if (command === 'typograf-key') {
				if (isChrome) {
					browser.tabs.query(params, getActiveTab);
				} else {
					const querying = browser.tabs.query(params);
					querying.then(getActiveTab, () => {});
				}
            }
        });

        browser.runtime.onMessage.addListener((message, data) => {
            if (message && message.command === 'get-text') {
                let text = message.text;
                if (message.selectionStart !== message.selectionEnd) {
                    text = message.text.substring(message.selectionStart, message.selectionEnd);
                }

                if (data.tab && data.tab.id) {
                    browser.tabs.sendMessage(data.tab.id, {
                        command: 'set-text',
                        oldText: message.text,
                        text: this.typografExecute(text),
                        selectionStart: message.selectionStart,
                        selectionEnd: message.selectionEnd
                    });
                }
            }
        });
    }

    private updateActionButton() {
        // @ts-ignore
        const action = window.browser.action || window.browser.browser_action; // Fix for Firefox

        action.setBadgeBackgroundColor({color: '#A00'});
        action.setBadgeText({
            text: this.getDefaultLocale(this.settings.locale).toUpperCase()
        });
    }

    private updateTypograf() {
        const { settings } = this;

        this.typograf = new window.Typograf({
            locale: [settings.locale, 'en-US'],
            htmlEntity: {
                type: settings.type,
                onlyInvisible: settings.onlyInvisible
            },
            enableRule: Object.keys(settings.enableRule || {}),
            disableRule: Object.keys(settings.disableRule || {})
        });
    }

    private typografExecute(text: string): string {
        return this.typograf ? this.typograf.execute(text) : text;
    }
}

new App();
