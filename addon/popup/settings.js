'use strict';

class Settings {
    constructor(data) {
        this.defaultLocale = 'en-US';

        data = data || {};

        let langUI = browser.i18n.getUILanguage();

        if (!Typograf.hasLocale(langUI)) {
            langUI = this.defaultLocale;
        }

        this.langUI = langUI;

        this._settings = data.settings;

        this._settings = {
            locale: data.locale || langUI,
            type: data.type || '',
            onlyInvisible: data.onlyInvisible || false,
            enableRule: data.enableRule || {},
            disableRule: data.disableRule || {}
        };

        this._typograf = new Typograf({
            disableRule: '*',
            enableRule: ['common/nbsp/*', 'ru/nbsp/*']
        });

        this._typografEntities = new Typograf({
            disableRule: '*',
            enableRule: ['common/punctuation/quote']
        });

        this._container = document.querySelector('.settings');

        this.buildOptions();
        this.rebuildRules();
        this.createFooterBlock();

        document.body.appendChild(this._container);

        this.setEvents();
    }

    save(keys) {
        Object.assign(this._settings, keys);

        browser.storage.local.set({
            settings: this._settings
        });
    }

    buildHint(text) {
        const hint = document.createElement('span');
        hint.className = 'settings__hint';
        hint.textContent = '?';

        const hintText = document.createElement('div');
        hintText.className = 'settings__hint-text';
        hintText.textContent = text;

        hint.appendChild(hintText);

        return hint;
    }

    buildOptions() {
        const container = document.createElement('div');
        container.className = 'settings__options';

        this.createTitleBlock(container);
        this.createLocaleBlock(container);
        this.createTypeBlock(container);
        this.createShortcutBlock(container);
        this.createRulesBlock(container);

        this._container.appendChild(container);
    }

