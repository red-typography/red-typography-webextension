Object.assign(Typograf, {
    groupsByName: {},
    getGroupTitle(name, lang) {
        const group = Typograf.groupsByName[name];
        return group.title[lang] || group.title['en-US'];
    },
    getGroupIndex(groupName) {
        return Typograf.groupsByName[groupName].index;
    }
});

Typograf.groups.forEach(function(group, i) {
    group.index = i;
    Typograf.groupsByName[group.name] = group;
});
