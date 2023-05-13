import { getBrowser } from './utils/browser';

export interface TypografMessage {
    text: string;
    oldText: string;
    selectionStart: number;
    selectionEnd: number;
}

const browser = getBrowser();

browser.runtime.onMessage.addListener(message => {
    if (!message) {
        return;
    }

    switch(message.command) {
        case 'get-text': {
            const obj = getText();
            obj && browser.runtime.sendMessage(obj);
        }
        break;
        case 'set-text':
            setText(message);
        break;
    }
});

function getText() {
    const node = document.activeElement as (HTMLInputElement | HTMLTextAreaElement);
    const propName = getPropName(node);

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

function getPropName(node: HTMLInputElement | HTMLTextAreaElement) {
    const tagName = (node.tagName || '').toLowerCase();
    if (tagName === 'input' || tagName === 'textarea') {
        return 'value';
    } else if (node.isContentEditable) {
        return 'textContent';
    }

    return null;
}

function setText(message: TypografMessage) {
    const node = document.activeElement as (HTMLInputElement | HTMLTextAreaElement);

    let text = message.text;

    if (!node) { return; }

    const propName = getPropName(node);
    if (!propName) { return; }

    const isSelectionEqual = message.selectionStart === message.selectionEnd;
    if (!isSelectionEqual && node.selectionStart !== null && node.selectionEnd !== null) {
        text = message.oldText.substring(0, node.selectionStart) +
            message.text +
            message.oldText.substring(node.selectionEnd);
    }

    node[propName] = text;

    // for React
    const inputEvent = new Event('input', { bubbles: true });
    node.dispatchEvent(inputEvent);

    if (isSelectionEqual) {
        node.selectionStart = node.selectionEnd = message.selectionStart;
    } else {
        node.selectionStart = message.selectionStart;
        node.selectionEnd = message.selectionStart + message.text.length;
    }
}
