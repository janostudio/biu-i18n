/**
 * 说明：
 * langsKey允许string，array
 * 以数组形式输入，允许拼接
 * {
 *   content: 'contentKey',
 *   params: ['paramKey']
 * }
 * 其他：
 * isMessage用于判断是否为message信息
 * （判断原因：页面多字段判断为数组，而message复杂情况下也为数组）
 */
import { langsObjectTransfer } from './utils'

export default{
  install (Vue, options) {
    var version = Number(Vue.version.split('.')[0])
    if (version < 2) {
      throw new Error('vue-iframe-box supports vue version 2.0 and above. You are using Vue@' + version + '. Please upgrade to the latest version of Vue.')
    }
    window.langs = options.langs
    Vue.prototype.$i18n = function (langsKey, isMessage) {
      const langs = options.langs
      let results = ''
      const langsKeyType = isMessage ? '[object Object]' : Object.prototype.toString.call(langsKey)
      switch (langsKeyType) {
        case '[object String]':
          results = langs[langsKey] ? langs[langsKey] : langsKey
          break
        case '[object Array]':
          for (let i = 0; i < langsKey.length; i++) {
            results += langs[langsKey[i]] ? langs[langsKey[i]] : langsKey[i]
          }
          break
        case '[object Object]':
          results = langsObjectTransfer(langsKey, langs)
          break
        default:
          results = langsKey
      }
      return results
    }
  }
}
