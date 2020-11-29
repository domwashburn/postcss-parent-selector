# postcss-parent-selector [![Build Status][ci-img]][ci]

[PostCSS] plugin for adding a parent selector to all rules in a CSS file.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/domwashburn/postcss-parent-selector.svg
[ci]:      https://travis-ci.org/domwashburn/postcss-parent-selector

## Example

**Options:**

```js
{selector: '.parent'}
```

**Input CSS:**

```css
.foo {
    /* Input example */
}


.foo .bar,
div.foo .bar {
    /* Input example */
}
```
**Output CSS:**

```css
.parent .foo {
    /* Output example */
}


.parent .foo .bar,
.parent div.foo .bar {
    /* Output example */
}
```
## Options
The `selector` option takes a string value that should be placed at the beginning of each selector, including selector lists separated by commas.

```js
// class
{selector: '.parent-class'}

// id
{selector: '#parent-id'}

// element
{selector: 'div.parent-class'}
```

The `exceptions` option takes an array of string values that should be ignored. This can serve useful if you have a `body` or `html` selector in your css file.

```js
// input
{selector: '.parent', excetions: ['body', 'html']}
```

```css
.parent .foo {
    /* Output example */
}

body {
    /* Output example */
}
```

The `appendTo` option takes an array of string values on which you want the new selector to applied.

```js
// input
{selector: '.parent', appendTo: ['body']}
```

```css
.parent .foo {
    /* Output example */
}

body.parent {
    /* Output example */
}
```



## Usage
```js
postcss([ require('postcss-parent-selector') ])
```

See [PostCSS] docs for examples for your environment.

### Gulp.js _( with babel )_

```js
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import parentSelector from 'postcss-parent-selector';

gulp.task('styles', () => {

     // array containing postcss plugins
    var processors = [
        parentSelector({selector: '.parent'})
    ];

    // source compiled css or scss files
    return gulp.src('./path/to/*.scss')
        .pipe(plumber())
        // scss compiling
        .pipe(sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', sass.logError))
        // postcss processes the compiled css
        .pipe(postcss(processors))
        .pipe(gulp.dest('./path/to/dest'))
        .pipe(reload({ stream: true }));
});
```
