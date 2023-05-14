import Typograf, { TypografHtmlEntity, TypografRuleInternal } from 'typograf';
import { DEFAULT_LOCALE, _ } from '../utils/i18n';
import { getTypografGroupIndex, getTypografGroupTitle } from '../utils/typograf';
import { getBrowser } from '../utils/browser';

import './index.css';

const browser = getBrowser();

export interface TypografParams {
    locale: string;
    onlyInvisible: boolean;
    enableRule: Record<string, boolean>;
    disableRule: Record<string, boolean>;
    type: TypografHtmlEntity['type'];
}

export class Settings {
    private langUI: string;

    private typograf: Typograf;
    private typografEntities: Typograf;

    private rulesContainer: HTMLDivElement;

    private typografParams: TypografParams;

    constructor(params: Partial<TypografParams>) {
        let langUI = browser.i18n.getUILanguage();

        if (!window.Typograf.hasLocale(langUI)) {
            langUI = DEFAULT_LOCALE;
        }

        this.langUI = langUI;

        this.typografParams = {
            locale: params.locale || langUI,
            type: params.type || 'default',
            onlyInvisible: params.onlyInvisible || false,
            enableRule: params.enableRule || {},
            disableRule: params.disableRule || {}
        };

        this.typograf = new Typograf({
            locale: ['ru', 'en-US'],
            disableRule: '*',
            enableRule: ['common/nbsp/*', 'ru/nbsp/*'],
        });

        this.typografEntities = new Typograf({
            locale: ['ru', 'en-US'],
            disableRule: '*',
            enableRule: ['common/punctuation/quote'],
        });

        const container = document.querySelector('.settings') as HTMLDivElement;
        container.appendChild(this.createOptions());
        this.rulesContainer = document.createElement('div');
        this.rulesContainer.className = 'settings__all-rules';
        this.rulesContainer.appendChild(this.createRulesList());
        container.appendChild(this.rulesContainer);

        container.appendChild(this.createFooter());

        document.body.appendChild(container);

        this.bindEvents();
    }

    private saveTypografParams(keys: Partial<TypografParams>) {
        Object.assign(this.typografParams, keys);

        browser.storage.local.set({
            settings: this.typografParams,
        });
    }

    private buildHint(text: string) {
        const hint = document.createElement('span');
        hint.className = 'settings__hint';
        hint.textContent = '?';

        const hintText = document.createElement('div');
        hintText.className = 'settings__hint-text';
        hintText.textContent = text;

        hint.appendChild(hintText);

        return hint;
    }

    private createOptions() {
        const options = document.createElement('div');
        options.className = 'settings__options';

        options.appendChild(this.createTitleBlock());
        options.appendChild(this.createLocaleBlock());
        options.appendChild(this.createTypeBlock());
        options.appendChild(this.createShortcutBlock());
        options.appendChild(this.createRulesBlock());

        return options;
    }

    private createTitleBlock() {
        const title = document.createElement('div');
        title.className = 'settings__title';
        title.textContent = _('settings_title');

        const defaultRules = document.createElement('a');
        defaultRules.className = 'settings__default';
        defaultRules.href = '#';
        defaultRules.textContent = _('def');
        title.appendChild(defaultRules);

        return title;
    }

