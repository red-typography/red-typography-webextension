'use strict';

class App {
    constructor() {
        browser.runtime.onMessage.addListener(message => {
            if (!message) { return; }

            let obj;
            switch(message.command) {
                case 'get-text':
                    obj = this.getText();
                    obj && browser.runtime.sendMessage(obj);
                break;
                case 'set-text':
                    this.setText(message);
                break;
            }
        });
    }

    getText() {
        const
            node = document.activeElement,
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
    }

    getPropName(node) {
        const tagName = (node.tagName || '').toLowerCase();
        if (tagName === 'input' || tagName === 'textarea') {
            return 'value';
        } else if (node.isContentEditable) {
            return 'textContent';
        }

        return null;
    }

    setText(message) {
        const
            node = document.activeElement,
            isSelectionEqual = message.selectionStart === message.selectionEnd;

        let text = message.text;

        if (!node) { return; }

        const propName = this.getPropName(node);
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
}

new App();
