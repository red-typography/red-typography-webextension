'use strict';

(function() {
    var Settings = {
        init: function(data) {
            var cl = isChrome ? 'chrome' : 'firefox';
            document.documentElement.classList.add(cl);
            document.body.classList.add(cl);

            data = data || {};

            var langUI = browser.i18n.getUILanguage();

            if (!Typograf.hasLocale(langUI)) {
                langUI = 'en-US';
            }

            this.langUI = langUI;

            this._settings = data.settings;
            this._settings = {
                locale: data.locale || langUI,
                mode: data.mode || '',
                enableRule: data.enableRule || {},
                disableRule: data.disableRule || {}
            };

            this._typograf = new Typograf({
                disableRule: '*',
                enableRule: ['common/nbsp/*', 'ru/nbsp/*']
            });

            this._container = document.querySelector('.settings');

            this.buildOptions();
            this.rebuildRules();
            this.buildFooter();

            document.body.appendChild(this._container);

            this.setEvents();
        },
        save: function(keys) {
            Object.assign(this._settings, keys);

            browser.storage.local.set({
                settings: this._settings
            });
        },
        buildOptions: function() {
            var container = document.createElement('div');
            container.className = 'settings__options';

            var title = document.createElement('div');
            title.className = 'settings__title';
            title.textContent = _('settings_title');
            container.appendChild(title);

            var def = document.createElement('a');
            def.className = 'settings__default';
            def.href = '#';
            def.textContent = _('def');
            title.appendChild(def);

            var block = document.createElement('div');
            block.className = 'settings__block settings__block_first';

            var localeText = document.createElement('span');
            localeText.className = 'settings__locale-text';
            localeText.textContent = _('locale');

            var locale = document.createElement('select');
            locale.className = 'settings__locale';

            Typograf.getLocales().forEach(function(item) {
                var option = document.createElement('option');
                option.value = item;
                option.selected = this._settings.locale === item;
                option.textContent = _('locale_' + item);

                locale.appendChild(option);
            }, this);

            block.appendChild(localeText);
            block.appendChild(locale);
            container.appendChild(block);

            block = document.createElement('div');
            block.className = 'settings__block';

            var modeText = document.createElement('span');
            modeText.className = 'settings__mode-text';
            modeText.textContent = _('mode');

            var mode = document.createElement('select');
            mode.className = 'settings__mode';

            ['', 'name', 'name-invisible', 'digit', 'digit-invisible'].forEach(function(item) {
                var option = document.createElement('option');
                option.value = item;
                option.selected = this._settings.mode === item;
                option.textContent = _('mode_' + item);

                mode.appendChild(option);
            }, this);

            block.appendChild(modeText);
            block.appendChild(mode);
            container.appendChild(block);

            block = document.createElement('div');
            block.className = 'settings__block';

            var rulesTitle = document.createElement('div');
            rulesTitle.textContent = _('rules_title');
            rulesTitle.className = 'settings__rules-title';
            block.appendChild(rulesTitle);

            var selectAllContainer = document.createElement('div');
            selectAllContainer.className = 'settings__select-all-container';

            var selectAll = document.createElement('input');
            selectAll.className = 'settings__select-all';
            selectAll.type = 'checkbox';
            selectAll.id = 'select-all';

            var selectAllLabel = document.createElement('label');
            selectAllLabel.className = 'settings__select-all-label';
            selectAllLabel.textContent = _('selectAll');
            selectAllLabel.setAttribute('for', 'select-all');

            selectAllContainer.appendChild(selectAll);
            selectAllContainer.appendChild(selectAllLabel);
            block.appendChild(selectAllContainer);

            container.appendChild(block);

            this._container.appendChild(container);
        },
        buildFooter: function() {
            var footer = document.createElement('div');
            footer.className = 'settings__footer';

            var name = document.createElement('a');
            name.className = 'settings__name';
            name.href = 'https://github.com/typograf/typograf/';
            name.target = '_blank';
            name.textContent = _('typograf');

            var sup = document.createElement('sup');
            sup.className = 'settings__version';
            sup.textContent = Typograf.version;

            name.appendChild(sup);
            footer.appendChild(name);

            var reportBug = document.createElement('a');
            reportBug.className = 'settings__report-bug';
            reportBug.href = 'https://github.com/typograf/typograf-firefox/issues';
            reportBug.target = '_blank';
            reportBug.textContent = _('report-bug');

            footer.appendChild(reportBug);
            document.body.appendChild(footer);
        },
        rebuildRules: function() {
            var groups = this._getSortedGroups(Typograf.prototype._rules, this.langUI);

            if (this._rulesContainer) {
                this._rulesContainer.textContent = '';
            } else {
                this._rulesContainer = document.createElement('div');
                this._rulesContainer.className = 'settings__all-rules';
            }

            groups.forEach(function(group) {
                var groupName = group[0]._group;
                var groupTitle = this._typograf.execute(
                        Typograf.getGroupTitle(groupName, this.langUI),
                        {locale: this.langUI}
                    );

                var fieldset = document.createElement('fieldset');
                fieldset.className = 'settings__fieldset';

                var legend = document.createElement('legend');
                legend.className = 'settings__legend';
                legend.textContent = groupTitle;

                fieldset.appendChild(legend);

                group.forEach(function(rule) {
                    var name = rule.name;
                    var buf = Typograf.titles[name];
                    var title = this._typograf.execute(
                        buf[this.langUI] || buf.common, {locale: [this.langUI, 'en-US'] }
                    );
                    var id = 'rule-' + name.replace(/\//g, '-');
                    var defHash = this._defRules();
                    var checked = defHash[name];

                    if (this._settings.locale !== rule._locale && rule._locale !== 'common') {
                        return;
                    }

                    if (this._settings.enableRule[name]) {
                        checked = true;
                    }

                    if (this._settings.disableRule[name]) {
                        checked = false;
                    }

                    var div = document.createElement('div');
                    div.className = 'settings__rule';

                    var input = document.createElement('input');
                    input.className = 'settings__rule-checkbox';
                    input.type = 'checkbox';
                    input.id = id;
                    input.checked = checked;
                    input.dataset.id = name;

                    var label = document.createElement('label');
                    label.textContent = title;
                    label.setAttribute('for', id);

                    div.appendChild(input);
                    div.appendChild(label);

                    fieldset.appendChild(div);
                    this._rulesContainer.appendChild(fieldset);
                }, this);
            }, this);

            this._container.appendChild(this._rulesContainer);
        },
        setEvents: function() {
            var target;
            var is = function(name) {
                return target.classList.contains('settings__' + name);
            };

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
                    mode: ''
                });

                document.querySelector('.settings__mode').selectedIndex = 0;

                this._onDefault();
            });

            document.querySelector('.settings__mode').addEventListener('change', e => {
                var mode = e.target.value;
                this.save({mode: mode});
            });

            document.querySelector('.settings__locale').addEventListener('change', e => {
                var locale = e.target.value;
                this.save({locale: locale});
                this._onLocale();
            });
        },
        _onLocale: function() {
            this.rebuildRules();
        },
        _defRules: function() {
            var defHash = {};
            Typograf.prototype._rules.forEach(function(rule) {
                defHash[rule.name] = rule.disabled !== true;
            });

            return defHash;
        },
        _onDefault: function() {
            document.querySelector('.settings__select-all').checked = false;

            var chs = document.querySelectorAll('.settings__rule-checkbox');
            var defHash = this._defRules();
            for (var i = 0; i < chs.length; i++) {
                var ch = chs[i];
                ch.checked = defHash[ch.dataset.id];
            }
        },
        _onSelectAll: function(checked) {
            var chs = document.querySelectorAll('.settings__rule-checkbox');
            for (var i = 0; i < chs.length; i++) {
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

            this.saveSettings({
                enableRule: this._settings.enableRule,
                disableRule: this._settings.disableRule
            });
        },
        _onClickLegend: function(elem) {
            elem.parentNode.classList.toggle('settings__fieldset_visible');
        },
        _onClickRule: function(elem) {
            var checked = elem.checked;
            var name = elem.dataset.id;

            delete this._settings.enableRule[name];
            delete this._settings.disableRule[name];
            this._settings[checked ? 'enableRule' : 'disableRule'][name] = true;

            this.save();
        },
        _sortByGroupIndex: function(rules) {
            rules.sort(function(a, b) {
                if (!a.name || !b.name) {
                    return -1;
                }

                var indexA = Typograf.getGroupIndex(a._group);
                var indexB = Typograf.getGroupIndex(b._group);

                if (indexA > indexB) {
                    return 1;
                }

                if (indexA < indexB) {
                    return -1;
                }

                return 0;
            });
        },
        _splitGroups: function(rules) {
            var currentGroupName,
                currentGroup,
                groups = [];

            rules.forEach(function(rule) {
                var groupName = rule._group;

                if (groupName !== currentGroupName) {
                    currentGroupName = groupName;
                    currentGroup = [];
                    groups.push(currentGroup);
                }

                currentGroup.push(rule);
            }, this);

            return groups;
        },
        _sortGroupsByTitle: function(groups, locale) {
            var titles = Typograf.titles;

            groups.forEach(function(group) {
                group.sort(function(a, b) {
                    var titleA = titles[a.name],
                      titleB = titles[b.name];

                    return (titleA[locale] || titleA.common) > (titleB[locale] || titleB.common) ? 1 : -1;
                });
            });
        },
        _getSortedGroups: function(rules, locale) {
            var filteredRules = [];

            rules.forEach(function(el) {
                if (!el.live) {
                    filteredRules.push(el);
                }
            });

            this._sortByGroupIndex(filteredRules);

            var groups = this._splitGroups(filteredRules);

            this._sortGroupsByTitle(groups, locale);

            return groups;
        }
    };

    document.addEventListener('DOMContentLoaded', function() {
        function onLoad(data) {
            Settings.init(data.settings);
        }

        function onError() {
            Settings.init();
        }

        if (isChrome) {
            browser.storage.local.get('settings', onLoad);
        } else {
            browser.storage.local.get('settings').then(onLoad, onError);
        }
    }, false);
})();
