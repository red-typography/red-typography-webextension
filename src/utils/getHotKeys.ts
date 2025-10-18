import { isMacintosh } from './isMacintosh';

export function getHotKeys() {
    return isMacintosh() ? 'Option+Shift+T': 'ALT+Shift+T';
}
