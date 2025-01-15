# js-babel-ui
Consolidated [Babel](https://babeljs.io/) dependencies for transpiling UI code (React).


#### IMPORTANT
**Do not reference this library** unless you are happy staying in lock-step with the babel transpiler plugins used by my [modules](https://github.com/philcockfield/modules) and other idiomatic decisions that I make.


## Install
A single dependency will bring all the standard babel presents and plugins:

    npm install --save-dev js-babel-ui

```json
{
  "devDependencies": {
    "js-babel-ui": "^6.0.0"
  }
}
```



## Configure
#### .babelrc
The references in this module's `package.json` allow for the following presents and plugins in your `.babelrc` file:

    {
      "presets": ["es2015", "stage-0", "react"],
      "plugins": ["transform-class-properties"]
    }




## Tests
    npm install
    npm test


---
### License: MIT
