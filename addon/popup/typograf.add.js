Object.assign(Typograf, {
    groupsByName: {},
    getGroupTitle: function(name, lang) {
        return Typograf.groupsByName[name].title[lang];
    },
    getGroupIndex: function(groupName) {
        return Typograf.groupsByName[groupName].index;
    }
});

Typograf.groups.forEach(function(group, i) {
    group.index = i;
    Typograf.groupsByName[group.name] = group;
});
