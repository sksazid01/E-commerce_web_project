# file-system-css

[![Build Status](https://travis-ci.org/philcockfield/file-system-css.svg?branch=master)](https://travis-ci.org/philcockfield/file-system-css)

A super-fast CSS compiler that finds, builds, caches and monitors files across the file-system.

Supported formats:
- `.css` - Plain CSS
- `.styl` - [Stylus](https://learnboost.github.io/stylus/)



## Usage
Pass a path (or array of paths) to the folders containing your source files (.css, .styl):

```js
import css from "file-system-css";

css.compile(["./site", "./mixins"], { minify: true })
.then(result => {
    // Do something with the resulting CSS, for example:
    req.send(result.css);
})
.catch(err => throw(err));
```


## Options
Pass in options to the compiler (default values shown):
```js
{
  watch: false,         // Flag indicating if file-system watching is enabled.
  minify: false,        // Flag indicating if the css should be minified.
  cache: true,          // Flag indicating if caching should be employed.
  pathsRequired: true   // Flag indicating if an error should be thrown if the
                        // given paths do not exist.
}

css.compile("./path", { /* options */ });
```


## Stylus
The [nib](http://tj.github.io/nib/) CSS3 extensions are automatically imported and are available in any of your **.styl** files.

Create your own mixins, anywhere, by naming your file `<name>.mixin.styl`.  Just like the nib library, these mixins will be automatically available to all your **.styl** files.  No need to **@import** them.


## Test
    npm test
