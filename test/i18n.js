import Vue from 'vue'
import testTest from './test'
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
    template: '<div id="app"><test-test></test-test></div>',
    components: {
      testTest
    }
  })
}

describe("bue-i18n", () => {
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
