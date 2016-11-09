var postcss = require('postcss');

module.exports = postcss.plugin('postcss-parent-selector', function(opts) {
    opts = opts || {};

    // Work with options here

    return function(root, result) {
        root.walkRules(rule => {
            if (rule.parent && rule.parent.type === 'atrule' &&
                rule.parent.name.indexOf('keyframes') !== -1) {
                return
            }
            rule.selectors = rule.selectors.map(selector => {
                return selector.split(/,[\s]* /g).map( selector => {
                    var newsSelector = `${opts.selector} ${selector}`
                    return newsSelector
                });
            });
        });
    };
});
