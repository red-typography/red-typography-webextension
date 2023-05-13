export let isChrome = !Boolean('browser' in window);

export function getBrowser() {
    const browser: typeof chrome = this.browser || this.chrome;

    return browser;
}
