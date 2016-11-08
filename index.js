var postcss = require('postcss');

module.exports = postcss.plugin('postcss-parent-selector', function(opts) {
    opts = opts || {};

    // Work with options here

    return function(root, result) {
        root.walkRules(rule => {
            rule.selectors = rule.selectors.map(selector => {
                return selector.split(/,[\s]* /g).map( selector => {git co
                    var newsSelector = `${opts.selector} ${selector}`
                    return newsSelector
                });
            });
        });
    };
});
