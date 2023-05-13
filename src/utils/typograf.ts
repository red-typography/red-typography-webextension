import { DEFAULT_LOCALE } from './i18n';

const groupsByName: Record<string, {
    index: number;
    name: string;
    title: Record<string, string>;
}> = {};

window.Typograf.groups.forEach((group, index) => {
    groupsByName[group.name] = {
        index,
        ...group,
    };
});

export function getTypografGroupTitle(name: string, lang: string) {
    const group = groupsByName[name];

    return group.title[lang] || group.title[DEFAULT_LOCALE];
}

export function getTypografGroupIndex(name: string): number {
    return groupsByName[name].index;
}
