var postcss = require('postcss');

module.exports = postcss.plugin('postcss-parent-selector', function (opts) {
    opts = opts || {};

    // Work with options here
    return function (root /* , result*/ ) {
        root.walkRules(rule => {
            if (rule.parent && rule.parent.type === 'atrule' &&
                rule.parent.name.indexOf('keyframes') !== -1) {
                return;
            }
            rule.selectors = rule.selectors.map(selectors => {
                return selectors.split(/,[\s]* /g).map( selector => {
                    // don't add the parent class to a rule that is
                    // exactly equal to the one defined by the user
                    if (selector === opts.selector || (Array.isArray(opts.exceptions) && opts.exceptions.includes(selector))) {
                        return selector;
                    }
                    
                    // Certain rules for appending a selector to another 
                    if (Array.isArray(opts.appendTo) && opts.appendTo.includes(selector)) {
                        return `${selector}${opts.selector}`;
                    }

                    // Return new selector
                    return `${opts.selector} ${selector}`;
                });
            });
        });
    };
});
