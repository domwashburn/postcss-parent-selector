import postcss from 'postcss';
import test from 'ava';

import plugin from './index.js';

function run(t, input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then( result => {
            t.deepEqual(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}

test('selector is added to all rules', t => {
    return run(
        t,
        '.foo, bar .baz, .buzz .bam { }',
        '.parent .foo, .parent bar .baz, .parent .buzz .bam { }',
        { selector: '.parent' });
});

test('selector not added when rule starts with defined selector', t => {
    return run(
        t,
        '.parent, .foo { }',
        '.parent, .parent .foo { }',
        { selector: '.parent' });
});

test('does not add parent class to keyframes names', t => {
    return run(
        t,
        '@keyframes foo { }',
        '@keyframes foo { }',
        { selector: '.parent' });
});


test('does not add parent class to an ignored selector', t => {
    return run(
        t,
        '* { }',
        '* { }',
        { selector: '.parent', ignoredSelectors:['*'] });
});

test('selector is added to rule if ignoredSelector is not strict equal', t => {
    return run(
        t,
        '.foo * { }',
        '.parent .foo * { }',
        { selector: '.parent', ignoredSelectors:['*'] });
});
