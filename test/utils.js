import { langsObjectTransfer } from '../src/utils'

describe('translate language', function() {
  const toTransfer = {
    content: 'validator.numeric',
    params: ['score']
  }
  const noTransfer = {
    content: 'validator.numeric',
    params: ['point']
  }
  const noContent = {
    content: 'noContent'
  }
  const arrayContent = [{
    content: 'noContent'
  }, {
    content: 'validator.numeric',
    params: ['score']
  }]
  const langs = {
    score: '积分',
    'validator.numeric': '{:param} 必须是数字.'
  }
  it('translate', function(){
      expect(langsObjectTransfer(toTransfer, langs)).toBe('积分 必须是数字.');
      expect(langsObjectTransfer(arrayContent, langs)).toBe('noContent，积分 必须是数字.');
      expect(langsObjectTransfer(noTransfer, langs)).toBe('point 必须是数字.');
      expect(langsObjectTransfer(noContent, langs)).toBe('noContent');
  });
});
