import Vue from 'vue'
import bueI18n from '../src/i18n'
const langs = {
  hello: 'hello',
  world: 'world',
  helloWorld: '{:param} world'
}

function vmFactory (elId) {
  var el = document.createElement("div");
  el.id = elId;
  document.body.appendChild(el);
  return Vue.extend({
    template: `<div id="app">
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

describe("biu-i18n", () => {
  Vue.use(bueI18n, {langs})
  it("hello world", () => {
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
