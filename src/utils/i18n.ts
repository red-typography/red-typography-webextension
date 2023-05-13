export function _(id: string): string {
    id = (id || '').replace(/-/g, '_'); // Fix for Chrome

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (this.browser || this.chrome).i18n.getMessage(id);
}

export const DEFAULT_LOCALE = 'en-US';
