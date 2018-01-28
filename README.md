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
const i18n = new VueI18n({
  'cn-ZH': {
    first: 'first',
    second: 'second',
    third: 'third',
    withParams: '{:param} with'
  },
  pattern: '{:param}',
  locale: 'cn-ZH'
})

new Vue({ i18n }).$mount('#app')
```

## Usage

```js
this.$i18n(toBeTranslateKey: any, isObject: boolean)

this.$i18n('first')
this.$i18n(['first', 'second'])
this.$i18n({content: 'withParams', params: ['second']})
// if first is not in languege package , it'll return undifined.
this.$i18n.db.first

// setLangs, and if you have bind vue to window.vm it will updates auto.
this.$i18n.setLangs({
  'en': {
    first: 'first',
    second: 'second',
    third: 'third',
    withParams: '{:param} with'
  },
  locale: 'en'
})
// if already has 'cn-ZH' language package, you can use follow instruction:
this.$i18n.setLangs({
  locale: 'cn-ZH'
})

// hasLangs
this.$i18n('en') // return true

// clearLangs
this.$i18n.clearLangs('cn-ZH')
// OR
this.$i18n.clearLangs(['cn-ZH', 'en'])

```

