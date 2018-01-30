import Vue from 'vue'
import bueI18n from '../src/i18n'
// import bueI18n from '../dist/biu-i18n.js'
// import bueI18n from '../dist/biu-i18n.min.js'

const options = {
  'cn-ZH': {
    first: '一',
    second: '二',
    paramth: '第{:param}',
    morepattern: '{:param}个{:param}个'
  }
}

function vmFactory (elId) {
  var el = document.createElement('div');
  el.id = elId;
  document.body.appendChild(el);
  return Vue.extend({
    template: `<div id='app'>
                <p class='array-message'>{{$i18n([{content: 'helloWorld', params: ['hello']}, {content: 'helloWorld', params: ['hello']}], true)}}</p>
                <p class='message'>{{$i18n({content: 'helloWorld', params: ['hello']}, true)}}</p>
                <p class='nodata'>{{$i18n('nodata')}}</p>
                <p class='hello'>{{$i18n('hello')}}</p>
                <p class='number'>{{$i18n(1024)}}</p>
                <p class='hello-world'>{{$i18n(['hello', 'world'])}}</p>
                <p class='world'>{{$i18n({content: 'helloWorld', params: ['hello']})}}</p>
                <p class='content-nodata'>{{$i18n({content: 'nodata'})}}</p>
                <p class='param-nodata'>{{$i18n({content: 'helloWorld', params: ['nodata']})}}</p>
                <p class='array-nodata'>{{$i18n(['nodata', 'nodata'])}}</p>    
              </div>`
  })
}

describe('biu-i18n', () => {
  Vue.use(bueI18n, options)
  const vm = new Vue()  
  it('cn-ZH test', () => {
    expect(vm.$i18n(0)).toBe(0)
    expect(vm.$i18n('first')).toBe('一')
    expect(vm.$i18n('third')).toBe('third')
    expect(vm.$i18n(['first', 'second'])).toBe('一二')
    expect(vm.$i18n(['third'])).toBe('third')
    expect(vm.$i18n({content: 'paramth', params: ['first']})).toBe('第一')
    expect(vm.$i18n({content: 'third', params: ['first']})).toBe('third')
    expect(vm.$i18n({nocontent: 'paramth', params: ['first']})).toBe('')
    expect(vm.$i18n({content: 'morepattern', params: ['first']})).toBe('一个NONE个')
    expect(vm.$i18n([{content: 'paramth', params: ['second']}, {content: 'paramth', params: ['third']}], true)).toBe('第二，第third')
  })
  // it is sync function
  it('en test', () => {
    vm.$i18n.setLangs({
      en: {
        first: '1',
        second: '2',
        paramth: '{:param}th'
      },
      locale: 'en'
    })
    expect(vm.$i18n(0)).toBe(0)
    expect(vm.$i18n('first')).toBe('1')
    expect(vm.$i18n(['first', 'second'])).toBe('12')
    expect(vm.$i18n({content: 'paramth', params: ['first']}, true)).toBe('1th')
    expect(vm.$i18n([{content: 'paramth', params: ['second']}], true)).toBe('2th')
  })
  it('pattern test', () => {
    vm.$i18n.setLangs({
      pattern: '{:pattern}'
    })
  })
  it('hasLangs test', () => {
    expect(vm.$i18n.hasLangs('cn-ZH')).toBe(true)
  })
  it('auto update test', () => {
    window.vm = vm
    vm.$i18n.setLangs({
      locale: 'ja'
    })
  })
  it('db test', () => {
    vm.$i18n.setLangs({
      locale: 'cn-ZH'
    })
    expect(vm.$i18n.db.first).toBe('一')
    vm.$i18n.setLangs({
      locale: 'en'
    })
    expect(vm.$i18n.db.first).toBe('1')
  })
  it('clear test', () => {
    vm.$i18n.clearLangs('en')
    expect(vm.$i18n('first')).toBe('first')
    expect(vm.$i18n.db.first).toBe(undefined)
  })
  xit('other Usage', () => {
    new Vue({ i18n }).$mount('#app')
  })
  xit('version test', () => {
    Vue.version = '1.0.0'
    Vue.use(bueI18n, options)
    const version = new Vue()
    console.log(version.$i18n(0))
  })
  xit('hello world', () => {
    var MyComponent = vmFactory('app')
    const vm = new MyComponent().$mount('#app')
    expect(vm.$el.querySelector('.hello').textContent)
      .toBe('hello')
    expect(vm.$el.querySelector('.world').textContent)
      .toBe('hello world')
    expect(vm.$el.querySelector('.message').textContent)
      .toBe('hello world')
    expect(vm.$el.querySelector('.array-message').textContent)
      .toBe('hello world，hello world')
    expect(vm.$el.querySelector('.hello-world').textContent)
      .toBe('helloworld')
    expect(vm.$el.querySelector('.nodata').textContent)
      .toBe('nodata')
    expect(vm.$el.querySelector('.content-nodata').textContent)
      .toBe('nodata')
    expect(vm.$el.querySelector('.param-nodata').textContent)
      .toBe('nodata world')
    expect(vm.$el.querySelector('.array-nodata').textContent)
      .toBe('nodatanodata')
    expect(vm.$el.querySelector('.number').textContent)
      .toBe('1024')
  })
})
