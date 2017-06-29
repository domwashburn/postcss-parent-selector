var postcss = require('postcss');

function isNonRelevantRule(rule) {
    return rule.parent && rule.parent.type === 'atrule' &&
        rule.parent.name.indexOf('keyframes') !== -1;
}

function hasIgnoredSelectors(selectors, ignoredSelectors) {
    return selectors.some(selector =>
        ignoredSelectors.find(ignored => ignored === selector));
}

function isIgnoredRule(rule, ignoredSelectors) {
    return ignoredSelectors && ignoredSelectors.length &&
        hasIgnoredSelectors(rule.selectors, ignoredSelectors);
}

module.exports = postcss.plugin('postcss-parent-selector', function (opts) {
    opts = opts || {};

    // Work with options here
    return function (root /* , result*/ ) {
        root.walkRules(rule => {
            if (isNonRelevantRule(rule) ||
                isIgnoredRule(rule, opts.ignoredSelectors)) {
                return;
            }
            rule.selectors = rule.selectors.map(selectors => {
                return selectors.split(/,[\s]* /g).map( selector => {
                    // don't add the parent class to a rule that is
                    // exactly equal to the one defined by the user
                    if ( selector === opts.selector ) {
                        return selector;
                    }
                    var newsSelector = `${opts.selector} ${selector}`;
                    return newsSelector;
                });
            });
        });
    };
});
