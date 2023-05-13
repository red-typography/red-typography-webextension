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

    private container = document.querySelector('.settings') as HTMLDivElement;
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

        this.buildOptions();
        this.rebuildRules();
        this.createFooterBlock();

        this.rulesContainer = document.createElement('div');
        this.rulesContainer.className = 'settings__all-rules';
        this.container.appendChild(this.rulesContainer);

        document.body.appendChild(this.container);

        this.setEvents();
    }

    private save(keys: Partial<TypografParams>) {
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

    private buildOptions() {
        const container = document.createElement('div');
        container.className = 'settings__options';

        this.createTitleBlock(container);
        this.createLocaleBlock(container);
        this.createTypeBlock(container);
        this.createShortcutBlock(container);
        this.createRulesBlock(container);

        this.container.appendChild(container);
    }

    private createTitleBlock(container: HTMLElement) {
        const title = document.createElement('div');
        title.className = 'settings__title';
        title.textContent = _('settings_title');
        container.appendChild(title);

        const def = document.createElement('a');
        def.className = 'settings__default';
        def.href = '#';
        def.textContent = _('def');
        title.appendChild(def);
    }

    private createLocaleBlock(container: HTMLElement) {
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
        container.appendChild(block);
    }

    private createTypeBlock(container: HTMLElement) {
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

        container.appendChild(block);
    }

    private createShortcutBlock(container: HTMLElement) {
        const shortcut = document.createElement('div');
        shortcut.textContent = _('shortcut') + 'ALT+Shift+T';
        shortcut.appendChild(this.buildHint(_('shortcut_using')));

        const block = document.createElement('div');
        block.className = 'settings__block';
        block.appendChild(shortcut);

        container.appendChild(block);
    }

    private createRulesBlock(container: HTMLElement) {
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

        container.appendChild(block);
    }

    private createFooterBlock() {
        const block = document.createElement('div');
        block.className = 'settings__block';

        const name = document.createElement('a');
        name.className = 'settings__name';
        name.href = 'https://github.com/typograf/typograf/';
        name.target = '_blank';
        name.textContent = _('typograf');

        const sup = document.createElement('sup');
        sup.className = 'settings__version';
        sup.textContent = window.Typograf.version;

        name.appendChild(sup);
        block.appendChild(name);

        const reportBug = document.createElement('a');
        reportBug.className = 'settings__report-bug';
        reportBug.href = 'https://github.com/red-typography/red-typography-webextension/issues';
        reportBug.target = '_blank';
        reportBug.textContent = _('report-bug');

        block.appendChild(reportBug);
        this.container.appendChild(block);
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

    rebuildRules() {
        const groups = this.getSortedGroups(window.Typograf.getRules(), this.langUI);

        this.rulesContainer.textContent = '';

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

            counter && this.rulesContainer.appendChild(fieldset);
        });
    }

    createRule(rule: TypografRuleInternal) {
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

    private setEvents() {
        function is(target: HTMLElement, name: string) {
            return target.classList.contains('settings__' + name);
        }

        const onlyVisibleElement = document.querySelector('.settings__only-invisible') as HTMLInputElement;
        onlyVisibleElement.addEventListener('click', e => {
            const target = e.target as HTMLInputElement;

            this.save({ onlyInvisible: target.checked });
            this.updateOnlyInvisibleExample();
        });

        const allRules = document.querySelector('.settings__all-rules') as HTMLInputElement;
        allRules.addEventListener('click', e => {
            const target = e.target as HTMLElement;

            if (is(target, 'legend')) {
                this.onClickLegend(target as HTMLLegendElement);
            }

            if (is(target, 'rule-checkbox')) {
                this.onClickRule(target as HTMLInputElement);
            }
        });

        const selectAllElement = document.querySelector('.settings__select-all') as HTMLInputElement;
        selectAllElement.addEventListener('click', e => {
            const target = e.target as HTMLInputElement;
            this.onSelectAll(target.checked);
        });

        const defaultElement = document.querySelector('.settings__default') as HTMLDivElement;
        defaultElement.addEventListener('click', () => {
            this.save({
                disableRule: {},
                enableRule: {},
                type: 'default',
                onlyInvisible: false,
            });

            this.onDefault();
        });

        const typeElement = document.querySelector('.settings__type') as HTMLSelectElement;
        typeElement.addEventListener('change', e => {
            if (!e.target) {
                return;
            }

            const target = e.target as HTMLSelectElement;
            const type = target.value as TypografHtmlEntity['type'];

            this.save({ type });
            this.updateOnlyInvisibleExample();
        });

        const localeElement = document.querySelector('.settings__locale') as HTMLSelectElement;
        localeElement.addEventListener('change', e => {
            const target = e.target as HTMLSelectElement;
            const locale = target.value as string;
            this.save({ locale });
            this.onLocale();
        });
    }

    private updateOnlyInvisibleExample() {
        const exampleElement = document.querySelector('.settings__only-invisible-example') as HTMLElement;
        exampleElement.innerText = this.getInvisibleExample();
    }

    private onLocale() {
        this.rebuildRules();
        this.updateOnlyInvisibleExample();
    }

    private getDefaultRules() {
        const defaultRulesHash: Record<string, boolean> = {};

        window.Typograf.getRules().forEach((rule) => {
            defaultRulesHash[rule.name] = rule.enabled;
        });

        return defaultRulesHash;
    }

    private onDefault() {
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
    }

    private onSelectAll(checked: boolean) {
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

        this.save({
            enableRule: this.typografParams.enableRule,
            disableRule: this.typografParams.disableRule,
        });
    }

    private onClickLegend(elem: HTMLElement) {
        const parentNode = elem.parentNode as HTMLElement;
        if (parentNode) {
            parentNode.classList.toggle('settings__fieldset_visible');
        }
    }

    private onClickRule(elem: HTMLInputElement) {
        const checked = elem.checked;
        const name = elem.dataset.id;

        if (!name) {
            return;
        }

        delete this.typografParams.enableRule[name];
        delete this.typografParams.disableRule[name];
        this.typografParams[checked ? 'enableRule' : 'disableRule'][name] = true;

        this.save({});
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
