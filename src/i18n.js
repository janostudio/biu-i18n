export default{
  install (Vue, options) {
    var version = Number(Vue.version.split('.')[0])
    if (version < 2) {
      throw new Error('vue-iframe-box supports vue version 2.0 and above. You are using Vue@' + version + '. Please upgrade to the latest version of Vue.')
    }
    let langsSet = {}
    let locale = ''
    let pattern = ''
    let comma = ''
    // set new langs & locale   
    function setLangs (options) {
      locale = options.locale ? options.locale : 'cn-ZH'
      comma = locale === 'cn-ZH' ? '，' : ','
      const langs = options[locale] ? options[locale] : {}      
      pattern = options.pattern ? options.pattern : '{:param}'
      langsSet[locale] = langs
    }
    // translate [{content: 'content', params: ['param1', 'param2']}]
    function langsObjectTransfer (val, langs) {
      let Msg = ''
      const originLangs = Object.prototype.toString.call(val) === '[object Array]' ? val : [val]
      for (let i = 0; i < originLangs.length; i++) {
        let num = 0
        let langMsg = ''
        if (originLangs[i].hasOwnProperty('content')) {
          langMsg = langs[originLangs[i].content] ? langs[originLangs[i].content] : originLangs[i].content
          langMsg = langMsg.replace(new RegExp(pattern, 'g'), function () {
            num++
            let lang = ''
            if (originLangs[i].params[num - 1]) {
              lang = langs[originLangs[i].params[num - 1]] ? langs[originLangs[i].params[num - 1]] : originLangs[i].params[num - 1]
            } else {
              lang = 'NONE'
              console.warn(`The amount of pattern in content is more than params's length.`)
            }
            return lang
          })
        } else {
          console.warn('The subject content-key of translation is content, and params-key is params, as {content: "content", params: ["param1"]}')
        }
        Msg += i !== originLangs.length - 1 ? langMsg + comma : langMsg
      }
      return Msg
    }
    setLangs(options)
    Vue.prototype.$resetLangs = function (options) {
      setLangs(options)
      // refresh vm
    }
    Vue.prototype.$i18n = function (langsKey, isMessage) {
      const langs = langsSet[locale]
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

