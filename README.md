# i18n [![Build Status](https://travis-ci.org/janostudio/biu-i18n.svg?branch=master)](https://travis-ci.org/janostudio/biu-i18n) [![codecov](https://codecov.io/gh/janostudio/biu-i18n/branch/master/graph/badge.svg)](https://codecov.io/gh/janostudio/biu-i18n)

The simplest I18n plugin for vue.


## Installation

```js
npm install biu-i18n --save

import i18n from 'biu-i18n'

// Ready translated locale messages
const message = {
  'cn-ZH': {
    first: 'first',
    second: 'second',
    third: 'third',
    withParams: '{:param} with'
  },
  pattern: '{:param}',
  locale: 'cn-ZH'
}

Vue.use(i18n, message)

// OR

// Create VueI18n instance with options
// const i18n = new VueI18n({
//   locale: 'ja', // set locale
//   messages, // set locale messages
// })

// new Vue({ i18n }).$mount('#app')
```

## Usage

```js
this.$i18n(toBeTranslateKey: any, isObject: boolean)

this.$i18n('first')
this.$i18n(['first', 'second'])
this.$i18n({content: 'withParams', params: ['second']})
```

