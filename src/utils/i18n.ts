import { getBrowser } from "./browser";

export function _(id: string): string {
    id = (id || '').replace(/-/g, '_'); // Fix for Chrome

    return getBrowser().i18n.getMessage(id);
}

export const DEFAULT_LOCALE = 'en-US';
