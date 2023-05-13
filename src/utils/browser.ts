export const isChrome = !('browser' in window);

export function getBrowser() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const browser: typeof chrome = this.browser || this.chrome;

    return browser;
}
