browser.runtime.onMessage.addListener(message => {
    if (!message) { return; }
    let obj;
    switch(message.command) {
        case 'get-text':
            console.log('content4');
            obj = getText();
            obj && browser.runtime.sendMessage(obj);
        break;
        case 'set-text':
            console.log('content5');
            setText(message);
        break;
    }
});

function getText() {
    const node = document.activeElement;
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

function getPropName(node) {
    const tagName = (node.tagName || '').toLowerCase();
    if (tagName === 'input' || tagName === 'textarea') {
        return 'value';
    } else if (node.isContentEditable) {
        return 'textContent';
    }

    return null;
}

function setText(message) {
    const node = document.activeElement;
    const isSelectionEqual = message.selectionStart === message.selectionEnd;

    let text = message.text;

    if (!node) { return; }

    const propName = getPropName(node);
    if (!propName) { return; }

    if (!isSelectionEqual) {
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
