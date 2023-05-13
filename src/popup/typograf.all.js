/*! typograf | © 2023 Denis Seleznev | MIT  License | https://github.com/typograf/typograf */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Typograf = factory());
})(this, (function () { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    // http://www.w3.org/TR/html4/sgml/entities
    var visibleEntities = [
        ['iexcl', 161],
        ['cent', 162],
        ['pound', 163],
        ['curren', 164],
        ['yen', 165],
        ['brvbar', 166],
        ['sect', 167],
        ['uml', 168],
        ['copy', 169],
        ['ordf', 170],
        ['laquo', 171],
        ['not', 172],
        ['reg', 174],
        ['macr', 175],
        ['deg', 176],
        ['plusmn', 177],
        ['sup2', 178],
        ['sup3', 179],
        ['acute', 180],
        ['micro', 181],
        ['para', 182],
        ['middot', 183],
        ['cedil', 184],
        ['sup1', 185],
        ['ordm', 186],
        ['raquo', 187],
        ['frac14', 188],
        ['frac12', 189],
        ['frac34', 190],
        ['iquest', 191],
        ['Agrave', 192],
        ['Aacute', 193],
        ['Acirc', 194],
        ['Atilde', 195],
        ['Auml', 196],
        ['Aring', 197],
        ['AElig', 198],
        ['Ccedil', 199],
        ['Egrave', 200],
        ['Eacute', 201],
        ['Ecirc', 202],
        ['Euml', 203],
        ['Igrave', 204],
        ['Iacute', 205],
        ['Icirc', 206],
        ['Iuml', 207],
        ['ETH', 208],
        ['Ntilde', 209],
        ['Ograve', 210],
        ['Oacute', 211],
        ['Ocirc', 212],
        ['Otilde', 213],
        ['Ouml', 214],
        ['times', 215],
        ['Oslash', 216],
        ['Ugrave', 217],
        ['Uacute', 218],
        ['Ucirc', 219],
        ['Uuml', 220],
        ['Yacute', 221],
        ['THORN', 222],
        ['szlig', 223],
        ['agrave', 224],
        ['aacute', 225],
        ['acirc', 226],
        ['atilde', 227],
        ['auml', 228],
        ['aring', 229],
        ['aelig', 230],
        ['ccedil', 231],
        ['egrave', 232],
        ['eacute', 233],
        ['ecirc', 234],
        ['euml', 235],
        ['igrave', 236],
        ['iacute', 237],
        ['icirc', 238],
        ['iuml', 239],
        ['eth', 240],
        ['ntilde', 241],
        ['ograve', 242],
        ['oacute', 243],
        ['ocirc', 244],
        ['otilde', 245],
        ['ouml', 246],
        ['divide', 247],
        ['oslash', 248],
        ['ugrave', 249],
        ['uacute', 250],
        ['ucirc', 251],
        ['uuml', 252],
        ['yacute', 253],
        ['thorn', 254],
        ['yuml', 255],
        ['fnof', 402],
        ['Alpha', 913],
        ['Beta', 914],
        ['Gamma', 915],
        ['Delta', 916],
        ['Epsilon', 917],
        ['Zeta', 918],
        ['Eta', 919],
        ['Theta', 920],
        ['Iota', 921],
        ['Kappa', 922],
        ['Lambda', 923],
        ['Mu', 924],
        ['Nu', 925],
        ['Xi', 926],
        ['Omicron', 927],
        ['Pi', 928],
        ['Rho', 929],
        ['Sigma', 931],
        ['Tau', 932],
        ['Upsilon', 933],
        ['Phi', 934],
        ['Chi', 935],
        ['Psi', 936],
        ['Omega', 937],
        ['alpha', 945],
        ['beta', 946],
        ['gamma', 947],
        ['delta', 948],
        ['epsilon', 949],
        ['zeta', 950],
        ['eta', 951],
        ['theta', 952],
        ['iota', 953],
        ['kappa', 954],
        ['lambda', 955],
        ['mu', 956],
        ['nu', 957],
        ['xi', 958],
        ['omicron', 959],
        ['pi', 960],
        ['rho', 961],
        ['sigmaf', 962],
        ['sigma', 963],
        ['tau', 964],
        ['upsilon', 965],
        ['phi', 966],
        ['chi', 967],
        ['psi', 968],
        ['omega', 969],
        ['thetasym', 977],
        ['upsih', 978],
        ['piv', 982],
        ['bull', 8226],
        ['hellip', 8230],
        ['prime', 8242],
        ['Prime', 8243],
        ['oline', 8254],
        ['frasl', 8260],
        ['weierp', 8472],
        ['image', 8465],
        ['real', 8476],
        ['trade', 8482],
        ['alefsym', 8501],
        ['larr', 8592],
        ['uarr', 8593],
        ['rarr', 8594],
        ['darr', 8595],
        ['harr', 8596],
        ['crarr', 8629],
        ['lArr', 8656],
        ['uArr', 8657],
        ['rArr', 8658],
        ['dArr', 8659],
        ['hArr', 8660],
        ['forall', 8704],
        ['part', 8706],
        ['exist', 8707],
        ['empty', 8709],
        ['nabla', 8711],
        ['isin', 8712],
        ['notin', 8713],
        ['ni', 8715],
        ['prod', 8719],
        ['sum', 8721],
        ['minus', 8722],
        ['lowast', 8727],
        ['radic', 8730],
        ['prop', 8733],
        ['infin', 8734],
        ['ang', 8736],
        ['and', 8743],
        ['or', 8744],
        ['cap', 8745],
        ['cup', 8746],
        ['int', 8747],
        ['there4', 8756],
        ['sim', 8764],
        ['cong', 8773],
        ['asymp', 8776],
        ['ne', 8800],
        ['equiv', 8801],
        ['le', 8804],
        ['ge', 8805],
        ['sub', 8834],
        ['sup', 8835],
        ['nsub', 8836],
        ['sube', 8838],
        ['supe', 8839],
        ['oplus', 8853],
        ['otimes', 8855],
        ['perp', 8869],
        ['sdot', 8901],
        ['lceil', 8968],
        ['rceil', 8969],
        ['lfloor', 8970],
        ['rfloor', 8971],
        ['lang', 9001],
        ['rang', 9002],
        ['spades', 9824],
        ['clubs', 9827],
        ['hearts', 9829],
        ['diams', 9830],
        ['loz', 9674],
        ['OElig', 338],
        ['oelig', 339],
        ['Scaron', 352],
        ['scaron', 353],
        ['Yuml', 376],
        ['circ', 710],
        ['tilde', 732],
        ['ndash', 8211],
        ['mdash', 8212],
        ['lsquo', 8216],
        ['rsquo', 8217],
        ['sbquo', 8218],
        ['ldquo', 8220],
        ['rdquo', 8221],
        ['bdquo', 8222],
        ['dagger', 8224],
        ['Dagger', 8225],
        ['permil', 8240],
        ['lsaquo', 8249],
        ['rsaquo', 8250],
        ['euro', 8364],
        ['NestedGreaterGreater', 8811],
        ['NestedLessLess', 8810]
    ];

    var invisibleEntities = [
        ['nbsp', 160],
        ['thinsp', 8201],
        ['ensp', 8194],
        ['emsp', 8195],
        ['shy', 173],
        ['zwnj', 8204],
        ['zwj', 8205],
        ['lrm', 8206],
        ['rlm', 8207]
    ];

    var HtmlEntities = /** @class */ (function () {
        function HtmlEntities() {
            var _this = this;
            this.entities = this.prepareEntities(__spreadArray(__spreadArray([], visibleEntities, true), invisibleEntities, true));
            this.entitiesByName = {};
            this.entitiesByNameEntity = {};
            this.entitiesByDigitEntity = {};
            this.entitiesByUtf = {};
            this.entities.forEach(function (entity) {
                _this.entitiesByName[entity.name] = entity;
                _this.entitiesByNameEntity[entity.nameEntity] = entity;
                _this.entitiesByDigitEntity[entity.digitEntity] = entity;
                _this.entitiesByUtf[entity.utf] = entity;
            });
            this.invisibleEntities = this.prepareEntities(invisibleEntities);
        }
        /**
         * Entities as name or digit to UTF-8.
         */
        HtmlEntities.prototype.toUtf = function (context) {
            var _this = this;
            if (context.text.search(/&#/) !== -1) {
                context.text = this.decHexToUtf(context.text);
            }
            if (context.text.search(/&[a-z]/i) !== -1) {
                // 2 - min length of entity without & and ;. Example: &DD;
                // 31 - max length of entity without & and ;. Example: &CounterClockwiseContourIntegral;
                context.text = context.text.replace(/&[a-z\d]{2,31};/gi, function (key) {
                    var entity = _this.entitiesByNameEntity[key];
                    return entity ? entity.utf : key;
                });
            }
        };
        /**
         * Entities in decimal or hexadecimal form to UTF-8.
         */
        HtmlEntities.prototype.decHexToUtf = function (text) {
            return text
                .replace(/&#(\d{1,6});/gi, function ($0, $1) {
                return String.fromCharCode(parseInt($1, 10));
            })
                .replace(/&#x([\da-f]{1,6});/gi, function ($0, $1) {
                return String.fromCharCode(parseInt($1, 16));
            });
        };
        /**
         * Restore HTML entities in text.
         */
        HtmlEntities.prototype.restore = function (context) {
            var params = context.prefs.htmlEntity;
            var type = params.type;
            var entities = this.entities;
            if (type === 'name' || type === 'digit') {
                if (params.onlyInvisible || params.list) {
                    entities = [];
                    if (params.onlyInvisible) {
                        entities = entities.concat(this.invisibleEntities);
                    }
                    if (params.list) {
                        entities = entities.concat(this.prepareListParam(params.list));
                    }
                }
                var entityType = type === 'name' ? 'nameEntity' : 'digitEntity';
                context.text = this.restoreEntitiesByIndex(context.text, entityType, entities);
            }
        };
        /**
         * Get a entity by utf using the type.
         */
        HtmlEntities.prototype.getByUtf = function (symbol, type) {
            var result;
            switch (type) {
                case 'digit':
                    result = this.entitiesByDigitEntity[symbol];
                    break;
                case 'name':
                    result = this.entitiesByNameEntity[symbol];
                    break;
                default:
                    result = symbol;
                    break;
            }
            return result;
        };
        HtmlEntities.prototype.prepareEntities = function (entities) {
            var result = [];
            entities.forEach(function (entity) {
                var name = entity[0], digit = entity[1];
                var utf = String.fromCharCode(digit);
                result.push({
                    name: name,
                    nameEntity: '&' + name + ';',
                    digitEntity: '&#' + digit + ';',
                    utf: utf,
                    reName: new RegExp('&' + name + ';', 'g'),
                    reUtf: new RegExp(utf, 'g')
                });
            });
            return result;
        };
        HtmlEntities.prototype.prepareListParam = function (list) {
            var _this = this;
            var result = [];
            list.forEach(function (name) {
                var entity = _this.entitiesByName[name];
                if (entity) {
                    result.push(entity);
                }
            });
            return result;
        };
        HtmlEntities.prototype.restoreEntitiesByIndex = function (text, type, entities) {
            entities.forEach(function (entity) {
                text = text.replace(entity.reUtf, entity[type]);
            });
            return text;
        };
        return HtmlEntities;
    }());
    var htmlEntities = new HtmlEntities();

    var locales = [];
    function addLocale(locale) {
        var code = (locale || '').split('/')[0];
        if (code && code !== 'common' && !hasLocale(code)) {
            locales.push(code);
            locales.sort();
        }
    }
    function getLocales() {
        return locales;
    }
    function hasLocale(locale) {
        return locale === 'common' || locales.indexOf(locale) !== -1;
    }
    function prepareLocale(locale1, locale2) {
        var locale = locale1 || locale2;
        if (!locale) {
            return [];
        }
        return Array.isArray(locale) ? locale : [locale];
    }
    function checkLocales(locales) {
        if (!locales.length) {
            throw Error('Not defined the property "locale".');
        }
        locales.forEach(function (locale) {
            if (!hasLocale(locale)) {
                throw Error("\"".concat(locale, "\" is not supported locale."));
            }
        });
    }

    var data$1 = {};
    /**
     * Get data for use in rules.
     */
    function getData(key) {
        return data$1[key];
    }
    /**
     * Set data for use in rules.
     */
    function setData(newData) {
        Object.keys(newData).forEach(function (key) {
            addLocale(key);
            data$1[key] = newData[key];
        });
    }

    var inlineElements = [
        'a',
        'abbr',
        'acronym',
        'b',
        'bdo',
        'big',
        'br',
        'button',
        'cite',
        'code',
        'dfn',
        'em',
        'i',
        'img',
        'input',
        'kbd',
        'label',
        'map',
        'object',
        'q',
        'samp',
        'script',
        'select',
        'small',
        'span',
        'strong',
        'sub',
        'sup',
        'textarea',
        'time',
        'tt',
        'var'
    ];

    var regExpUrl = new RegExp('(https?|file|ftp)://([a-zA-Z0-9/+-=%&:_.~?]+[a-zA-Z0-9#+]*)', 'g');
    var regExpNumber = '\\d+([.,]\\d+)?';
    var regExpDigit = /\d/;
    function isDigit(symbol) {
        return symbol.search(regExpDigit) > -1;
    }

    var privateLabel = '\uF000';
    var privateSeparateLabel = '\uF001';

    var SafeTags = /** @class */ (function () {
        function SafeTags() {
            this.groups = ['own', 'html', 'url'];
            this.hidden = {};
            this.counter = 0;
            var html = [
                ['<!--', '-->'],
                ['<!ENTITY', '>'],
                ['<!DOCTYPE', '>'],
                ['<\\?xml', '\\?>'],
                ['<!\\[CDATA\\[', '\\]\\]>']
            ];
            [
                'code',
                'kbd',
                'object',
                'pre',
                'samp',
                'script',
                'style',
                'var'
            ].forEach(function (tag) {
                html.push([
                    "<".concat(tag, "(\\s[^>]*?)?>"),
                    "</".concat(tag, ">")
                ]);
            });
            this.tags = {
                own: [],
                html: html.map(this.prepareRegExp),
                url: [regExpUrl]
            };
        }
        /**
         * Add own safe tag.
         */
        SafeTags.prototype.add = function (tag) {
            this.tags.own.push(this.prepareRegExp(tag));
        };
        /**
         * Show safe tags.
         */
        SafeTags.prototype.show = function (context, group) {
            var reReplace = new RegExp(privateLabel + 'tf\\d+' + privateLabel, 'g');
            var reSearch = new RegExp(privateLabel + 'tf\\d');
            var replaceLabel = function (match) {
                return context.safeTags.hidden[group][match] || match;
            };
            for (var i = 0, len = this.tags[group].length; i < len; i++) {
                context.text = context.text.replace(reReplace, replaceLabel);
                if (context.text.search(reSearch) === -1) {
                    break;
                }
            }
        };
        /**
         * Hide safe tags.
         */
        SafeTags.prototype.hide = function (context, group) {
            var _this = this;
            context.safeTags.hidden[group] = {};
            var pasteLabel = this.pasteLabel.bind(this, context, group);
            this.tags[group].forEach(function (tag) {
                context.text = context.text.replace(_this.prepareRegExp(tag), pasteLabel);
            });
        };
        /**
         * Hide HTML tags.
         */
        SafeTags.prototype.hideHTMLTags = function (context) {
            if (context.isHTML) {
                var pasteLabel = this.pasteLabel.bind(this, context, 'html');
                context.text = context.text
                    .replace(/<\/?[a-z][^]*?>/gi, pasteLabel) // Tags
                    .replace(/&lt;\/?[a-z][^]*?&gt;/gi, pasteLabel) // Escaping tags
                    .replace(/&[gl]t;/gi, pasteLabel);
            }
        };
        /**
         * Get previous label.
         */
        SafeTags.prototype.getPrevLabel = function (text, position) {
            for (var i = position - 1; i >= 0; i--) {
                if (text[i] === privateLabel) {
                    return text.slice(i, position + 1);
                }
            }
            return '';
        };
        SafeTags.prototype.getNextLabel = function (text, position) {
            for (var i = position + 1; i < text.length; i++) {
                if (text[i] === privateLabel) {
                    return text.slice(position, i + 1);
                }
            }
            return '';
        };
        SafeTags.prototype.getTagByLabel = function (context, label) {
            var result = null;
            this.groups.some(function (group) {
                var value = context.safeTags.hidden[group][label];
                if (typeof value !== 'undefined') {
                    result = {
                        group: group,
                        value: value
                    };
                }
                return result;
            });
            return result;
        };
        SafeTags.prototype.getTagInfo = function (tag) {
            if (!tag) {
                return null;
            }
            var result = { group: tag.group };
            switch (tag.group) {
                case 'html':
                    result.name = tag.value.split(/[<\s>]/)[1];
                    result.isInline = inlineElements.indexOf(result.name) > -1;
                    result.isClosing = tag.value.search(/^<\//) > -1;
                    break;
                case 'url':
                    result.isInline = true;
                    break;
                case 'own':
                    result.isInline = false;
                    break;
            }
            return result;
        };
        SafeTags.prototype.pasteLabel = function (context, group, match) {
            var safeTags = context.safeTags;
            var key = privateLabel + 'tf' + safeTags.counter + privateLabel;
            safeTags.hidden[group][key] = match;
            safeTags.counter++;
            return key;
        };
        SafeTags.prototype.prepareRegExp = function (tag) {
            if (tag instanceof RegExp) {
                return tag;
            }
            var startTag = tag[0], endTag = tag[1], middle = tag[2];
            return new RegExp(startTag +
                (typeof middle === 'undefined' ? '[^]*?' : middle) +
                endTag, 'gi');
        };
        SafeTags.prototype.getPrevTagInfo = function (context, text, pos) {
            var prevLabel = this.getPrevLabel(text, pos - 1);
            if (prevLabel) {
                var prevTag = this.getTagByLabel(context, prevLabel);
                if (prevTag) {
                    return this.getTagInfo(prevTag);
                }
            }
            return null;
        };
        SafeTags.prototype.getNextTagInfo = function (context, text, pos) {
            var nextLabel = this.getNextLabel(text, pos + 1);
            if (nextLabel) {
                var nextTag = this.getTagByLabel(context, nextLabel);
                if (nextTag) {
                    return this.getTagInfo(nextTag);
                }
            }
            return null;
        };
        return SafeTags;
    }());

    function repeat(symbol, count) {
        var result = '';
        for (;;) {
            if ((count & 1) === 1) {
                result += symbol;
            }
            count >>>= 1;
            if (count === 0) {
                break;
            }
            symbol += symbol;
        }
        return result;
    }
    function replaceNbsp$1(text) {
        return text.replace(/\u00A0/g, ' ');
    }
    function replace(text, re) {
        for (var i = 0; i < re.length; i++) {
            text = text.replace(re[i][0], re[i][1]);
        }
        return text;
    }
    function isHTML(text) {
        return text.search(/(<\/?[a-z]|<!|&[lg]t;)/i) !== -1;
    }
    function removeCR(text) {
        return text.replace(/\r\n?/g, '\n');
    }
    function fixLineEnding(text, type) {
        if (type === 'CRLF') { // Windows
            return text.replace(/\n/g, '\r\n');
        }
        else if (type === 'CR') { // Mac
            return text.replace(/\n/g, '\r');
        }
        return text;
    }

    /**
     * Get a deep copy of a object.
     */
    function deepCopy(obj) {
        return typeof obj === 'object' ? JSON.parse(JSON.stringify(obj)) : obj;
    }

    var groupIndexes = {
        symbols: 110,
        'number': 150,
        space: 210,
        dash: 310,
        punctuation: 410,
        nbsp: 510,
        money: 710,
        date: 810,
        other: 910,
        optalign: 1010,
        typo: 1110,
        html: 1210
    };

    var DEFAULT_RULE_INDEX = 0;
    var DEFAULT_QUEUE_NAME = 'default';
    var rules = [];
    var innerRules = [];
    function addInnerRule(rule) {
        innerRules.push(prepareRule(rule));
    }
    function addRule(rule) {
        var preparedRule = prepareRule(rule);
        addLocale(preparedRule.locale);
        rules.push(preparedRule);
    }
    function sortRules(rules) {
        rules.sort(function (a, b) { return a.index > b.index ? 1 : -1; });
    }
    function getRules() {
        var result = __spreadArray([], rules, true);
        sortRules(result);
        return result;
    }
    function getInnerRules() {
        return __spreadArray([], innerRules, true);
    }
    function getRuleIndex(rule) {
        if (typeof rule.index === 'number') {
            return rule.index;
        }
        var _a = rule.name.split('/'), group = _a[1];
        var groupIndex = groupIndexes[group];
        if (typeof groupIndex === 'undefined') {
            groupIndex = DEFAULT_RULE_INDEX;
        }
        if (typeof rule.index === 'string') {
            return groupIndex + parseInt(rule.index, 10);
        }
        return groupIndex;
    }
    function prepareRule(rule) {
        var _a = rule.name.split('/'), locale = _a[0], group = _a[1], shortName = _a[2];
        var preparedRule = {
            name: rule.name,
            shortName: shortName,
            handler: rule.handler,
            queue: rule.queue || DEFAULT_QUEUE_NAME,
            enabled: rule.disabled === true ? false : true,
            locale: locale,
            group: group,
            index: getRuleIndex(rule),
            settings: rule.settings,
            live: rule.live,
            htmlAttrs: rule.htmlAttrs,
        };
        return preparedRule;
    }

    var PACKAGE_VERSION = '7.0.0';

    function prepareHtmlEntity(htmlEntity) {
        var result = {
            type: (htmlEntity === null || htmlEntity === void 0 ? void 0 : htmlEntity.type) || 'default',
            list: htmlEntity === null || htmlEntity === void 0 ? void 0 : htmlEntity.list,
            onlyInvisible: Boolean(htmlEntity === null || htmlEntity === void 0 ? void 0 : htmlEntity.onlyInvisible),
        };
        return result;
    }
    function prepareLineEnding(lineEnding) {
        return lineEnding || 'LF';
    }
    function preparePrefs(prefs) {
        var result = {
            locale: prepareLocale(prefs.locale),
            lineEnding: prepareLineEnding(prefs.lineEnding),
            live: Boolean(prefs.live),
            ruleFilter: prefs.ruleFilter,
            enableRule: prefs.enableRule,
            disableRule: prefs.disableRule,
            processingSeparateParts: prefs.processingSeparateParts,
            htmlEntity: prepareHtmlEntity(prefs.htmlEntity),
        };
        return result;
    }
    function prepareContextPrefs(prefs, executePrefs) {
        var result = __assign({}, prefs);
        if (!executePrefs) {
            return result;
        }
        if ('locale' in executePrefs) {
            result.locale = prepareLocale(executePrefs.locale);
        }
        if ('htmlEntity' in executePrefs) {
            result.htmlEntity = prepareHtmlEntity(executePrefs.htmlEntity);
        }
        if ('lineEnding' in executePrefs) {
            result.lineEnding = prepareLineEnding(executePrefs.lineEnding);
        }
        if ('processingSeparateParts' in executePrefs) {
            result.processingSeparateParts = executePrefs.processingSeparateParts;
        }
        if ('ruleFilter' in executePrefs) {
            result.ruleFilter = executePrefs.ruleFilter;
        }
        return result;
    }

    var Typograf = /** @class */ (function () {
        function Typograf(prefs) {
            var _this = this;
            this.rules = [];
            this.innerRules = [];
            this.rulesByQueues = {};
            this.innerRulesByQueues = {};
            this.separatePartsTags = [
                'title',
                'p',
                'h[1-6]',
                'select',
                'legend',
            ];
            this.prefs = preparePrefs(prefs);
            checkLocales(this.prefs.locale);
            this.safeTags = new SafeTags();
            this.settings = {};
            this.enabledRules = {};
            this.innerRulesByQueues = {};
            this.innerRules = getInnerRules();
            this.innerRules.forEach(function (rule) {
                _this.innerRulesByQueues[rule.queue] = _this.innerRulesByQueues[rule.queue] || [];
                _this.innerRulesByQueues[rule.queue].push(rule);
            });
            this.rulesByQueues = {};
            this.rules = getRules();
            this.rules.forEach(function (rule) {
                _this.prepareRuleSettings(rule);
                _this.rulesByQueues[rule.queue] = _this.rulesByQueues[rule.queue] || [];
                _this.rulesByQueues[rule.queue].push(rule);
            });
            this.prefs.disableRule && this.disableRule(this.prefs.disableRule);
            this.prefs.enableRule && this.enableRule(this.prefs.enableRule);
        }
        Typograf.addRule = function (rule) {
            addRule(rule);
        };
        Typograf.addRules = function (rules) {
            var _this = this;
            rules.forEach(function (item) {
                _this.addRule(item);
            });
        };
        /**
         * Add internal rule.
         * Internal rules are executed before main rules.
         */
        Typograf.addInnerRule = function (rule) {
            addInnerRule(rule);
        };
        Typograf.addInnerRules = function (rules) {
            var _this = this;
            rules.forEach(function (item) {
                _this.addInnerRule(item);
            });
        };
        Typograf.getRule = function (ruleName) {
            var rule = null;
            var rules = getRules();
            rules.some(function (item) {
                if (item.name === ruleName) {
                    rule = item;
                    return true;
                }
                return false;
            });
            return rule;
        };
        Typograf.getRules = function () {
            return getRules();
        };
        Typograf.getInnerRules = function () {
            return getInnerRules();
        };
        Typograf.getLocales = function () {
            return getLocales();
        };
        Typograf.addLocale = function (locale) {
            addLocale(locale);
        };
        Typograf.hasLocale = function (locale) {
            return hasLocale(locale);
        };
        Typograf.setData = function (data) {
            setData(data);
        };
        Typograf.getData = function (key) {
            return getData(key);
        };
        /**
         * Execute typographical rules for text.
         */
        Typograf.prototype.execute = function (text, prefs) {
            text = '' + text;
            if (!text) {
                return '';
            }
            var contextPrefs = prepareContextPrefs(this.prefs, prefs);
            checkLocales(contextPrefs.locale);
            var context = this.prepareContext(text, contextPrefs);
            return this.process(context);
        };
        Typograf.prototype.getSetting = function (ruleName, setting) {
            return this.settings[ruleName] && this.settings[ruleName][setting];
        };
        Typograf.prototype.setSetting = function (ruleName, setting, value) {
            this.settings[ruleName] = this.settings[ruleName] || {};
            this.settings[ruleName][setting] = value;
        };
        Typograf.prototype.isEnabledRule = function (ruleName) {
            return this.enabledRules[ruleName] !== false;
        };
        Typograf.prototype.isDisabledRule = function (ruleName) {
            return !this.enabledRules[ruleName];
        };
        Typograf.prototype.enableRule = function (ruleName) {
            return this.enable(ruleName, true);
        };
        Typograf.prototype.disableRule = function (ruleName) {
            return this.enable(ruleName, false);
        };
        /**
         * Add safe tag.
         *
         * @example
         * // const typograf = new Typograf({ locale: 'ru' });
         * // typograf.addSafeTag('<mytag>', '</mytag>');
         * // typograf.addSafeTag('<mytag>', '</mytag>', '.*?');
         * // typograf.addSafeTag(/<mytag>.*?</mytag>/gi);
        */
        Typograf.prototype.addSafeTag = function (startTag, endTag, middle) {
            var tag = startTag instanceof RegExp ? startTag : [startTag, endTag, middle];
            this.safeTags.add(tag);
        };
        Typograf.prototype.prepareContext = function (text, prefs) {
            var context = {
                text: text,
                isHTML: isHTML(text),
                prefs: prefs,
                getData: function (key) {
                    if (key === 'char') {
                        return prefs.locale.map(function (item) {
                            return getData(item + '/' + key);
                        }).join('');
                    }
                    else {
                        return getData(prefs.locale[0] + '/' + key);
                    }
                },
                safeTags: this.safeTags,
            };
            return context;
        };
        Typograf.prototype.splitBySeparateParts = function (context) {
            if (!context.isHTML || context.prefs.processingSeparateParts === false) {
                return [context.text];
            }
            var text = [];
            var reTags = new RegExp('<(' + this.separatePartsTags.join('|') + ')(\\s[^>]*?)?>[^]*?</\\1>', 'gi');
            var position = 0;
            context.text.replace(reTags, function ($0, $1, $2, itemPosition) {
                if (position !== itemPosition) {
                    text.push((position ? privateSeparateLabel : '') +
                        context.text.slice(position, itemPosition) +
                        privateSeparateLabel);
                }
                text.push($0);
                position = itemPosition + $0.length;
                return $0;
            });
            text.push(position ?
                (privateSeparateLabel + context.text.slice(position, context.text.length)) :
                context.text);
            return text;
        };
        Typograf.prototype.process = function (context) {
            var _this = this;
            context.text = removeCR(context.text);
            this.executeRules(context, 'start');
            this.safeTags.hide(context, 'own');
            this.executeRules(context, 'hide-safe-tags-own');
            this.safeTags.hide(context, 'html');
            this.executeRules(context, 'hide-safe-tags-html');
            var isRootHTML = context.isHTML;
            var re = new RegExp(privateSeparateLabel, 'g');
            context.text = this.splitBySeparateParts(context).map(function (item) {
                context.text = item;
                context.isHTML = isHTML(item);
                _this.safeTags.hideHTMLTags(context);
                _this.safeTags.hide(context, 'url');
                _this.executeRules(context, 'hide-safe-tags-url');
                _this.executeRules(context, 'hide-safe-tags');
                htmlEntities.toUtf(context);
                if (context.prefs.live) {
                    context.text = replaceNbsp$1(context.text);
                }
                _this.executeRules(context, 'utf');
                _this.executeRules(context);
                htmlEntities.restore(context);
                _this.executeRules(context, 'html-entities');
                _this.safeTags.show(context, 'url');
                _this.executeRules(context, 'show-safe-tags-url');
                return context.text.replace(re, '');
            }).join('');
            context.isHTML = isRootHTML;
            this.safeTags.show(context, 'html');
            this.executeRules(context, 'show-safe-tags-html');
            this.safeTags.show(context, 'own');
            this.executeRules(context, 'show-safe-tags-own');
            this.executeRules(context, 'end');
            return fixLineEnding(context.text, context.prefs.lineEnding);
        };
        Typograf.prototype.executeRules = function (context, queue) {
            var _this = this;
            if (queue === void 0) { queue = DEFAULT_QUEUE_NAME; }
            var rules = this.rulesByQueues[queue];
            var innerRules = this.innerRulesByQueues[queue];
            innerRules && innerRules.forEach(function (rule) {
                _this.ruleIterator(context, rule);
            });
            rules && rules.forEach(function (rule) {
                _this.ruleIterator(context, rule);
            });
        };
        Typograf.prototype.ruleIterator = function (context, rule) {
            if ((context.prefs.live === true && rule.live === false) || (context.prefs.live === false && rule.live === true)) {
                return;
            }
            if ((rule.locale === 'common' || rule.locale === context.prefs.locale[0]) && this.isEnabledRule(rule.name)) {
                if (context.prefs.ruleFilter && !context.prefs.ruleFilter(rule)) {
                    return;
                }
                this.onBeforeRule && this.onBeforeRule(rule.name, context);
                context.text = rule.handler.call(this, context.text, this.settings[rule.name], context);
                this.onAfterRule && this.onAfterRule(rule.name, context);
            }
        };
        Typograf.prototype.prepareRuleSettings = function (rule) {
            this.settings[rule.name] = deepCopy(rule.settings);
            this.enabledRules[rule.name] = rule.enabled;
        };
        Typograf.prototype.enable = function (ruleName, enabled) {
            var _this = this;
            if (Array.isArray(ruleName)) {
                ruleName.forEach(function (item) {
                    _this.enableByMask(item, enabled);
                });
            }
            else {
                this.enableByMask(ruleName, enabled);
            }
        };
        Typograf.prototype.enableByMask = function (ruleName, enabled) {
            var _this = this;
            if (!ruleName) {
                return;
            }
            if (ruleName.search(/\*/) !== -1) {
                var re_1 = new RegExp(ruleName
                    .replace(/\//g, '\\/')
                    .replace(/\*/g, '.*'));
                this.rules.forEach(function (el) {
                    var name = el.name;
                    if (re_1.test(name)) {
                        _this.enabledRules[name] = enabled;
                    }
                });
            }
            else {
                this.enabledRules[ruleName] = enabled;
            }
        };
        Typograf.groups = [];
        Typograf.titles = {};
        Typograf.version = PACKAGE_VERSION;
        return Typograf;
    }());

    var common = {
        'common/char': 'a-z',
        'common/dash': '--?|‒|–|—',
        'common/quote': '«‹»›„“‟”"',
    };

    var be = {
        'be/char': 'абвгдежзйклмнопрстуфхцчшыьэюяёіўґ',
        'be/quote': {
            left: '«“',
            right: '»”',
        }
    };

    var bg = {
        'bg/char': 'абвгдежзийклмнопрстуфхцчшщъьюя',
        'bg/quote': {
            left: '„’',
            right: '“’',
        }
    };

    var ca = {
        'ca/char': 'abcdefghijlmnopqrstuvxyzàçèéíïòóúü',
        'ca/quote': {
            left: '«“',
            right: '»”',
        }
    };

    var cs = {
        'cs/char': 'a-záéíóúýčďěňřšťůž',
        'cs/quote': {
            left: '„‚',
            right: '“‘',
        }
    };

    var da = {
        'da/char': 'a-zåæø',
        'da/quote': {
            left: '»›',
            right: '«‹',
        }
    };

    var de = {
        'de/char': 'a-zßäöü',
        'de/quote': {
            left: '„‚',
            right: '“‘',
        }
    };

    var el = {
        'el/char': 'ΐάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϲάέήίόύώ',
        'el/quote': {
            left: '«“',
            right: '»”',
        }
    };

    var enGB = {
        'en-GB/char': 'a-z',
        'en-GB/quote': {
            left: '‘“',
            right: '’”',
        }
    };

    var enUS = {
        'en-US/char': 'a-z',
        'en-US/quote': {
            left: '“‘',
            right: '”’',
        }
    };

    var eo = {
        'eo/char': 'abcdefghijklmnoprstuvzĉĝĥĵŝŭ',
        'eo/quote': {
            left: '“‘',
            right: '”’',
        }
    };

    var es = {
        'es/char': 'a-záéíñóúü',
        'es/quote': {
            left: '«“',
            right: '»”',
        }
    };

    var et = {
        'et/char': 'abdefghijklmnoprstuvzäõöüšž',
        'et/quote': {
            left: '„«',
            right: '“»',
        }
    };

    var fi = {
        'fi/char': 'abcdefghijklmnopqrstuvyöäå',
        'fi/quote': {
            left: '”’',
            right: '”’',
        }
    };

    var fr = {
        'fr/char': 'a-zàâçèéêëîïôûüœæ',
        'fr/quote': {
            left: '«‹',
            right: '»›',
            spacing: true,
        }
    };

    var ga = {
        'ga/char': 'abcdefghilmnoprstuvwxyzáéíóú',
        'ga/quote': {
            left: '“‘',
            right: '”’',
        }
    };

    var hu = {
        'hu/char': 'a-záäéíóöúüőű',
        'hu/quote': {
            left: '„»',
            right: '”«',
        }
    };

    var it = {
        'it/char': 'a-zàéèìòù',
        'it/quote': {
            left: '«“',
            right: '»”',
        }
    };

    var lv = {
        'lv/char': 'abcdefghijklmnopqrstuvxzæœ',
        'lv/quote': {
            left: '«„',
            right: '»“',
        }
    };

    var nl = {
        'nl/char': 'a-zäçèéêëîïñöûü',
        'nl/quote': {
            left: '‘“',
            right: '’”',
        }
    };

    var no = {
        'no/char': 'a-zåæèéêòóôø',
        'no/quote': {
            left: '«’',
            right: '»’',
        }
    };

    var pl = {
        'pl/char': 'abcdefghijklmnoprstuvwxyzóąćęłńśźż',
        'pl/quote': {
            left: '„«',
            right: '”»',
        }
    };

    var ro = {
        'ro/char': 'abcdefghijklmnoprstuvxzîășț',
        'ro/quote': {
            left: '„«',
            right: '”»',
        }
    };

    var ru = {
        'ru/char': 'а-яё',
        'ru/dashBefore': '(^| |\\n)',
        'ru/dashAfter': '(?=[\u00A0 ,.?:!]|$)',
        'ru/dashAfterDe': '(?=[,.?:!]|[\u00A0 ][^А-ЯЁ]|$)',
        'ru/l': 'а-яёa-z',
        'ru/L': 'А-ЯЁA-Z',
        'ru/month': 'январь|февраль|март|апрель|май|июнь|июль|август|сентябрь|октябрь|ноябрь|декабрь',
        'ru/monthGenCase': 'января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря',
        'ru/monthPreCase': 'январе|феврале|марте|апреле|мае|июне|июле|августе|сентябре|октябре|ноябре|декабре',
        'ru/quote': {
            left: '«„‚',
            right: '»“‘',
            removeDuplicateQuotes: true,
        },
        'ru/shortMonth': 'янв|фев|мар|апр|ма[ейя]|июн|июл|авг|сен|окт|ноя|дек',
        'ru/weekday': 'понедельник|вторник|среда|четверг|пятница|суббота|воскресенье',
    };

    var sk = {
        'sk/char': 'abcdefghijklmnoprstuvwxyzáäéíóôúýčďľňŕšťž',
        'sk/quote': {
            left: '„‚',
            right: '“‘',
        }
    };

    var sl = {
        'sl/char': 'a-zčšž',
        'sl/quote': {
            left: '„‚',
            right: '“‘',
        }
    };

    var sr = {
        'sr/char': 'abcdefghijklmnoprstuvzćčđšž',
        'sr/quote': {
            left: '„’',
            right: '”’',
        }
    };

    var sv = {
        'sv/char': 'a-zäåéö',
        'sv/quote': {
            left: '”’',
            right: '”’',
        }
    };

    var tr = {
        'tr/char': 'abcdefghijklmnoprstuvyzâçîöûüğış',
        'tr/quote': {
            left: '“‘',
            right: '”’',
        }
    };

    var uk = {
        'uk/char': 'абвгдежзийклмнопрстуфхцчшщьюяєіїґ',
        'uk/quote': {
            left: '«„',
            right: '»“',
        }
    };

    var data = [
        common,
        be,
        bg,
        ca,
        cs,
        da,
        de,
        el,
        enGB,
        enUS,
        eo,
        es,
        et,
        fi,
        fr,
        ga,
        hu,
        it,
        lv,
        nl,
        no,
        pl,
        ro,
        ru,
        sk,
        sl,
        sr,
        sv,
        tr,
        uk
    ];
    data.forEach(function (item) { return setData(item); });

    var eMailRule = {
        name: 'common/html/e-mail',
        queue: 'end',
        handler: function (text, _settings, context) {
            return context.isHTML ? text : text.replace(/(^|[\s;(])([\w\-.]{2,64})@([\w\-.]{2,64})\.([a-z]{2,64})([)\s.,!?]|$)/gi, '$1<a href="mailto:$2@$3.$4">$2@$3.$4</a>$5');
        },
        disabled: true,
        htmlAttrs: false,
    };

    var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#39;',
        '/': '&#x2F;'
    };
    var escapeRule = {
        name: 'common/html/escape',
        index: '+100',
        queue: 'end',
        handler: function (text) {
            return text.replace(/[&<>"'/]/g, function (key) { return entityMap[key]; });
        },
        disabled: true,
    };

    var nbrRule = {
        name: 'common/html/nbr',
        index: '+10',
        queue: 'end',
        handler: function (text) {
            return text.replace(/([^\n>])\n(?=[^\n])/g, '$1<br/>\n');
        },
        disabled: true,
        htmlAttrs: false,
    };

    var blockElements = [
        'address',
        'article',
        'aside',
        'blockquote',
        'canvas',
        'dd',
        'div',
        'dl',
        'fieldset',
        'figcaption',
        'figure',
        'footer',
        'form',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'header',
        'hgroup',
        'hr',
        'li',
        'main',
        'nav',
        'noscript',
        'ol',
        'output',
        'p',
        'pre',
        'section',
        'table',
        'tfoot',
        'ul',
        'video'
    ];

    var blockRe = new RegExp('<(' + blockElements.join('|') + ')[>\\s]');
    var separator = '\n\n';
    var pRule = {
        name: 'common/html/p',
        index: '+5',
        queue: 'end',
        handler: function (text) {
            var buffer = text.split(separator);
            buffer.forEach(function (text, i, data) {
                if (!text.trim()) {
                    return;
                }
                if (!blockRe.test(text)) {
                    data[i] = text.replace(/^(\s*)/, '$1<p>').replace(/(\s*)$/, '</p>$1');
                }
            });
            return buffer.join(separator);
        },
        disabled: true,
        htmlAttrs: false,
    };

    var processingAttrsRule = {
        name: 'common/html/processingAttrs',
        queue: 'hide-safe-tags-own',
        handler: function (text, settings, context) {
            var _this = this;
            var reAttrs = new RegExp('(^|\\s)(' + settings.attrs.join('|') + ')=("[^"]*?"|\'[^\']*?\')', 'gi');
            var prefs = deepCopy(context.prefs);
            prefs.ruleFilter = function (rule) { return rule.htmlAttrs !== false; };
            return text.replace(/(<[-\w]+\s)([^>]+?)(?=>)/g, function (_match, tagName, attrs) {
                var resultAttrs = attrs.replace(reAttrs, function (_submatch, space, attrName, attrValue) {
                    var lquote = attrValue[0];
                    var rquote = attrValue[attrValue.length - 1];
                    var value = attrValue.slice(1, -1);
                    return space + attrName + '=' + lquote + _this.execute(value, prefs) + rquote;
                });
                return tagName + resultAttrs;
            });
        },
        settings: {
            attrs: ['title', 'placeholder']
        },
        disabled: true,
        htmlAttrs: false,
    };

    var quotRule = {
        name: 'common/html/quot',
        queue: 'hide-safe-tags',
        handler: function (text) {
            return text.replace(/&quot;/g, '"');
        },
    };

    var stripTagsRule = {
        name: 'common/html/stripTags',
        index: '+99',
        queue: 'end',
        handler: function (text) {
            return text.replace(/<[^>]+>/g, '');
        },
        disabled: true,
    };

    var urlRule = {
        name: 'common/html/url',
        queue: 'end',
        handler: function (text, _settings, context) {
            return context.isHTML ? text : text.replace(regExpUrl, function ($0, protocol, path) {
                path = path
                    .replace(/([^/]+\/?)(\?|#)$/, '$1') // Remove ending ? and #
                    .replace(/^([^/]+)\/$/, '$1'); // Remove ending /
                if (protocol === 'http') {
                    path = path.replace(/^([^/]+)(:80)([^\d]|\/|$)/, '$1$3'); // Remove 80 port
                }
                else if (protocol === 'https') {
                    path = path.replace(/^([^/]+)(:443)([^\d]|\/|$)/, '$1$3'); // Remove 443 port
                }
                var url = path;
                var fullUrl = protocol + '://' + path;
                var firstPart = '<a href="' + fullUrl + '">';
                if (protocol === 'http' || protocol === 'https') {
                    url = url.replace(/^www\./, '');
                    return firstPart + (protocol === 'http' ? url : protocol + '://' + url) + '</a>';
                }
                return firstPart + fullUrl + '</a>';
            });
        },
        disabled: true,
        htmlAttrs: false,
    };

    Typograf.addRules([
        eMailRule,
        escapeRule,
        nbrRule,
        pRule,
        processingAttrsRule,
        quotRule,
        stripTagsRule,
        urlRule,
    ]);

    var afterNumberRule = {
        name: 'common/nbsp/afterNumber',
        handler: function (text, _settings, context) {
            var char = context.getData('char');
            var re = '(^|\\s)(\\d{1,5}) ([' + char + ']+)';
            return text.replace(new RegExp(re, 'gi'), '$1$2\u00A0$3');
        },
        disabled: true,
    };

    var afterParagraphMarkRule = {
        name: 'common/nbsp/afterParagraphMark',
        handler: function (text) {
            return text.replace(/¶ ?(?=\d)/g, '¶\u00A0');
        },
    };

    var afterSectionMarkRule = {
        name: 'common/nbsp/afterSectionMark',
        handler: function (text, _settings, context) {
            // \u2009 - THIN SPACE
            // \u202F - NARROW NO-BREAK SPACE
            var locale = context.prefs.locale[0];
            return text.replace(/§[ \u00A0\u2009]?(?=\d|I|V|X)/g, locale === 'ru' ? '§\u202F' : '§\u00A0');
        },
    };

    var afterShortWordRule = {
        name: 'common/nbsp/afterShortWord',
        handler: function (text, settings, context) {
            var len = settings.lengthShortWord;
            var quote = getData('common/quote');
            var char = context.getData('char');
            var before = ' \u00A0(' + privateLabel + quote;
            var subStr = '(^|[' + before + '])([' + char + ']{1,' + len + '}) ';
            var newSubStr = '$1$2\u00A0';
            var re = new RegExp(subStr, 'gim');
            return text
                .replace(re, newSubStr)
                .replace(re, newSubStr);
        },
        settings: {
            lengthShortWord: 2,
        },
    };

    var beforeShortLastNumberRule = {
        name: 'common/nbsp/beforeShortLastNumber',
        handler: function (text, settings, context) {
            var quote = context.getData('quote');
            var ch = context.getData('char');
            var CH = ch.toUpperCase();
            var re = new RegExp('([' + ch + CH +
                ']) (?=\\d{1,' + settings.lengthLastNumber +
                '}[-+−%\'"' + quote.right + ')]?([.!?…]( [' +
                CH + ']|$)|$))', 'gm');
            return text.replace(re, '$1\u00A0');
        },
        live: false,
        settings: {
            lengthLastNumber: 2,
        },
    };

    var beforeShortLastWordRule = {
        name: 'common/nbsp/beforeShortLastWord',
        handler: function (text, settings, context) {
            var ch = context.getData('char');
            var CH = ch.toUpperCase();
            var re = new RegExp('([' + ch + '\\d]) ([' +
                ch + CH + ']{1,' + settings.lengthLastWord +
                '}[.!?…])( [' + CH + ']|$)', 'g');
            return text.replace(re, '$1\u00A0$2$3');
        },
        settings: {
            lengthLastWord: 3,
        },
    };

    var dpiRule = {
        name: 'common/nbsp/dpi',
        handler: function (text) {
            return text.replace(/(\d) ?(lpi|dpi)(?!\w)/, '$1\u00A0$2');
        },
    };

    function replaceNbsp($0, $1, $2, $3) {
        return $1 + $2.replace(/([^\u00A0])\u00A0([^\u00A0])/g, '$1 $2') + $3;
    }
    var nowrapRule = {
        name: 'common/nbsp/nowrap',
        queue: 'end',
        handler: function (text) {
            return text
                .replace(/(<nowrap>)(.*?)(<\/nowrap>)/g, replaceNbsp)
                .replace(/(<nobr>)(.*?)(<\/nobr>)/g, replaceNbsp);
        },
    };

    var replaceNbspRule = {
        name: 'common/nbsp/replaceNbsp',
        queue: 'utf',
        live: false,
        handler: replaceNbsp$1,
        disabled: true,
    };

    Typograf.addRules([
        afterNumberRule,
        afterParagraphMarkRule,
        afterSectionMarkRule,
        afterShortWordRule,
        beforeShortLastNumberRule,
        beforeShortLastWordRule,
        dpiRule,
        nowrapRule,
        replaceNbspRule,
    ]);

    var digitGroupingRule = {
        name: 'common/number/digitGrouping',
        index: '310',
        disabled: true,
        handler: function (text, settings) {
            return text
                .replace(new RegExp("(^ ?|\\D |".concat(privateLabel, ")(\\d{1,3}([ \u00A0\u202F\u2009]\\d{3})+)(?! ?[\\d-])"), 'gm'), function ($0, $1, $2) { return $1 + $2.replace(/\s/g, settings.space); })
                // https://www.bipm.org/utils/common/pdf/si-brochure/SI-Brochure-9-EN.pdf #5.4.4
                .replace(/(\d{5,}([.,]\d+)?)/g, function ($0, $1) {
                var decimalMarker = $1.match(/[.,]/);
                var parts = decimalMarker ? $1.split(decimalMarker) : [$1];
                var integerPart = parts[0];
                var fractionalPart = parts[1];
                integerPart = integerPart.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1' + settings.space);
                return decimalMarker ?
                    integerPart + decimalMarker + fractionalPart :
                    integerPart;
            });
        },
        settings: {
            space: '\u202F',
        },
    };

    var fractionRule = {
        name: 'common/number/fraction',
        handler: function (text) {
            return text
                .replace(/(^|\D)1\/2(\D|$)/g, '$1½$2')
                .replace(/(^|\D)1\/4(\D|$)/g, '$1¼$2')
                .replace(/(^|\D)3\/4(\D|$)/g, '$1¾$2');
        },
    };

    var mathSignsRule = {
        name: 'common/number/mathSigns',
        handler: function (text) {
            return replace(text, [
                [/!=/g, '≠'],
                [/<=/g, '≤'],
                [/(^|[^=])>=/g, '$1≥'],
                [/<=>/g, '⇔'],
                [/<</g, '≪'],
                [/>>/g, '≫'],
                [/~=/g, '≅'],
                [/(^|[^+])\+-/g, '$1±']
            ]);
        }
    };

    var timesRule = {
        name: 'common/number/times',
        handler: function (text) {
            return text.replace(/(\d)[ \u00A0]?[xх][ \u00A0]?(\d)/g, '$1×$2');
        },
    };

    Typograf.addRules([
        digitGroupingRule,
        fractionRule,
        mathSignsRule,
        timesRule,
    ]);

    var delBOMRule = {
        name: 'common/other/delBOM',
        queue: 'start',
        index: -1,
        handler: function (text) {
            if (text.charCodeAt(0) === 0xFEFF) {
                return text.slice(1);
            }
            return text;
        },
    };

    var repeatWordRule = {
        name: 'common/other/repeatWord',
        handler: function (text, settings, context) {
            var quote = getData('common/quote');
            var char = context.getData('char');
            var punc = '[;:,.?! \n' + quote + ']';
            var re = new RegExp('(' + punc + '|^)' +
                '([' + char + ']{' + settings.min + ',}) ' +
                '\\2(' + punc + '|$)', 'gi');
            return text.replace(re, '$1$2$3');
        },
        settings: { min: 2 },
        disabled: true,
    };

    Typograf.addRules([
        delBOMRule,
        repeatWordRule,
    ]);

    var apostropheRule = {
        name: 'common/punctuation/apostrophe',
        handler: function (text, _settings, context) {
            var char = context.getData('char');
            var letters = '([' + char + '])';
            var re = new RegExp(letters + '\'' + letters, 'gi');
            return text.replace(re, '$1’$2');
        },
    };

    var delDoublePunctuationRule = {
        name: 'common/punctuation/delDoublePunctuation',
        handler: function (text) {
            return text
                .replace(/(^|[^,]),,(?!,)/g, '$1,')
                .replace(/(^|[^:])::(?!:)/g, '$1:')
                .replace(/(^|[^!?.])\.\.(?!\.)/g, '$1.')
                .replace(/(^|[^;]);;(?!;)/g, '$1;')
                .replace(/(^|[^?])\?\?(?!\?)/g, '$1?');
        },
    };

    var hellipRule = {
        name: 'common/punctuation/hellip',
        handler: function (text, _settings, context) {
            return context.prefs.locale[0] === 'ru' ?
                text.replace(/(^|[^.])\.{3,4}(?=[^.]|$)/g, '$1…') :
                text.replace(/(^|[^.])\.{3}(\.?)(?=[^.]|$)/g, '$1…$2');
        },
    };

    var MAX_LEVEL_WITH_ERRORS = 2;
    var Quote = /** @class */ (function () {
        function Quote() {
            this.bufferQuotes = {
                left: '\uF005\uF006\uF007',
                right: '\uF008\uF009\uF0A0',
            };
            this.beforeLeft = ' \n\t\u00a0[(';
            this.afterRight = ' \n\t\u00a0!?.:;#*,…)\\]';
        }
        Quote.prototype.process = function (params) {
            var text = params.context.text;
            var count = this.count(text);
            if (!count.total) {
                return text;
            }
            var originalSettings = params.settings;
            var isEqualQuotes = params.settings.left[0] === params.settings.right[0];
            // For SW, FI
            if (isEqualQuotes) {
                params.settings = deepCopy(params.settings);
                params.settings.left = this.bufferQuotes.left.slice(0, params.settings.left.length);
                params.settings.right = this.bufferQuotes.right.slice(0, params.settings.right.length);
            }
            // For FR
            if (params.settings.spacing) {
                text = this.removeSpacing(text, params.settings);
            }
            text = this.set(text, params);
            // For FR
            if (params.settings.spacing) {
                text = this.setSpacing(text, params.settings);
            }
            // For RU
            if (params.settings.removeDuplicateQuotes) {
                text = this.removeDuplicates(text, params.settings);
            }
            // For SW, FI
            if (isEqualQuotes) {
                text = this.returnOriginalQuotes(text, originalSettings, params.settings);
                params.settings = originalSettings;
            }
            return text;
        };
        Quote.prototype.returnOriginalQuotes = function (text, originalSettings, bufferSettings) {
            var buffer = {};
            for (var i = 0; i < bufferSettings.left.length; i++) {
                buffer[bufferSettings.left[i]] = originalSettings.left[i];
                buffer[bufferSettings.right[i]] = originalSettings.right[i];
            }
            return text.replace(new RegExp('[' + bufferSettings.left + bufferSettings.right + ']', 'g'), function (quote) {
                return buffer[quote];
            });
        };
        Quote.prototype.count = function (text) {
            var count = { total: 0 };
            text.replace(new RegExp('[' + getData('common/quote') + ']', 'g'), function (quote) {
                if (!count[quote]) {
                    count[quote] = 0;
                }
                count[quote]++;
                count.total++;
                return quote;
            });
            return count;
        };
        Quote.prototype.removeDuplicates = function (text, settings) {
            var lquote = settings.left[0];
            var lquote2 = settings.left[1] || lquote;
            var rquote = settings.right[0];
            if (lquote !== lquote2) {
                return text;
            }
            return text
                // ««word» word» -> «word» word»
                .replace(new RegExp(lquote + lquote, 'g'), lquote)
                // «word «word»» -> «word «word»
                .replace(new RegExp(rquote + rquote, 'g'), rquote);
        };
        Quote.prototype.removeSpacing = function (text, settings) {
            for (var i = 0, len = settings.left.length; i < len; i++) {
                var lquote = settings.left[i];
                var rquote = settings.right[i];
                text = text
                    .replace(new RegExp(lquote + '([ \u202F\u00A0])', 'g'), lquote)
                    .replace(new RegExp('([ \u202F\u00A0])' + rquote, 'g'), rquote);
            }
            return text;
        };
        Quote.prototype.setSpacing = function (text, settings) {
            for (var i = 0, len = settings.left.length; i < len; i++) {
                var lquote = settings.left[i];
                var rquote = settings.right[i];
                text = text
                    .replace(new RegExp(lquote + '([^\u202F])', 'g'), lquote + '\u202F$1')
                    .replace(new RegExp('([^\u202F])' + rquote, 'g'), '$1\u202F' + rquote);
            }
            return text;
        };
        Quote.prototype.set = function (text, params) {
            var quotes = getData('common/quote');
            var lquote = params.settings.left[0];
            var lquote2 = params.settings.left[1] || lquote;
            var rquote = params.settings.right[0];
            var reL = new RegExp('(^|[' + this.beforeLeft + '])([' + quotes + ']+)(?=[^\\s' + privateLabel + '])', 'gim');
            var reR = new RegExp('([^\\s' + privateLabel + '])([' + quotes + ']+)(?=[' + this.afterRight + ']|$)', 'gim');
            text = text
                .replace(reL, function ($0, $1, $2) { return $1 + repeat(lquote, $2.length); })
                .replace(reR, function ($0, $1, $2) { return $1 + repeat(rquote, $2.length); });
            text = this.setAboveTags(text, params);
            if (lquote !== lquote2) {
                text = this.setInner(text, params.settings);
            }
            return text;
        };
        Quote.prototype.setAboveTags = function (text, params) {
            var _this = this;
            var quotes = getData('common/quote');
            var lquote = params.settings.left[0];
            var rquote = params.settings.right[0];
            return text.replace(new RegExp('(^|.)([' + quotes + '])(.|$)', 'gm'), function (original, prev, quote, next, pos) {
                if (prev !== privateLabel && next !== privateLabel) {
                    return original;
                }
                if (prev === privateLabel && next === privateLabel) {
                    if (quote === '"') {
                        return prev + _this.getAboveTwoTags(text, pos + 1, params) + next;
                    }
                    return original;
                }
                if (prev === privateLabel) {
                    var hasRight = _this.afterRight.indexOf(next) > -1;
                    var prevInfo = params.safeTags.getPrevTagInfo(params.context, text, pos - 1);
                    if (hasRight && prevInfo && prevInfo.group === 'html') {
                        return prev + (prevInfo.isClosing ? rquote : lquote) + next;
                    }
                    return prev + (!next || hasRight ? rquote : lquote) + next;
                }
                else {
                    var hasLeft = _this.beforeLeft.indexOf(prev) > -1;
                    var nextInfo = params.safeTags.getNextTagInfo(params.context, text, pos + 1);
                    if (hasLeft && nextInfo && nextInfo.group === 'html') {
                        return prev + (nextInfo.isClosing ? rquote : lquote) + next;
                    }
                    return prev + (!prev || hasLeft ? lquote : rquote) + next;
                }
            });
        };
        Quote.prototype.getAboveTwoTags = function (text, pos, params) {
            var prevInfo = params.safeTags.getPrevTagInfo(params.context, text, pos);
            var nextInfo = params.safeTags.getNextTagInfo(params.context, text, pos);
            if (prevInfo) {
                if (prevInfo.group === 'html') {
                    if (!prevInfo.isClosing) {
                        return params.settings.left[0];
                    }
                    if (nextInfo && nextInfo.isClosing && prevInfo.isClosing) {
                        return params.settings.right[0];
                    }
                }
            }
            return text[pos];
        };
        Quote.prototype.setInner = function (text, settings) {
            var lquote = settings.left[0];
            var rquote = settings.right[0];
            var minLevel = 0;
            var maxLevel = this.getMaxLevel(text, lquote, rquote, settings.left.length);
            var level = minLevel;
            var result = '';
            for (var i = 0, len = text.length; i < len; i++) {
                var letter = text[i];
                if (letter === lquote) {
                    result += settings.left[level > maxLevel - 1 ? maxLevel - 1 : level];
                    level++;
                    if (level > maxLevel) {
                        level = maxLevel;
                    }
                }
                else if (letter === rquote) {
                    level--;
                    if (level < minLevel) {
                        level = minLevel;
                    }
                    result += settings.right[level];
                }
                else {
                    if (letter === '"') {
                        level = minLevel;
                    }
                    result += letter;
                }
            }
            return result;
        };
        Quote.prototype.getMaxLevel = function (text, leftQuote, rightQuote, length) {
            var count = this.count(text);
            return count[leftQuote] === count[rightQuote] ?
                length :
                Math.min(length, MAX_LEVEL_WITH_ERRORS);
        };
        return Quote;
    }());
    var quote = new Quote();
    var settings = {};
    getLocales().forEach(function (locale) {
        settings[locale] = deepCopy(getData(locale + '/quote'));
    });
    var quoteRule$1 = {
        name: 'common/punctuation/quote',
        handler: function (text, commonSettings, context) {
            var locale = context.prefs.locale[0];
            var settings = commonSettings[locale];
            if (!settings) {
                return text;
            }
            return quote.process({
                context: context,
                settings: settings,
                safeTags: this.safeTags,
            });
        },
        settings: settings,
    };

    var quoteLinkRule = {
        name: 'common/punctuation/quoteLink',
        queue: 'show-safe-tags-html',
        index: '+5',
        handler: function (text, _settings, context) {
            var quotes = this.getSetting('common/punctuation/quote', context.prefs.locale[0]);
            var lquote1 = htmlEntities.getByUtf(quotes.left[0]);
            var rquote1 = htmlEntities.getByUtf(quotes.right[0]);
            var lquote2 = htmlEntities.getByUtf(quotes.left[1]);
            var rquote2 = htmlEntities.getByUtf(quotes.right[1]);
            lquote2 = lquote2 ? ('|' + lquote2) : '';
            rquote2 = rquote2 ? ('|' + rquote2) : '';
            var re = new RegExp('(<[aA]\\s[^>]*?>)(' + lquote1 + lquote2 + ')([^]*?)(' + rquote1 + rquote2 + ')(</[aA]>)', 'g');
            return text.replace(re, '$2$1$3$5$4');
        },
    };

    Typograf.addRules([
        apostropheRule,
        delDoublePunctuationRule,
        hellipRule,
        quoteRule$1,
        quoteLinkRule,
    ]);

    var beforeBracketRule = {
        name: 'common/space/beforeBracket',
        handler: function (text, _settings, context) {
            var char = context.getData('char');
            var re = new RegExp('([' + char + '.!?,;…)])\\(', 'gi');
            return text.replace(re, '$1 (');
        },
    };

    var bracketRule$1 = {
        name: 'common/space/bracket',
        handler: function (text) {
            return text
                .replace(/(\() +/g, '(')
                .replace(/ +\)/g, ')');
        },
    };

    var delBeforePercentRule = {
        name: 'common/space/delBeforePercent',
        handler: function (text) {
            return text.replace(/(\d)( |\u00A0)(%|‰|‱)/g, '$1$3');
        },
    };

    var delBeforePunctuationRule = {
        name: 'common/space/delBeforePunctuation',
        handler: function (text) {
            return text.replace(/(^|[^!?:;,.…]) ([!?:;,])(?!\))/g, '$1$2');
        },
    };

    var delBetweenExclamationMarksRule = {
        name: 'common/space/delBetweenExclamationMarks',
        handler: function (text) {
            return text.replace(/([!?]) (?=[!?])/g, '$1');
        },
    };

    var delBeforeDotRule = {
        name: 'common/space/delBeforeDot',
        handler: function (text) {
            return text.replace(/(^|[^!?:;,.…]) (\.|\.\.\.)(\s|$)/g, '$1$2$3');
        },
    };

    var delLeadingBlanksRule = {
        name: 'common/space/delLeadingBlanks',
        handler: function (text) {
            return text.replace(/^[ \t]+/mg, '');
        },
        disabled: true,
    };

    var delRepeatNRule = {
        name: 'common/space/delRepeatN',
        index: '-1',
        handler: function (text, settings) {
            var maxConsecutiveLineBreaks = settings.maxConsecutiveLineBreaks;
            var consecutiveLineBreaksRegex = new RegExp("\n{".concat(maxConsecutiveLineBreaks + 1, ",}"), 'g');
            var replaceValue = repeat('\n', maxConsecutiveLineBreaks);
            return text.replace(consecutiveLineBreaksRegex, replaceValue);
        },
        settings: {
            maxConsecutiveLineBreaks: 2,
        },
    };

    var delRepeatSpaceRule = {
        name: 'common/space/delRepeatSpace',
        index: '-1',
        handler: function (text) {
            return text.replace(/([^\n \t])[ \t]{2,}(?![\n \t])/g, '$1 ');
        },
    };

    var delTrailingBlanksRule = {
        name: 'common/space/delTrailingBlanks',
        index: '-3',
        handler: function (text) {
            return text.replace(/[ \t]+\n/g, '\n');
        },
    };

    var insertFinalNewlineRule = {
        name: 'common/space/insertFinalNewline',
        queue: 'end',
        handler: function (text) {
            return text[text.length - 1] === '\n' ? text : text + '\n';
        },
        live: false,
        disabled: true,
    };

    var replaceTabRule = {
        name: 'common/space/replaceTab',
        index: '-5',
        handler: function (text) {
            return text.replace(/\t/g, '    ');
        },
    };

    var squareBracketRule = {
        name: 'common/space/squareBracket',
        handler: function (text) {
            return text
                .replace(/(\[) +/g, '[')
                .replace(/ +\]/g, ']');
        },
    };

    var trimLeftRule = {
        name: 'common/space/trimLeft',
        index: '-4',
        handler: String.prototype.trimLeft ?
            function (text) { return text.trimLeft(); } :
            /* istanbul ignore next */
            function (text) { return text.replace(/^[\s\uFEFF\xA0]+/g, ''); },
    };

    var trimRightRule = {
        name: 'common/space/trimRight',
        index: '-3',
        live: false,
        handler: String.prototype.trimRight ?
            function (text) { return text.trimRight(); } :
            /* istanbul ignore next */
            function (text) { return text.replace(/[\s\uFEFF\xA0]+$/g, ''); }
    };

    var reColon = new RegExp('(\\D):([^)",:.?\\s\\/\\\\' + privateLabel + '])', 'g');
    var afterColonRule = {
        name: 'common/space/afterColon',
        handler: function (text) {
            return text.replace(reColon, '$1: $2');
        },
    };

    var afterCommaRule = {
        name: 'common/space/afterComma',
        handler: function (text, settings, context) {
            var quote = context.getData('quote');
            var quotes = typeof quote === 'string' ? quote : quote.right;
            return text.replace(new RegExp('(.),([^)",:.?\\s\\/\\\\' + privateLabel + quotes + '])', 'g'), function ($0, $1, $2) { return isDigit($1) && isDigit($2) ? $0 : $1 + ', ' + $2; });
        }
    };

    var reQuestionMark = new RegExp('\\?([^).…!;?\\s[\\])' + privateLabel + getData('common/quote') + '])', 'g');
    var afterQuestionMarkRule = {
        name: 'common/space/afterQuestionMark',
        handler: function (text) {
            return text.replace(reQuestionMark, '? $1');
        },
    };

    var reExclamationMark = new RegExp('!([^).…!;?\\s[\\])' + privateLabel + getData('common/quote') + '])', 'g');
    var afterExclamationMarkRule = {
        name: 'common/space/afterExclamationMark',
        handler: function (text) {
            return text.replace(reExclamationMark, '! $1');
        },
    };

    var reSemicolon = new RegExp(';([^).…!;?\\s[\\])' + privateLabel + getData('common/quote') + '])', 'g');
    var afterSemicolonRule = {
        name: 'common/space/afterSemicolon',
        handler: function (text) {
            return text.replace(reSemicolon, '; $1');
        },
    };

    Typograf.addRules([
        afterColonRule,
        afterCommaRule,
        afterQuestionMarkRule,
        afterExclamationMarkRule,
        afterSemicolonRule,
        beforeBracketRule,
        bracketRule$1,
        delBeforeDotRule,
        delBeforePercentRule,
        delBeforePunctuationRule,
        delBetweenExclamationMarksRule,
        delLeadingBlanksRule,
        delRepeatNRule,
        delRepeatSpaceRule,
        delTrailingBlanksRule,
        insertFinalNewlineRule,
        replaceTabRule,
        squareBracketRule,
        trimLeftRule,
        trimRightRule,
    ]);

    var arrowRule = {
        name: 'common/symbols/arrow',
        handler: function (text) {
            return replace(text, [
                [/(^|[^-])->(?!>)/g, '$1→'],
                [/(^|[^<])<-(?!-)/g, '$1←']
            ]);
        },
    };

    var cfRule = {
        name: 'common/symbols/cf',
        handler: function (text) {
            var re = new RegExp('(^|[\\s(\\[+≈±−—–\\-])(\\d+(?:[.,]\\d+)?)[ \u00A0\u2009]?(C|F)([\\W\\s.,:!?")\\]]|$)', 'mg');
            return text.replace(re, '$1$2\u2009°$3$4');
        },
    };

    var copyRule = {
        name: 'common/symbols/copy',
        handler: function (text) {
            return replace(text, [
                [/\(r\)/gi, '®'],
                [/(copyright )?\((c|с)\)/gi, '©'],
                [/\(tm\)/gi, '™']
            ]);
        },
    };

    Typograf.addRules([
        arrowRule,
        cfRule,
        copyRule,
    ]);

    var mainRule$1 = {
        name: 'en-US/dash/main',
        index: '-5',
        handler: function (text) {
            var dashes = getData('common/dash');
            var nonBreakingSpace = '\u00A0';
            var emDash = '\u2014';
            var spaceBefore = "[ ".concat(nonBreakingSpace, "]"); // white space or a non-breaking space
            var spaceAfter = "[ ".concat(nonBreakingSpace, "\n]"); // same as spaceBefore, but includes line break
            var re = new RegExp("".concat(spaceBefore, "(").concat(dashes, ")(").concat(spaceAfter, ")"), 'g');
            return text.replace(re, "".concat(nonBreakingSpace).concat(emDash, "$2"));
        },
    };

    Typograf.addRules([
        mainRule$1,
    ]);

    var centuriesRule$1 = {
        name: 'ru/dash/centuries',
        handler: function (text, settings) {
            var dashes = '(' + getData('common/dash') + ')';
            var re = new RegExp('(X|I|V)[ |\u00A0]?' + dashes + '[ |\u00A0]?(X|I|V)', 'g');
            return text.replace(re, '$1' + settings.dash + '$3');
        },
        settings: {
            dash: '\u2013', // &ndash;
        },
    };

    var daysMonthRule = {
        name: 'ru/dash/daysMonth',
        handler: function (text, settings) {
            var re = new RegExp('(^|\\s)([123]?\\d)' +
                '(' + getData('common/dash') + ')' +
                '([123]?\\d)[ \u00A0]' +
                '(' + getData('ru/monthGenCase') + ')', 'g');
            return text.replace(re, '$1$2' + settings.dash + '$4\u00A0$5');
        },
        settings: {
            dash: '\u2013', // &ndash;
        },
    };

    var deRule = {
        name: 'ru/dash/de',
        handler: function (text) {
            var re = new RegExp('([a-яё]+) де' + getData('ru/dashAfterDe'), 'g');
            return text.replace(re, '$1-де');
        },
        disabled: true,
    };

    var decadeRule = {
        name: 'ru/dash/decade',
        handler: function (text, settings) {
            var re = new RegExp('(^|\\s)(\\d{3}|\\d)0' +
                '(' + getData('common/dash') + ')' +
                '(\\d{3}|\\d)0(-е[ \u00A0])' +
                '(?=г\\.?[ \u00A0]?г|год)', 'g');
            return text.replace(re, '$1$20' + settings.dash + '$40$5');
        },
        settings: {
            dash: '\u2013', // &ndash;
        },
    };

    var directSpeechRule = {
        name: 'ru/dash/directSpeech',
        handler: function (text) {
            var dashes = getData('common/dash');
            var re1 = new RegExp("([\"\u00BB\u2018\u201C,])[ |\u00A0]?(".concat(dashes, ")[ |\u00A0]"), 'g');
            var re2 = new RegExp("(^|".concat(privateLabel, ")(").concat(dashes, ")( |\u00A0)"), 'gm');
            var re3 = new RegExp("([.\u2026?!])[ \u00A0](".concat(dashes, ")[ \u00A0]"), 'g');
            return text
                .replace(re1, '$1\u00A0\u2014 ')
                .replace(re2, '$1\u2014\u00A0')
                .replace(re3, '$1 \u2014\u00A0');
        },
    };

    var izpodRule = {
        name: 'ru/dash/izpod',
        handler: function (text) {
            var re = new RegExp(getData('ru/dashBefore') + '(И|и)з под' + getData('ru/dashAfter'), 'g');
            return text.replace(re, '$1$2з-под');
        },
    };

    var izzaRule = {
        name: 'ru/dash/izza',
        handler: function (text) {
            var re = new RegExp(getData('ru/dashBefore') + '(И|и)з за' + getData('ru/dashAfter'), 'g');
            return text.replace(re, '$1$2з-за');
        },
    };

    var kaRule = {
        name: 'ru/dash/ka',
        handler: function (text) {
            var re = new RegExp('([a-яё]+) ка(сь)?' + getData('ru/dashAfter'), 'g');
            return text.replace(re, '$1-ка$2');
        },
    };

    var koeRule = {
        name: 'ru/dash/koe',
        handler: function (text) {
            var re = new RegExp(getData('ru/dashBefore') +
                '([Кк]о[ей])\\s([а-яё]{3,})' +
                getData('ru/dashAfter'), 'g');
            return text.replace(re, '$1$2-$3');
        },
    };

    var mainRule = {
        name: 'ru/dash/main',
        index: '-5',
        handler: function (text) {
            var dashes = getData('common/dash');
            var re = new RegExp('([ \u00A0])(' + dashes + ')([ \u00A0\\n])', 'g');
            return text.replace(re, '\u00A0\u2014$3');
        },
    };

    var monthRule = {
        name: 'ru/dash/month',
        handler: function (text, settings) {
            var months = '(' + getData('ru/month') + ')';
            var monthsPre = '(' + getData('ru/monthPreCase') + ')';
            var dashes = getData('common/dash');
            var re = new RegExp(months + ' ?(' + dashes + ') ?' + months, 'gi');
            var rePre = new RegExp(monthsPre + ' ?(' + dashes + ') ?' + monthsPre, 'gi');
            var newSubStr = '$1' + settings.dash + '$3';
            return text
                .replace(re, newSubStr)
                .replace(rePre, newSubStr);
        },
        settings: {
            dash: '\u2013', // &ndash;
        },
    };

    var surnameRule = {
        name: 'ru/dash/surname',
        handler: function (text) {
            var re = new RegExp('([А-ЯЁ][а-яё]+)\\s-([а-яё]{1,3})(?![^а-яё]|$)', 'g');
            return text.replace(re, '$1\u00A0\u2014$2');
        },
    };

    var takiRule = {
        name: 'ru/dash/taki',
        handler: function (text) {
            var re = new RegExp('(верно|довольно|опять|прямо|так|вс[её]|действительно|неужели)\\s(таки)' +
                getData('ru/dashAfter'), 'g');
            return text.replace(re, '$1-$2');
        },
    };

    var timeRule = {
        name: 'ru/dash/time',
        handler: function (text, settings) {
            var re = new RegExp(getData('ru/dashBefore') +
                '(\\d?\\d:[0-5]\\d)' +
                getData('common/dash') +
                '(\\d?\\d:[0-5]\\d)' +
                getData('ru/dashAfter'), 'g');
            return text.replace(re, '$1$2' + settings.dash + '$3');
        },
        settings: {
            dash: '\u2013', // &ndash;
        },
    };

    var toRule = {
        name: 'ru/dash/to',
        handler: function (text) {
            var words = '[Оо]ткуда|[Кк]уда|[Гг]де|[Кк]огда|[Зз]ачем|[Пп]очему|[Кк]ак|[Кк]ако[ейм]|[Кк]акая|[Кк]аки[емх]|[Кк]акими|[Кк]акую|[Чч]то|[Чч]его|[Чч]е[йм]|[Чч]ьим?|[Кк]то|[Кк]ого|[Кк]ому|[Кк]ем';
            var re = new RegExp('(^|[^А-ЯЁа-яё\\w])(' + words + ')( | -|- )(то|либо|нибудь)' +
                getData('ru/dashAfter'), 'g');
            return text.replace(re, function ($0, $1, $2, $3, $4) {
                var kakto = $2 + $3 + $4;
                // Отдельно обрабатываем в ru/dash/kakto
                if (kakto === 'как то' || kakto === 'Как то') {
                    return $0;
                }
                return $1 + $2 + '-' + $4;
            });
        },
    };

    var kaktoRule = {
        name: 'ru/dash/kakto',
        handler: function (text) {
            var re = new RegExp('(^|[^А-ЯЁа-яё\\w])([Кк]ак) то' + getData('ru/dashAfter'), 'g');
            return text.replace(re, '$1$2-то');
        },
    };

    var weekdayRule$1 = {
        name: 'ru/dash/weekday',
        handler: function (text, settings) {
            var part = '(' + getData('ru/weekday') + ')';
            var re = new RegExp(part + ' ?(' + getData('common/dash') + ') ?' + part, 'gi');
            return text.replace(re, '$1' + settings.dash + '$3');
        },
        settings: {
            dash: '\u2013', // &ndash;
        },
    };

    var yearsRule$1 = {
        name: 'ru/dash/years',
        handler: function (text, settings) {
            var dashes = getData('common/dash');
            var re = new RegExp('(\\D|^)(\\d{4})[ \u00A0]?(' +
                dashes + ')[ \u00A0]?(\\d{4})(?=[ \u00A0]?г)', 'g');
            return text.replace(re, function ($0, $1, $2, $3, $4) {
                if (parseInt($2, 10) < parseInt($4, 10)) {
                    return $1 + $2 + settings.dash + $4;
                }
                return $0;
            });
        },
        settings: {
            dash: '\u2013', // &ndash;
        },
    };

    Typograf.addRules([
        centuriesRule$1,
        daysMonthRule,
        deRule,
        decadeRule,
        directSpeechRule,
        izpodRule,
        izzaRule,
        kaRule,
        koeRule,
        mainRule,
        monthRule,
        surnameRule,
        takiRule,
        timeRule,
        toRule,
        kaktoRule,
        weekdayRule$1,
        yearsRule$1,
    ]);

    var sp1 = '(-|\\.|\\/)';
    var sp2 = '(-|\\/)';
    var re1 = new RegExp('(^|\\D)(\\d{4})' + sp1 + '(\\d{2})' + sp1 + '(\\d{2})(\\D|$)', 'gi');
    var re2 = new RegExp('(^|\\D)(\\d{2})' + sp2 + '(\\d{2})' + sp2 + '(\\d{4})(\\D|$)', 'gi');
    var fromISORule = {
        name: 'ru/date/fromISO',
        handler: function (text) {
            return text
                .replace(re1, '$1$6.$4.$2$7')
                .replace(re2, '$1$4.$2.$6$7');
        },
    };

    var weekdayRule = {
        name: 'ru/date/weekday',
        handler: function (text) {
            var space = '( |\u00A0)';
            var monthCase = getData('ru/monthGenCase');
            var weekday = getData('ru/weekday');
            var re = new RegExp('(\\d)' + space + '(' + monthCase + '),' + space + '(' + weekday + ')', 'gi');
            return text.replace(re, function (_, $1, $2, $3, $4, $5) {
                return $1 + $2 + $3.toLowerCase() + ',' + $4 + $5.toLowerCase();
            });
        },
    };

    Typograf.addRules([
        fromISORule,
        weekdayRule,
    ]);

    var currencyRule = {
        name: 'ru/money/currency',
        handler: function (text) {
            var currency = '([$€¥Ұ£₤₽])';
            var space = '[ \u00A0\u2009\u202F]';
            var re1 = new RegExp('(^|[\\D]{2})' + currency + ' ?(' + regExpNumber + '(' + space + '\\d{3})*)(' + space + '?(тыс\\.|млн|млрд|трлн))?', 'gm');
            var re2 = new RegExp('(^|[\\D])(' + regExpNumber + ') ?' + currency, 'gm');
            return text
                .replace(re1, function ($0, $1, $2, $3, $4, $5, $6, $7) {
                return $1 + $3 + ($7 ? '\u00A0' + $7 : '') + '\u00A0' + $2;
            })
                .replace(re2, '$1$2\u00A0$4');
        },
        disabled: true,
    };

    var rubleRule = {
        name: 'ru/money/ruble',
        handler: function (text) {
            var newSubstr = '$1\u00A0₽';
            var commonPart = '(\\d+)( |\u00A0)?(р|руб)\\.';
            var re1 = new RegExp('^' + commonPart + '$', 'g');
            var re2 = new RegExp(commonPart + '(?=[!?,:;])', 'g');
            var re3 = new RegExp(commonPart + '(?=\\s+[A-ЯЁ])', 'g');
            return text
                .replace(re1, newSubstr)
                .replace(re2, newSubstr)
                .replace(re3, newSubstr + '.');
        },
        disabled: true,
    };

    Typograf.addRules([
        currencyRule,
        rubleRule,
    ]);

    function abbr($0, $1, $2, $3) {
        // дд.мм.гггг
        if ($2 === 'дд' && $3 === 'мм') {
            return $0;
        }
        // Являются ли сокращения ссылкой
        if (['рф', 'ру', 'рус', 'орг', 'укр', 'бг', 'срб'].indexOf($3) > -1) {
            return $0;
        }
        return $1 + $2 + '.' + '\u00A0' + $3 + '.';
    }
    var abbrRule = {
        name: 'ru/nbsp/abbr',
        handler: function (text) {
            var re = new RegExp("(^|\\s|".concat(privateLabel, ")([\u0430-\u044F\u0451]{1,3})\\. ?([\u0430-\u044F\u0451]{1,3})\\."), 'g');
            return text
                .replace(re, abbr)
                // Для тройных сокращений - а.е.м.
                .replace(re, abbr);
        },
    };

    var addrRule = {
        name: 'ru/nbsp/addr',
        handler: function (text) {
            return text
                .replace(/(\s|^)(дом|д\.|кв\.|под\.|п-д) *(\d+)/gi, '$1$2\u00A0$3')
                .replace(/(\s|^)(мкр-н|мк-н|мкр\.|мкрн)\s/gi, '$1$2\u00A0') // микрорайон
                .replace(/(\s|^)(эт\.) *(-?\d+)/gi, '$1$2\u00A0$3')
                .replace(/(\s|^)(\d+) +этаж([^а-яё]|$)/gi, '$1$2\u00A0этаж$3')
                .replace(/(\s|^)литер\s([А-Я]|$)/gi, '$1литер\u00A0$2')
                /*
                    область, край, станция, поселок, село,
                    деревня, улица, переулок, проезд, проспект,
                    бульвар, площадь, набережная, шоссе,
                    тупик, офис, комната, участок, владение, строение, корпус
                */
                .replace(/(\s|^)(обл|кр|ст|пос|с|д|ул|пер|пр|пр-т|просп|пл|бул|б-р|наб|ш|туп|оф|комн?|уч|вл|влад|стр|кор)\. *([а-яёa-z\d]+)/gi, '$1$2.\u00A0$3')
                // город
                .replace(/(\D[ \u00A0]|^)г\. ?([А-ЯЁ])/gm, '$1г.\u00A0$2');
        },
    };

    var afterNumberSignRule = {
        name: 'ru/nbsp/afterNumberSign',
        handler: function (text) {
            // \u2009 - THIN SPACE
            // \u202F - NARROW NO-BREAK SPACE
            return text.replace(/№[ \u00A0\u2009]?(\d|п\/п)/g, '№\u202F$1');
        },
    };

    var beforeParticleRule = {
        name: 'ru/nbsp/beforeParticle',
        index: '+5',
        handler: function (text) {
            var particles = '(ли|ль|же|ж|бы|б)';
            var re1 = new RegExp('([А-ЯЁа-яё]) ' + particles + '(?=[,;:?!"‘“»])', 'g');
            var re2 = new RegExp('([А-ЯЁа-яё])[ \u00A0]' + particles + '[ \u00A0]', 'g');
            return text
                .replace(re1, '$1\u00A0$2')
                .replace(re2, '$1\u00A0$2 ');
        },
    };

    var centuriesRule = {
        name: 'ru/nbsp/centuries',
        handler: function (text) {
            var dashes = getData('common/dash');
            var before = '(^|\\s)([VIX]+)';
            var after = '(?=[,;:?!"‘“»]|$)';
            var re1 = new RegExp(before + '[ \u00A0]?в\\.?' + after, 'gm');
            var re2 = new RegExp(before + '(' + dashes + ')' + '([VIX]+)[ \u00A0]?в\\.?([ \u00A0]?в\\.?)?' + after, 'gm');
            return text
                .replace(re1, '$1$2\u00A0в.')
                .replace(re2, '$1$2$3$4\u00A0вв.');
        },
    };

    var dayMonthRule = {
        name: 'ru/nbsp/dayMonth',
        handler: function (text) {
            var re = new RegExp('(\\d{1,2}) (' + getData('ru/shortMonth') + ')', 'gi');
            return text.replace(re, '$1\u00A0$2');
        },
    };

    var initialsRule = {
        name: 'ru/nbsp/initials',
        handler: function (text) {
            var spaces = '\u00A0\u202F '; // nbsp, thinsp
            var quote = getData('ru/quote');
            var re = new RegExp('(^|[' + spaces +
                quote.left +
                privateLabel +
                '"])([А-ЯЁ])\\.[' + spaces + ']?([А-ЯЁ])\\.[' + spaces +
                ']?([А-ЯЁ][а-яё]+)', 'gm');
            return text.replace(re, '$1$2.\u00A0$3.\u00A0$4');
        },
    };

    var pow = {
        '2': '²',
        '²': '²',
        '3': '³',
        '³': '³',
        '': ''
    };
    var mRule = {
        name: 'ru/nbsp/m',
        index: '+5',
        handler: function (text) {
            var re = new RegExp('(^|[\\s,.\\(' + privateLabel + '])' +
                '(\\d+)[ \u00A0]?(мм?|см|км|дм|гм|mm?|km|cm|dm)([23²³])?([\\s\\).!?,;' +
                privateLabel + ']|$)', 'gm');
            return text.replace(re, function (_$0, $1, $2, $3, $4, $5) {
                return $1 + $2 + '\u00A0' + $3 + pow[$4 || ''] + ($5 === '\u00A0' ? ' ' : $5);
            });
        },
    };

    var mlnRule = {
        name: 'ru/nbsp/mln',
        handler: function (text) {
            return text.replace(/(\d) ?(тыс|млн|млрд|трлн)(\.|\s|$)/gi, '$1\u00a0$2$3');
        },
    };

    var oooRule = {
        name: 'ru/nbsp/ooo',
        handler: function (text) {
            return text.replace(/(^|[^a-яёA-ЯЁ])(ООО|ОАО|ЗАО|НИИ|ПБОЮЛ) /g, '$1$2\u00A0');
        },
    };

    var pageRule = {
        name: 'ru/nbsp/page',
        handler: function (text) {
            var re = new RegExp('(^|[)\\s' + privateLabel + '])' +
                '(стр|гл|рис|илл?|ст|п|c)\\. *(\\d+)([\\s.,?!;:]|$)', 'gim');
            return text.replace(re, '$1$2.\u00A0$3$4');
        },
    };

    var psRule = {
        name: 'ru/nbsp/ps',
        handler: function (text) {
            var re = new RegExp("(^|\\s|".concat(privateLabel, ")[p\u0437]\\.[ \u00A0]?([p\u0437]\\.[ \u00A0]?)?[s\u044B]\\.:? "), 'gim');
            return text.replace(re, function ($0, $1, $2) {
                return $1 + ($2 ? 'P.\u00A0P.\u00A0S. ' : 'P.\u00A0S. ');
            });
        },
    };

    var rubleKopekRule = {
        name: 'ru/nbsp/rubleKopek',
        handler: function (text) {
            return text.replace(/(\d) ?(?=(руб|коп)\.)/g, '$1\u00A0');
        },
    };

    var seeRule = {
        name: 'ru/nbsp/see',
        handler: function (text) {
            var re = new RegExp("(^|\\s|".concat(privateLabel, "|\\()(\u0441\u043C|\u0438\u043C)\\.[ \u00A0]?([\u0430-\u044F\u04510-9a-z]+)([\\s.,?!]|$)"), 'gi');
            return text.replace(re, function ($0, $1, $2, $3, $4) {
                return ($1 === '\u00A0' ? ' ' : $1) + $2 + '.\u00A0' + $3 + $4;
            });
        },
    };

    var yearRule$1 = {
        name: 'ru/nbsp/year',
        handler: function (text) {
            return text.replace(/(^|\D)(\d{4}) ?г([ ,;.\n]|$)/g, '$1$2\u00A0г$3');
        },
    };

    var yearsRule = {
        name: 'ru/nbsp/years',
        index: '+5',
        handler: function (text) {
            var dashes = getData('common/dash');
            var re = new RegExp('(^|\\D)(\\d{4})(' +
                dashes + ')(\\d{4})[ \u00A0]?г\\.?([ \u00A0]?г\\.)?(?=[,;:?!"‘“»\\s]|$)', 'gm');
            return text.replace(re, '$1$2$3$4\u00A0гг.');
        },
    };

    Typograf.addRules([
        abbrRule,
        addrRule,
        afterNumberSignRule,
        beforeParticleRule,
        centuriesRule,
        dayMonthRule,
        initialsRule,
        mRule,
        mlnRule,
        oooRule,
        pageRule,
        psRule,
        rubleKopekRule,
        seeRule,
        yearRule$1,
        yearsRule,
    ]);

    var commaRule$1 = {
        name: 'ru/number/comma',
        handler: function (text) {
            // \u00A0 - NO-BREAK SPACE
            // \u2009 - THIN SPACE
            // \u202F - NARROW NO-BREAK SPACE
            return text.replace(/(^|\s)(\d+)\.(\d+[\u00A0\u2009\u202F ]*?[%‰°×x])/gim, '$1$2,$3');
        },
    };

    var ordinalsRule = {
        name: 'ru/number/ordinals',
        handler: function (text, _settings, context) {
            var char = context.getData('char');
            var re = new RegExp('(\\d[%‰]?)-(ый|ой|ая|ое|ые|ым|ом|ых|ого|ому|ыми)(?![' + char + '])', 'g');
            return text.replace(re, function ($0, $1, $2) {
                var parts = {
                    'ой': 'й',
                    'ый': 'й',
                    'ая': 'я',
                    'ое': 'е',
                    'ые': 'е',
                    'ым': 'м',
                    'ом': 'м',
                    'ых': 'х',
                    'ого': 'го',
                    'ому': 'му',
                    'ыми': 'ми',
                };
                return $1 + '-' + parts[$2];
            });
        },
    };

    Typograf.addRules([
        commaRule$1,
        ordinalsRule,
    ]);

    function removeOptAlignTags(text, classNames) {
        var re = new RegExp('<span class="(' + classNames.join('|') + ')">([^]*?)</span>', 'g');
        return text.replace(re, '$2');
    }
    function removeOptAlignTagsFromTitle(text, classNames) {
        return text.replace(/<title>[^]*?<\/title>/i, function (text) {
            return removeOptAlignTags(text, classNames);
        });
    }

    var classNames$2 = [
        'typograf-oa-lbracket',
        'typograf-oa-n-lbracket',
        'typograf-oa-sp-lbracket'
    ];
    var name$2 = 'ru/optalign/bracket';
    var bracketRule = {
        name: name$2,
        handler: function (text) {
            return text
                .replace(/( |\u00A0)\(/g, '<span class="typograf-oa-sp-lbracket">$1</span><span class="typograf-oa-lbracket">(</span>')
                .replace(/^\(/gm, '<span class="typograf-oa-n-lbracket">(</span>');
        },
        disabled: true,
        htmlAttrs: false,
    };
    var innerStartBracketRule = {
        name: name$2,
        queue: 'start',
        handler: function (text) {
            return removeOptAlignTags(text, classNames$2);
        },
        htmlAttrs: false,
    };
    var innerEndBracketRule = {
        name: name$2,
        queue: 'end',
        handler: function (text) {
            return removeOptAlignTagsFromTitle(text, classNames$2);
        },
        htmlAttrs: false,
    };

    var classNames$1 = [
        'typograf-oa-comma',
        'typograf-oa-comma-sp',
    ];
    var name$1 = 'ru/optalign/comma';
    var commaRule = {
        name: name$1,
        handler: function (text, _settings, context) {
            var char = context.getData('char');
            var re = new RegExp('([' + char + '\\d\u0301]+), ', 'gi');
            return text.replace(re, '$1<span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>');
        },
        disabled: true,
        htmlAttrs: false,
    };
    var innerStartCommaRule = {
        name: name$1,
        queue: 'start',
        handler: function (text) {
            return removeOptAlignTags(text, classNames$1);
        },
        htmlAttrs: false,
    };
    var innerEndCommaRule = {
        name: name$1,
        queue: 'end',
        handler: function (text) {
            return removeOptAlignTagsFromTitle(text, classNames$1);
        },
        htmlAttrs: false,
    };

    var classNames = [
        'typograf-oa-lquote',
        'typograf-oa-n-lquote',
        'typograf-oa-sp-lquote'
    ];
    var name = 'ru/optalign/quote';
    var quoteRule = {
        name: name,
        handler: function (text) {
            var quote = this.getSetting('common/punctuation/quote', 'ru');
            var lquotes = '([' + quote.left[0] + (quote.left[1] || '') + '])';
            var reNewLine = new RegExp('(^|\n\n|' + privateLabel + ')(' + lquotes + ')', 'g');
            var reInside = new RegExp('([^\n' + privateLabel + '])([ \u00A0\n])(' + lquotes + ')', 'gi');
            return text
                .replace(reNewLine, '$1<span class="typograf-oa-n-lquote">$2</span>')
                .replace(reInside, '$1<span class="typograf-oa-sp-lquote">$2</span><span class="typograf-oa-lquote">$3</span>');
        },
        disabled: true,
        htmlAttrs: false,
    };
    var innerStartQuoteRule = {
        name: name,
        queue: 'start',
        handler: function (text) {
            return removeOptAlignTags(text, classNames);
        },
        htmlAttrs: false,
    };
    var innerEndQuoteRule = {
        name: name,
        queue: 'end',
        handler: function (text) {
            return removeOptAlignTagsFromTitle(text, classNames);
        },
        htmlAttrs: false,
    };

    Typograf.addRules([
        bracketRule,
        commaRule,
        quoteRule,
    ]);
    Typograf.addInnerRules([
        innerStartBracketRule,
        innerEndBracketRule,
        innerStartCommaRule,
        innerEndCommaRule,
        innerStartQuoteRule,
        innerEndQuoteRule,
    ]);

    var accentRule = {
        name: 'ru/other/accent',
        handler: function (text) {
            return text.replace(/([а-яё])([АЕЁИОУЫЭЮЯ])([^А-ЯЁ\w]|$)/g, function ($0, $1, $2, $3) {
                return $1 + $2.toLowerCase() + '\u0301' + $3;
            });
        },
        disabled: true,
    };

    var defaultCityCodeLength = 5;
    var countryCode = '7';
    var exceptions = [];
    var exceptionsMax = 8;
    var exceptionsMin = 2;
    [
        4162, 416332, 8512, 851111, 4722, 4725, 391379, 8442, 4732,
        4152, 4154451, 4154459, 4154455, 41544513, 8142, 8332, 8612,
        8622, 3525, 812, 8342, 8152, 3812, 4862, 3422, 342633, 8112,
        9142, 8452, 3432, 3434, 3435, 4812, 8432, 8439, 3822,
        4872, 3412, 3511, 3512, 3022, 4112, 4852, 4855, 3852, 3854,
        8182, 818, 90, 3472, 4741, 4764, 4832, 4922, 8172, 8202, 8722,
        4932, 493, 3952, 3951, 3953, 411533, 4842, 3842, 3843, 8212,
        4942, '39131-39179', '39190-39199', 391, 4712, 4742, 8362, 495, 499, 4966, 4964, 4967, 498,
        8312, 8313, 3832, 383612, 3532, 8412, 4232, 423370, 423630, 8632,
        8642, 8482, 4242, 8672, 8652, 4752, 4822, 482502, 4826300, 3452,
        8422, 4212, 3466, 3462, 8712, 8352,
        '901-934', '936-939', '950-953', 958, '960-969',
        '977-989', '991-997', 999
    ].forEach(function (num) {
        if (typeof num === 'string') {
            var buf = num.split('-');
            for (var i = +buf[0]; i <= +buf[1]; i++) {
                exceptions.push(i);
            }
        }
        else {
            exceptions.push(num);
        }
    });
    function phone(num) {
        var firstSym = num[0];
        var cityCode = '';
        var hasPlusWithCode;
        var hasEight;
        if (num.length < 8) {
            return phoneBlocks(num);
        }
        // 8 495 123-45-67, +7 495 123-45-67
        if (num.length > 10) {
            if (firstSym === '+') {
                if (num[1] === countryCode) {
                    hasPlusWithCode = true;
                    num = num.substr(2);
                }
                else {
                    return num;
                }
            }
            else if (firstSym === '8') {
                hasEight = true;
                num = num.substr(1);
            }
        }
        for (var cityCodeLen = exceptionsMax; cityCodeLen >= exceptionsMin; cityCodeLen--) {
            var code = +num.substr(0, cityCodeLen);
            if (exceptions.indexOf(code) > -1) {
                cityCode = num.substr(0, cityCodeLen);
                num = num.substr(cityCodeLen);
                break;
            }
        }
        if (!cityCode) {
            cityCode = num.substr(0, defaultCityCodeLength);
            num = num.substr(defaultCityCodeLength);
        }
        return (hasPlusWithCode ? '+' + countryCode + '\u00A0' : '') +
            (hasEight ? '8\u00A0' : '') +
            prepareCode(cityCode) + '\u00A0' +
            phoneBlocks(num);
    }
    function prepareCode(code) {
        var numCode = +code;
        var len = code.length;
        var result = [code];
        var withoutBrackets = false;
        if (len > 3) {
            switch (len) {
                case 4:
                    result = [code.substr(0, 2), code.substr(2, 2)];
                    break;
                case 5:
                    result = [code.substr(0, 3), code.substr(3, 3)];
                    break;
                case 6:
                    result = [code.substr(0, 2), code.substr(2, 2), code.substr(4, 2)];
                    break;
            }
        }
        else {
            // Мобильные и московские номера без скобок
            withoutBrackets = (numCode > 900 && numCode <= 999) || numCode === 495 || numCode === 499;
        }
        var str = result.join('-');
        return withoutBrackets ? str : '(' + str + ')';
    }
    function phoneBlocks(num) {
        var add = '';
        if (num.length % 2) {
            add = num[0];
            add += num.length <= 5 ? '-' : '';
            num = num.substr(1, num.length - 1);
        }
        return add + num.split(/(?=(?:\d\d)+$)/).join('-');
    }
    function clearPhone(text) {
        return text.replace(/[^\d+]/g, '');
    }
    var phoneNumberRule = {
        name: 'ru/other/phone-number',
        live: false,
        handler: function (text) {
            var re = new RegExp('(^|,| |' + privateLabel + ')(\\+7[\\d\\(\\) \u00A0-]{10,18})(?=,|;|' + privateLabel + '|$)', 'gm');
            return text
                .replace(re, function ($0, $1, $2) {
                var buf = clearPhone($2);
                return buf.length === 12 ? $1 + phone(buf) : $0;
            })
                .replace(
            // eslint-disable-next-line no-misleading-character-class
            /(^|[^а-яё])([☎☏✆📠📞📱]|т\.|тел\.|ф\.|моб\.|факс|сотовый|мобильный|телефон)(:?\s*?)([+\d(][\d \u00A0\-()]{3,}\d)/gi, function ($0, $1, $2, $3, $4) {
                var buf = clearPhone($4);
                if (buf.length >= 5) {
                    return $1 + $2 + $3 + phone(buf);
                }
                return $0;
            });
        },
    };

    Typograf.addRules([
        accentRule,
        phoneNumberRule,
    ]);

    var anoRule = {
        name: 'ru/punctuation/ano',
        handler: function (text) {
            var re = new RegExp('([^«„[(!?,:;\\-‒–—\\s' + privateLabel + '])(\\s+)(а|но)(?= |\u00A0|\\n)', 'g');
            return text.replace(re, '$1,$2$3');
        },
    };

    var exclamationRule = {
        name: 'ru/punctuation/exclamation',
        handler: function (text) {
            return text
                .replace(/(^|[^!])!{2}($|[^!])/gm, '$1!$2')
                .replace(/(^|[^!])!{4}($|[^!])/gm, '$1!!!$2');
        },
        live: false,
    };

    var exclamationQuestionRule = {
        name: 'ru/punctuation/exclamationQuestion',
        index: '+5',
        handler: function (text) {
            var re = new RegExp('(^|[^!])!\\?([^?]|$)', 'g');
            return text.replace(re, '$1?!$2');
        },
    };

    var hellipQuestionRule = {
        name: 'ru/punctuation/hellipQuestion',
        handler: function (text) {
            return text
                .replace(/(^|[^.])(\.\.\.|…),/g, '$1…')
                .replace(/(!|\?)(\.\.\.|…)(?=[^.]|$)/g, '$1..');
        },
    };

    Typograf.addRules([
        anoRule,
        exclamationRule,
        exclamationQuestionRule,
        hellipQuestionRule,
    ]);

    var afterHellipRule = {
        name: 'ru/space/afterHellip',
        handler: function (text) {
            return text
                .replace(/([а-яё])(\.\.\.|…)([А-ЯЁ])/g, '$1$2 $3')
                .replace(/([?!]\.\.)([а-яёa-z])/gi, '$1 $2');
        },
    };

    var yearRule = {
        name: 'ru/space/year',
        handler: function (text, _settings, context) {
            var char = context.getData('char');
            var re = new RegExp('(^| |\u00A0)(\\d{3,4})(год([ауе]|ом)?)([^' +
                char + ']|$)', 'g');
            return text.replace(re, '$1$2 $3$5');
        }
    };

    Typograf.addRules([
        afterHellipRule,
        yearRule,
    ]);

    var nnRule = {
        name: 'ru/symbols/NN',
        handler: function (text) {
            return text.replace(/№№/g, '№');
        },
    };

    Typograf.addRules([
        nnRule,
    ]);

    var replacements = {
        A: 'А',
        a: 'а',
        B: 'В',
        E: 'Е',
        e: 'е',
        K: 'К',
        M: 'М',
        H: 'Н',
        O: 'О',
        o: 'о',
        P: 'Р',
        p: 'р',
        C: 'С',
        c: 'с',
        T: 'Т',
        y: 'у',
        X: 'Х',
        x: 'х'
    };
    var keys = Object.keys(replacements).join('');
    var switchingKeyboardLayoutRule = {
        name: 'ru/typo/switchingKeyboardLayout',
        handler: function (text) {
            var re = new RegExp('([' + keys + ']{1,3})(?=[А-ЯЁа-яё]+?)', 'g');
            return text.replace(re, function (str, $1) {
                var result = '';
                for (var i = 0; i < $1.length; i++) {
                    result += replacements[$1[i]];
                }
                return result;
            });
        }
    };

    Typograf.addRules([
        switchingKeyboardLayoutRule,
    ]);

    var titles = {"common/html/e-mail":{"en-US":"Placement of links for e-mail","ru":"Расстановка ссылок для эл. почты"},"common/html/escape":{"en-US":"Escaping HTML","ru":"Экранирование HTML"},"common/html/nbr":{"en-US":"Replacement line break on <br/>","ru":"Замена перевода строки на <br/>"},"common/html/p":{"en-US":"Placement of paragraph","ru":"Расстановка абзацев"},"common/html/processingAttrs":{"en-US":"Processing HTML attributes","ru":"Типографирование HTML-атрибутов"},"common/html/quot":{"common":"&⁠quot; → \""},"common/html/stripTags":{"en-US":"Removing HTML-tags","ru":"Удаление HTML-тегов"},"common/html/url":{"en-US":"Placement of links","ru":"Расстановка ссылок"},"common/nbsp/afterNumber":{"en-US":"Non-breaking space between number and word","ru":"Нераз. пробел между числом и словом"},"common/nbsp/afterParagraphMark":{"en-US":"Non-breaking space after ¶","ru":"Нераз. пробел после ¶"},"common/nbsp/afterSectionMark":{"en-US":"Non-breaking space after §","ru":"Нераз. узкий пробел после §"},"common/nbsp/afterShortWord":{"en-US":"Non-breaking space after short word","ru":"Нераз. пробел после короткого слова"},"common/nbsp/beforeShortLastNumber":{"en-US":"Non-breaking space before number (maximum 2 digits) at end of sentence","ru":"Нераз. пробел перед числом (не более 2 цифр) в конце предложения"},"common/nbsp/beforeShortLastWord":{"en-US":"Non-breaking space before last short word in sentence","ru":"Нераз. пробел перед последним коротким словом в предложении"},"common/nbsp/dpi":{"en-US":"Non-breaking space before lpi and dpi","ru":"Нераз. пробел перед lpi и dpi"},"common/nbsp/nowrap":{"en-US":"Replace non-breaking space to normal space in tags nowrap and nobr","ru":"Заменять нераз. пробел на обычный пробел в тегах nowrap и nobr"},"common/nbsp/replaceNbsp":{"en-US":"Replacing non-breaking space on normal before text correction","ru":"Замена неразрывного пробела на обычный перед типографированием"},"common/number/digitGrouping":{"en-US":"Divide into groups numbers with many digits","ru":"Разбивать длинные числа по разрядам"},"common/number/fraction":{"common":"1/2 → ½, 1/4 → ¼, 3/4 → ¾"},"common/number/mathSigns":{"common":"!= → ≠, <= → ≤, >= → ≥, ~= → ≅, +- → ±"},"common/number/times":{"common":"x → × (10 x 5 → 10×5)"},"common/other/delBOM":{"en-US":"Delete character BOM (Byte Order Mark)","ru":"Удаление символа BOM (Byte Order Mark)"},"common/other/repeatWord":{"en-US":"Removing repeat words","ru":"Удаление повтора слова"},"common/punctuation/apostrophe":{"en-US":"Placement of correct apostrophe","ru":"Расстановка правильного апострофа"},"common/punctuation/delDoublePunctuation":{"en-US":"Removing double punctuation","ru":"Удаление двойной пунктуации"},"common/punctuation/hellip":{"en-US":"Replacement of three points by ellipsis","ru":"Замена трёх точек на многоточие"},"common/punctuation/quote":{"en-US":"Placement of quotation marks in texts","ru":"Расстановка кавычек правильного вида"},"common/punctuation/quoteLink":{"en-US":"Removal quotes outside a link","ru":"Вынос кавычек за пределы ссылки"},"common/space/afterColon":{"en-US":"space after colon","ru":"Пробел после двоеточия"},"common/space/afterComma":{"en-US":"space after comma","ru":"Пробел после запятой"},"common/space/afterExclamationMark":{"en-US":"space after exclamation mark","ru":"Пробел после знака восклицания"},"common/space/afterQuestionMark":{"en-US":"space after question mark","ru":"Пробел после знака вопроса"},"common/space/afterSemicolon":{"en-US":"space after semicolon","ru":"Пробел после точки с запятой"},"common/space/beforeBracket":{"en-US":"Space before opening bracket","ru":"Пробел перед открывающей скобкой"},"common/space/bracket":{"en-US":"Remove extra spaces after opening and before closing bracket","ru":"Удаление лишних пробелов после открывающей и перед закрывающей скобкой"},"common/space/delBeforeDot":{"en-US":"Remove space before dot","ru":"Удаление пробела перед точкой"},"common/space/delBeforePercent":{"en-US":"Remove space before %, ‰ and ‱","ru":"Удаление пробела перед %, ‰ и ‱"},"common/space/delBeforePunctuation":{"en-US":"Remove spaces before punctuation","ru":"Удаление пробелов перед знаками пунктуации"},"common/space/delBetweenExclamationMarks":{"en-US":"Remove spaces before exclamation marks","ru":"Удаление пробелов между знаками восклицания"},"common/space/delLeadingBlanks":{"en-US":"Remove spaces at start of line","ru":"Удаление пробелов в начале строки"},"common/space/delRepeatN":{"en-US":"Remove duplicate line breaks","ru":"Удаление повторяющихся переносов строки"},"common/space/delRepeatSpace":{"en-US":"Removing duplicate spaces between characters","ru":"Удаление повторяющихся пробелов между символами"},"common/space/delTrailingBlanks":{"en-US":"Remove spaces at end of line","ru":"Удаление пробелов в конце строки"},"common/space/insertFinalNewline":{"en-US":"Insert final newline","ru":"Вставить в конце текста перевод строки"},"common/space/replaceTab":{"en-US":"Replacement of tab to 4 spaces","ru":"Замена таба на 4 пробела"},"common/space/squareBracket":{"en-US":"Remove extra spaces after opening and before closing square bracket","ru":"Удаление лишних пробелов после открывающей и перед закрывающей квадратной скобкой"},"common/space/trimLeft":{"en-US":"Remove spaces and line breaks in beginning of text","ru":"Удаление пробелов и переносов строк в начале текста"},"common/space/trimRight":{"en-US":"Remove spaces and line breaks at end of text","ru":"Удаление пробелов и переносов строк в конце текста"},"common/symbols/arrow":{"common":"-> → →, <- → ←"},"common/symbols/cf":{"en-US":"Adding ° to C and F","ru":"Добавление ° к C и F"},"common/symbols/copy":{"common":"(c) → ©, (tm) → ™, (r) → ®"},"en-US/dash/main":{"en-US":"Replace hyphens surrounded by spaces with an em-dash","ru":"Замена дефиса на длинное тире"},"ru/dash/centuries":{"en-US":"Hyphen to dash in centuries","ru":"Замена дефиса на тире в веках"},"ru/dash/daysMonth":{"en-US":"Dash between days of one month","ru":"Тире между днями одного месяца"},"ru/dash/de":{"en-US":"Hyphen before “де”","ru":"Дефис перед «де»"},"ru/dash/decade":{"en-US":"Dash in decade","ru":"Тире в десятилетиях, 80—90-е гг."},"ru/dash/directSpeech":{"en-US":"Dash in direct speech","ru":"Тире в прямой речи"},"ru/dash/izpod":{"en-US":"Hyphen between “из-под”","ru":"Дефис между «из-под»"},"ru/dash/izza":{"en-US":"Hyphen between “из-за”","ru":"Дефис между «из-за»"},"ru/dash/ka":{"en-US":"Hyphen before “ка” and “кась”","ru":"Дефис перед «ка» и «кась»"},"ru/dash/kakto":{"en-US":"Hyphen for “как то”","ru":"Дефис для «как то»"},"ru/dash/koe":{"en-US":"Hyphen after “кое” and “кой”","ru":"Дефис после «кое» и «кой»"},"ru/dash/main":{"en-US":"Replacement hyphen with dash","ru":"Замена дефиса на тире"},"ru/dash/month":{"en-US":"Dash between months","ru":"Тире между месяцами"},"ru/dash/surname":{"en-US":"Acronyms with a dash","ru":"Сокращения с помощью тире"},"ru/dash/taki":{"en-US":"Hyphen between “верно-таки” and etc.","ru":"Дефис между «верно-таки» и т. д."},"ru/dash/time":{"en-US":"Dash in time intervals","ru":"Тире в интервалах времени"},"ru/dash/to":{"en-US":"Hyphen before “то”, “либо”, “нибудь”","ru":"Дефис перед «то», «либо», «нибудь»"},"ru/dash/weekday":{"en-US":"Dash between the days of the week","ru":"Тире между днями недели"},"ru/dash/years":{"en-US":"Hyphen to dash in years","ru":"Замена дефиса на тире в годах"},"ru/date/fromISO":{"en-US":"Converting dates YYYY-MM-DD type DD.MM.YYYY","ru":"Преобразование дат YYYY-MM-DD к виду DD.MM.YYYY"},"ru/date/weekday":{"common":"2 Мая, Понедельник → 2 мая, понедельник"},"ru/money/currency":{"en-US":"Currency symbol ($, €, ¥, Ұ, £ and ₤) after the number, $100 → 100 $","ru":"Символ валюты ($, €, ¥, Ұ, £ и ₤) после числа, $100 → 100 $"},"ru/money/ruble":{"common":"1 руб. → 1 ₽"},"ru/nbsp/abbr":{"en-US":"Non-breaking space in abbreviations, e.g. “т. д.”","ru":"Нераз. пробел в сокращениях, например, в «т. д.»"},"ru/nbsp/addr":{"en-US":"Placement of non-breaking space after “г.”, “обл.”, “ул.”, “пр.”, “кв.” et al.","ru":"Расстановка нераз. пробела после «г.», «обл.», «ул.», «пр.», «кв.» и др."},"ru/nbsp/afterNumberSign":{"en-US":"Non-breaking thin space after №","ru":"Нераз. узкий пробел после №"},"ru/nbsp/beforeParticle":{"en-US":"Non-breaking space before “ли”, “ль”, “же”, “бы”, “б”","ru":"Нераз. пробел перед «ли», «ль», «же», «бы», «б»"},"ru/nbsp/centuries":{"en-US":"Remove spaces and extra points in “вв.”","ru":"Удаление пробелов и лишних точек в «вв.»"},"ru/nbsp/dayMonth":{"en-US":"Non-breaking space between number and month","ru":"Нераз. пробел между числом и месяцем"},"ru/nbsp/initials":{"en-US":"Binding of initials to the name","ru":"Привязка инициалов к фамилии"},"ru/nbsp/m":{"en-US":"m2 → м², m3 → м³ and non-breaking space","ru":"м2 → м², м3 → м³ и нераз. пробел"},"ru/nbsp/mln":{"en-US":"Non-breaking space between number and “тыс.”, “млн”, “млрд” and “трлн”","ru":"Неразр. пробел между числом и «тыс.», «млн», «млрд» и «трлн»"},"ru/nbsp/ooo":{"en-US":"Non-breaking space after “OOO, ОАО, ЗАО, НИИ, ПБОЮЛ”","ru":"Нераз. пробел после OOO, ОАО, ЗАО, НИИ и ПБОЮЛ"},"ru/nbsp/page":{"en-US":"Non-breaking space after “стр.”, “гл.”, “рис.”, “илл.”","ru":"Нераз. пробел после «стр.», «гл.», «рис.», «илл.»"},"ru/nbsp/ps":{"en-US":"Non-breaking space in P. S. and P. P. S.","ru":"Нераз. пробел в P. S. и P. P. S."},"ru/nbsp/rubleKopek":{"en-US":"Not once. space before the “rub” and “cop.”","ru":"Нераз. пробел перед «руб.» и «коп.»"},"ru/nbsp/see":{"en-US":"Non-breaking space after abbreviation «см.» and «им.»","ru":"Нераз. пробел после сокращений «см.» и «им.»"},"ru/nbsp/year":{"en-US":"Non-breaking space before XXXX г. (2012 г.)","ru":"Нераз. пробел после XXXX г. (2012 г.)"},"ru/nbsp/years":{"en-US":"г.г. → гг. and non-breaking space","ru":"г.г. → гг. и нераз. пробел"},"ru/number/comma":{"en-US":"Commas in numbers","ru":"Замена точки на запятую в числах"},"ru/number/ordinals":{"common":"N-ый, -ой, -ая, -ое, -ые, -ым, -ом, -ых → N-й, -я, -е, -м, -х (25-й)"},"ru/optalign/bracket":{"en-US":"for opening bracket","ru":"для открывающей скобки"},"ru/optalign/comma":{"en-US":"for comma","ru":"для запятой"},"ru/optalign/quote":{"en-US":"for opening quotation marks","ru":"для открывающей кавычки"},"ru/other/accent":{"en-US":"Replacement capital letters to lowercase with addition of accent","ru":"Замена заглавной буквы на строчную с добавлением ударения"},"ru/other/phone-number":{"en-US":"Formatting phone numbers","ru":"Форматирование телефонных номеров"},"ru/punctuation/ano":{"en-US":"Placement of commas before “а” and “но”","ru":"Расстановка запятых перед «а» и «но»"},"ru/punctuation/exclamation":{"common":"!! → !"},"ru/punctuation/exclamationQuestion":{"common":"!? → ?!"},"ru/punctuation/hellipQuestion":{"common":"«?…» → «?..», «!…» → «!..», «…,» → «…»"},"ru/space/afterHellip":{"en-US":"Space after “...”, “!..” and “?..”","ru":"Пробел после «...», «!..» и «?..»"},"ru/space/year":{"en-US":"Space between number and word “год”","ru":"Пробел между числом и словом «год»"},"ru/symbols/NN":{"common":"№№ → №"},"ru/typo/switchingKeyboardLayout":{"en-US":"Replacement of Latin letters in Russian. Typos occur when you switch keyboard layouts","ru":"Замена латинских букв на русские. Опечатки, возникающие при переключении клавиатурной раскладки"}};

    var groups = [
      {
        "name": "punctuation",
        "title": {
          "en-US": "Punctuation",
          "ru": "Пунктуация"
        }
      },
      {
        "name": "optalign",
        "title": {
          "en-US": "Hanging punctuation",
          "ru": "Висячая пунктуация"
        }
      },
      {
        "name": "dash",
        "title": {
          "en-US": "Dash and hyphen",
          "ru": "Тире и дефис"
        }
      },
      {
        "name": "nbsp",
        "title": {
          "en-US": "Non-breaking space",
          "ru": "Неразрывный пробел"
        }
      },
      {
        "name": "space",
        "title": {
          "en-US": "Space and line ending",
          "ru": "Пробел и окончание строки"
        }
      },
      {
        "name": "html",
        "title": {
          "en-US": "HTML",
          "ru": "HTML"
        }
      },
      {
        "name": "date",
        "title": {
          "en-US": "Date",
          "ru": "Дата"
        }
      },
      {
        "name": "money",
        "title": {
          "en-US": "Money",
          "ru": "Деньги"
        }
      },
      {
        "name": "number",
        "title": {
          "en-US": "Numbers and mathematical expressions",
          "ru": "Числа и математические выражения"
        }
      },
      {
        "name": "symbols",
        "title": {
          "en-US": "Symbols and signs",
          "ru": "Символы и знаки"
        }
      },
      {
        "name": "typo",
        "title": {
          "en-US": "Typos",
          "ru": "Опечатки"
        }
      },
      {
        "name": "other",
        "title": {
          "en-US": "Other",
          "ru": "Прочее"
        }
      }
    ]
    ;

    Typograf.titles = titles;
    Typograf.groups = groups;

    return Typograf;

}));