    createTitleBlock(container) {
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

    createLocaleBlock(container) {
        const block = document.createElement('div');
        block.className = 'settings__block settings__block_first';

        const localeText = document.createElement('span');
        localeText.className = 'settings__locale-text';
        localeText.textContent = _('locale');

        const locale = document.createElement('select');
        locale.className = 'settings__locale';

        Typograf.getLocales().forEach(function(item) {
            const option = document.createElement('option');
            option.value = item;
            option.selected = this._settings.locale === item;
            option.textContent = _('locale_' + item);

            locale.appendChild(option);
        }, this);

        block.appendChild(localeText);
        block.appendChild(locale);
        container.appendChild(block);
    }

    createTypeBlock(container) {
        const typeText = document.createElement('span');
        typeText.className = 'settings__type-text';
        typeText.textContent = _('type');

        const type = document.createElement('select');
        type.className = 'settings__type';

        ['', 'name', 'digit'].forEach(function(item) {
            const option = document.createElement('option');
            option.value = item;
            option.selected = this._settings.type === item;
            option.textContent = _('type_' + item);

            type.appendChild(option);
        }, this);

        const onlyInvisibleLabel = document.createElement('label');
        onlyInvisibleLabel.className = 'settings__only-invisible-label';

        const onlyInvisibleInput = document.createElement('input');
        onlyInvisibleInput.type = 'checkbox';
        onlyInvisibleInput.className = 'settings__only-invisible';
        onlyInvisibleInput.checked = this._settings.onlyInvisible;
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

    createShortcutBlock(container) {
        const shortcut = document.createElement('div');
        shortcut.textContent = _('shortcut') + 'ALT+Shift+T';
        shortcut.appendChild(this.buildHint(_('shortcut_using')));

        const block = document.createElement('div');
        block.className = 'settings__block';
        block.appendChild(shortcut);
        container.appendChild(block);
    }

    createRulesBlock(container) {
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

    createFooterBlock() {
        const block = document.createElement('div');
        block.className = 'settings__block';

        const name = document.createElement('a');
        name.className = 'settings__name';
        name.href = 'https://github.com/typograf/typograf/';
        name.target = '_blank';
        name.textContent = _('typograf');

        const sup = document.createElement('sup');
        sup.className = 'settings__version';
        sup.textContent = Typograf.version;

        name.appendChild(sup);
        block.appendChild(name);

        const reportBug = document.createElement('a');
        reportBug.className = 'settings__report-bug';
        reportBug.href = 'https://github.com/red-typography/red-typography-webextension/issues';
        reportBug.target = '_blank';
        reportBug.textContent = _('report-bug');

        block.appendChild(reportBug);
        this._container.appendChild(block);
    }

    getInvisibleExample() {
        return this._typografEntities.execute(_('example') + _('only_invisible_example'), {
            htmlEntity: {
                type: this._settings.type,
                onlyInvisible: this._settings.onlyInvisible
            },
            locale: [this._settings.locale]
        });
    }

    rebuildRules() {
        const groups = this._getSortedGroups(Typograf.prototype._rules, this.langUI);

        if (this._rulesContainer) {
            this._rulesContainer.textContent = '';
        } else {
            this._rulesContainer = document.createElement('div');
            this._rulesContainer.className = 'settings__all-rules';
        }

        groups.forEach(function(group) {
            const groupName = group[0]._group;
            const groupTitle = this._typograf.execute(
                Typograf.getGroupTitle(groupName, this.langUI),
                {locale: this.langUI}
            );

            const fieldset = document.createElement('fieldset');
            fieldset.className = 'settings__fieldset';

            const legend = document.createElement('legend');
            legend.className = 'settings__legend';
            legend.textContent = groupTitle;

            fieldset.appendChild(legend);

            group.forEach(function(rule) {
                const dom = this.createRule(rule);
                dom && fieldset.appendChild(dom);
            }, this);

            this._rulesContainer.appendChild(fieldset);
        }, this);

        this._container.appendChild(this._rulesContainer);
    }

    createRule(rule) {
        const
            name = rule.name,
            buf = Typograf.titles[name],
            title = this._typograf.execute(
                buf[this.langUI] || buf.common || buf[this.defaultLocale],
                { locale: [this.langUI, this.defaultLocale] }
            ),
            id = 'rule-' + name.replace(/\//g, '-'),
            defHash = this._defRules();

        let checked = defHash[name];

        if (this._settings.locale !== rule._locale && rule._locale !== 'common') {
            return;
        }

        if (this._settings.enableRule[name]) {
            checked = true;
        }

        if (this._settings.disableRule[name]) {
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

    setEvents() {
        let target;

        function is(name) {
            return target.classList.contains('settings__' + name);
        }

        document.querySelector('.settings__only-invisible').addEventListener('click', e => {
            this.save({ onlyInvisible: e.target.checked });
            this._updateOnlyInvisibleExample();
        });

        document.querySelector('.settings__all-rules').addEventListener('click', e => {
            target = e.target;

            if (is('legend')) {
                this._onClickLegend(target);
            }

            if (is('rule-checkbox')) {
                this._onClickRule(target);
            }
        });

        document.querySelector('.settings__select-all').addEventListener('click', e => {
            this._onSelectAll(e.target.checked);
        });

        document.querySelector('.settings__default').addEventListener('click', () => {
            this.save({
                disableRule: {},
                enableRule: {},
                type: '',
                onlyInvisible: false
            });

            this._onDefault();
        });

        document.querySelector('.settings__type').addEventListener('change', e => {
            this.save({ type: e.target.value });
            this._updateOnlyInvisibleExample();
        });

        document.querySelector('.settings__locale').addEventListener('change', e => {
            this.save({ locale: e.target.value });
            this._onLocale();
        });
    }

    _updateOnlyInvisibleExample() {
        document.querySelector('.settings__only-invisible-example').innerText = this.getInvisibleExample();
    }

    _onLocale() {
        this.rebuildRules();
        this._updateOnlyInvisibleExample();
    }

    _defRules() {
        const defHash = {};
        Typograf.prototype._rules.forEach(function(rule) {
            defHash[rule.name] = rule.disabled !== true;
        });

        return defHash;
    }

    _onDefault() {
        document.querySelector('.settings__select-all').checked = false;
        document.querySelector('.settings__only-invisible').checked = false;
        document.querySelector('.settings__type').selectedIndex = 0;

        const
            chs = document.querySelectorAll('.settings__rule-checkbox'),
            defHash = this._defRules();

        for (let i = 0; i < chs.length; i++) {
            let ch = chs[i];
            ch.checked = defHash[ch.dataset.id];
        }

        this._updateOnlyInvisibleExample();
    }

    _onSelectAll(checked) {
        const chs = document.querySelectorAll('.settings__rule-checkbox');
        for (let i = 0; i < chs.length; i++) {
            chs[i].checked = checked;
        }

        this._settings.enableRule = {};
        this._settings.disableRule = {};

        Typograf.prototype._rules.forEach(function(rule) {
            if (rule.live) {
                return;
            }

            this._settings[checked ? 'enableRule' : 'disableRule'][rule.name] = true;
        }, this);

        this.save({
            enableRule: this._settings.enableRule,
            disableRule: this._settings.disableRule
        });
    }

    _onClickLegend(elem) {
        elem.parentNode.classList.toggle('settings__fieldset_visible');
    }

    _onClickRule(elem) {
        const checked = elem.checked;
        const name = elem.dataset.id;

        delete this._settings.enableRule[name];
        delete this._settings.disableRule[name];
        this._settings[checked ? 'enableRule' : 'disableRule'][name] = true;

        this.save();
    }

    _sortByGroupIndex(rules) {
        rules.sort(function(a, b) {
            if (!a.name || !b.name) {
                return -1;
            }

            const
                indexA = Typograf.getGroupIndex(a._group),
                indexB = Typograf.getGroupIndex(b._group);

            if (indexA > indexB) {
                return 1;
            }

            if (indexA < indexB) {
                return -1;
            }

            return 0;
        });
    }

    _splitGroups(rules) {
        let
            currentGroupName,
            currentGroup;

        const groups = [];

        rules.forEach(function(rule) {
            const groupName = rule._group;

            if (groupName !== currentGroupName) {
                currentGroupName = groupName;
                currentGroup = [];
                groups.push(currentGroup);
            }

            currentGroup.push(rule);
        }, this);

        return groups;
    }

    _sortGroupsByTitle(groups, locale) {
        const titles = Typograf.titles;

        groups.forEach(function(group) {
            group.sort(function(a, b) {
                const
                    titleA = titles[a.name],
                    titleB = titles[b.name];

                return (titleA[locale] || titleA.common) > (titleB[locale] || titleB.common) ? 1 : -1;
            });
        });
    }

    _getSortedGroups(rules, locale) {
        const filteredRules = [];

        rules.forEach(function(el) {
            if (!el.live) {
                filteredRules.push(el);
            }
        });

        this._sortByGroupIndex(filteredRules);

        const groups = this._splitGroups(filteredRules);

        this._sortGroupsByTitle(groups, locale);

        return groups;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    function onLoad(data) {
        new Settings(data.settings);
    }

    function onError() {
        new Settings();
    }

    if (isChrome) {
        browser.storage.local.get('settings', onLoad);
    } else {
        browser.storage.local.get('settings').then(onLoad, onError);
    }
}, false);
