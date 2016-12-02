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
        '.foo, .bar, .baz { }',
        '.parent-class .foo, .parent-class .bar, .parent-class .baz { }',
        { selector: '.parent-class' });
});

test('selector not added when rule starts with defined selector', t => {
    return run(
        t,
        '.parent-class, .foo { }',
        '.parent-class, .parent-class .foo { }',
        { selector: '.parent-class' });
});

test('does not add parent class to keyframes names', t => {
    return run(
        t,
        '@keyframes foo { }',
        '@keyframes foo { }',
        { selector: '.parent-class' });
});

