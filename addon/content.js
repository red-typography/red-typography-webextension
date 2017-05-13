'use strict';

var App = {
    init: function() {
        browser.runtime.onMessage.addListener(message => {
            if (!message) { return; }

            switch(message.command) {
                case 'get-text':
                    var obj = this.getText();
                    obj && browser.runtime.sendMessage(obj);
                break;
                case 'set-text':
                    this.setText(message);
                break;
            }
        });
    },
    getText: function() {
        var node = document.activeElement,
            propName = this.getPropName(node);
            
        if (!propName) {
            return null;
        }

        return {
            command: 'get-text',
            text: node[propName] || '',
            selectionStart: node.selectionStart,
            selectionEnd: node.selectionEnd
        };
    },
    getPropName: function(node) {
        var tagName = (node.tagName || '').toLowerCase();
        if (tagName === 'input' || tagName === 'textarea') {
            return 'value';
        } else if (node.isContentEditable) {
            return 'textContent';
        }

        return null;
    },
    setText: function(message) {
        var node = document.activeElement,
            text = message.text,
            isSelectionEqual = message.selectionStart === message.selectionEnd,
            propName;

        if (!node) { return; }

        propName = this.getPropName(node);
        if (!propName) { return; }

        if (!isSelectionEqual) {
            text = message.oldText.substring(0, node.selectionStart) +
                message.text +
                message.oldText.substring(node.selectionEnd);
        }

        node[propName] = text;

        if (isSelectionEqual) {
            node.selectionStart = node.selectionEnd = message.selectionStart;
        } else {
            node.selectionStart = message.selectionStart;
            node.selectionEnd = message.selectionStart + message.text.length;
        }
    }
};

App.init();
