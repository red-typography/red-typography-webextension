Object.assign(Typograf, {
    groupsByName: {},
    getGroupTitle: function(name, lang) {
        var group = Typograf.groupsByName[name];
        return group.title[lang] || group.title['en-US'];
    },
    getGroupIndex: function(groupName) {
        return Typograf.groupsByName[groupName].index;
    }
});

Typograf.groups.forEach(function(group, i) {
    group.index = i;
    Typograf.groupsByName[group.name] = group;
});
