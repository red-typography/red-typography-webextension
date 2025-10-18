export const isChrome = !('browser' in window);

export function getBrowser() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const browser: typeof chrome = globalThis.browser || globalThis.chrome || {
        i18n: {
            getUILanguage: () => 'ru',
            getMessage: (key: string) => key,
        },
        storage: {
            local: {
                set: () => '',
                get: (_name: string, callback?: (data: unknown) => void) => {
                    if (callback) {
                        callback({});
                    }

                    return Promise.resolve({});
                },
            },
        },
    };

    return browser;
}
