# i18n [![Build Status](https://travis-ci.org/janostudio/biu-i18n.svg?branch=master)](https://travis-ci.org/janostudio/biu-i18n) [![codecov](https://codecov.io/gh/janostudio/biu-i18n/branch/master/graph/badge.svg)](https://codecov.io/gh/janostudio/biu-i18n)

The simplest I18n plugin for vue.


## Installation

```js
npm install biu-i18n --save

import i18n from 'biu-i18n'

// Ready translated locale messages
const message = {
  langs: {
    first: 'first',
    second: 'second',
    third: 'third',
    withParams: '{:param}with'
  }
}

Vue.use(i18n, message)

// OR

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'ja', // set locale
  messages, // set locale messages
})

new Vue({ i18n }).$mount('#app')
```

## Usage

```html

<p>{{$i18n('first')}}</p>
<p>{{$i18n(['first', 'second])}}</p>
<p>{{$i18n({content: 'withParams', params: ['second']})}}</p>

```