    private createLocaleBlock() {
        const block = document.createElement('div');
        block.className = 'settings__block settings__block_first';

        const localeText = document.createElement('span');
        localeText.className = 'settings__locale-text';
        localeText.textContent = _('locale');

        const locale = document.createElement('select');
        locale.className = 'settings__locale';

        window.Typograf.getLocales().forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.selected = this.typografParams.locale === item;
            option.textContent = _('locale_' + item);

            locale.appendChild(option);
        });

        block.appendChild(localeText);
        block.appendChild(locale);

        return block;
    }

    private createTypeBlock() {
        const typeText = document.createElement('span');
        typeText.className = 'settings__type-text';
        typeText.textContent = _('type');

        const type = document.createElement('select');
        type.className = 'settings__type';

        ['default', 'name', 'digit'].forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.selected = this.typografParams.type === item;
            option.textContent = _('type_' + item);

            type.appendChild(option);
        });

        const onlyInvisibleLabel = document.createElement('label');
        onlyInvisibleLabel.className = 'settings__only-invisible-label';

        const onlyInvisibleInput = document.createElement('input');
        onlyInvisibleInput.type = 'checkbox';
        onlyInvisibleInput.className = 'settings__only-invisible';
        onlyInvisibleInput.checked = this.typografParams.onlyInvisible;
        onlyInvisibleLabel.appendChild(onlyInvisibleInput);

        const onlyInvisibleText = document.createElement('span');
        onlyInvisibleText.innerText = ' ' + _('only_invisible');
        onlyInvisibleLabel.appendChild(onlyInvisibleText);

        const onlyInvisibleExample = document.createElement('div');
        onlyInvisibleExample.className = 'settings__only-invisible-example';
        onlyInvisibleExample.innerText = this.getInvisibleExample();

        const block = document.createElement('div');
        block.className = 'settings__block';
        block.appendChild(typeText);
        block.appendChild(type);
        block.appendChild(onlyInvisibleLabel);
        block.appendChild(onlyInvisibleExample);

        return block;
    }

    private createShortcutBlock() {
        const shortcut = document.createElement('div');
        shortcut.textContent = _('shortcut') + 'ALT+Shift+T';
        shortcut.appendChild(this.buildHint(_('shortcut_using')));

        const block = document.createElement('div');
        block.className = 'settings__block';
        block.appendChild(shortcut);

        return block;
    }

    private createRulesBlock() {
        const rulesTitle = document.createElement('div');
        rulesTitle.textContent = _('rules_title');
        rulesTitle.className = 'settings__rules-title';

        const block = document.createElement('div');
        block.className = 'settings__block';
        block.appendChild(rulesTitle);

        const selectAllContainer = document.createElement('div');
        selectAllContainer.className = 'settings__select-all-container';

        const selectAll = document.createElement('input');
        selectAll.className = 'settings__select-all';
        selectAll.type = 'checkbox';
        selectAll.id = 'select-all';

        const selectAllLabel = document.createElement('label');
        selectAllLabel.className = 'settings__select-all-label';
        selectAllLabel.textContent = _('selectAll');
        selectAllLabel.setAttribute('for', 'select-all');

        selectAllContainer.appendChild(selectAll);
        selectAllContainer.appendChild(selectAllLabel);
        block.appendChild(selectAllContainer);

        return block;
    }

    private createFooter() {
        const footer = document.createElement('div');
        footer.className = 'settings__block';

        const name = document.createElement('a');
        name.className = 'settings__name';
        name.href = 'https://github.com/typograf/typograf/';
        name.target = '_blank';
        name.textContent = _('typograf');

        const sup = document.createElement('sup');
        sup.className = 'settings__version';
        sup.textContent = window.Typograf.version;

        name.appendChild(sup);
        footer.appendChild(name);

        const reportBug = document.createElement('a');
        reportBug.className = 'settings__report-bug';
        reportBug.href = 'https://github.com/red-typography/red-typography-webextension/issues';
        reportBug.target = '_blank';
        reportBug.textContent = _('report-bug');

        footer.appendChild(reportBug);

        return footer;
    }

    private getInvisibleExample() {
        return this.typografEntities.execute(_('example') + _('only_invisible_example'), {
            htmlEntity: {
                type: this.typografParams.type,
                onlyInvisible: this.typografParams.onlyInvisible,
            },
            locale: [this.typografParams.locale],
        });
    }

    private createRulesList() {
        const container = document.createElement('div');
        const groups = this.getSortedGroups(window.Typograf.getRules(), this.langUI);

        groups.forEach(group => {
            const groupName = group[0].group;
            const groupTitle = this.typograf.execute(
                getTypografGroupTitle(groupName, this.langUI),
                { locale: this.langUI }
            );

            const fieldset = document.createElement('fieldset');
            fieldset.className = 'settings__fieldset';

            const legend = document.createElement('legend');
            legend.className = 'settings__legend';
            legend.textContent = groupTitle;

            fieldset.appendChild(legend);

            let counter = 0;
            group.forEach((rule) => {
                const dom = this.createRule(rule);
                if (dom) {
                    fieldset.appendChild(dom);
                    counter++;
                }
            });

            counter && container.appendChild(fieldset);
        });

        return container;
    }

    private updateRulesList() {
        this.rulesContainer.textContent = '';
        const rules = this.createRulesList();
        this.rulesContainer.appendChild(rules);
    }

    private createRule(rule: TypografRuleInternal) {
        const name = rule.name;
        const buf = window.Typograf.titles[name];
        const title = this.typograf.execute(
            buf[this.langUI] || buf.common || buf[DEFAULT_LOCALE],
            { locale: [this.langUI, DEFAULT_LOCALE] }
        );
        const id = 'rule-' + name.replace(/\//g, '-');
        const defaultRules = this.getDefaultRules();

        let checked = defaultRules[name];

        if (this.typografParams.locale !== rule.locale && rule.locale !== 'common') {
            return;
        }

        if (this.typografParams.enableRule[name]) {
            checked = true;
        }

        if (this.typografParams.disableRule[name]) {
            checked = false;
        }

        const div = document.createElement('div');
        div.className = 'settings__rule';

        const input = document.createElement('input');
        input.className = 'settings__rule-checkbox';
        input.type = 'checkbox';
        input.id = id;
        input.checked = checked;
        input.dataset.id = name;

        const label = document.createElement('label');
        label.textContent = title;
        label.setAttribute('for', id);

        div.appendChild(input);
        div.appendChild(label);

        return div;
    }

    private bindEvents() {
        const onlyVisibleElement = document.querySelector('.settings__only-invisible') as HTMLInputElement;
        onlyVisibleElement.addEventListener('click', e => {
            const target = e.target as HTMLInputElement;

            this.saveTypografParams({ onlyInvisible: target.checked });
            this.updateOnlyInvisibleExample();
        });

        const allRules = document.querySelector('.settings__all-rules') as HTMLInputElement;
        allRules.addEventListener('click', e => {
            const target = e.target as HTMLElement;

            if (target.classList.contains('settings__legend')) {
                this.handleLegendClick(e);
            }

            if (target.classList.contains('settings__rule-checkbox')) {
                this.handleRuleClick(target as HTMLInputElement);
            }
        });

        const selectAllElement = document.querySelector('.settings__select-all') as HTMLInputElement;
        selectAllElement.addEventListener('click', this.handleSelectAllClick);

        const defaultElement = document.querySelector('.settings__default') as HTMLDivElement;
        defaultElement.addEventListener('click', () => {
            this.handleDefaultClick();
        });

        const typeElement = document.querySelector('.settings__type') as HTMLSelectElement;
        typeElement.addEventListener('change', e => {
            if (!e.target) {
                return;
            }

            const target = e.target as HTMLSelectElement;
            const type = target.value as TypografHtmlEntity['type'];

            this.saveTypografParams({ type });
            this.updateOnlyInvisibleExample();
        });

        const localeElement = document.querySelector('.settings__locale') as HTMLSelectElement;
        localeElement.addEventListener('change', this.handleLocaleChange);
    }

    private updateOnlyInvisibleExample() {
        const exampleElement = document.querySelector('.settings__only-invisible-example') as HTMLElement;
        exampleElement.innerText = this.getInvisibleExample();
    }

    private handleLocaleChange(e: Event) {
        const target = e.target as HTMLSelectElement;
        const locale = target.value as string;

        this.saveTypografParams({ locale });
        this.updateRulesList();
        this.updateOnlyInvisibleExample();
    }

    private getDefaultRules() {
        const defaultRulesHash: Record<string, boolean> = {};

        window.Typograf.getRules().forEach((rule) => {
            defaultRulesHash[rule.name] = rule.enabled;
        });

        return defaultRulesHash;
    }

    private handleDefaultClick = () => {
        const selectAllElement = document.querySelector('.settings__select-all') as HTMLInputElement;
        selectAllElement.checked = false;

        const onlyVisibleElement = document.querySelector('.settings__only-invisible') as HTMLInputElement;
        onlyVisibleElement.checked = false;

        const typeElement = document.querySelector('.settings__type') as HTMLSelectElement;
        typeElement.selectedIndex = 0;

        const checkboxes = document.querySelectorAll<HTMLInputElement>('.settings__rule-checkbox');
        const defaultRules = this.getDefaultRules();

        for (let i = 0; i < checkboxes.length; i++) {
            const checkbox = checkboxes[i];
            const id = checkbox.dataset.id;
            if (id) {
                checkbox.checked = defaultRules[id];
            }
        }

        this.updateOnlyInvisibleExample();

        this.saveTypografParams({
            disableRule: {},
            enableRule: {},
            type: 'default',
            onlyInvisible: false,
        });
    }

    private handleSelectAllClick(e: Event) {
        const target = e.target as HTMLInputElement;
        const { checked } = target;

        const checkboxes = document.querySelectorAll<HTMLInputElement>('.settings__rule-checkbox');
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = checked;
        }

        this.typografParams.enableRule = {};
        this.typografParams.disableRule = {};

        Typograf.getRules().forEach((rule) => {
            if (rule.live) {
                return;
            }

            this.typografParams[checked ? 'enableRule' : 'disableRule'][rule.name] = true;
        });

        this.saveTypografParams({
            enableRule: this.typografParams.enableRule,
            disableRule: this.typografParams.disableRule,
        });
    }

    private handleLegendClick(e: Event) {
        const target = e.target as HTMLLegendElement
        const parentNode = target.parentNode as HTMLElement;
        if (parentNode) {
            parentNode.classList.toggle('settings__fieldset_visible');
        }
    }

    private handleRuleClick(elem: HTMLInputElement) {
        const checked = elem.checked;
        const name = elem.dataset.id;

        if (!name) {
            return;
        }

        delete this.typografParams.enableRule[name];
        delete this.typografParams.disableRule[name];
        this.typografParams[checked ? 'enableRule' : 'disableRule'][name] = true;

        this.saveTypografParams({});
    }

    private sortByGroupIndex(rules: TypografRuleInternal[]) {
        rules.sort((a, b) => {
            if (!a.name || !b.name) {
                return -1;
            }

            const indexA = getTypografGroupIndex(a.group);
            const indexB = getTypografGroupIndex(b.group);

            if (indexA > indexB) {
                return 1;
            }

            if (indexA < indexB) {
                return -1;
            }

            return 0;
        });
    }

    private splitGroups(rules: TypografRuleInternal[]) {
        let currentGroupName: string;
        let currentGroup: TypografRuleInternal[];

        const groups: TypografRuleInternal[][] = [];

        rules.forEach((rule) => {
            const groupName = rule.group;

            if (groupName !== currentGroupName) {
                currentGroupName = groupName;
                currentGroup = [];
                groups.push(currentGroup);
            }

            currentGroup.push(rule);
        });

        return groups;
    }

    private sortGroupsByTitle(groups: TypografRuleInternal[][], locale: string) {
        const titles = window.Typograf.titles;

        groups.forEach(group => {
            group.sort((a, b) => {
                const titleA = titles[a.name];
                const titleB = titles[b.name];

                return (titleA[locale] || titleA.common) > (titleB[locale] || titleB.common) ? 1 : -1;
            });
        });
    }

    private getSortedGroups(rules: TypografRuleInternal[], locale: string) {
        const filteredRules: TypografRuleInternal[] = [];

        rules.forEach(el => {
            if (!el.live) {
                filteredRules.push(el);
            }
        });

        this.sortByGroupIndex(filteredRules);

        const groups = this.splitGroups(filteredRules);

        this.sortGroupsByTitle(groups, locale);

        return groups;
    }
}
