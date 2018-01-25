/**
 * message语言包转化
 */
export const langsObjectTransfer = (val, langs) => {
  let Msg = ''
  const originLangs = Object.prototype.toString.call(val) === '[object Array]' ? val : [val]
  for (let i = 0; i < originLangs.length; i++) {
    let num = 0
    let langMsg = ''
    if (originLangs[i].hasOwnProperty('content')) {
      langMsg = langs[originLangs[i].content] ? langs[originLangs[i].content] : originLangs[i].content
      langMsg = langMsg.replace(/{:param}/g, function () {
        num++
        let lang = ''
        if (originLangs[i].params[num - 1]) lang = langs[originLangs[i].params[num - 1]] ? langs[originLangs[i].params[num - 1]] : originLangs[i].params[num - 1]
        return lang
      })
    }
    Msg += i !== originLangs.length - 1 ? langMsg + '，' : langMsg
  }
  return Msg
}